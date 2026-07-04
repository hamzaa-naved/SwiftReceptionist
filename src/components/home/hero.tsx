"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { PhoneIncoming, CalendarCheck, MessageSquareText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

const savedCalls = [
  { niche: "Garage door", line: "“My door won't open and my car's inside—”", job: "Spring replacement · booked 8:15am" },
  { niche: "Septic", line: "“There's sewage coming up in the shower—”", job: "Emergency pump-out · tech alerted" },
  { niche: "Tree service", line: "“A limb came through our roof last night—”", job: "Storm crew · callback in 20 min" },
  { niche: "Well & pump", line: "“We turned on the tap and there's nothing—”", job: "No-water priority · booked same day" },
];

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-ink-950 pb-16 pt-32 text-paper md:pb-24 md:pt-44">
      {/* Speed-line backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 96px, currentColor 96px 160px)",
          maskImage: "linear-gradient(180deg, transparent, black 40%, transparent)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="streak-lines mb-5 text-sm font-semibold uppercase tracking-widest text-flame-400">
            <Zap className="mr-1 inline h-4 w-4" aria-hidden />
            24/7 AI receptionist for local service businesses
          </p>
          <h1 className="font-display text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Every missed call is a job your{" "}
            <span className="text-flame-400">competitor</span> just booked.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
            Swift Receptionist answers your line in seconds — nights, weekends,
            mid-job — books the work, and texts you the details. No hiring, no
            contracts, live in days.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-flame-500 text-ink-950 hover:bg-flame-400"
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
              className="border-ink-700 bg-transparent text-paper hover:bg-ink-800 hover:text-paper"
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
          </div>
          <p className="mt-5 text-sm text-ink-500">
            Skeptical? Good. The demo answers like it&apos;s your front desk —
            judge it with your own ears.
          </p>
        </div>

        <LiveCallCard />
      </div>
    </div>
  );
}

/** Rotating "saved call" card — the product, shown instead of described. */
function LiveCallCard() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % savedCalls.length), 4200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const call = savedCalls[index];

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-ink-800 bg-ink-900/80 p-5 shadow-lift backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-flame-500/15">
            <span className="absolute inline-flex h-10 w-10 animate-ring-pulse rounded-full bg-flame-500/40" />
            <PhoneIncoming className="relative h-5 w-5 text-flame-400" />
          </span>
          <div>
            <p className="text-sm font-semibold text-paper">Incoming call</p>
            <p className="text-xs text-ink-300">
              Answered in <span className="font-semibold text-flame-400">2 rings</span> · 11:48 PM
            </p>
          </div>
          <span className="ml-auto rounded-full bg-ink-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-300">
            {call.niche}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-4 space-y-3"
          >
            <p className="rounded-xl rounded-br-sm bg-flame-500/15 px-4 py-3 text-sm leading-relaxed text-flame-100">
              {call.line}
            </p>
            <div className="flex items-center gap-2.5 rounded-xl border border-ink-800 bg-ink-950 px-4 py-3">
              <CalendarCheck className="h-4 w-4 shrink-0 text-flame-400" />
              <p className="text-sm font-medium text-paper">{call.job}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-4 text-center text-[11px] uppercase tracking-wider text-ink-500">
          Illustrative — try the real thing on the demo page
        </p>
      </div>
    </div>
  );
}
