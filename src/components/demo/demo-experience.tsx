"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Mic, MessageSquareText, PhoneOff, Send, AlertCircle } from "lucide-react";
import { getNiche, niches } from "@/content/niches";
import { getVoiceAdapter, type VoiceSessionState } from "@/lib/integrations/voice";
import {
  DEMO_MAX_DURATION_SECONDS,
  recordSession,
  sessionsRemaining,
} from "@/lib/demo-limits";
import {
  greeting,
  initialState,
  nextTurn,
  type ChatMessage,
  type ChatState,
} from "@/lib/demo-chat";
import { track } from "@/lib/integrations/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function sanitizeParam(value: string | null, max = 40): string {
  if (!value) return "";
  return value.replace(/[<>{}[\]\\]/g, "").trim().slice(0, max);
}

export function DemoExperience({
  demoToken,
  initialBusiness,
  initialCity,
  initialNiche,
}: {
  demoToken?: string;
  initialBusiness?: string;
  initialCity?: string;
  initialNiche?: string;
} = {}) {
  const params = useSearchParams();
  const biz = initialBusiness || sanitizeParam(params.get("biz")) || "your business";
  const city = initialCity || sanitizeParam(params.get("city"), 30);
  const niche = getNiche(initialNiche ?? params.get("niche") ?? "") ?? niches[0];

  const adapter = getVoiceAdapter();
  const voiceAvailable = adapter.isConfigured() && (adapter.providerName !== "Retell" || Boolean(demoToken));
  const [mode, setMode] = useState<"voice" | "chat">(voiceAvailable ? "voice" : "chat");
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Personalized headline */}
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
          Talk to it like a customer would. Interrupt it. Test it. It&apos;s
          not a recording — see for yourself.
        </p>
      </div>

      {/* Talk / Type toggle — plain pressed-state buttons (a full tabs
          pattern would require tabpanel wiring + arrow-key handling for
          two options; aria-pressed is the honest, simpler semantic) */}
      <div
        role="group"
        aria-label="Demo mode"
        className="mx-auto mt-10 flex w-fit rounded-full border border-line bg-cloud p-1"
      >
        <ModeTab
          active={mode === "voice"}
          onClick={() => {
            setMode("voice");
            track("demo_mode_toggled", { mode: "voice" });
          }}
          icon={<Mic className="h-4 w-4" aria-hidden />}
          label="Talk to it"
        />
        <ModeTab
          active={mode === "chat"}
          onClick={() => {
            setMode("chat");
            track("demo_mode_toggled", { mode: "chat" });
          }}
          icon={<MessageSquareText className="h-4 w-4" aria-hidden />}
          label="Type to it"
        />
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={mode}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {mode === "voice" ? (
              <VoicePanel bizName={biz} nicheSlug={niche.slug} city={city} demoToken={demoToken} />
            ) : (
              <ChatPanel bizName={biz} nicheSlug={niche.slug} />
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ModeTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300",
        active ? "bg-white text-carbon-950 shadow-card" : "text-carbon-600 hover:text-carbon-950",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

/* ------------------------------ Voice mode ------------------------------ */

function VoicePanel({
  bizName,
  nicheSlug,
  city,
  demoToken,
}: {
  bizName: string;
  nicheSlug: string;
  city: string;
  demoToken?: string;
}) {
  const adapter = getVoiceAdapter();
  const [state, setState] = useState<VoiceSessionState>("idle");
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // One-time sync with localStorage (browser-only); hydration-safe.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(sessionsRemaining());
    return () => adapter.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!adapter.isConfigured()) {
    return (
      <Card>
        <div className="p-8 text-center">
          <Mic className="mx-auto mb-4 h-8 w-8 text-carbon-400" strokeWidth={1.5} aria-hidden />
          <h2 className="font-display text-2xl font-medium text-carbon-950">
            The voice line is being connected
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-carbon-600">
            The talk-out-loud demo isn&apos;t live on this deployment yet. Use{" "}
            <strong className="font-medium text-carbon-950">Type to it</strong> above for a
            preview of how it handles calls — or book a call and we&apos;ll
            run the live demo with you.
          </p>
        </div>
      </Card>
    );
  }

  const busy = state === "connecting" || state === "listening" || state === "speaking";
  const outOfSessions = (remaining ?? 1) <= 0 && !busy;

  const start = async () => {
    setError("");
    setTranscript([]);
    recordSession();
    setRemaining(sessionsRemaining());
    track("demo_voice_started", { niche: nicheSlug });
    try {
      await adapter.start(
        {
          variables: { businessName: bizName, city, niche: nicheSlug, ...(demoToken ? { demoToken } : {}) },
          maxDurationSeconds: DEMO_MAX_DURATION_SECONDS,
        },
        {
          onStateChange: (s) => {
            setState(s);
            if (s === "ended") track("demo_voice_ended", { niche: nicheSlug });
          },
          onTranscript: (line) => setTranscript((t) => [...t, line]),
          onError: (message) => setError(message),
        },
      );
    } catch (e) {
      setState("error");
      setError(e instanceof Error ? e.message : "Couldn't start the call.");
    }
  };

  return (
    <Card>
      <div className="flex flex-col items-center p-8">
        {outOfSessions ? (
          <div className="text-center">
            <AlertCircle className="mx-auto mb-3 h-7 w-7 text-azure-600" strokeWidth={1.5} aria-hidden />
            <p className="font-medium text-carbon-950">
              You&apos;ve used today&apos;s demo sessions.
            </p>
            <p className="mt-1 text-sm text-carbon-600">
              Want unlimited time with it? Book a call — we&apos;ll demo it
              live on your own business scenario.
            </p>
          </div>
        ) : busy ? (
          <>
            <StatusOrb state={state} />
            <p className="mt-4 text-sm font-medium text-carbon-600" aria-live="polite">
              {state === "connecting" && "Connecting…"}
              {state === "listening" && "It's listening — go ahead, talk to it"}
              {state === "speaking" && "Receptionist speaking…"}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => adapter.stop()}
              className="mt-6"
            >
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
      {transcript.length > 0 && (
        <div className="max-h-64 space-y-2 overflow-y-auto border-t border-line p-5">
          {transcript.map((line, i) => (
            <Bubble key={i} message={line} />
          ))}
        </div>
      )}
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
      <Mic
        strokeWidth={1.5}
        className={cn(
          "relative h-9 w-9",
          state === "speaking" ? "text-white" : "text-carbon-950",
        )}
      />
    </div>
  );
}

/* ------------------------------- Chat mode ------------------------------ */

function ChatPanel({ bizName, nicheSlug }: { bizName: string; nicheSlug: string }) {
  const niche = getNiche(nicheSlug) ?? niches[0];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatState, setChatState] = useState<ChatState>(initialState());
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const started = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    track("demo_chat_started", { niche: niche.slug });
    setAiTyping(true);
    const id = setTimeout(() => {
      setMessages([{ speaker: "ai", text: greeting(niche, bizName) }]);
      setAiTyping(false);
    }, 700);
    return () => clearTimeout(id);
  }, [niche, bizName]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, aiTyping]);

  const send = () => {
    const text = input.trim();
    if (!text || aiTyping) return;
    setInput("");
    setMessages((m) => [...m, { speaker: "caller", text }]);
    setAiTyping(true);
    const { reply, state } = nextTurn(chatState, text, niche);
    setTimeout(() => {
      setMessages((m) => [...m, { speaker: "ai", text: reply }]);
      setChatState(state);
      setAiTyping(false);
    }, 900 + Math.random() * 500);
  };

  return (
    <Card>
      <p className="border-b border-line px-5 py-3 text-center text-[0.65rem] font-medium uppercase tracking-[0.22em] text-carbon-600">
        Scripted text preview — the voice demo is the real experience
      </p>
      <div ref={scrollRef} className="h-80 space-y-3 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <Bubble key={i} message={m} />
        ))}
        {aiTyping && (
          <div className="flex justify-start">
            <span className="rounded-[2px] bg-cloud px-4 py-3 text-sm text-carbon-600">
              <span className="inline-flex gap-1" aria-label="Receptionist is typing">
                <Dot delay="0ms" /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </span>
            </span>
          </div>
        )}
      </div>
      <form
        className="flex gap-2 border-t border-line p-4"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Try: "My door is stuck and I need someone today"'
          aria-label="Your message"
          className="rounded-full"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Send"
          className="shrink-0 bg-azure-600 text-white hover:bg-azure-500"
        >
          <Send className="h-4 w-4" aria-hidden />
        </Button>
      </form>
    </Card>
  );
}

/* ------------------------------- Shared UI ------------------------------ */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden border border-line bg-white backdrop-blur">
      {children}
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  return (
    <div className={cn("flex", message.speaker === "ai" ? "justify-start" : "justify-end")}>
      <p
        className={cn(
          "max-w-[85%] rounded-[2px] px-4 py-2.5 text-sm leading-relaxed",
          message.speaker === "ai"
            ? "bg-cloud text-carbon-950"
            : "bg-azure-600 text-white",
        )}
      >
        {message.text}
      </p>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-bounce rounded-full bg-carbon-400"
      style={{ animationDelay: delay }}
    />
  );
}
