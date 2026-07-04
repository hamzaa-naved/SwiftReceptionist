import type { Niche } from "./types";

export const treeService: Niche = {
  slug: "tree-service",
  name: "Tree Service",
  shortName: "Tree Service",
  noun: "tree service company",
  icon: "tree-pine",

  seo: {
    title: "AI Answering Service for Tree Service Companies",
    description:
      "You can't hear the phone over a chainsaw. Swift Receptionist answers every call 24/7, books estimates, and catches storm-damage emergencies while your crew is in the canopy.",
  },

  hero: {
    headline: "Nobody hears the phone over a chainsaw.",
    subhead:
      "When a storm drops a limb on a roof, every tree company's phone rings at once — and the jobs go to the ones that answer. Swift Receptionist books your estimates and flags true emergencies while you and the crew are working.",
  },

  emergencies: [
    "A tree down on a roof or car after an overnight storm",
    "A cracked limb hanging over a kid's play area",
    "A leaning tree after saturated-ground winds",
    "Storm cleanup calls flooding in faster than anyone can answer",
  ],

  pains: [
    {
      title: "Storm days flood the line — and you're up a tree",
      body: "The exact moment demand spikes is the moment your whole crew is unreachable. Every unanswered ring during a storm window is premium emergency work going to the next name on the list.",
    },
    {
      title: "Estimate requests slip through the cracks",
      body: "Most tree work starts with 'can you come take a look?' If that call hits voicemail, the homeowner keeps dialing. Booking the estimate visit is the whole game — and it's the easiest thing to miss.",
    },
    {
      title: "Seasonal chaos, year-round overhead",
      body: "Hiring office help for storm season means paying for it in February. An AI receptionist scales to a hundred calls on storm day and costs the same in the quiet months.",
    },
  ],

  scriptScenario: "Sunday, 7:15am — limb through a roof after overnight storms",
  callScript: [
    { speaker: "ai", text: "Thanks for calling — we answer around the clock. Is this storm damage or an emergency, or are you looking for an estimate?" },
    { speaker: "caller", text: "A big limb came down on our roof overnight. There's a branch actually through the shingles." },
    { speaker: "ai", text: "I'm sorry — that's exactly the kind of call we prioritize. Is anyone in danger, and is the limb still attached to the tree?" },
    { speaker: "caller", text: "Everyone's fine. Half of it is still hanging up there, that's what worries me." },
    { speaker: "ai", text: "Understood — a hanging limb is the dangerous part, so please keep everyone away from that side of the house. Can I get your name and address? I'm flagging this for the emergency crew now." },
    { speaker: "caller", text: "Sarah Bell, 1420 Old Mill Road." },
    { speaker: "ai", text: "Thanks, Sarah. The crew lead will call you within 20 minutes with an arrival window this morning. He'll also walk you through photos for your insurance claim. Is this number the best callback?" },
    { speaker: "caller", text: "Yes — thank you so much for picking up." },
  ],

  jobValue: { low: 500, high: 3000, label: "removal job" },

  roiDefaults: {
    missedCallsPerWeek: 8,
    avgJobValue: 900,
    closeRatePct: 50,
  },

  faq: [
    {
      q: "Can it give quotes over the phone?",
      a: "It doesn't guess prices — tree work has to be seen. It books the estimate visit, which is what your best office person would do, and it can share the honest ranges you approve for common jobs.",
    },
    {
      q: "What happens during a storm surge — 40 calls in an hour?",
      a: "It answers all of them, at the same time. No busy signal, no queue. Emergencies get flagged and texted to you ranked by severity; routine estimates get booked into the following days.",
    },
    {
      q: "Can it tell an emergency from a 'someday' trim job?",
      a: "Yes. Anything involving a structure, a vehicle, a hanging limb, or a leaning trunk is treated as urgent. A 'thinking about trimming the maple' call books as a standard estimate.",
    },
    {
      q: "My customers are older and hate robots.",
      a: "It speaks plainly, doesn't rush, and repeats details back. And unlike voicemail — which is what they get today when you're in the canopy — it actually helps them. Try the demo and judge with your own ears.",
    },
  ],

  demoGreeting:
    "Thanks for calling {biz} — we answer 24/7. Is this storm damage or an emergency, or would you like to set up a free estimate?",

  homeHook:
    "Storm day is payday — if someone answers. Every call, even when the whole crew is in the canopy.",
};
