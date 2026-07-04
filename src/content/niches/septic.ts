import type { Niche } from "./types";

export const septic: Niche = {
  slug: "septic",
  name: "Septic & Porta-Potty Services",
  shortName: "Septic",
  noun: "septic company",
  icon: "droplets",

  seo: {
    title: "AI Answering Service for Septic & Porta-Potty Companies",
    description:
      "Septic backups don't wait for business hours. Swift Receptionist answers every call 24/7, separates emergencies from routine pumping, and books the job before the caller dials your competitor.",
  },

  hero: {
    headline: "You can't answer the phone with both hands on a hose.",
    subhead:
      "When a homeowner has sewage backing into their house, they call down the list until someone picks up. Swift Receptionist makes sure that someone is you — 24 hours a day, without hiring anyone.",
  },

  emergencies: [
    "Sewage backing up into a bathtub at 9pm on a Saturday",
    "Septic alarm going off the night before a family gathering",
    "A tank that needs an emergency pump-out before a home inspection closes",
    "An event organizer who needs porta-potties delivered by Friday",
  ],

  pains: [
    {
      title: "You're elbow-deep when the phone rings",
      body: "Pumping a tank, driving the vacuum truck, crawling a drain field — none of it pairs well with answering calls. But a septic emergency caller won't leave a voicemail. They call the next company on Google, and that job is gone in under three minutes.",
    },
    {
      title: "Emergencies happen after hours, on purpose",
      body: "Backups follow heavy use: weekends, holidays, evenings with a full house. That's exactly when you're off the clock — and exactly when the highest-margin emergency calls come in.",
    },
    {
      title: "An answering service that doesn't know septic wastes everyone's time",
      body: "Generic call centers take a name and number. They can't tell a full-tank pump-out from a collapsed line, can't quote a porta-potty rental window, and can't flag the callers you'd drop everything for.",
    },
  ],

  scriptScenario: "Saturday, 9:40pm — after-hours septic backup",
  callScript: [
    { speaker: "ai", text: "Thanks for calling — this is the 24-hour line. Are you dealing with a backup or an emergency right now?" },
    { speaker: "caller", text: "Yeah — there's sewage coming up in my downstairs shower. It smells terrible." },
    { speaker: "ai", text: "That's an emergency and we treat it like one. Can I get your name and the property address?" },
    { speaker: "caller", text: "Mike Harmon, 214 Cedar Ridge Road." },
    { speaker: "ai", text: "Thanks, Mike. Is the property on a septic tank, and do you know roughly when it was last pumped?" },
    { speaker: "caller", text: "It's septic. Honestly, maybe four or five years ago?" },
    { speaker: "ai", text: "Got it. I'm marking this urgent and texting the on-call technician now. You'll get a call back within 15 minutes to confirm tonight's visit. In the meantime, avoid running water in the house. Is this the best number to reach you?" },
    { speaker: "caller", text: "Yes, this number. Thank you — you're the first ones who actually picked up." },
  ],

  jobValue: { low: 350, high: 800, label: "emergency pump-out" },

  roiDefaults: {
    missedCallsPerWeek: 7,
    avgJobValue: 450,
    closeRatePct: 60,
  },

  faq: [
    {
      q: "Can it tell a real emergency from a routine pump-out?",
      a: "Yes — that's the core of how we set it up for septic. It listens for backup, overflow, alarm, and smell language, treats those calls as urgent, alerts your on-call number immediately, and books everything else as routine scheduling.",
    },
    {
      q: "What about porta-potty rentals and events?",
      a: "It captures unit counts, dates, delivery location, and event type, then either books it against your availability rules or packages the details for you to quote. No more 'they never called back' rentals going to a competitor.",
    },
    {
      q: "I work alone. What happens when I'm in a tank?",
      a: "Exactly what should: the call gets answered on the second ring, the job gets booked or triaged, and you get a text summary. You check your phone when your hands are free — the customer never knew you were unavailable.",
    },
    {
      q: "Will callers hang up on an AI?",
      a: "Some callers can tell, most don't care — they care that someone picked up at 9pm and took their problem seriously. You can listen to real calls in your dashboard and judge for yourself, or try the live demo right now.",
    },
  ],

  demoGreeting:
    "Thanks for calling {biz} — this line is answered 24 hours a day. Are you calling about a backup or emergency, a pump-out, or a porta-potty rental?",

  homeHook:
    "Backups happen at 9pm on Saturdays. Your receptionist should be awake for them.",
};
