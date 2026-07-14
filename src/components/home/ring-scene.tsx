"use client";

import { m, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ScrollScene } from "@/components/shared/scroll-scene";
import { Section } from "@/components/shared/section";

/**
 * THE FOUR RINGS — the showpiece. A pinned scene the reader scrolls
 * through in real time: four rings of an unanswered phone, the screen
 * dimming with each one, ending on the job walking — and the reversal.
 * Reduced motion (and no-JS-scroll contexts) get the same story as a
 * still, readable sequence.
 */

const BEATS = [
  {
    n: "01",
    text: "You're elbow-deep in a live panel. The phone is in the truck.",
  },
  {
    n: "02",
    text: "The ladder is not coming down for this.",
  },
  {
    n: "03",
    text: "Your customer is already reading the next name on the list.",
  },
  {
    n: "04",
    text: "Voicemail. They never leave one.",
  },
] as const;

const LOSS = {
  headline: "That job now belongs to whoever answered.",
  sub: "Typical after-hours ticket: $200–$600. Gone in four rings.",
};

const REVERSAL = {
  kicker: "Unless",
  headline: "Unless something answers for you.",
  sub: "Every call, in seconds, around the clock — booked, triaged, and texted to your phone.",
};

export function RingScene() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Section tone="night">
        <p className="eyebrow mb-14 text-brass-400">
          What a missed call sounds like
        </p>
        <ol className="space-y-10">
          {BEATS.map((b) => (
            <li key={b.n} className="flex items-baseline gap-6">
              <span className="font-display text-3xl italic text-brass-500">{b.n}</span>
              <p className="font-display max-w-2xl text-2xl font-light leading-snug sm:text-3xl">
                {b.text}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-14 border-l-2 border-oxblood-600 pl-6">
          <p className="font-display max-w-2xl text-3xl font-light leading-tight sm:text-4xl">
            {LOSS.headline}
          </p>
          <p className="mt-3 text-espresso-300">{LOSS.sub}</p>
        </div>
        <div className="mt-14">
          <p className="font-display max-w-2xl text-3xl font-light italic leading-tight text-brass-400 sm:text-4xl">
            {REVERSAL.headline}
          </p>
          <p className="mt-3 max-w-xl text-espresso-300">{REVERSAL.sub}</p>
        </div>
      </Section>
    );
  }

  return (
    <ScrollScene length={4.5} className="bg-night-990 text-ivory">
      {(progress) => <RingTimeline progress={progress} />}
    </ScrollScene>
  );
}

function RingTimeline({ progress }: { progress: MotionValue<number> }) {
  // The room darkens ring by ring, then eases at the reversal.
  const dim = useTransform(
    progress,
    [0, 0.7, 0.84, 1],
    [0, 0.5, 0.5, 0.12],
  );

  return (
    <div className="relative h-full w-full">
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ opacity: dim }}
      />

      {/* Persistent slate */}
      <div className="absolute inset-x-0 top-[12svh] flex justify-center px-6">
        <p className="eyebrow text-brass-400">What a missed call sounds like</p>
      </div>

      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6 sm:px-10">
        {BEATS.map((b, i) => (
          <Beat key={b.n} progress={progress} index={i}>
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-12">
              <span
                aria-hidden
                className="font-display text-[clamp(5rem,18vw,13rem)] font-light italic leading-none text-espresso-800"
              >
                {b.n}
              </span>
              <p className="font-display max-w-xl text-balance text-[clamp(1.7rem,3.6vw,3rem)] font-light leading-[1.12]">
                {b.text}
              </p>
            </div>
          </Beat>
        ))}

        {/* The loss */}
        <FadeBeat progress={progress} range={[0.72, 0.78, 0.84, 0.88]}>
          <div className="max-w-3xl border-l-2 border-oxblood-600 pl-6 sm:pl-10">
            <p className="font-display text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.06]">
              {LOSS.headline}
            </p>
            <p className="mt-4 text-lg text-espresso-300">{LOSS.sub}</p>
          </div>
        </FadeBeat>

        {/* The reversal — fades in and stays */}
        <FadeBeat progress={progress} range={[0.9, 0.96, 0.995, 1]} hold>
          <div className="max-w-3xl">
            <p className="font-display headline-glow text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-light italic leading-[1.04] text-brass-400">
              {REVERSAL.headline}
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-espresso-300">
              {REVERSAL.sub}
            </p>
          </div>
        </FadeBeat>
      </div>
    </div>
  );
}

/** One numbered ring beat: crossfades through its window with a slow rise. */
function Beat({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: React.ReactNode;
}) {
  const start = 0.03 + index * 0.17;
  const end = start + 0.14;
  return (
    <FadeBeat progress={progress} range={[start, start + 0.05, end, end + 0.05]}>
      {children}
    </FadeBeat>
  );
}

function FadeBeat({
  progress,
  range,
  hold = false,
  children,
}: {
  progress: MotionValue<number>;
  /** [fadeInStart, fullyIn, holdUntil, fadeOutEnd] — strictly increasing. */
  range: [number, number, number, number];
  /** Keep the beat on screen at the end instead of fading out. */
  hold?: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, range, hold ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, range, hold ? [36, 0, 0, 0] : [36, 0, 0, -28]);
  return (
    <m.div className="absolute inset-x-6 sm:inset-x-10" style={{ opacity, y }}>
      {children}
    </m.div>
  );
}
