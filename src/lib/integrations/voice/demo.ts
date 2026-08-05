import type { VoiceAdapter, VoiceSessionEvents, VoiceStartOptions } from "./types";
import { connectRetell, stopRetell } from "./retell";
import { connectElevenLabs, stopElevenLabs } from "./elevenlabs";

/**
 * The adapter every personalised demo link uses.
 *
 * Provider is a property of the lead, not of the deployment: one prospect's
 * agent may live on Retell while the next is on ElevenLabs. So the call route
 * decides, and this dispatches on what it returns. A global env var can't
 * express that, which is why it isn't used here.
 */
export const demoAdapter: VoiceAdapter = {
  providerName: "Swift Receptionist",

  isConfigured() {
    return true;
  },

  async start(options: VoiceStartOptions, events: VoiceSessionEvents) {
    const demoToken = options.variables.demoToken;
    if (!demoToken) throw new Error("Open a personalized demo link to start the voice call.");

    this.stop();
    events.onStateChange("connecting");

    const response = await fetch(`/api/demo/${encodeURIComponent(demoToken)}/call`, {
      method: "POST",
    });
    const body = (await response.json()) as {
      provider?: string;
      accessToken?: string;
      signedUrl?: string;
      dynamicVariables?: Record<string, string>;
      error?: string;
    };
    if (!response.ok) throw new Error(body.error ?? "Couldn't start the voice demo.");

    if (body.provider === "elevenlabs") {
      await connectElevenLabs(body, options, events);
    } else {
      await connectRetell(body, options, events);
    }
  },

  stop() {
    stopRetell();
    stopElevenLabs();
  },
};
