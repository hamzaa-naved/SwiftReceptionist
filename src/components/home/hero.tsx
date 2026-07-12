"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { PhoneIncoming, CalendarCheck, MessageSquareText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

const savedCalls = [
  { niche: "Electrical", line: "“Half the house just went dark—”", job: "Emergency dispatch · booked 7:30am" },
  { niche: "Garage door", line: "“My door won't open and my car's inside—”", job: "Spring replacement · booked 8:15am" },
  { niche: "Electrical", line: "“There's a burning smell at the breaker box—”", job: "Urgent · on-call electrician alerted" },
  { niche: "Tree service", line: "“A limb came through our roof last night—”", job: "Storm crew · callback in 20 min" },
];

// One orchestrated moment on the page that matters most: kicker → headline
// → lede → CTAs rise in sequence, then the call card slides in.
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
    <div className="relative overflow-hidden bg-ink-950 pb-16 pt-32 text-paper md:pb-24 md:pt-44">
      {/* Speed-line backdrop with a barely-perceptible drift (80s loop);
          extra horizontal slack keeps edges covered while it translates. */}
      <div
        aria-hidden
        className="speed-drift pointer-events-none absolute inset-y-0 -left-40 -right-40 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 96px, currentColor 96px 160px)",
          maskImage: "linear-gradient(180deg, transparent, black 40%, transparent)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <m.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <m.p
            variants={rise}
            className="streak-lines mb-5 text-sm font-semibold uppercase tracking-widest text-flame-400"
          >
            <Zap className="mr-1 inline h-4 w-4" aria-hidden />
            24/7 AI receptionist for local service businesses
          </m.p>
          <m.h1
            variants={rise}
            className="font-display text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Every missed call is a job your{" "}
            <span className="text-flame-400">competitor</span> just booked.
          </m.h1>
          <m.p
            variants={rise}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300"
          >
            Swift Receptionist answers your line in seconds — nights, weekends,
            mid-job — books the work, and texts you the details. No hiring, no
            contracts, live in days.
          </m.p>
          <m.div variants={rise} className="mt-9 flex flex-col gap-3 sm:flex-row">
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
          </m.div>
          <m.p variants={rise} className="mt-5 text-sm text-ink-300">
            Skeptical? Good. The demo answers like it&apos;s your front desk —
            judge it with your own ears.
          </m.p>
        </m.div>

        <m.div
          initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.21, 0.65, 0.35, 1] }}
        >
          <LiveCallCard />
        </m.div>
      </div>
    </div>
  );
}

/**
 * Rotating "saved call" card — the product, shown instead of described.
 * Rotation pauses when the card is off-screen or the tab is hidden, and
 * never runs for reduced-motion users.
 */
function LiveCallCard() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.3 });

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(() => {
      if (!document.hidden) {
        setIndex((i) => (i + 1) % savedCalls.length);
      }
    }, 4200);
    return () => clearInterval(id);
  }, [reduceMotion, inView]);

  const call = savedCalls[index];

  return (
    <div ref={cardRef} aria-hidden className="relative mx-auto w-full max-w-sm">
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
          <m.div
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
          </m.div>
        </AnimatePresence>

        <p className="mt-4 text-center text-[11px] uppercase tracking-wider text-ink-300">
          Illustrative — try the real thing on the demo page
        </p>
      </div>
    </div>
  );
}
