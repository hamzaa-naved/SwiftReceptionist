"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { Magnetic } from "@/components/shared/magnetic";
import { Aura } from "@/components/shared/aura";
import { EASE_CRISP as EASE } from "@/lib/motion";

/**
 * DAYLIGHT hero — an Apple product intro. A white void, one colossal
 * declaration, and the product itself floating beneath: a live call
 * that answers while you watch. On scroll the type scales away and the
 * product takes the frame.
 *
 * Entrance is pure CSS (.rise-in / .word-rise) so LCP never waits on
 * hydration; Motion drives only scroll choreography and the answer flip.
 */

const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as CSSProperties;

function RiseWords({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-rise"
          style={{ ...delay(start + i * 0.05), marginRight: "0.22em" }}
        >
          {word}
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
  const typeScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.25]);
  const cardY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-6%"]);

  // The call answers itself after ~two rings.
  const [answered, setAnswered] = useState(false);
  useEffect(() => {
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswered(true);
      return;
    }
    const id = setTimeout(() => setAnswered(true), 3200);
    return () => clearTimeout(id);
  }, [reduceMotion]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-snow pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="relative mx-auto w-full max-w-6xl px-6 text-center sm:px-10">
        <m.div style={reduceMotion ? undefined : { scale: typeScale, opacity: typeOpacity }}>
          <p className="rise-in eyebrow justify-center text-carbon-400" style={delay(0)}>
            For electrical contractors &amp; garage door companies
          </p>

          <h1 className="mx-auto mt-6 max-w-4xl text-balance font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.98]">
            <RiseWords text="Every call." start={0.08} />
            <span className="text-carbon-400">
              <RiseWords text="Answered." start={0.24} />
            </span>
          </h1>

          <p
            className="rise-in mx-auto mt-7 max-w-xl text-balance text-lg leading-relaxed text-carbon-600 sm:text-xl"
            style={delay(0.36)}
          >
            The AI receptionist that picks up in two rings, books the job,
            and texts you the ticket. Nights, weekends, mid-job. 24/7.
          </p>

          <div
            className="rise-in mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={delay(0.48)}
          >
            <Magnetic>
              <Button asChild size="lg">
                <TrackedLink event="cta_book_call" eventProps={{ location: "hero" }} href="/contact">
                  Book a 15-minute call
                </TrackedLink>
              </Button>
            </Magnetic>
            <Button asChild variant="link" size="lg">
              <TrackedLink event="cta_try_demo" eventProps={{ location: "hero" }} href="/demo">
                Hear it answer →
              </TrackedLink>
            </Button>
          </div>
        </m.div>

        {/* The product object */}
        <m.div
          className="rise-in relative mx-auto mt-16 w-full max-w-md md:mt-20"
          style={{ ...delay(0.62), ...(reduceMotion ? {} : { y: cardY }) }}
        >
          <Aura intensity={0.32} />
          <CallCard answered={answered} />
        </m.div>
      </div>
    </div>
  );
}

/** The live call, caught mid-answer — the whole product in one card. */
function CallCard({ answered }: { answered: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <figure className="relative rounded-[28px] border border-line bg-white/90 p-7 text-left shadow-float backdrop-blur-sm sm:p-8">
      <figcaption className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-carbon-400">
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            {!answered && (
              <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-azure-500" />
            )}
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{
                background: answered
                  ? "var(--good)"
                  : "linear-gradient(135deg, #0a84ff, #7c3aed)",
              }}
            />
          </span>
          {answered ? "On the line" : "Incoming call"}
        </span>
        <span>Now</span>
      </figcaption>

      <p className="mt-6 text-xl font-medium leading-snug tracking-[-0.01em] text-carbon-950">
        “Half the house just went dark and the breaker won&apos;t reset.”
      </p>

      <div className="mt-6 min-h-[4.5rem] border-t border-line pt-5">
        {answered ? (
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-carbon-950">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-good/10">
                <Check className="h-3.5 w-3.5 text-good" strokeWidth={3} aria-hidden />
              </span>
              Answered in 2 rings
            </p>
            <p className="mt-2 text-sm text-carbon-600">
              Emergency visit booked for 7:30 AM. Owner texted the ticket.
            </p>
          </m.div>
        ) : (
          <p className="text-sm text-carbon-400">
            Ringing<span className="animate-pulse">…</span>
          </p>
        )}
      </div>
    </figure>
  );
}
