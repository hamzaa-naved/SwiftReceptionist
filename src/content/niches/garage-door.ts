import type { Niche } from "./types";

export const garageDoor: Niche = {
  slug: "garage-door",
  name: "Garage Door Repair",
  shortName: "Garage Door",
  noun: "garage door company",
  icon: "wrench",

  seo: {
    title: "AI Answering Service for Garage Door Companies",
    description:
      "A stuck door is an emergency, and the first company to answer wins the job. Swift Receptionist picks up every call 24/7, books repairs, and dispatches emergencies while you're on a ladder.",
  },

  hero: {
    headline: "The 6:45 AM spring call? Answered.",
    subhead:
      "A homeowner with a car trapped behind a broken door calls down the Google results until someone picks up. Swift Receptionist makes sure your number is where the calling stops.",
  },

  emergencies: [
    "A snapped torsion spring with a car trapped inside before work",
    "A door stuck open at night — the house feels unsecured",
    "An opener that died with a customer already late",
    "A car or mower that backed into the door on a weekend",
  ],

  pains: [
    {
      title: "You're on a ladder when the money calls",
      body: "Spring replacements and opener installs get booked by whoever answers first. If you're mid-repair and the call rings out, the caller doesn't wait — they're already talking to the next company on the list.",
    },
    {
      title: "After-hours calls are the highest-intent calls",
      body: "A door that won't close at 10pm is a security problem; a door that won't open at 6:45am is a get-to-work problem. Those callers buy fast and pay for urgency — if anyone answers.",
    },
    {
      title: "Voicemail converts at roughly zero",
      body: "Most people won't leave a message for an emergency repair, and of those who do, many have booked elsewhere by the time you call back. The missed call isn't a delayed job — it's usually a lost one.",
    },
  ],

  scriptScenario: "Tuesday, 6:52am — car trapped behind a broken spring",
  callScript: [
    { speaker: "ai", text: "Good morning, thanks for calling. Is your door stuck, or is this about scheduling a repair or a new door?" },
    { speaker: "caller", text: "It's stuck. I heard a bang last night and now the door won't open — my car's inside and I need to leave for work." },
    { speaker: "ai", text: "That bang was most likely a broken spring, and you shouldn't force the door — they're under a lot of tension. Can I grab your name and address so we can get a tech out this morning?" },
    { speaker: "caller", text: "Dana Ruiz, 88 Landing Court." },
    { speaker: "ai", text: "Thanks, Dana. Is it a single or double door, and roughly how old?" },
    { speaker: "caller", text: "Double, maybe ten years old." },
    { speaker: "ai", text: "Got it. The earliest slot is 8:15 this morning — the tech will call when he's 20 minutes out. Spring replacements are usually done in under an hour. Should I lock that in?" },
    { speaker: "caller", text: "Yes, please. 8:15 works." },
  ],

  jobValue: { low: 250, high: 700, label: "spring replacement" },

  roiDefaults: {
    missedCallsPerWeek: 10,
    avgJobValue: 400,
    closeRatePct: 65,
  },

  faq: [
    {
      q: "Can it actually diagnose garage door problems?",
      a: "It doesn't need to fix the door — it needs to book the call. It's trained on the situations that matter (broken spring, off-track, dead opener, stuck open/closed), asks the questions your CSR would ask, and flags safety issues like a door stuck open at night as urgent.",
    },
    {
      q: "We already use a lead service. Why this?",
      a: "Lead services sell you shared leads you pay to chase. This answers the calls your own marketing already generates — the highest-intent, exclusive leads you're currently sending to voicemail.",
    },
    {
      q: "Can it book straight into my calendar or CRM?",
      a: "Yes. We connect it to your scheduling system during setup, with your service area, hours, and buffer rules. If you dispatch manually, it can text you the job details instead.",
    },
    {
      q: "What if the caller just wants a price?",
      a: "It gives the ranges you approve ('spring replacements typically run $X–$Y depending on the door') and pivots to booking the free assessment — the same way your best phone person would.",
    },
  ],

  demoGreeting:
    "Thanks for calling {biz} — we answer 24/7. Is your door stuck right now, or are you looking to schedule a repair or get a quote?",

  homeHook:
    "A broken spring at 6:45am is bought by whoever answers first. Be first, every time.",
};
