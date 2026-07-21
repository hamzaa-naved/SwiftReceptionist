import type {
  VoiceAdapter,
  VoiceSessionEvents,
  VoiceStartOptions,
} from "./types";

type RetellWebClientInstance = {
  startCall: (options: { accessToken: string }) => Promise<void>;
  stopCall: () => void;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
};

type CreateWebCallResponse = { access_token?: string; error?: string };

let instance: RetellWebClientInstance | null = null;
let stopTimer: ReturnType<typeof setTimeout> | null = null;

export const retellAdapter: VoiceAdapter = {
  providerName: "Retell",

  isConfigured() {
    // The Retell credential is only read by the server endpoint.
    return true;
  },

  async start(options: VoiceStartOptions, events: VoiceSessionEvents) {
    this.stop();
    events.onStateChange("connecting");

    const response = await fetch("/api/retell-web-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variables: options.variables }),
    });
    const payload = (await response.json().catch(() => ({}))) as CreateWebCallResponse;
    if (!response.ok || !payload.access_token) {
      throw new Error(payload.error ?? "Couldn't connect the receptionist.");
    }

    const { RetellWebClient } = await import("retell-client-js-sdk");
    const client = new RetellWebClient() as unknown as RetellWebClientInstance;
    instance = client;

    client.on("call_started", () => {
      events.onStateChange("listening");
      stopTimer = setTimeout(() => this.stop(), options.maxDurationSeconds * 1000);
    });
    client.on("call_ended", () => {
      if (stopTimer) clearTimeout(stopTimer);
      stopTimer = null;
      events.onStateChange("ended");
    });
    client.on("agent_start_talking", () => events.onStateChange("speaking"));
    client.on("agent_stop_talking", () => events.onStateChange("listening"));
    client.on("error", (...args: unknown[]) => {
      if (stopTimer) clearTimeout(stopTimer);
      stopTimer = null;
      const message = args[0] instanceof Error ? args[0].message : "Voice session error";
      events.onError?.(message);
      events.onStateChange("error");
    });

    await client.startCall({ accessToken: payload.access_token });
  },

  stop() {
    if (stopTimer) clearTimeout(stopTimer);
    stopTimer = null;
    instance?.stopCall();
    instance = null;
  },
};
