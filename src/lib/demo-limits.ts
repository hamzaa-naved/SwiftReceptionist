"use client";

/**
 * Client-side demo session limits: N voice sessions per day per browser,
 * plus a per-session duration cap enforced by the voice adapter. This is
 * cost protection, not security — set matching limits in the voice
 * provider's dashboard too.
 */

const STORAGE_KEY = "sr-demo-sessions";

export const DEMO_MAX_SESSIONS_PER_DAY = Number(
  process.env.NEXT_PUBLIC_DEMO_MAX_SESSIONS ?? 3,
);
export const DEMO_MAX_DURATION_SECONDS = Number(
  process.env.NEXT_PUBLIC_DEMO_MAX_DURATION_SECONDS ?? 150,
);

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function sessionsUsedToday(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw) as { day: string; count: number };
    return data.day === todayKey() ? data.count : 0;
  } catch {
    return 0;
  }
}

export function sessionsRemaining(): number {
  return Math.max(0, DEMO_MAX_SESSIONS_PER_DAY - sessionsUsedToday());
}

export function recordSession() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ day: todayKey(), count: sessionsUsedToday() + 1 }),
    );
  } catch {
    // Storage unavailable (private mode) — limit becomes best-effort.
  }
}
