/**
 * Voice-demo provider abstraction. The demo UI only talks to this
 * interface; swapping Vapi for Retell (or anything else) means writing one
 * adapter file and setting NEXT_PUBLIC_VOICE_PROVIDER — zero UI changes.
 */

export type VoiceSessionState =
  | "idle"
  | "connecting"
  | "listening" // caller can speak
  | "speaking" // assistant is speaking
  | "ended"
  | "error";

export interface VoiceSessionEvents {
  onStateChange: (state: VoiceSessionState) => void;
  /** Rolling transcript lines, if the provider surfaces them */
  onTranscript?: (line: { speaker: "ai" | "caller"; text: string }) => void;
  onError?: (message: string) => void;
}

export interface VoiceStartOptions {
  /** Personalization forwarded to the assistant (biz/city/niche) */
  variables: Record<string, string>;
  /** Hard cap on session length, seconds (enforced by the adapter) */
  maxDurationSeconds: number;
}

export interface VoiceAdapter {
  readonly providerName: string;
  /** False when required env vars are missing — UI falls back to chat */
  isConfigured(): boolean;
  start(options: VoiceStartOptions, events: VoiceSessionEvents): Promise<void>;
  stop(): void;
}
