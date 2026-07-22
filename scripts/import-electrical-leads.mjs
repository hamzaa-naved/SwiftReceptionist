import { randomUUID } from "node:crypto";
import * as XLSX from "xlsx";
import { neon } from "@neondatabase/serverless";

const filePath = process.argv[2];
if (!filePath) throw new Error("Usage: node scripts/import-electrical-leads.mjs <path-to-xlsx>");
if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL before importing leads.");
const workbook = XLSX.readFile(filePath, { raw: false });
const sheet = workbook.Sheets["Master List"];
if (!sheet) throw new Error('Workbook must contain a "Master List" sheet.');
const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
const sql = neon(process.env.DATABASE_URL);
let imported = 0;
for (const row of rows) {
  const email = String(row.Email ?? "").trim().toLowerCase();
  const business = String(row.Business ?? "").trim();
  if (!business || !email || String(row.Status ?? "").trim().toLowerCase() === "reached") continue;
  await sql`INSERT INTO outreach_leads (id, business, owner, phone, email, email_quality, city, state, tier, score, focus, advertises_24x7, hook, email_opener, reviews, ready, source)
    VALUES (${randomUUID()}, ${business}, ${nullable(row.Owner)}, ${nullable(row.Phone)}, ${email}, ${nullable(row["Email Quality"])}, ${nullable(row.City)}, ${nullable(row.State)}, ${nullable(row.Tier)}, ${numberOrNull(row.Score)}, ${nullable(row.Focus)}, ${String(row["24/7 Ads"] ?? "").trim().toLowerCase() === "yes"}, ${nullable(row.Hook)}, ${nullable(row["Email Opener"])}, ${numberOrNull(row.Reviews)}, ${String(row.Ready ?? "").trim().toUpperCase() === "YES"}, 'ELECTRICAL_MASTER_TRUE.xlsx')
    ON CONFLICT (email, business) DO UPDATE SET owner = EXCLUDED.owner, phone = EXCLUDED.phone, email_quality = EXCLUDED.email_quality, city = EXCLUDED.city, state = EXCLUDED.state, tier = EXCLUDED.tier, score = EXCLUDED.score, focus = EXCLUDED.focus, advertises_24x7 = EXCLUDED.advertises_24x7, hook = EXCLUDED.hook, email_opener = EXCLUDED.email_opener, reviews = EXCLUDED.reviews, ready = EXCLUDED.ready`;
  imported += 1;
}
console.log(`Imported ${imported} leads.`);
function nullable(value) { const result = String(value ?? "").trim(); return result || null; }
function numberOrNull(value) { const number = Number(value); return Number.isFinite(number) ? number : null; }
