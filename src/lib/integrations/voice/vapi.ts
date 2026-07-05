import type {
  VoiceAdapter,
  VoiceSessionEvents,
  VoiceStartOptions,
} from "./types";

/**
 * Vapi adapter. Requires:
 *   NEXT_PUBLIC_VAPI_PUBLIC_KEY    — Vapi public (browser) key
 *   NEXT_PUBLIC_VAPI_ASSISTANT_ID  — the demo assistant's ID
 *
 * The SDK is imported dynamically so visitors who never start a voice
 * session download zero Vapi code.
 */

type VapiInstance = {
  start: (
    assistantId: string,
    overrides?: Record<string, unknown>,
  ) => Promise<unknown>;
  stop: () => void;
  on: (event: string, handler: (...args: never[]) => void) => void;
};

const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? "";
const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID ?? "";

let instance: VapiInstance | null = null;
let stopTimer: ReturnType<typeof setTimeout> | null = null;

export const vapiAdapter: VoiceAdapter = {
  providerName: "Vapi",

  isConfigured() {
    return Boolean(publicKey && assistantId);
  },

  async start(options: VoiceStartOptions, events: VoiceSessionEvents) {
    // A retry (or double-click) must never orphan a previous call's
    // listeners, timer, or mic — tear down any existing session first.
    this.stop();

    events.onStateChange("connecting");

    const { default: Vapi } = await import("@vapi-ai/web");
    const vapi = new Vapi(publicKey) as unknown as VapiInstance;
    instance = vapi;

    vapi.on("call-start", () => {
      events.onStateChange("listening");
      // Enforce the per-session duration cap client-side as a backstop;
      // set the same cap on the assistant in the Vapi dashboard.
      stopTimer = setTimeout(() => this.stop(), options.maxDurationSeconds * 1000);
    });
    vapi.on("call-end", () => {
      if (stopTimer) clearTimeout(stopTimer);
      events.onStateChange("ended");
    });
    vapi.on("speech-start", () => events.onStateChange("speaking"));
    vapi.on("speech-end", () => events.onStateChange("listening"));
    vapi.on("error", (...args: unknown[]) => {
      if (stopTimer) clearTimeout(stopTimer);
      const message =
        args[0] instanceof Error ? args[0].message : "Voice session error";
      events.onError?.(message);
      events.onStateChange("error");
    });
    vapi.on("message", (...args: unknown[]) => {
      const msg = args[0] as {
        type?: string;
        transcriptType?: string;
        role?: string;
        transcript?: string;
      };
      if (msg?.type === "transcript" && msg.transcriptType === "final" && msg.transcript) {
        events.onTranscript?.({
          speaker: msg.role === "assistant" ? "ai" : "caller",
          text: msg.transcript,
        });
      }
    });

    await vapi.start(assistantId, {
      variableValues: options.variables,
    });
  },

  stop() {
    if (stopTimer) {
      clearTimeout(stopTimer);
      stopTimer = null;
    }
    instance?.stop();
    instance = null;
  },
};
