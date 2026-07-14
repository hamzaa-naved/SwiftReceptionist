"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { Magnetic } from "@/components/shared/magnetic";
import { Ticker } from "@/components/shared/ticker";
import { cn } from "@/lib/utils";

/**
 * DAWN — the one place the site sunrises. A warm disc of light climbs
 * behind the closing argument as you scroll; beneath it, a quiet ticker
 * of the calls that get answered while owners sleep. Every page's last
 * word.
 */

const TICKER_ITEMS = [
  "11:48 PM · answered in 2 rings · panel emergency booked 7:30 AM",
  "6:52 AM · broken spring, car trapped · tech dispatched 8:15",
  "SAT 9:14 PM · half the house dark · owner texted the ticket",
  "2:03 AM · door stuck open · flagged urgent · secured by morning",
  "SUN 4:40 PM · EV charger install · estimate booked Tuesday",
  "10:31 PM · opener dead · repair scheduled before coffee",
];

export function DawnCta({
  title = "Tomorrow morning, your phone answers itself.",
  italicLine = "Tonight is the last night it rings out.",
  lede = "Fifteen minutes. Your call volume, your prices, one flat number. If it isn't clearly worth it, we'll say so.",
  demoHref = "/demo",
  location = "dawn_cta",
  className,
}: {
  title?: string;
  italicLine?: string;
  lede?: string;
  demoHref?: string;
  location?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sunY = useTransform(scrollYProgress, [0, 1], ["45%", "-12%"]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.55, 0.85]);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden bg-night-990 text-ivory", className)}
    >
      {/* The rising light */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[70svh] w-[140vw] -translate-x-1/2"
        style={
          reduceMotion
            ? { opacity: 0.6 }
            : { y: sunY, opacity: sunOpacity }
        }
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(55% 65% at 50% 100%, rgba(230,211,173,0.55) 0%, rgba(195,154,86,0.32) 34%, rgba(124,90,46,0.14) 58%, transparent 75%)",
          }}
        />
      </m.div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-40 pt-28 text-center sm:px-10 md:pb-48 md:pt-40">
        <p className="eyebrow justify-center text-brass-400">
          The next call — yours or theirs
        </p>
        <h2 className="font-display headline-glow mx-auto mt-8 max-w-4xl text-balance text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02]">
          {title}
          <span className="mt-2 block italic text-brass-400">{italicLine}</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-espresso-300">
          {lede}
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <Button asChild size="lg" className="btn-sheen bg-ivory text-espresso-950 hover:bg-brass-100">
              <TrackedLink
                event="cta_book_call"
                eventProps={{ location }}
                href="/contact"
              >
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
              <TrackedLink
                event="cta_try_demo"
                eventProps={{ location }}
                href={demoHref}
              >
                Talk to the AI first
              </TrackedLink>
            </Button>
          </Magnetic>
        </div>
        <p className="mt-8 text-[0.7rem] uppercase tracking-[0.24em] text-espresso-500">
          No contracts · Live in days · Cancel with an email
        </p>
      </div>

      {/* The night's ledger, scrolling quietly at the horizon */}
      <div className="relative border-t border-espresso-800/70 py-5">
        <Ticker items={TICKER_ITEMS} itemClassName="text-espresso-300" />
      </div>
    </section>
  );
}
