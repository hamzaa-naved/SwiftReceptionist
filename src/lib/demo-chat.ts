import type { Niche } from "@/content/niches/types";

/**
 * Scripted chat simulation for the demo page — the no-mic fallback.
 * A small state machine that mirrors how the real receptionist triages:
 * greet → classify (emergency vs routine) → collect details → book.
 *
 * Honestly labeled in the UI as a scripted text preview; the voice demo is
 * the real product experience.
 */

export interface ChatMessage {
  speaker: "ai" | "caller";
  text: string;
}

export type ChatStage =
  | "greeting"
  | "classify"
  | "collect_name"
  | "collect_address"
  | "offer_slot"
  | "booked";

export interface ChatState {
  stage: ChatStage;
  isEmergency: boolean;
  callerName: string;
}

const EMERGENCY_WORDS = [
  "emergency", "backup", "backed up", "sewage", "overflow", "flood",
  "stuck", "broken", "broke", "won't open", "wont open", "won't close",
  "wont close", "no water", "leak", "leaking", "down", "fell", "fallen",
  "roof", "alarm", "smell", "locked out", "right now", "asap", "tonight",
];

function looksLikeEmergency(text: string) {
  const t = text.toLowerCase();
  return EMERGENCY_WORDS.some((w) => t.includes(w));
}

function firstWordAsName(text: string) {
  const cleaned = text.replace(/my name is|i'm|im|it's|its|this is/gi, "").trim();
  const word = cleaned.split(/[\s,]+/)[0] ?? "";
  return word.length > 1 && word.length < 20
    ? word[0].toUpperCase() + word.slice(1).replace(/[^a-zA-Z'-]/g, "")
    : "";
}

export function initialState(): ChatState {
  return { stage: "greeting", isEmergency: false, callerName: "" };
}

export function greeting(niche: Niche, bizName: string): string {
  return niche.demoGreeting.replace("{biz}", bizName);
}

/** Advance the conversation one turn. Returns AI reply + next state. */
export function nextTurn(
  state: ChatState,
  userText: string,
  niche: Niche,
): { reply: string; state: ChatState } {
  switch (state.stage) {
    case "greeting":
    case "classify": {
      const isEmergency = looksLikeEmergency(userText);
      return {
        reply: isEmergency
          ? "That sounds urgent — we treat calls like this as a priority. Can I get your first name so I can start a job ticket?"
          : "Absolutely, I can help with that. Can I get your first name to start?",
        state: { ...state, stage: "collect_name", isEmergency },
      };
    }
    case "collect_name": {
      const name = firstWordAsName(userText);
      return {
        reply: name
          ? `Thanks, ${name}. And what's the service address?`
          : "Got it. And what's the service address?",
        state: { ...state, stage: "collect_address", callerName: name },
      };
    }
    case "collect_address": {
      const who = state.callerName ? `, ${state.callerName}` : "";
      return {
        reply: state.isEmergency
          ? `Perfect${who}. I'm flagging this as urgent and notifying the on-call technician now — you'll get a callback within 15 minutes to confirm today's visit. Is this the best number to reach you? (In the real product, this text is an actual phone call, and the owner gets an SMS summary instantly.)`
          : `Thanks${who}. The earliest opening is tomorrow at 9:15am — the technician calls 20 minutes before arriving. Want me to lock that in?`,
        state: { ...state, stage: state.isEmergency ? "booked" : "offer_slot" },
      };
    }
    case "offer_slot": {
      return {
        reply:
          "Done — you're booked for tomorrow at 9:15am. You'll get a text confirmation, and the owner gets a summary of this call with your details. Anything else I can help with?",
        state: { ...state, stage: "booked" },
      };
    }
    case "booked": {
      return {
        reply: `Happy to help. That's the whole point — every call answered, every job captured. When you're ready, the owner of a real ${niche.noun} sets this up once and never misses a call again.`,
        state,
      };
    }
  }
}
