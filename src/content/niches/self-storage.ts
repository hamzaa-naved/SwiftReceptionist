import type { Niche } from "./types";

export const selfStorage: Niche = {
  slug: "self-storage",
  name: "Self-Storage Facilities",
  shortName: "Self-Storage",
  icon: "warehouse",
  noun: "storage facility",

  seo: {
    title: "AI Answering Service for Self-Storage Facilities",
    description:
      "Every unanswered rental inquiry is a move-in your competitor gets. Swift Receptionist answers 24/7, quotes unit availability, and captures reservations — without staffing the office.",
  },

  hero: {
    headline: "Renters call once. Then they rent from someone else.",
    subhead:
      "A storage inquiry is a today decision — people call while the moving truck is being booked. Swift Receptionist answers every call, quotes your units, and captures the reservation while your competitors' phones ring out.",
  },

  emergencies: [
    "A renter locked out of their unit after office hours",
    "A gate code that stopped working on moving day",
    "A last-minute 'do you have a 10x20 available this weekend?' call",
    "A tenant calling about a payment before the lien clock starts",
  ],

  pains: [
    {
      title: "The office closes; the inquiries don't",
      body: "Evenings and weekends are when people plan moves — and when single-manager facilities go dark. Each missed inquiry isn't one lost payment; it's a tenant worth a year or more of rent choosing the facility that answered.",
    },
    {
      title: "One manager can't be at the gate and on the phone",
      body: "Walk-in, gate issue, unit walkthrough — the phone rings during all of it. Renters who hit voicemail rarely call back; the next facility on the list picks up instead.",
    },
    {
      title: "Kiosks and websites don't handle people",
      body: "Plenty of renters — especially older ones and business tenants — want to talk to someone before they commit. A phone call is still how a large share of units get rented. Answer it, win it.",
    },
  ],

  scriptScenario: "Weekday, 7:30pm — 10x20 needed for a weekend move",
  callScript: [
    { speaker: "ai", text: "Thanks for calling — we're available 24/7. Are you looking to rent a unit, or is this about an existing rental?" },
    { speaker: "caller", text: "I need something big enough for a three-bedroom house, this Saturday if possible." },
    { speaker: "ai", text: "A three-bedroom usually fits comfortably in a 10x20. We have those available, and drive-up access makes a truck unload much easier. Would climate control matter for anything you're storing?" },
    { speaker: "caller", text: "No, it's mostly furniture. What does the 10x20 run?" },
    { speaker: "ai", text: "The drive-up 10x20 is $189 a month, month-to-month, no long-term contract. I can reserve one for Saturday right now with just your name and number — no payment needed until you move in. Want me to hold it?" },
    { speaker: "caller", text: "Yeah, let's do that. It's Priya, 555-0142." },
    { speaker: "ai", text: "Done, Priya — your 10x20 is held for Saturday. You'll get a text confirmation with the address and office hours. Anything else I can help with?" },
  ],

  jobValue: { low: 900, high: 2400, label: "tenant-year of rent" },

  roiDefaults: {
    missedCallsPerWeek: 6,
    avgJobValue: 1200,
    closeRatePct: 40,
  },

  faq: [
    {
      q: "Can it quote real availability and prices?",
      a: "It works from the unit types, prices, and promotions you configure, and can connect to common storage management software during setup. What it quotes is always your data, never a guess.",
    },
    {
      q: "Can it handle existing tenants, not just sales calls?",
      a: "Yes — gate issues, hours, payment questions, and lockouts get answered or routed by your rules, so the sales line isn't clogged and after-hours tenant calls stop landing on your cell.",
    },
    {
      q: "We're an unmanned/remote facility. Does this fit?",
      a: "It's arguably the missing piece: remote facilities save on staff but lose the phone. This gives you a 24/7 'office voice' for a fraction of one shift's wages.",
    },
    {
      q: "How is this different from the big storage call centers?",
      a: "No per-call pricing, no hold queue, no offshore script-readers. It answers instantly, every time, sounds like your facility, and costs a flat monthly rate you can cancel anytime.",
    },
  ],

  demoGreeting:
    "Thanks for calling {biz} — we're available around the clock. Are you looking for a storage unit, or calling about an existing rental?",

  homeHook:
    "A missed inquiry isn't one payment — it's a year of rent renting elsewhere.",
};
