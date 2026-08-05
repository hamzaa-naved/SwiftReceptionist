#!/usr/bin/env node
/**
 * Clone the Hope blueprint for a new electrical contractor.
 *
 * Duplicates the reference agent, swaps every business fact, re-applies the
 * per-node tuning table, then re-reads the SAVED agent and refuses to hand back
 * one that still names another company.
 *
 * That last step is not paranoia. Clone-and-replace has shipped a live demo that
 * greeted callers with a competitor's name because only the global prompt was
 * sanitised and the greeting lives in a node. Always audit the saved object.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=... node build_agent.mjs ./business.json
 *
 * business.json shape:
 * {
 *   "business":   "Acme Electric",
 *   "agentName":  "Dani",
 *   "voiceId":    "uYXf8XasLslADfZ2MB4u",
 *   "owners":     ["Jane Acme"],
 *   "licence":    "EC1234567",
 *   "phone":      "555-123-4567",
 *   "counties":   "Travis and Williamson County",
 *   "timezone":   "America/Chicago",
 *   "hours":      "Mon–Fri 8am–6pm Central, emergency 24/7",
 *   "founded":    "2015",
 *   "rating":     "4.9 from 80+ reviews",
 *   "specialisms":"EV charging, panel upgrades, generator installs",
 *   "keywords":   ["Acme Electric","Jane Acme","Travis County"]
 * }
 */

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REF = join(HERE, '..', 'references');
const API = 'https://api.elevenlabs.io/v1/convai';
const KEY = process.env.ELEVENLABS_API_KEY;
const SOURCE_AGENT = 'agent_5501kz8ht502eq2sj3xn6v17zvby';

// Anything that must never survive into a cloned agent.
const FORBIDDEN = [
  'battle electric', 'richard battle', 'maria battle', 'EC13010206',
  '786-404-3885', 'miami-dade', 'broward', 'monroe',
];

const NODE_TUNING = {
  triage:       { turn: { turn_eagerness: 'eager' } },
  safety:       { turn: { turn_eagerness: 'patient' }, tts: { stability: 0.78, speed: 0.90 } },
  hazard:       { turn: { turn_eagerness: 'patient' }, tts: { stability: 0.62, speed: 0.95 } },
  urgent:       { turn: { turn_eagerness: 'patient' }, tts: { stability: 0.48, speed: 1.00 } },
  residential:  { turn: { turn_eagerness: 'patient' }, tts: { stability: 0.34, speed: 1.03 } },
  commercial:   { turn: { turn_eagerness: 'patient' }, tts: { stability: 0.46, speed: 1.00 } },
  existing_job: { turn: { turn_eagerness: 'patient' }, tts: { stability: 0.46, speed: 0.98 } },
  pricing:      { turn: { turn_eagerness: 'normal'  }, tts: { stability: 0.40, speed: 1.02 } },
  message:      { turn: { turn_eagerness: 'patient' }, tts: { stability: 0.44, speed: 0.98 } },
  recap:        { turn: { turn_eagerness: 'patient' }, tts: { stability: 0.50, speed: 0.98 } },
};

async function api(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

/** Recurse every string in the object. The greeting and node prompts are nested. */
function deepSwap(value, replacements) {
  if (typeof value === 'string') {
    let out = value;
    for (const [from, to] of replacements) out = out.split(from).join(to);
    return out;
  }
  if (Array.isArray(value)) return value.map((v) => deepSwap(v, replacements));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepSwap(v, replacements)]));
  }
  return value;
}

/** Walk every string and report any forbidden token that survived. */
function auditLeaks(obj, found = new Set(), path = '') {
  if (typeof obj === 'string') {
    const hay = obj.toLowerCase();
    for (const term of FORBIDDEN) if (hay.includes(term.toLowerCase())) found.add(`${term} @ ${path}`);
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => auditLeaks(v, found, `${path}[${i}]`));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) auditLeaks(v, found, path ? `${path}.${k}` : k);
  }
  return found;
}

/** Reconstruct the full agent payload from the reference files alone. */
async function buildFromBlueprint() {
  const cfg = JSON.parse(await readFile(join(REF, 'hope-config.json'), 'utf8'));
  const wf = JSON.parse(await readFile(join(REF, 'hope-workflow.json'), 'utf8'));
  const prompt = await readFile(join(REF, 'hope-system-prompt.md'), 'utf8');

  const conversation_config = cfg.conversation_config;
  conversation_config.agent.prompt.prompt = prompt;

  // Reference files store node overrides flattened for readability; the API wants them nested.
  const nodes = {};
  for (const [id, n] of Object.entries(wf.nodes)) {
    const o = n.overrides || {};
    const node = {
      type: n.type,
      position: n.position,
      edge_order: n.edge_order,
      ...(n.label ? { label: n.label, entry_behavior: 'auto' } : {}),
      ...(n.prompt ? { additional_prompt: n.prompt } : {}),
    };
    if (Object.keys(o).length) {
      node.conversation_config = {
        ...(o.turn_eagerness ? { turn: { turn_eagerness: o.turn_eagerness } } : {}),
        ...(o.stability != null ? { tts: { stability: o.stability, speed: o.speed } } : {}),
        agent: { prompt: { built_in_tools: {}, ...(o.llm ? { llm: o.llm } : {}) } },
      };
    }
    nodes[id] = node;
  }

  const edges = {};
  for (const [id, e] of Object.entries(wf.edges)) {
    edges[id] = {
      source: e.source,
      target: e.target,
      forward_condition: e.type === 'unconditional'
        ? { label: null, type: 'unconditional' }
        : { label: e.label, type: 'llm', condition: e.condition },
      backward_condition: e.backward_condition
        ? { label: e.backward_label, type: 'llm', condition: e.backward_condition }
        : null,
    };
  }

  const evaluation = { criteria: cfg.platform_settings.evaluation_criteria.map((c) => ({
    ...c, type: 'prompt', scope: 'conversation', use_knowledge_base: false, max_score: 100 })) };

  return {
    conversation_config,
    workflow: { nodes, edges, prevent_subagent_loops: false },
    platform_settings: {
      evaluation,
      data_collection: cfg.platform_settings.data_collection,
      privacy: cfg.platform_settings.privacy,
      call_limits: cfg.platform_settings.call_limits,
      topic_discovery: { enabled: true },
      sentiment_analysis: { enabled: true },
    },
  };
}

async function main() {
  if (!KEY) throw new Error('Set ELEVENLABS_API_KEY');
  const specPath = process.argv[2];
  if (!specPath) throw new Error('Usage: node build_agent.mjs ./business.json');

  const spec = JSON.parse(await readFile(specPath, 'utf8'));
  const agentName = spec.agentName || 'Hope';

  // Two sources of truth, in priority order:
  //   --from-live  clone the running reference agent (picks up any hand-tuning since the snapshot)
  //   default      rebuild from the blueprint files, which do not depend on Hope still existing
  const source = process.argv.includes('--from-live')
    ? await api(`/agents/${SOURCE_AGENT}`)
    : await buildFromBlueprint();

  const replacements = [
    ['Battle Electric, LLC', spec.business],
    ['Battle Electric', spec.business],
    ['Richard Battle', spec.owners[0]],
    ['Maria Battle', spec.owners[1] || spec.owners[0]],
    ['Richard or Maria', spec.owners.join(' or ')],
    ['Richard', spec.owners[0]],
    ['E-C-1-3-0-1-0-2-0-6', spec.licence.split('').join('-')],
    ['EC13010206', spec.licence],
    ['786-404-3885', spec.phone],
    ['Miami-Dade, Broward and Monroe County', spec.counties],
    ['Miami-Dade, Broward, Monroe County', spec.counties],
    ['Miami-Dade, Broward or Monroe', spec.counties],
    ['South Florida', spec.region || spec.counties],
    ['Mon–Sat 7am–7pm Eastern, closed Sunday, emergency 24/7', spec.hours],
    ['since 2020', `since ${spec.founded}`],
    ['5.0 from 130+ reviews', spec.rating],
    ['local Florida time', 'real local time'],
    ['Hope', agentName],
  ];

  const cfg = deepSwap(source.conversation_config, replacements);
  const workflow = deepSwap(source.workflow, replacements);

  cfg.tts.voice_id = spec.voiceId || cfg.tts.voice_id;
  cfg.agent.prompt.timezone = spec.timezone;
  cfg.agent.dynamic_variables.dynamic_variable_placeholders = {
    business_name: spec.business,
    business_location: spec.counties,
  };
  cfg.asr.keywords = [
    ...spec.keywords,
    'EV charger','Level 2','Tesla Wall Connector','SPAN panel','smart panel','load center',
    'panel upgrade','service upgrade','subpanel','breaker','main breaker','GFCI','AFCI',
    'amperage','200 amp','meter can','safety inspection',
  ];

  // Re-apply the tuning table rather than trusting what came across in the clone.
  for (const [nodeId, tuning] of Object.entries(NODE_TUNING)) {
    const node = workflow.nodes[nodeId];
    if (!node) continue;
    node.conversation_config = { ...(node.conversation_config || {}), ...tuning };
  }

  const chars = cfg.agent.prompt.prompt.length;
  if (chars > 8000) console.warn(`⚠  prompt is ${chars} chars — over the 8,000 budget, latency will suffer`);

  const created = await api('/agents/create', {
    method: 'POST',
    body: JSON.stringify({
      name: `${spec.business} — AI Receptionist (${agentName})`,
      conversation_config: cfg,
      workflow,
      platform_settings: {
        ...source.platform_settings,
        privacy: { record_voice: true, retention_days: 30 },
      },
      tags: ['swift', 'electrician', 'receptionist', 'client-demo'],
    }),
  });

  // Audit the SAVED agent, not the payload we sent.
  const saved = await api(`/agents/${created.agent_id}`);
  const leaks = auditLeaks({ conversation_config: saved.conversation_config, workflow: saved.workflow });

  if (leaks.size) {
    console.error(`\n✗ BRAND LEAK on ${created.agent_id} — do not send this link:`);
    for (const l of leaks) console.error(`   ${l}`);
    process.exit(3);
  }

  // Confirm the per-node tuning actually persisted. It has silently failed before.
  const missing = Object.keys(NODE_TUNING).filter(
    (id) => !saved.workflow?.nodes?.[id]?.conversation_config?.turn?.turn_eagerness,
  );
  if (missing.length) {
    console.error(`\n✗ per-node tuning did not persist on: ${missing.join(', ')}`);
    console.error('   Re-run the workflow update; do not trust the write echo.');
    process.exit(4);
  }

  console.log(`\n✓ ${created.agent_id}`);
  console.log(`  prompt ${chars} chars · ${Object.keys(NODE_TUNING).length} nodes tuned · no leaks`);
  console.log(`  https://elevenlabs.io/app/talk-to?agent_id=${created.agent_id}`);
  console.log(`\n  Not done until you have listened to it.`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
