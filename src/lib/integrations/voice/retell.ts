import type { VoiceSessionEvents, VoiceStartOptions } from "./types";

type RetellInstance = {
  startCall: (config: { accessToken: string }) => Promise<void>;
  stopCall: () => void;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
};

let instance: RetellInstance | null = null;
let stopTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Connects a Retell web call from a payload the demo route already fetched.
 * The fetch lives in demo.ts so a single request can decide the provider.
 */
export async function connectRetell(
  payload: { accessToken?: string },
  options: VoiceStartOptions,
  events: VoiceSessionEvents,
) {
  if (!payload.accessToken) throw new Error("Couldn't start the voice demo.");
  stopRetell();

  const { RetellWebClient } = await import("retell-client-js-sdk");
  const client = new RetellWebClient() as unknown as RetellInstance;
  instance = client;

  client.on("call_ready", () => events.onStateChange("listening"));
  client.on("call_started", () => {
    stopTimer = setTimeout(() => stopRetell(), options.maxDurationSeconds * 1000);
  });
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

  await client.startCall({ accessToken: payload.accessToken });
}

export function stopRetell() {
  if (stopTimer) clearTimeout(stopTimer);
  stopTimer = null;
  instance?.stopCall();
  instance = null;
}
