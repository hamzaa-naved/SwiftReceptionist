"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Mic, PhoneOff } from "lucide-react";
import { getNiche, niches } from "@/content/niches";
import { getVoiceAdapter, type VoiceSessionState } from "@/lib/integrations/voice";
import {
  DEMO_MAX_DURATION_SECONDS,
  recordSession,
  sessionsRemaining,
} from "@/lib/demo-limits";
import { track } from "@/lib/integrations/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function sanitizeParam(value: string | null, max = 40): string {
  if (!value) return "";
  return value.replace(/[<>{}[\]\\]/g, "").trim().slice(0, max);
}

export function DemoExperience() {
  const params = useSearchParams();
  const biz = sanitizeParam(params.get("biz")) || "your business";
  const city = sanitizeParam(params.get("city"), 30);
  const niche = getNiche(params.get("niche") ?? "") ?? niches[0];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="text-center">
        <p className="eyebrow mb-6 inline-flex text-azure-600">
          Live demo · {niche.name}
        </p>
        <h1 className="font-display text-balance text-4xl font-light leading-[1.02] text-carbon-950 sm:text-6xl">
          This is who&apos;d answer the phone at{" "}
          <span className="italic text-azure-600">{biz}</span>
          {city ? ` in ${city}` : ""}.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-carbon-600">
          Call it like a customer would. Interrupt it. Test it. It&apos;s not a recording.
        </p>
      </div>
      <div className="mt-10">
        <VoicePanel bizName={biz} nicheSlug={niche.slug} city={city} />
      </div>
    </div>
  );
}

function VoicePanel({
  bizName,
  nicheSlug,
  city,
}: {
  bizName: string;
  nicheSlug: string;
  city: string;
}) {
  const adapter = getVoiceAdapter();
  const [state, setState] = useState<VoiceSessionState>("idle");
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(() => sessionsRemaining());

  useEffect(() => {
    return () => adapter.stop();
    // The adapter is a module singleton; this effect should run once per page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!adapter.isConfigured()) {
    return (
      <Card>
        <div className="p-8 text-center">
          <Mic className="mx-auto mb-4 h-8 w-8 text-carbon-400" strokeWidth={1.5} aria-hidden />
          <h2 className="font-display text-2xl font-medium text-carbon-950">The voice line is being connected</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-carbon-600">
            The live voice demo isn&apos;t configured on this deployment yet. Please try again shortly.
          </p>
        </div>
      </Card>
    );
  }

  const busy = state === "connecting" || state === "listening" || state === "speaking";
  const outOfSessions = (remaining ?? 1) <= 0 && !busy;

  const start = async () => {
    setError("");
    recordSession();
    setRemaining(sessionsRemaining());
    track("demo_voice_started", { niche: nicheSlug });
    try {
      await adapter.start(
        {
          variables: { businessName: bizName, city, niche: nicheSlug },
          maxDurationSeconds: DEMO_MAX_DURATION_SECONDS,
        },
        {
          onStateChange: (nextState) => {
            setState(nextState);
            if (nextState === "ended") track("demo_voice_ended", { niche: nicheSlug });
          },
          onError: setError,
        },
      );
    } catch (caught) {
      setState("error");
      setError(caught instanceof Error ? caught.message : "Couldn't start the call.");
    }
  };

  return (
    <Card>
      <div className="flex flex-col items-center p-8">
        {outOfSessions ? (
          <div className="text-center">
            <AlertCircle className="mx-auto mb-3 h-7 w-7 text-azure-600" strokeWidth={1.5} aria-hidden />
            <p className="font-medium text-carbon-950">You&apos;ve used today&apos;s demo sessions.</p>
            <p className="mt-1 text-sm text-carbon-600">Book a call and we&apos;ll run a longer demo with you.</p>
          </div>
        ) : busy ? (
          <>
            <StatusOrb state={state} />
            <p className="mt-4 text-sm font-medium text-carbon-600" aria-live="polite">
              {state === "connecting" && "Connecting…"}
              {state === "listening" && "It&apos;s listening — go ahead and speak"}
              {state === "speaking" && "Receptionist speaking…"}
            </p>
            <Button type="button" variant="outline" onClick={() => adapter.stop()} className="mt-6">
              <PhoneOff className="h-4 w-4" aria-hidden /> End call
            </Button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={start}
              className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-azure-600 text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
              aria-label="Start voice demo"
            >
              <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-azure-500/50" />
              <Mic className="relative h-9 w-9" strokeWidth={1.5} aria-hidden />
            </button>
            <p className="mt-5 font-medium text-carbon-950">Tap to call the receptionist</p>
            <p className="mt-1 text-xs text-carbon-600">
              Uses your microphone · ~{Math.round(DEMO_MAX_DURATION_SECONDS / 60)} min max
              {remaining !== null && ` · ${remaining} session${remaining === 1 ? "" : "s"} left today`}
            </p>
            {(state === "ended" || state === "error") && (
              <p className="mt-3 text-sm text-carbon-600" aria-live="polite">
                {state === "ended" ? "Call ended — tap to call again." : error || "Something went wrong — try again."}
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  );
}

function StatusOrb({ state }: { state: VoiceSessionState }) {
  return (
    <div
      className={cn(
        "relative flex h-24 w-24 items-center justify-center rounded-full transition-colors duration-500",
        state === "speaking" ? "bg-azure-600" : "bg-cloud",
      )}
      aria-hidden
    >
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full",
          state !== "connecting" && "animate-ring-pulse",
          state === "speaking" ? "bg-azure-500/50" : "bg-carbon-400/30",
        )}
      />
      <Mic strokeWidth={1.5} className={cn("relative h-9 w-9", state === "speaking" ? "text-white" : "text-carbon-950")} />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden border border-line bg-white backdrop-blur">{children}</div>;
}
