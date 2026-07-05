import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";

/**
 * Lead capture endpoint.
 *
 * Spam protection: honeypot field (validated in schema) + per-IP rate
 * limit. The in-memory limiter is best-effort on serverless (each warm
 * instance has its own map) — good enough to stop dumb bots; swap in
 * Upstash/Vercel KV if abuse ever becomes real.
 *
 * Destinations (all optional, all env-configured):
 *   CRM_WEBHOOK_URL   — POSTed the full lead as JSON (Zapier/Make/HL etc.)
 *   RESEND_API_KEY    — sends a notification email via Resend's REST API
 *   LEAD_NOTIFY_EMAIL — where that notification goes
 *   LEAD_FROM_EMAIL   — verified sender, e.g. leads@swiftreceptionist.com
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  // Keep the map bounded on long-lived warm instances: sweep expired
  // windows once it grows past a sane ceiling.
  if (hits.size > 1000) {
    for (const [key, value] of hits) {
      if (now - value.windowStart > WINDOW_MS) hits.delete(key);
    }
  }

  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests — try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot trips land here too; a generic message tells bots nothing.
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const lead = {
    ...parsed.data,
    website: undefined,
    source: "swiftreceptionist.com",
    submittedAt: new Date().toISOString(),
  };

  const results = await Promise.allSettled([forwardToCrm(lead), notifyByEmail(lead)]);
  const attempted = results.filter((r) => r.status !== "fulfilled" || r.value !== "skipped");
  const failures = attempted.filter((r) => r.status === "rejected");

  // Nothing configured: log so leads aren't silently lost in preview envs.
  if (attempted.length === 0) {
    console.warn("[lead] No CRM_WEBHOOK_URL or RESEND_API_KEY configured. Lead:", lead);
  }
  if (failures.length > 0 && failures.length === attempted.length) {
    console.error("[lead] All delivery destinations failed", failures);
    return NextResponse.json(
      { ok: false, error: "Something broke on our end — email us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function forwardToCrm(lead: Record<string, unknown>): Promise<"sent" | "skipped"> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return "skipped";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`CRM webhook responded ${res.status}`);
  return "sent";
}

async function notifyByEmail(lead: Record<string, unknown>): Promise<"sent" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return "skipped";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? "leads@swiftreceptionist.com",
      to: [to],
      subject: `New lead: ${lead.business} (${lead.niche || "no niche"})`,
      text: [
        `Name: ${lead.name}`,
        `Business: ${lead.business}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone}`,
        `Industry: ${lead.niche || "—"}`,
        ``,
        `${lead.message || "(no message)"}`,
      ].join("\n"),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  return "sent";
}
