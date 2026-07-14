"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { KineticText } from "@/components/shared/reveal";
import { EASE_LUXE as EASE } from "@/lib/motion";

/**
 * Cinematic opening scene. An espresso "night" ground with a single
 * missed-call moment framed like a film still; the headline rises word
 * by word in Fraunces, and the whole scene parallaxes as you begin to
 * scroll. This is the thesis of the page — the quiet cost of a call that
 * goes unanswered.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stillY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <div
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-espresso-950 text-ivory"
    >
      {/* Warm vignette + faint aurora of brass light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 10%, rgba(195,154,86,0.14), transparent 55%), radial-gradient(90% 70% at 0% 100%, rgba(124,58,45,0.14), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 40%, transparent 40%, rgba(15,12,8,0.9))",
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-6 pt-28 pb-20 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <m.div style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}>
            <m.p
              className="eyebrow mb-8 text-brass-400"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              24/7 AI receptionist · electrical &amp; the trades
            </m.p>

            <h1 className="font-display text-[clamp(2.9rem,7vw,6rem)] font-light leading-[0.98] tracking-[-0.02em]">
              <KineticText text="The call you miss" as="span" className="block" />
              <KineticText
                text="is the job"
                as="span"
                className="block"
                delay={0.28}
              />
              <span className="block italic text-brass-400">
                <KineticText text="they get." as="span" delay={0.5} />
              </span>
            </h1>

            <m.p
              className="mt-9 max-w-md text-lg leading-relaxed text-espresso-300"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: EASE }}
            >
              Swift Receptionist answers your line in seconds — nights,
              weekends, mid-job — books the work, and texts you the ticket.
              No hiring. No contracts. Live in days.
            </m.p>

            <m.div
              className="mt-11 flex flex-col gap-3 sm:flex-row"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.05, ease: EASE }}
            >
              <Button asChild size="lg" className="bg-ivory text-espresso-950 hover:bg-brass-100">
                <TrackedLink event="cta_book_call" eventProps={{ location: "hero" }} href="/contact">
                  Book a 15-minute call
                </TrackedLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-espresso-950"
              >
                <TrackedLink event="cta_try_demo" eventProps={{ location: "hero" }} href="/demo">
                  Hear it answer →
                </TrackedLink>
              </Button>
            </m.div>
          </m.div>

          <m.div style={reduceMotion ? undefined : { y: stillY }}>
            <CallStill />
          </m.div>
        </div>
      </div>

      {/* Scroll cue */}
      <m.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="flex flex-col items-center gap-3 text-espresso-500">
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="block h-12 w-px bg-gradient-to-b from-espresso-500 to-transparent" />
        </div>
      </m.div>
    </div>
  );
}

/**
 * The "film still" — a single incoming call caught at 11:48pm, rendered
 * as an elegant framed card. A live pulse marks the ring; the outcome
 * fades in beneath, telling the whole story in one glance.
 */
function CallStill() {
  const reduceMotion = useReducedMotion();
  return (
    <m.figure
      className="relative mx-auto w-full max-w-sm border border-espresso-700/60 bg-espresso-900/50 p-8 backdrop-blur-sm"
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
    >
      {/* corner ticks — a framed-print detail */}
      <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l border-t border-brass-400" />
      <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r border-t border-brass-400" />
      <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-brass-400" />
      <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-brass-400" />

      <figcaption className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.24em] text-espresso-300">
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-brass-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brass-400" />
          </span>
          Incoming
        </span>
        <span>11:48 PM</span>
      </figcaption>

      <p className="font-display mt-7 text-2xl font-light italic leading-snug text-ivory">
        “Half the house just went dark and the breaker won&apos;t reset.”
      </p>

      <div className="mt-7 border-t border-espresso-700/60 pt-5">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-brass-400">
          Answered in 2 rings
        </p>
        <p className="mt-2 text-sm text-espresso-300">
          Emergency dispatch booked — 7:30 AM. Owner notified by text.
        </p>
      </div>
    </m.figure>
  );
}
