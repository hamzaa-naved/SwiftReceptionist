/**
 * The niche content model. One file in this directory = one fully built
 * landing page at /industries/[slug], plus entries in the homepage niche
 * section, footer, sitemap, and demo personalization.
 *
 * To add a niche: copy an existing file, edit every field, register it in
 * index.ts. Target: under 5 minutes. No page code changes needed.
 */
export interface NicheFaq {
  q: string;
  a: string;
}

export interface ScriptTurn {
  speaker: "caller" | "ai";
  text: string;
}

export interface Niche {
  slug: string;
  /** Full industry label, e.g. "Electrical Contractors" */
  name: string;
  /** Short label for chips/nav, e.g. "Electrical" */
  shortName: string;
  /** What the owner calls their business, e.g. "electrical contractor" */
  noun: string;
  /** Lucide icon name used on cards (must exist in the icon map) */
  icon: "zap" | "wrench";

  seo: {
    title: string;
    description: string;
  };

  hero: {
    headline: string;
    subhead: string;
  };

  /** The moments this niche actually loses money on a missed call */
  emergencies: string[];

  pains: { title: string; body: string }[];

  /** Realistic example call, shown as a transcript on the niche page */
  scriptScenario: string;
  callScript: ScriptTurn[];

  /** Ballpark job economics used in copy — keep ranges honest and general */
  jobValue: { low: number; high: number; label: string };

  /** Pre-filled ROI calculator defaults for this niche */
  roiDefaults: {
    missedCallsPerWeek: number;
    avgJobValue: number;
    closeRatePct: number;
  };

  faq: NicheFaq[];

  /** First line the demo receptionist uses; {biz} is replaced at runtime */
  demoGreeting: string;

  /** One-line hook used on the homepage niche card */
  homeHook: string;
}
