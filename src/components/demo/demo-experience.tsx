"use client";

import { useEffect, useRef, useState } from "react";
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

export function DemoExperience() {
  const params = useSearchParams();
  const biz = sanitizeParam(params.get("biz")) || "your business";
  const city = sanitizeParam(params.get("city"), 30);
  const niche = getNiche(params.get("niche") ?? "") ?? niches[0];

  const adapter = getVoiceAdapter();
  const voiceAvailable = adapter.isConfigured();
  const [mode, setMode] = useState<"voice" | "chat">(voiceAvailable ? "voice" : "chat");

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Personalized headline */}
      <div className="text-center">
        <p className="streak-lines mb-4 inline-flex text-sm font-semibold uppercase tracking-widest text-flame-400">
          Live demo · {niche.name}
        </p>
        <h1 className="font-display text-balance text-3xl font-bold leading-tight text-paper sm:text-5xl">
          This is who&apos;d answer the phone at{" "}
          <span className="text-flame-400">{biz}</span>
          {city ? ` in ${city}` : ""}.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-ink-300">
          Talk to it like a customer would. Interrupt it. Test it. It&apos;s
          not a recording — see for yourself.
        </p>
      </div>

      {/* Talk / Type toggle */}
      <div
        role="tablist"
        aria-label="Demo mode"
        className="mx-auto mt-8 flex w-fit rounded-full border border-ink-800 bg-ink-900 p-1"
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
        {mode === "voice" ? (
          <VoicePanel bizName={biz} nicheSlug={niche.slug} city={city} />
        ) : (
          <ChatPanel bizName={biz} nicheSlug={niche.slug} />
        )}
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
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring",
        active ? "bg-flame-500 text-ink-950" : "text-ink-300 hover:text-paper",
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
}: {
  bizName: string;
  nicheSlug: string;
  city: string;
}) {
  const adapter = getVoiceAdapter();
  const [state, setState] = useState<VoiceSessionState>("idle");
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setRemaining(sessionsRemaining());
    return () => adapter.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!adapter.isConfigured()) {
    return (
      <Card>
        <div className="p-8 text-center">
          <Mic className="mx-auto mb-4 h-8 w-8 text-ink-500" aria-hidden />
          <h2 className="font-display text-lg font-bold text-paper">
            The voice line is being connected
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-300">
            The talk-out-loud demo isn&apos;t live on this deployment yet. Use{" "}
            <strong className="text-paper">Type to it</strong> above for a
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
          variables: { businessName: bizName, city, niche: nicheSlug },
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
            <AlertCircle className="mx-auto mb-3 h-7 w-7 text-flame-400" aria-hidden />
            <p className="font-semibold text-paper">
              You&apos;ve used today&apos;s demo sessions.
            </p>
            <p className="mt-1 text-sm text-ink-300">
              Want unlimited time with it? Book a call — we&apos;ll demo it
              live on your own business scenario.
            </p>
          </div>
        ) : busy ? (
          <>
            <StatusOrb state={state} />
            <p className="mt-4 text-sm font-medium text-ink-300" aria-live="polite">
              {state === "connecting" && "Connecting…"}
              {state === "listening" && "It's listening — go ahead, talk to it"}
              {state === "speaking" && "Receptionist speaking…"}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => adapter.stop()}
              className="mt-6 border-ink-700 bg-transparent text-paper hover:bg-ink-800 hover:text-paper"
            >
              <PhoneOff className="h-4 w-4" aria-hidden /> End call
            </Button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={start}
              className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-flame-500 text-ink-950 shadow-lift transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring"
              aria-label="Start voice demo"
            >
              <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-flame-500/50" />
              <Mic className="relative h-9 w-9" aria-hidden />
            </button>
            <p className="mt-5 font-semibold text-paper">Tap to call the receptionist</p>
            <p className="mt-1 text-xs text-ink-500">
              Uses your microphone · ~{Math.round(DEMO_MAX_DURATION_SECONDS / 60)} min max
              {remaining !== null && ` · ${remaining} session${remaining === 1 ? "" : "s"} left today`}
            </p>
            {(state === "ended" || state === "error") && (
              <p className="mt-3 text-sm text-ink-300" aria-live="polite">
                {state === "ended" ? "Call ended — tap to call again." : error || "Something went wrong — try again."}
              </p>
            )}
          </>
        )}
      </div>
      {transcript.length > 0 && (
        <div className="max-h-64 space-y-2 overflow-y-auto border-t border-ink-800 p-5">
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
        "relative flex h-24 w-24 items-center justify-center rounded-full transition-colors",
        state === "speaking" ? "bg-flame-500" : "bg-ink-800",
      )}
      aria-hidden
    >
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full",
          state !== "connecting" && "animate-ring-pulse",
          state === "speaking" ? "bg-flame-500/50" : "bg-ink-500/40",
        )}
      />
      <Mic
        className={cn(
          "relative h-9 w-9",
          state === "speaking" ? "text-ink-950" : "text-paper",
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
      <p className="border-b border-ink-800 px-5 py-2.5 text-center text-[11px] font-medium uppercase tracking-wider text-ink-500">
        Scripted text preview — the voice demo is the real experience
      </p>
      <div ref={scrollRef} className="h-80 space-y-3 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <Bubble key={i} message={m} />
        ))}
        {aiTyping && (
          <div className="flex justify-start">
            <span className="rounded-2xl rounded-bl-sm bg-ink-800 px-4 py-3 text-sm text-ink-300">
              <span className="inline-flex gap-1" aria-label="Receptionist is typing">
                <Dot delay="0ms" /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </span>
            </span>
          </div>
        )}
      </div>
      <form
        className="flex gap-2 border-t border-ink-800 p-4"
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
          className="border-ink-700 bg-ink-900 text-paper placeholder:text-ink-500"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Send"
          className="shrink-0 bg-flame-500 text-ink-950 hover:bg-flame-400"
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
    <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-950/80 shadow-lift backdrop-blur">
      {children}
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  return (
    <div className={cn("flex", message.speaker === "ai" ? "justify-start" : "justify-end")}>
      <p
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          message.speaker === "ai"
            ? "rounded-bl-sm bg-ink-800 text-paper"
            : "rounded-br-sm bg-flame-500/15 text-flame-100",
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
      className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300"
      style={{ animationDelay: delay }}
    />
  );
}
