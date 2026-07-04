import type { Niche } from "./types";

export const wellPump: Niche = {
  slug: "well-pump",
  name: "Well & Pump Service",
  shortName: "Well & Pump",
  noun: "well service company",
  icon: "waves",

  seo: {
    title: "AI Answering Service for Well & Pump Companies",
    description:
      "No water is a right-now emergency. Swift Receptionist answers every call 24/7, triages no-water calls, and books service while you're at the bottom of a well house.",
  },

  hero: {
    headline: "When their water stops, their patience stops with it.",
    subhead:
      "A family with no water doesn't leave a voicemail — they call every well company within 30 miles until someone answers. Swift Receptionist makes your line the one that picks up, day or night.",
  },

  emergencies: [
    "No water in the house on a Sunday morning",
    "A pressure tank short-cycling and tripping the breaker",
    "A frozen well line in a January cold snap",
    "Sputtering faucets and sediment before a holiday weekend",
  ],

  pains: [
    {
      title: "No-water calls can't wait — and neither will the caller",
      body: "No showers, no dishes, no livestock water. It's one of the few home emergencies where the customer literally cannot ignore the problem. If you don't answer, the next company gets a same-day, full-price job.",
    },
    {
      title: "You work where phones don't",
      body: "Well houses, basements, remote rural properties with one bar of signal. Rural service areas mean long drives between jobs, and every hour on the road is an hour of unanswered calls.",
    },
    {
      title: "Small team, big service area",
      body: "Most well companies are two or three people covering several counties. Nobody's job title is 'answer the phone' — so the phone loses, and so does the schedule.",
    },
  ],

  scriptScenario: "Sunday, 8:05am — no water in the house",
  callScript: [
    { speaker: "ai", text: "Thanks for calling — this line is answered 24 hours. Are you out of water right now, or is this about scheduling service?" },
    { speaker: "caller", text: "We've got nothing. Turned on the tap this morning and it just sputtered and quit." },
    { speaker: "ai", text: "That's a priority call — let's get you looked at today. Can I have your name and the property address?" },
    { speaker: "caller", text: "Tom Weaver, 3310 County Road 12." },
    { speaker: "ai", text: "Thanks, Tom. Two quick checks that help the tech: is the breaker for the well pump still on, and did you hear the pump running at all?" },
    { speaker: "caller", text: "Breaker looks fine. I don't hear anything from the well house." },
    { speaker: "ai", text: "That's useful — sounds like it could be the pump or the pressure switch, and the tech will come ready for both. I have an emergency slot late this morning; he'll call 30 minutes out. Does that work?" },
    { speaker: "caller", text: "That works. Glad somebody answered on a Sunday." },
  ],

  jobValue: { low: 400, high: 2500, label: "pump replacement" },

  roiDefaults: {
    missedCallsPerWeek: 5,
    avgJobValue: 800,
    closeRatePct: 60,
  },

  faq: [
    {
      q: "Can it walk callers through basic checks?",
      a: "Yes — the simple, safe ones you approve, like checking the breaker or listening for the pump. That saves the tech a blind trip and makes your company look sharp before anyone rolls a truck.",
    },
    {
      q: "My service area is huge. Can it screen by location?",
      a: "Yes. It knows your coverage area, politely declines out-of-area calls (or refers them wherever you choose), and captures the address up front so you never drive toward a job you'd have turned down.",
    },
    {
      q: "We're a two-person shop. Is this overkill?",
      a: "It's the opposite — it's how a two-person shop answers like a five-person office. You keep drilling and repairing; every call still gets answered, triaged, and booked.",
    },
    {
      q: "What about water-quality and new-well inquiries?",
      a: "It gathers the details — property, water source, symptoms, timeline — and books a consultation or passes you a qualified lead. Long-cycle jobs start with a captured call too.",
    },
  ],

  demoGreeting:
    "Thanks for calling {biz} — we answer around the clock. Are you out of water right now, or calling about service or a new well?",

  homeHook:
    "A no-water Sunday is a same-day, full-price job — for whoever picks up the phone.",
};
