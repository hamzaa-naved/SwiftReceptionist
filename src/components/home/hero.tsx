"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { Magnetic } from "@/components/shared/magnetic";
import { EASE_LUXE as EASE } from "@/lib/motion";

/**
 * COLD OPEN. The site begins at 9:47 PM — the hour the missed call
 * actually happens. A night ground, a phone ringing in the dark, and
 * the one sentence that carries the whole business. After two rings
 * (or the first scroll), the call is answered: the story in miniature.
 *
 * Performance note: the entrance choreography is pure CSS (.rise-in /
 * .word-rise) so the hero paints and animates before hydration — LCP is
 * never blocked on JavaScript. Motion handles only scroll parallax and
 * the answered-state flip, both post-load enhancements.
 */

const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as CSSProperties;

/** Kinetic headline words, driven by CSS so they rise from first paint. */
function RiseWords({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-flex overflow-hidden pb-[0.12em] align-baseline"
          style={{ marginRight: "0.26em" }}
        >
          <span className="word-rise" style={delay(start + i * 0.07)}>
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

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

  // The call answers itself after ~two rings; reduced motion starts answered.
  const [answered, setAnswered] = useState(false);
  useEffect(() => {
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswered(true);
      return;
    }
    const id = setTimeout(() => setAnswered(true), 3600);
    return () => clearTimeout(id);
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-night-990 text-ivory"
    >
      {/* Night air: faint brass aurora + deep vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 82% 8%, rgba(195,154,86,0.12), transparent 55%), radial-gradient(80% 60% at 0% 100%, rgba(124,58,45,0.12), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 40%, transparent 38%, rgba(8,6,3,0.92))",
        }}
      />

      {/* The hour, kept like a film slate */}
      <p
        aria-hidden
        className="rise-in absolute right-6 top-24 hidden text-[0.68rem] uppercase tracking-[0.3em] text-espresso-500 sm:right-10 sm:block md:top-28"
        style={delay(1.4)}
      >
        Somewhere in your service area · 9<span className="animate-pulse">:</span>47 PM
      </p>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-6 pb-24 pt-28 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.18fr_0.82fr]">
          <m.div style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}>
            <p className="rise-in eyebrow mb-8 text-brass-400" style={delay(0.2)}>
              Electrical contractors &amp; garage door pros · after hours, every hour
            </p>

            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-[-0.02em]">
              <span className="block">
                <RiseWords text="The call you miss" start={0.05} />
              </span>
              <span className="block">
                <RiseWords text="is the job" start={0.33} />
              </span>
              <span className="block italic text-brass-400">
                <RiseWords text="they get." start={0.55} />
              </span>
            </h1>

            <p
              className="rise-in mt-9 max-w-md text-lg leading-relaxed text-espresso-300"
              style={delay(0.9)}
            >
              Swift Receptionist answers your line in seconds — nights,
              weekends, mid-job — books the work, and texts you the ticket.
              No hiring. No contracts. Live in days.
            </p>

            <div
              className="rise-in mt-11 flex flex-col gap-3 sm:flex-row"
              style={delay(1.05)}
            >
              <Magnetic>
                <Button asChild size="lg" className="btn-sheen bg-ivory text-espresso-950 hover:bg-brass-100">
                  <TrackedLink event="cta_book_call" eventProps={{ location: "hero" }} href="/contact">
                    Book a 15-minute call
                  </TrackedLink>
                </Button>
              </Magnetic>
              <Magnetic>
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
              </Magnetic>
            </div>
          </m.div>

          <m.div style={reduceMotion ? undefined : { y: stillY }} className="relative">
            {/* Ring blooms behind the still while the line is ringing */}
            {!reduceMotion && !answered && (
              <div aria-hidden className="absolute inset-0 flex items-center justify-center">
                <span className="absolute h-40 w-40 animate-ring-bloom rounded-full border border-brass-400/40" />
                <span
                  className="absolute h-40 w-40 animate-ring-bloom rounded-full border border-brass-400/25"
                  style={{ animationDelay: "1.2s" }}
                />
              </div>
            )}
            <CallStill answered={answered} />
          </m.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="rise-in absolute bottom-8 left-1/2 -translate-x-1/2"
        style={delay(1.6)}
      >
        <div className="flex flex-col items-center gap-3 text-espresso-500">
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="block h-12 w-px bg-gradient-to-b from-espresso-500 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/**
 * The film still: one incoming call caught at 9:47 PM. It rings, then —
 * because Swift is on the line — it answers, and the outcome prints
 * beneath. The whole pitch in a single framed moment.
 */
function CallStill({ answered }: { answered: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <figure
      className="rise-in relative mx-auto w-full max-w-sm border border-espresso-700/60 bg-espresso-900/50 p-8 backdrop-blur-sm"
      style={delay(0.7)}
    >
      {/* corner ticks — a framed-print detail */}
      <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l border-t border-brass-400" />
      <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r border-t border-brass-400" />
      <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-brass-400" />
      <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-brass-400" />

      <figcaption className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.24em] text-espresso-300">
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span
              className={
                answered
                  ? "relative inline-flex h-2 w-2 rounded-full bg-moss-500"
                  : "absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-brass-400"
              }
            />
            {!answered && (
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brass-400" />
            )}
          </span>
          {answered ? "Connected" : "Incoming"}
        </span>
        <span>9:47 PM</span>
      </figcaption>

      <p className="font-display mt-7 text-2xl font-light italic leading-snug text-ivory">
        “Half the house just went dark and the breaker won&apos;t reset.”
      </p>

      <div className="mt-7 min-h-[5.25rem] border-t border-espresso-700/60 pt-5">
        {answered ? (
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-brass-400">
              Answered in 2 rings
            </p>
            <p className="mt-2 text-sm text-espresso-300">
              Emergency dispatch booked — 7:30 AM. Owner notified by text.
            </p>
          </m.div>
        ) : (
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-espresso-500">
            Ringing<span className="animate-pulse">…</span>
          </p>
        )}
      </div>
    </figure>
  );
}
