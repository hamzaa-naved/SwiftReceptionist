"use client";

import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ScriptTurn } from "@/content/niches/types";

/**
 * A realistic call rendered as a dispatch call log. Proof-by-example:
 * skeptical owners don't believe adjectives, they believe a call that
 * sounds like their Tuesday night.
 *
 * Lines play out in sequence when the log scrolls into view (variant
 * structure always present so SSR-hidden rows are un-hidden even under
 * reduced motion, which just zeroes the timings).
 */
export function CallTranscript({
  scenario,
  turns,
  className,
}: {
  scenario: string;
  turns: ScriptTurn[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  const list = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.28, delayChildren: 0.15 },
    },
  };
  const row = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.4, ease: [0.21, 0.65, 0.35, 1] as const },
    },
  };

  return (
    <figure
      className={cn(
        "overflow-hidden border border-graphite-800 bg-graphite-950",
        className,
      )}
    >
      <figcaption className="flex items-center gap-2.5 border-b border-graphite-800 px-5 py-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-live-500" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-live-500" />
        </span>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-graphite-300">
          Call log · {scenario}
        </span>
      </figcaption>
      <m.div
        className="space-y-3 px-5 py-6"
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {turns.map((turn, i) => (
          <m.div
            key={i}
            variants={row}
            className={cn(
              "flex",
              turn.speaker === "ai" ? "justify-start" : "justify-end",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] px-4 py-2.5 text-sm leading-relaxed",
                turn.speaker === "ai"
                  ? "border-l-2 border-volt-400 bg-graphite-800 text-concrete-50"
                  : "border-r-2 border-graphite-500 bg-graphite-900 text-graphite-300",
              )}
            >
              <span
                className={cn(
                  "mb-1 block font-mono text-[10px] font-medium uppercase tracking-[0.15em]",
                  turn.speaker === "ai" ? "text-volt-400" : "text-graphite-500",
                )}
              >
                {turn.speaker === "ai" ? "Swift Receptionist" : "Caller"}
              </span>
              {turn.text}
            </div>
          </m.div>
        ))}
      </m.div>
      <p className="border-t border-graphite-800 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-graphite-500">
        Example conversation — scripts are tailored to your business during setup
      </p>
    </figure>
  );
}
