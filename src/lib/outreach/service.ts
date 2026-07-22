import "server-only";
import { createHash, randomBytes, randomUUID } from "crypto";
import { getSql } from "./db";
import { makePreview, sendEmail } from "./email";
import type { Demo, EmailPreview, Lead } from "./types";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://swiftreceptionist.com").replace(/\/$/, "");
const activeEmailQualities = ["verified-crawled", "guessed-deliverable"];
// Keeps the first approved prospect demo available while the database connection
// is being finalized. The token is opaque, carries no lead data, and expires on
// the same 30-day schedule as database-backed demos.
const DIKORT_FALLBACK_TOKEN = "Q8u2Pm7zR4nXc9Lk5Vh1Ty6Da3Ws0FeB";
const DIKORT_FALLBACK_EXPIRES_AT = "2026-08-21T23:59:59.999Z";
const DIKORT_FALLBACK_DEMO = {
  business: "Dikort Electric",
  owner: "Alexander Castaneda",
  city: "Port St. Lucie",
  state: "Florida",
  focus: "Residential and commercial electrical services",
  advertises_24x7: false,
  id: "dikort-fallback-demo",
};

function toLead(row: Record<string, unknown>): Lead {
  return {
    id: String(row.id), business: String(row.business), owner: stringOrNull(row.owner), phone: stringOrNull(row.phone), email: String(row.email),
    emailQuality: stringOrNull(row.email_quality), city: stringOrNull(row.city), state: stringOrNull(row.state), tier: stringOrNull(row.tier),
    score: typeof row.score === "number" ? row.score : null, focus: stringOrNull(row.focus), advertises24x7: Boolean(row.advertises_24x7),
    hook: stringOrNull(row.hook), emailOpener: stringOrNull(row.email_opener), reviews: typeof row.reviews === "number" ? row.reviews : null,
  };
}
function stringOrNull(value: unknown) { return typeof value === "string" && value.trim() ? value : null; }
function tokenHash(token: string) { return createHash("sha256").update(token).digest("hex"); }

export async function findLead(business: string) {
  const rows = (await getSql()`SELECT * FROM outreach_leads WHERE lower(business) = lower(${business.trim()}) LIMIT 2`) as Record<string, unknown>[];
  if (rows.length === 0) throw new Error("LEAD_NOT_FOUND");
  if (rows.length > 1) throw new Error("AMBIGUOUS_LEAD");
  return toLead(rows[0] as Record<string, unknown>);
}

export async function getOrCreateDemo(lead: Lead): Promise<Demo> {
  const sql = getSql();
  const existing = (await sql`SELECT id, token, expires_at FROM outreach_demos WHERE lead_id = ${lead.id} AND revoked_at IS NULL AND expires_at > now() ORDER BY created_at DESC LIMIT 1`) as Array<{ id: string; token: string; expires_at: string }>;
  const row = existing[0];
  if (row) return { id: row.id, leadId: lead.id, token: row.token, url: `${BASE_URL}/demo/${row.token}`, expiresAt: row.expires_at };
  const token = randomBytes(24).toString("base64url");
  const id = randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await sql`INSERT INTO outreach_demos (id, lead_id, token_hash, token, expires_at) VALUES (${id}, ${lead.id}, ${tokenHash(token)}, ${token}, ${expiresAt})`;
  return { id, leadId: lead.id, token, url: `${BASE_URL}/demo/${token}`, expiresAt };
}

export async function createPreviewForBusiness(business: string) {
  const lead = await findLead(business);
  const demo = await getOrCreateDemo(lead);
  return makePreview(lead, demo);
}

export async function prepareDailyBatch() {
  const sql = getSql();
  const existing = (await sql`SELECT id FROM outreach_batches WHERE batch_date = CURRENT_DATE LIMIT 1`) as Array<{ id: string }>;
  if (existing.length) return previewBatch(String((existing[0] as { id: string }).id));
  const batchId = randomUUID();
  const candidates = (await sql`SELECT l.* FROM outreach_leads l WHERE l.ready = true AND l.email_quality = ANY(${activeEmailQualities}) AND l.phone IS NOT NULL AND NOT EXISTS (SELECT 1 FROM outreach_suppressions s WHERE s.email = l.email) AND NOT EXISTS (SELECT 1 FROM outreach_send_events e WHERE e.lead_id = l.id AND e.status = 'sent') ORDER BY l.advertises_24x7 DESC, CASE l.tier WHEN 'A' THEN 1 WHEN 'B' THEN 2 ELSE 3 END, CASE WHEN l.focus IN ('Residential','Both') THEN 0 ELSE 1 END, l.score DESC NULLS LAST LIMIT 25`) as Record<string, unknown>[];
  if (!candidates.length) throw new Error("NO_ELIGIBLE_LEADS");
  await sql`INSERT INTO outreach_batches (id, batch_date, status) VALUES (${batchId}, CURRENT_DATE, 'prepared')`;
  for (let position = 0; position < candidates.length; position += 1) {
    const lead = toLead(candidates[position] as Record<string, unknown>);
    const demo = await getOrCreateDemo(lead);
    const preview = makePreview(lead, demo);
    await sql`INSERT INTO outreach_batch_items (batch_id, lead_id, position, demo_id, subject, text_body, html_body) VALUES (${batchId}, ${lead.id}, ${position + 1}, ${demo.id}, ${preview.subject}, ${preview.text}, ${preview.html})`;
  }
  return previewBatch(batchId);
}

export async function previewBatch(batchId: string) {
  const rows = (await getSql()`SELECT b.id AS batch_id, b.status, i.*, l.* , d.token, d.expires_at FROM outreach_batches b JOIN outreach_batch_items i ON i.batch_id = b.id JOIN outreach_leads l ON l.id = i.lead_id JOIN outreach_demos d ON d.id = i.demo_id WHERE b.id = ${batchId} ORDER BY i.position`) as Record<string, unknown>[];
  if (!rows.length) throw new Error("BATCH_NOT_FOUND");
  const previews = rows.map((row) => {
    const typed = row as Record<string, unknown>;
    const lead = toLead(typed);
    const demo: Demo = { id: String(typed.demo_id), leadId: lead.id, token: String(typed.token), url: `${BASE_URL}/demo/${typed.token}`, expiresAt: String(typed.expires_at) };
    return { lead, demo, subject: String(typed.subject), text: String(typed.text_body), html: String(typed.html_body) } satisfies EmailPreview;
  });
  return { batchId, status: String((rows[0] as Record<string, unknown>).status), previews };
}

export async function sendSingle(preview: EmailPreview) {
  await sendEmail(preview);
  await getSql()`INSERT INTO outreach_send_events (id, lead_id, demo_id, status, recipient_email, subject) VALUES (${randomUUID()}, ${preview.lead.id}, ${preview.demo.id}, 'sent', ${preview.lead.email}, ${preview.subject})`;
}

export async function sendBatch(batchId: string) {
  const batch = await previewBatch(batchId);
  if (batch.status !== "prepared") throw new Error("BATCH_NOT_SENDABLE");
  for (const preview of batch.previews) await sendSingle(preview);
  await getSql()`UPDATE outreach_batches SET status = 'sent', sent_at = now() WHERE id = ${batchId}`;
  return { sent: batch.previews.length };
}

export async function resolveDemo(token: string) {
  if (token === DIKORT_FALLBACK_TOKEN && new Date(DIKORT_FALLBACK_EXPIRES_AT) > new Date()) {
    return DIKORT_FALLBACK_DEMO;
  }
  const rows = (await getSql()`SELECT l.business, l.owner, l.city, l.state, l.focus, l.advertises_24x7, d.id FROM outreach_demos d JOIN outreach_leads l ON l.id = d.lead_id WHERE d.token_hash = ${tokenHash(token)} AND d.revoked_at IS NULL AND d.expires_at > now() LIMIT 1`) as Record<string, unknown>[];
  return rows[0] as Record<string, unknown> | undefined;
}

export async function suppressDemo(token: string) {
  const rows = (await getSql()`SELECT l.email FROM outreach_demos d JOIN outreach_leads l ON l.id = d.lead_id WHERE d.token_hash = ${tokenHash(token)} LIMIT 1`) as Array<{ email?: string }>;
  const email = (rows[0] as { email?: string } | undefined)?.email;
  if (!email) return false;
  await getSql()`INSERT INTO outreach_suppressions (email, reason) VALUES (${email}, 'unsubscribe') ON CONFLICT (email) DO NOTHING`;
  return true;
}
