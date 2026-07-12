import type { Niche } from "./types";

export const electrical: Niche = {
  slug: "electrical",
  name: "Electrical Contractors",
  shortName: "Electrical",
  noun: "electrical contractor",
  icon: "zap",

  seo: {
    title: "AI Answering Service for Electrical Contractors",
    description:
      "When half the house goes dark, homeowners call down the list until someone answers. Swift Receptionist picks up every call 24/7, books the job, and flags real electrical emergencies to your phone.",
  },

  hero: {
    headline: "You can't answer the phone from inside a panel.",
    subhead:
      "A homeowner with a burning smell at the breaker box calls electricians until one picks up — and books the first who does. Swift Receptionist makes sure that's you, day or night, without hiring anyone.",
  },

  emergencies: [
    "Half the house went dark and the main breaker won't reset",
    "A burning smell coming from the panel at 9pm",
    "An outlet sparking with kids in the house",
    "A homeowner ready to book an EV charger or panel upgrade quote",
  ],

  pains: [
    {
      title: "Your hands are in live work when the money calls",
      body: "You're in a panel, in an attic, on a lift. Callers with a right-now electrical problem don't leave voicemails — they call the next contractor on the list, and that service call is gone in minutes.",
    },
    {
      title: "The scary calls come after hours, and they pay the most",
      body: "Sparking outlets, dead circuits before a work-from-home Monday, a panel that trips every time the dryer runs. After-hours callers are frightened, motivated, and price-tolerant — if a voice answers.",
    },
    {
      title: "Big-ticket leads slip away quietly",
      body: "Panel upgrades, EV chargers, rewires — long-cycle jobs worth thousands start with one phone call. When it rings out, you don't just lose a service call; you lose the customer's whole electrical future.",
    },
  ],

  scriptScenario: "Tuesday, 9:12pm — burning smell at the breaker panel",
  callScript: [
    { speaker: "ai", text: "Thanks for calling — this line is answered 24 hours. Is this an electrical emergency, or are you looking to schedule work or get a quote?" },
    { speaker: "caller", text: "I think it's an emergency. There's a hot, burning kind of smell near our breaker box and one room just lost power." },
    { speaker: "ai", text: "You did the right thing calling. A burning smell at the panel is treated as urgent — please don't keep resetting breakers, and if you see smoke or flame, call 911 first. Can I get your name and address?" },
    { speaker: "caller", text: "Dana Whitfield, 47 Maple Crest Drive." },
    { speaker: "ai", text: "Thanks, Dana. Is the smell still noticeable right now, and do you know roughly how old the home's panel is?" },
    { speaker: "caller", text: "It's faint but it's there. The house is from the nineties — I think the panel is original." },
    { speaker: "ai", text: "Understood. I'm flagging this urgent and alerting the on-call electrician now — you'll get a callback within 15 minutes to confirm tonight's visit. Until then, keep that circuit off. Is this the best number for the callback?" },
    { speaker: "caller", text: "Yes, this one. Thank you — you're the first company that actually picked up." },
  ],

  jobValue: { low: 200, high: 600, label: "emergency service call" },

  roiDefaults: {
    missedCallsPerWeek: 9,
    avgJobValue: 450,
    closeRatePct: 55,
  },

  faq: [
    {
      q: "Does it know electrical work, or is it a generic bot?",
      a: "It's set up for your trade before it ever takes a call: panels, breakers, dead circuits, sparking outlets, EV chargers, permit questions. It asks the questions your best dispatcher would ask and treats safety language — burning, sparking, smoke — as urgent by default.",
    },
    {
      q: "Can it tell an emergency from a quote request?",
      a: "Yes, and that's the core of the setup. Safety-critical calls escalate to your on-call phone immediately with the details already collected. Quote requests — panel upgrades, EV chargers, remodels — get captured with the specifics you need and booked as estimates.",
    },
    {
      q: "Will it give out prices?",
      a: "Only the ranges you approve, the way your best phone person would ('service calls typically start at $X, and the electrician confirms on site'). It never invents a number, and it never quotes work that has to be seen first.",
    },
    {
      q: "I'm a one- or two-truck shop. Is this overkill?",
      a: "It's the opposite — it's how a two-electrician shop answers like it has a front office. You stay in the panel; every call still gets answered in seconds, triaged, and booked, and you get a text summary the moment it ends.",
    },
  ],

  demoGreeting:
    "Thanks for calling {biz} — this line is answered 24 hours a day. Is this an electrical emergency, or are you looking to schedule work or get a quote?",

  homeHook:
    "A burning smell at the panel at 9pm is booked by whoever answers. Every call, even mid-job.",
};
