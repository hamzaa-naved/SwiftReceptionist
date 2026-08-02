/**
 * Niche-level demo defaults.
 *
 * These are fallbacks used to shape the shared demo agent when a lead has no
 * dedicated agent of its own. They are deliberately trade-level, not
 * per-business: business specifics come from the lead record, and a lead with
 * genuinely bespoke needs gets its own agent via scripts/demo.mjs.
 */
export type DemoProfile = {
  city: string;
  services: string;
  qualificationFocus: string;
  testScenarios: string;
};

type LeadLike = {
  business?: unknown;
  city?: unknown;
  state?: unknown;
  focus?: unknown;
  niche?: unknown;
};

const NICHES: Record<string, DemoProfile> = {
  electrical: {
    city: "",
    services:
      "electrical troubleshooting and repairs, breaker and panel issues, wiring and rewiring, indoor and outdoor lighting, panel upgrades, EV charger installation, and surge protection",
    qualificationFocus:
      "Screen immediate electrical danger first. Then ask one short question at a time: what is happening, whether the work is residential or commercial, the service address, the best callback number, and useful timing. Do not diagnose, invent pricing, promise arrival times, or claim an appointment is booked.",
    testScenarios:
      "A breaker will not reset; a homeowner needs a panel upgrade; a customer wants an EV charger; a property manager needs commercial lighting work.",
  },
  "garage-door": {
    city: "",
    services:
      "garage door repair, broken springs and cables, opener repair and replacement, doors off track, panel replacement, and new door installation",
    qualificationFocus:
      "Screen for anyone trapped or a door that could fall. Then ask what the door is doing, whether a vehicle is stuck inside, the service address, the best callback number, and useful timing. Never advise adjusting or releasing a spring — that is genuinely dangerous.",
    testScenarios:
      "A door will not close and the car is stuck inside; a spring snapped overnight; a customer wants a quote on a new door.",
  },
};

const GENERIC: DemoProfile = {
  city: "",
  services: "the services this business offers",
  qualificationFocus:
    "Find out what the caller needs, how urgent it is, their location, and the best callback number. Ask one question at a time. Never quote prices, promise timing, or claim an appointment is booked.",
  testScenarios:
    "A routine service request; an urgent problem; a caller asking for a quote.",
};

/** Build the profile for a lead, layering its own data over its niche defaults. */
export function getDemoProfile(lead: LeadLike): DemoProfile {
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : "");
  const base = NICHES[str(lead.niche).toLowerCase()] ?? NICHES.electrical ?? GENERIC;
  const location = [str(lead.city), str(lead.state)].filter(Boolean).join(", ");
  const focus = str(lead.focus);
  return {
    ...base,
    city: location || base.city,
    // A lead's own recorded focus is more specific than any trade default.
    services: focus && focus.length > 12 ? focus : base.services,
  };
}
