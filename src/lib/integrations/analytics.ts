"use client";

/**
 * Analytics adapter. The UI only ever calls `track(event, props)` — the
 * provider behind it is chosen by env vars:
 *
 *   NEXT_PUBLIC_ANALYTICS_PROVIDER = "plausible" | "ga4" | "" (off)
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN   = e.g. "swiftreceptionist.com"
 *   NEXT_PUBLIC_GA4_ID             = e.g. "G-XXXXXXX"
 *
 * With nothing configured, track() logs in dev and no-ops in prod, so
 * the site works before analytics is wired up.
 */

export type AnalyticsEvent =
  | "cta_book_call"
  | "cta_try_demo"
  | "calculator_used"
  | "calculator_shared"
  | "demo_voice_started"
  | "demo_voice_ended"
  | "demo_chat_started"
  | "demo_mode_toggled"
  | "lead_form_submitted"
  | "booking_widget_opened"
  | "exit_cta_shown"
  | "exit_cta_clicked"
  | "faq_opened"
  | "niche_page_cta";

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "";

export function track(event: AnalyticsEvent, props?: EventProps) {
  if (typeof window === "undefined") return;

  if (provider === "plausible" && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
    return;
  }
  if (provider === "ga4" && window.gtag) {
    window.gtag("event", event, props ?? {});
    return;
  }
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, props ?? {});
  }
}
