import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL before running this migration.");
const sql = neon(process.env.DATABASE_URL);
const source = await readFile(new URL("../src/lib/outreach/schema.sql", import.meta.url), "utf8");
for (const statement of source.split(";").map((part) => part.trim()).filter(Boolean)) await sql.query(statement);
console.log("Outreach schema is ready.");
