"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { cn } from "@/lib/utils";

/**
 * The Call Board — the site's signature element. Incoming calls appear
 * as dispatch-log rows; the active row expands to show the caller's
 * words and the booked outcome while its LED reads ANSWERED. One row
 * always shows RINGING… so the board feels live.
 */
const boardCalls = [
  { time: "21:12", niche: "ELECTRICAL", line: "“Half the house just went dark—”", job: "EMERGENCY DISPATCH · BOOKED 7:30AM" },
  { time: "06:52", niche: "GARAGE DOOR", line: "“My door won't open and my car's inside—”", job: "SPRING REPLACEMENT · BOOKED 8:15AM" },
  { time: "22:47", niche: "ELECTRICAL", line: "“There's a burning smell at the breaker box—”", job: "URGENT · ON-CALL ELECTRICIAN ALERTED" },
  { time: "07:15", niche: "TREE SERVICE", line: "“A limb came through our roof last night—”", job: "STORM CREW · CALLBACK IN 20 MIN" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.65, 0.35, 1] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-b-[3px] border-volt-400 bg-graphite-950 pb-16 pt-32 text-concrete-50 md:pb-24 md:pt-44">
      {/* Faint schematic grid — panel-diagram texture, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(180deg, transparent, black 35%, black 75%, transparent)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <m.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <m.p
            variants={rise}
            className="streak-lines mb-6 text-xs font-medium uppercase tracking-[0.18em] text-graphite-300"
          >
            <span className="relative -ml-1 mr-1 flex h-2 w-2">
              <span className="absolute h-2 w-2 animate-ring-pulse rounded-full bg-live-500" />
              <span className="relative h-2 w-2 rounded-full bg-live-500" />
            </span>
            Line open · 24/7 · every call answered
          </m.p>
          <m.h1
            variants={rise}
            className="font-display text-balance text-5xl font-bold uppercase leading-[0.95] sm:text-6xl lg:text-7xl"
          >
            The call you miss is the job{" "}
            <span className="text-volt-400">they get.</span>
          </m.h1>
          <m.p
            variants={rise}
            className="mt-6 max-w-xl text-lg leading-relaxed text-graphite-300"
          >
            Swift Receptionist answers your line in seconds — nights, weekends,
            mid-job — books the work, and texts you the ticket. No hiring, no
            contracts, live in days.
          </m.p>
          <m.div variants={rise} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-volt-400 font-semibold uppercase tracking-wide text-graphite-950 hover:bg-volt-400/90"
            >
              <TrackedLink
                event="cta_book_call"
                eventProps={{ location: "hero" }}
                href="/contact"
              >
                Book a 15-minute call
              </TrackedLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-graphite-700 bg-transparent font-semibold uppercase tracking-wide text-concrete-50 hover:bg-graphite-800 hover:text-concrete-50"
            >
              <TrackedLink
                event="cta_try_demo"
                eventProps={{ location: "hero" }}
                href="/demo"
              >
                <MessageSquareText className="h-4 w-4" aria-hidden />
                Talk to it right now
              </TrackedLink>
            </Button>
          </m.div>
          <m.p variants={rise} className="mt-5 text-sm text-graphite-300">
            Skeptical? Good. The demo answers like it&apos;s your front desk —
            judge it with your own ears.
          </m.p>
        </m.div>

        <m.div
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.21, 0.65, 0.35, 1] }}
        >
          <CallBoard />
        </m.div>
      </div>
    </div>
  );
}

function CallBoard() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boardRef, { amount: 0.3 });

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % boardCalls.length);
    }, 4200);
    return () => clearInterval(id);
  }, [reduceMotion, inView]);

  return (
    <div
      ref={boardRef}
      aria-hidden
      className="relative mx-auto w-full max-w-md border border-graphite-800 bg-graphite-900"
    >
      {/* Board header */}
      <div className="flex items-center justify-between border-b border-graphite-800 px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-graphite-300">
          Call board — tonight
        </span>
        <span className="flex gap-1">
          <span className="h-2 w-2 bg-volt-400" />
          <span className="h-2 w-2 bg-graphite-700" />
          <span className="h-2 w-2 bg-graphite-700" />
        </span>
      </div>

      {/* Rows */}
      <div>
        {boardCalls.map((call, i) => {
          const isActive = i === active;
          const isRinging = i === (active + 1) % boardCalls.length;
          return (
            <div
              key={call.time + call.niche}
              className={cn(
                "border-b border-graphite-800 px-4 transition-colors duration-500 last:border-b-0",
                isActive ? "bg-graphite-950 py-4" : "py-3",
              )}
            >
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-graphite-500">{call.time}</span>
                {isActive ? (
                  <span className="flex items-center gap-1.5 font-medium text-live-500">
                    <span className="h-2 w-2 rounded-full bg-live-500" /> ANSWERED
                  </span>
                ) : isRinging ? (
                  <span className="flex items-center gap-1.5 font-medium text-volt-400">
                    <span className="h-2 w-2 animate-led-blink rounded-full bg-volt-400" /> RINGING…
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-graphite-500">
                    <span className="h-2 w-2 rounded-full bg-graphite-700" /> ANSWERED
                  </span>
                )}
                <span className="ml-auto text-graphite-500">{call.niche}</span>
              </div>
              {isActive && (
                <div className="mt-3">
                  <p className="text-[15px] leading-snug text-concrete-50">{call.line}</p>
                  <p className="mt-2 font-mono text-xs font-medium tracking-wide text-volt-400">
                    → {call.job}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="border-t border-graphite-800 px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-graphite-500">
        Illustrative — try the real thing on the demo page
      </p>
    </div>
  );
}
