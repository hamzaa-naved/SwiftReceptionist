#!/usr/bin/env node
/**
 * Build a ready-to-send demo for one lead. Call-first workflow:
 * you phone a lead, they're interested, you run this and send the link.
 *
 *   node scripts/demo.mjs "Electric Bull"
 *   node scripts/demo.mjs "Electric Bull" --template bilingual
 *   node scripts/demo.mjs "Electric Bull" --refresh      # rebuild the agent
 *   node scripts/demo.mjs "Electric Bull" --shared       # skip the dedicated agent
 *   node scripts/demo.mjs "Ace Electricians" --city Miami  # disambiguate
 *   node scripts/demo.mjs "New Co" --new --phone 555-1234 --city Austin --state Texas
 *
 * Prints exactly one line on success: the demo URL.
 * Everything else (progress, warnings) goes to stderr.
 */
import { neon } from "@neondatabase/serverless";
import { randomUUID, randomBytes, createHash } from "node:crypto";

const TEMPLATES = {
  bilingual: "agent_0ffa04cf70d06c438582c2e7f7", // Ro&Yu — EN/ES, South Florida
  english: "agent_48161f3dc2c2d223afe45fe602",   // Dean's Electrical — EN only
};
// Leads in these states get the bilingual template by default.
const BILINGUAL_STATES = new Set(["florida", "fl"]);
const TOKEN_DAYS = 90;
const REFRESH_WITHIN_DAYS = 30;
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://swiftreceptionist.com").replace(/\/$/, "");

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const has = (f) => flags.has(f);
const optOf = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const VALUE_FLAGS = ["template", "city", "owner", "phone", "state"];
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith("--")) { if (VALUE_FLAGS.includes(argv[i].slice(2))) i++; continue; }
  positional.push(argv[i]);
}
const query = positional.join(" ").trim();

const log = (...a) => console.error(...a);
const die = (msg, code = 1) => { log(`\n✗ ${msg}\n`); process.exit(code); };

if (!query) die('Usage: node scripts/demo.mjs "Business Name" [--template bilingual|english] [--refresh] [--shared]');
if (!process.env.DATABASE_URL) die("DATABASE_URL is not set.");
if (!process.env.RETELL_API_KEY) die("RETELL_API_KEY is not set.");

const sql = neon(process.env.DATABASE_URL);
const rHeaders = { Authorization: `Bearer ${process.env.RETELL_API_KEY}`, "Content-Type": "application/json" };
async function retell(path, options = {}) {
  const res = await fetch(`https://api.retellai.com${path}`, { headers: rHeaders, ...options });
  if (!res.ok) throw new Error(`Retell ${path} → ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

/* ---------------------------------- 1. find the lead --------------------------------- */
const cityOpt = optOf("city");
let matches = await sql`SELECT * FROM outreach_leads WHERE lower(business) = lower(${query})`;
if (matches.length === 0) matches = await sql`SELECT * FROM outreach_leads WHERE business ILIKE ${"%" + query + "%"} LIMIT 25`;
if (matches.length > 1 && cityOpt) {
  const narrowed = matches.filter((m) => String(m.city ?? "").toLowerCase() === cityOpt.toLowerCase());
  if (narrowed.length) matches = narrowed;
}

if (matches.length === 0) {
  if (!has("--new")) die(`No lead matches "${query}".\n  Fix the spelling, or add them: --new --phone "555-1234" --city "Austin" --state "Texas"`);
  const phone = optOf("phone") ?? null, city = optOf("city") ?? null, state = optOf("state") ?? null;
  const dedupe = `${query.trim().replace(/\s+/g, " ").toLowerCase()}|${String(phone ?? "").replace(/\D/g, "")}|${String(city ?? "").trim().toLowerCase()}`;
  const created = await sql`
    INSERT INTO outreach_leads (id, business, owner, phone, city, state, ready, source, dedupe_key)
    VALUES (${randomUUID()}, ${query.trim()}, ${optOf("owner") ?? null}, ${phone}, ${city}, ${state}, true, 'manual', ${dedupe})
    RETURNING *`;
  matches = created;
  log(`  lead: created new record`);
}
if (matches.length > 1) {
  log(`\n${matches.length} leads match "${query}" — re-run with --city to pick one:\n`);
  for (const m of matches) log(`   • ${m.business}  —  ${[m.city, m.state].filter(Boolean).join(", ") || "no city"}  ${m.phone ?? ""}`);
  log("");
  process.exit(2);
}
const lead = matches[0];
log(`→ ${lead.business}${lead.city ? ` (${lead.city}, ${lead.state ?? ""})` : ""}`);

/* ------------------------------- 2. ensure a live token ------------------------------ */
const live = await sql`
  SELECT token, expires_at FROM outreach_demos
  WHERE lead_id = ${lead.id} AND revoked_at IS NULL AND expires_at > now() + ${`${REFRESH_WITHIN_DAYS} days`}::interval
  ORDER BY created_at DESC LIMIT 1`;
let token = live[0]?.token;
if (token) {
  log(`  link: reusing existing (valid to ${new Date(live[0].expires_at).toISOString().slice(0, 10)})`);
} else {
  token = randomBytes(24).toString("base64url");
  const expiresAt = new Date(Date.now() + TOKEN_DAYS * 864e5).toISOString();
  await sql`INSERT INTO outreach_demos (id, lead_id, token_hash, token, expires_at)
            VALUES (${randomUUID()}, ${lead.id}, ${createHash("sha256").update(token).digest("hex")}, ${token}, ${expiresAt})`;
  log(`  link: minted, valid ${TOKEN_DAYS} days`);
}
const url = `${BASE_URL}/demo/${token}`;

/* ----------------------------- 3. ensure a dedicated agent --------------------------- */
if (has("--shared")) {
  log("  agent: shared (--shared)");
} else if (lead.retell_agent_id && !has("--refresh")) {
  log(`  agent: existing dedicated (${lead.retell_agent_id})`);
} else {
  const choice = optOf("template") ?? (BILINGUAL_STATES.has(String(lead.state ?? "").trim().toLowerCase()) ? "bilingual" : "english");
  const templateId = TEMPLATES[choice] ?? choice;
  log(`  agent: cloning ${choice}…`);

  const tpl = await retell(`/get-agent/${templateId}`);
  if (tpl.response_engine?.type !== "conversation-flow") die(`Template ${templateId} is not a conversation-flow agent.`);
  const tplFlow = await retell(`/get-conversation-flow/${tpl.response_engine.conversation_flow_id}`);

  // The template's own business name, so we can swap it out everywhere.
  const tplName = tpl.agent_name.split("—")[0].trim();
  const swap = (t) => (t ? t.replace(new RegExp(tplName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), lead.business) : t);

  const context = [
    "# Business-specific context (authoritative — overrides anything below that conflicts)",
    `Business name: ${lead.business}`,
    lead.owner && `Owner/contact: ${lead.owner}`,
    (lead.city || lead.state) && `Location: ${[lead.city, lead.state].filter(Boolean).join(", ")}`,
    lead.focus && `Service focus: ${lead.focus}`,
    lead.advertises_24x7 && "This business advertises 24/7 emergency service — answering after hours matters to them.",
    lead.hook && `Notable detail, weave in only if natural: ${lead.hook}`,
    "Do not invent a slogan, pricing, years in business, licence numbers, or service areas beyond the above.",
    "",
  ].filter(Boolean).join("\n");

  const { conversation_flow_id: _f, last_modification_timestamp: _t, is_published: _p, version: _v, ...flowRest } = tplFlow;
  const flow = await retell("/create-conversation-flow", {
    method: "POST",
    body: JSON.stringify({ ...flowRest, global_prompt: context + swap(tplFlow.global_prompt) }),
  });

  const keywords = [...new Set([lead.business, lead.city, lead.state,
    ...(tpl.boosted_keywords ?? []).filter((k) => !k.toLowerCase().includes(tplName.toLowerCase()))].filter(Boolean))];

  const { agent_id: _a, last_modification_timestamp: _t2, is_published: _p2, version: _v2, base_version: _b,
          response_engine: _r, agent_name: _n, boosted_keywords: _k, ...agentRest } = tpl;
  const agent = await retell("/create-agent", {
    method: "POST",
    body: JSON.stringify({ ...agentRest,
      agent_name: `${lead.business} — Advanced AI Receptionist`,
      response_engine: { type: "conversation-flow", conversation_flow_id: flow.conversation_flow_id },
      boosted_keywords: keywords }),
  });

  await sql`UPDATE outreach_leads SET retell_agent_id = ${agent.agent_id} WHERE id = ${lead.id}`;
  log(`  agent: created ${agent.agent_id}`);
}

/* ------------------------------------ 4. smoke test ---------------------------------- */
const probe = await fetch(`${BASE_URL}/api/demo/${encodeURIComponent(token)}/call`, { method: "POST" });
log(probe.ok ? "  check: live voice call OK\n" : `  check: ⚠ site returned ${probe.status} — link may not work yet\n`);

console.log(url);
