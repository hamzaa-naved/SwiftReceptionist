import type { VoiceAdapter } from "./types";

/**
 * Retell adapter — intentionally unimplemented stub.
 *
 * To switch the demo to Retell:
 * 1. `npm install retell-client-js-sdk`
 * 2. Implement start()/stop() below mirroring vapi.ts (dynamic import,
 *    state events, transcript events, duration cap)
 * 3. Set NEXT_PUBLIC_VOICE_PROVIDER=retell plus the Retell env vars
 *
 * Until then isConfigured() returns false, so the demo UI shows the chat
 * fallback rather than a broken mic button.
 */
export const retellAdapter: VoiceAdapter = {
  providerName: "Retell",

  isConfigured() {
    return false;
  },

  async start() {
    throw new Error("Retell adapter not implemented yet — see src/lib/integrations/voice/retell.ts");
  },

  stop() {},
};
