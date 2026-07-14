"use client";

import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { Check } from "lucide-react";
import { niches } from "@/content/niches";
import { ScrollScene } from "@/components/shared/scroll-scene";
import { Section } from "@/components/shared/section";
import { SPRING_POP, EASE_CRISP } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * THE SHOWPIECE — a real call, watched. A phone frame pins to the
 * viewport and the conversation plays out message by message as you
 * scroll, ending on the booking confirmation and the text the owner
 * gets. Scrubbing back rewinds it. Product first, no theater.
 */

const TURNS = niches[0].callScript.slice(0, 6);
// message events + confirmation + owner toast
const EVENTS = TURNS.length + 2;
const START = 0.06;
const SPAN = 0.82;

export function TranscriptScene() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Section tone="cloud">
        <SceneHeader />
        <div className="mx-auto mt-12 max-w-md">
          <Phone visible={EVENTS} />
        </div>
      </Section>
    );
  }

  return (
    <ScrollScene length={3.5} className="bg-cloud" viewportClassName="!items-start">
      {(progress) => <Timeline progress={progress} />}
    </ScrollScene>
  );
}

function SceneHeader() {
  return (
    <div className="text-center">
      <p className="eyebrow justify-center text-azure-600">Watch a call</p>
      <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-4xl text-carbon-950 sm:text-5xl">
        A 9 PM emergency, handled.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-carbon-600">
        A real script from the electrical setup. Scroll — the call plays.
      </p>
    </div>
  );
}

function Timeline({ progress }: { progress: MotionValue<number> }) {
  const [count, setCount] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.max(
      0,
      Math.min(EVENTS, Math.floor(((v - START) / SPAN) * EVENTS) + 1),
    );
    if (v < START) {
      setCount(0);
      return;
    }
    setCount(next);
  });

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden px-6 pt-[10svh]">
      <SceneHeader />
      <div className="relative mt-10 w-full max-w-md flex-1">
        <Phone visible={count} />
      </div>
    </div>
  );
}

/** The phone frame; shows the first `visible` events. */
function Phone({ visible }: { visible: number }) {
  const confirmVisible = visible > TURNS.length;
  const toastVisible = visible > TURNS.length + 1;

  return (
    <div className="relative mx-auto h-[62svh] max-h-[640px] w-full max-w-md">
      {/* Owner-notification toast, over the top of the phone */}
      <AnimatePresence>
        {toastVisible && (
          <m.div
            key="toast"
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", ...SPRING_POP }}
            className="absolute -top-3 left-1/2 z-10 w-[92%] -translate-x-1/2 rounded-2xl border border-line bg-white/95 p-4 shadow-float backdrop-blur"
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-carbon-400">
              Text to you · now
            </p>
            <p className="mt-1 text-sm font-medium text-carbon-950">
              ⚡ Emergency booked — 7:30 AM, 4519 Maple. Breaker won&apos;t
              reset, half house dark. Transcript inside.
            </p>
          </m.div>
        )}
      </AnimatePresence>

      <div className="flex h-full w-full flex-col overflow-hidden rounded-[40px] border border-line bg-white shadow-float">
        {/* Status bar */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="flex items-center gap-2.5 text-sm font-semibold text-carbon-950">
            <span
              aria-hidden
              className="inline-flex h-2 w-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #0a84ff, #7c3aed)" }}
            />
            {niches[0].scriptScenario}
          </span>
        </div>

        {/* Conversation */}
        <div className="flex flex-1 flex-col justify-end gap-3 overflow-hidden px-5 pb-5 pt-4">
          <AnimatePresence initial={false}>
            {TURNS.slice(0, Math.min(visible, TURNS.length)).map((turn, i) => (
              <m.div
                key={i}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.18 } }}
                transition={{ type: "spring", ...SPRING_POP }}
                className={cn("flex", turn.speaker === "ai" ? "justify-start" : "justify-end")}
              >
                <p
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.92rem] leading-relaxed",
                    turn.speaker === "ai"
                      ? "rounded-bl-md bg-cloud text-carbon-950"
                      : "rounded-br-md bg-azure-600 text-white",
                  )}
                >
                  {turn.text}
                </p>
              </m.div>
            ))}

            {confirmVisible && (
              <m.div
                key="confirm"
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.18 } }}
                transition={{ type: "spring", ...SPRING_POP }}
                className="mt-1 flex items-center gap-3 rounded-2xl border border-good/25 bg-good/5 px-4 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-good/15">
                  <Check className="h-4 w-4 text-good" strokeWidth={3} aria-hidden />
                </span>
                <p className="text-sm font-medium text-carbon-950">
                  Booked — tomorrow, 7:30 AM. Flagged as an emergency.
                </p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll hint until the scene starts */}
      <m.p
        aria-hidden
        className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-carbon-400"
        animate={{ opacity: visible === 0 ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE_CRISP }}
      >
        Keep scrolling
      </m.p>
    </div>
  );
}
