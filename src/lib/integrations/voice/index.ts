import type { VoiceAdapter } from "./types";
import { vapiAdapter } from "./vapi";
import { retellAdapter } from "./retell";

const provider = process.env.NEXT_PUBLIC_VOICE_PROVIDER ?? "vapi";

export function getVoiceAdapter(): VoiceAdapter {
  switch (provider) {
    case "retell":
      return retellAdapter;
    case "vapi":
    default:
      return vapiAdapter;
  }
}

export * from "./types";
