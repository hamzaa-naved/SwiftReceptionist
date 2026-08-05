import type { VoiceSessionEvents, VoiceStartOptions } from "./types";

/**
 * ElevenLabs Conversational AI.
 *
 * Differs from Retell in one important way: the server mints a short-lived
 * signed URL rather than an access token, so the API key never reaches the
 * browser. The fetch lives in demo.ts — see connectRetell for the mirror.
 */

type Session = { endSession: () => Promise<void> };

let session: Session | null = null;
let stopTimer: ReturnType<typeof setTimeout> | null = null;

export async function connectElevenLabs(
  payload: { signedUrl?: string; dynamicVariables?: Record<string, string> },
  options: VoiceStartOptions,
  events: VoiceSessionEvents,
) {
  if (!payload.signedUrl) throw new Error("Couldn't start the voice demo.");
  stopElevenLabs();

  const { Conversation } = await import("@elevenlabs/client");
  session = (await Conversation.startSession({
    signedUrl: payload.signedUrl,
    dynamicVariables: payload.dynamicVariables ?? {},
    onStatusChange: ({ status }: { status: string }) => {
      if (status === "connected") events.onStateChange("listening");
      if (status === "disconnected") {
        if (stopTimer) clearTimeout(stopTimer);
        stopTimer = null;
        events.onStateChange("ended");
      }
    },
    onModeChange: ({ mode }: { mode: string }) =>
      events.onStateChange(mode === "speaking" ? "speaking" : "listening"),
    onMessage: ({ message, source }: { message: string; source: string }) =>
      events.onTranscript?.({ speaker: source === "ai" ? "ai" : "caller", text: message }),
    onError: (message: unknown) => {
      events.onError?.(typeof message === "string" ? message : "Voice session error");
      events.onStateChange("error");
    },
  })) as unknown as Session;

  // Hard cap, same as Retell — these links are public and long-lived.
  stopTimer = setTimeout(() => stopElevenLabs(), options.maxDurationSeconds * 1000);
}

export function stopElevenLabs() {
  if (stopTimer) clearTimeout(stopTimer);
  stopTimer = null;
  void session?.endSession();
  session = null;
}
