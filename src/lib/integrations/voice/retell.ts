import type { VoiceAdapter, VoiceSessionEvents, VoiceStartOptions } from "./types";

type RetellInstance = {
  startCall: (config: { accessToken: string }) => Promise<void>;
  stopCall: () => void;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
};

let instance: RetellInstance | null = null;
let stopTimer: ReturnType<typeof setTimeout> | null = null;

export const retellAdapter: VoiceAdapter = {
  providerName: "Retell",

  isConfigured() {
    return process.env.NEXT_PUBLIC_VOICE_PROVIDER === "retell";
  },

  async start(options: VoiceStartOptions, events: VoiceSessionEvents) {
    const demoToken = options.variables.demoToken;
    if (!demoToken) throw new Error("Open a personalized demo link to start the Retell voice call.");
    this.stop();
    events.onStateChange("connecting");
    const response = await fetch(`/api/demo/${encodeURIComponent(demoToken)}/call`, { method: "POST" });
    const body = (await response.json()) as { accessToken?: string; error?: string };
    if (!response.ok || !body.accessToken) throw new Error(body.error ?? "Couldn't start the voice demo.");
    const { RetellWebClient } = await import("retell-client-js-sdk");
    const client = new RetellWebClient() as unknown as RetellInstance;
    instance = client;
    client.on("call_ready", () => events.onStateChange("listening"));
    client.on("call_started", () => { stopTimer = setTimeout(() => this.stop(), options.maxDurationSeconds * 1000); });
    client.on("agent_start_talking", () => events.onStateChange("speaking"));
    client.on("agent_stop_talking", () => events.onStateChange("listening"));
    client.on("call_ended", () => {
      if (stopTimer) clearTimeout(stopTimer);
      stopTimer = null;
      events.onStateChange("ended");
    });
    client.on("error", (message: unknown) => {
      events.onError?.(typeof message === "string" ? message : "Voice session error");
      events.onStateChange("error");
    });
    await client.startCall({ accessToken: body.accessToken });
  },

  stop() {
    if (stopTimer) clearTimeout(stopTimer);
    stopTimer = null;
    instance?.stopCall();
    instance = null;
  },
};
