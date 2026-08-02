import "server-only";
import { getSql } from "./db";

/**
 * Cost control for the public demo voice endpoint.
 *
 * Every live demo link is public and long-lived, so an unthrottled endpoint is
 * an open tab on the Retell account. Limits are stored in Postgres rather than
 * memory because each serverless invocation gets its own process — an in-memory
 * map would reset constantly and enforce nothing.
 *
 * Three independent ceilings, cheapest check first:
 *   per token  — one prospect replaying their own demo
 *   per IP     — one person working through several links
 *   global     — the backstop against a scripted attack
 */
export const LIMITS = {
  perTokenPerDay: Number(process.env.DEMO_LIMIT_TOKEN_DAY ?? 12),
  perIpPerHour: Number(process.env.DEMO_LIMIT_IP_HOUR ?? 15),
  globalPerDay: Number(process.env.DEMO_LIMIT_GLOBAL_DAY ?? 400),
};

export type RateLimitResult = { allowed: true } | { allowed: false; message: string };

export async function checkDemoRateLimit(token: string, ip: string): Promise<RateLimitResult> {
  const sql = getSql();
  try {
    const rows = (await sql`
      SELECT
        (SELECT count(*) FROM demo_call_events
           WHERE token = ${token} AND created_at > now() - interval '1 day')  AS token_day,
        (SELECT count(*) FROM demo_call_events
           WHERE ip = ${ip} AND ip <> 'unknown' AND created_at > now() - interval '1 hour') AS ip_hour,
        (SELECT count(*) FROM demo_call_events
           WHERE created_at > now() - interval '1 day')                       AS global_day
    `) as Array<{ token_day: number; ip_hour: number; global_day: number }>;

    const r = rows[0];
    const n = (v: unknown) => Number(v ?? 0);

    if (n(r?.token_day) >= LIMITS.perTokenPerDay) {
      return { allowed: false, message: "You've reached today's limit for this demo. Try again tomorrow, or book a call and we'll run it live." };
    }
    if (n(r?.ip_hour) >= LIMITS.perIpPerHour) {
      return { allowed: false, message: "Too many demo calls from this connection in the last hour. Please try again shortly." };
    }
    if (n(r?.global_day) >= LIMITS.globalPerDay) {
      return { allowed: false, message: "The demo line is unusually busy right now. Please try again later." };
    }

    await sql`INSERT INTO demo_call_events (token, ip) VALUES (${token}, ${ip})`;
    return { allowed: true };
  } catch (error) {
    // Fail closed only on the global backstop being unknowable would be worse
    // than failing open for a genuine prospect, so allow the call but make the
    // failure loud — a broken limiter must never silently disable itself.
    console.error("[outreach:rate-limit] check failed, allowing call:", error);
    return { allowed: true };
  }
}
