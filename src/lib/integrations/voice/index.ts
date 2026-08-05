import type { VoiceAdapter } from "./types";
import { vapiAdapter } from "./vapi";
import { demoAdapter } from "./demo";

/**
 * Personalised demo links always use demoAdapter, which picks the provider
 * per lead from the call route. NEXT_PUBLIC_VOICE_PROVIDER only still exists
 * for the generic (token-less) Vapi demo.
 */
export function getVoiceAdapter(): VoiceAdapter {
  return process.env.NEXT_PUBLIC_VOICE_PROVIDER === "vapi" ? vapiAdapter : demoAdapter;
}

export * from "./types";
