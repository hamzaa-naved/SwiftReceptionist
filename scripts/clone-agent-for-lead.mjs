import { neon } from "@neondatabase/serverless";

const business = process.argv[2];
const templateAgentId = process.argv[3];
if (!business || !templateAgentId) {
  throw new Error("Usage: node scripts/clone-agent-for-lead.mjs \"<Business Name>\" <template_agent_id>");
}
if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL.");
if (!process.env.RETELL_API_KEY) throw new Error("Set RETELL_API_KEY.");

const sql = neon(process.env.DATABASE_URL);
const RETELL = "https://api.retellai.com";
const headers = {
  Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
  "Content-Type": "application/json",
};

async function retell(path, options = {}) {
  const res = await fetch(`${RETELL}${path}`, { headers, ...options });
  if (!res.ok) throw new Error(`Retell ${path} -> ${res.status}: ${await res.text()}`);
  return res.json();
}

// 1. Look up the lead.
const rows = await sql`SELECT * FROM outreach_leads WHERE lower(business) = lower(${business.trim()}) LIMIT 2`;
if (rows.length === 0) throw new Error(`No lead found for business "${business}"`);
if (rows.length > 1) throw new Error(`Ambiguous business name "${business}" — multiple leads match. Query by lead id instead.`);
const lead = rows[0];

// 2. Fetch the template agent + its conversation flow.
const templateAgent = await retell(`/get-agent/${templateAgentId}`);
if (templateAgent.response_engine?.type !== "conversation-flow") {
  throw new Error("Template agent must be a conversation-flow agent (this script only supports that type).");
}
const templateFlow = await retell(`/get-conversation-flow/${templateAgent.response_engine.conversation_flow_id}`);

// 3. Personalize: derive the template's own business name from its agent_name,
// then swap every mention for the new lead's business name, and prepend a
// context block with the new lead's specifics so the agent has real detail
// to draw on even where the prose isn't a verbatim name match.
const templateBusinessName = templateAgent.agent_name.split("—")[0].trim();
const swapName = (text) => {
  if (!text) return text;
  const pattern = new RegExp(templateBusinessName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return text.replace(pattern, lead.business);
};

const contextBlock = [
  "# Business-specific context for this deployment (read carefully — overrides generic details above where they conflict)",
  `Business name: ${lead.business}`,
  lead.owner ? `Owner/contact: ${lead.owner}` : null,
  lead.city || lead.state ? `Location: ${[lead.city, lead.state].filter(Boolean).join(", ")}` : null,
  lead.focus ? `Service focus: ${lead.focus}` : null,
  lead.hook ? `Notable detail to weave in naturally if relevant: ${lead.hook}` : null,
  "",
].filter(Boolean).join("\n");

const newGlobalPrompt = contextBlock + swapName(templateFlow.global_prompt);
const newBoostedKeywords = Array.from(new Set([
  lead.business,
  ...(lead.city ? [lead.city] : []),
  ...(lead.state ? [lead.state] : []),
  ...templateAgent.boosted_keywords.filter((k) => !k.toLowerCase().includes(templateBusinessName.toLowerCase())),
]));

// 4. Duplicate the conversation flow with the personalized prompt.
const { conversation_flow_id: _flowId, last_modification_timestamp: _t1, is_published: _p1, version: _v1, ...flowRest } = templateFlow;
const newFlow = await retell("/create-conversation-flow", {
  method: "POST",
  body: JSON.stringify({ ...flowRest, global_prompt: newGlobalPrompt }),
});

// 5. Create the new agent pointing at the duplicated flow.
const {
  agent_id: _agentId, last_modification_timestamp: _t2, is_published: _p2,
  version: _v2, base_version: _bv, response_engine: _re, agent_name: _an,
  boosted_keywords: _bk, ...agentRest
} = templateAgent;
const newAgent = await retell("/create-agent", {
  method: "POST",
  body: JSON.stringify({
    ...agentRest,
    agent_name: `${lead.business} — Advanced AI Receptionist`,
    response_engine: { type: "conversation-flow", conversation_flow_id: newFlow.conversation_flow_id },
    boosted_keywords: newBoostedKeywords,
  }),
});

// 6. Save the new agent id on the lead.
await sql`UPDATE outreach_leads SET retell_agent_id = ${newAgent.agent_id} WHERE id = ${lead.id}`;

// 7. Report the demo link (create one if this lead doesn't have one yet).
const existing = await sql`SELECT token FROM outreach_demos WHERE lead_id = ${lead.id} AND revoked_at IS NULL AND expires_at > now() ORDER BY created_at DESC LIMIT 1`;
let token = existing[0]?.token;
if (!token) {
  const { randomUUID, randomBytes, createHash } = await import("node:crypto");
  token = randomBytes(24).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await sql`INSERT INTO outreach_demos (id, lead_id, token_hash, token, expires_at) VALUES (${randomUUID()}, ${lead.id}, ${tokenHash}, ${token}, ${expiresAt})`;
}

console.log(`Created dedicated agent ${newAgent.agent_id} for "${lead.business}" (cloned from ${templateAgentId}).`);
console.log(`Demo link: ${(process.env.NEXT_PUBLIC_SITE_URL ?? "https://swiftreceptionist.com").replace(/\/$/, "")}/demo/${token}`);
