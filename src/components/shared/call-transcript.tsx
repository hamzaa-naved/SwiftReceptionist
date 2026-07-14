"use client";

import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";
import type { ScriptTurn } from "@/content/niches/types";

/**
 * A real call, rendered as an editorial transcript — a printed record on
 * warm stock. Lines settle in one after another as it scrolls into view,
 * so the conversation "happens" in front of the reader. Reduced motion
 * renders it whole and still.
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
      transition: reduceMotion ? { staggerChildren: 0 } : { staggerChildren: 0.3, delayChildren: 0.1 },
    },
  };
  const row = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    visible: {
      opacity: 1, y: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE_LUXE },
    },
  };

  return (
    <figure className={cn("border border-line bg-ivory-raised", className)}>
      <figcaption className="flex items-center gap-3 border-b border-line px-6 py-4 text-[0.66rem] uppercase tracking-[0.22em] text-espresso-500">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-brass-500" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brass-500" />
        </span>
        {scenario}
      </figcaption>
      <m.div
        className="space-y-5 px-6 py-8"
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {turns.map((turn, i) => (
          <m.div key={i} variants={row}>
            <p
              className={cn(
                "text-[0.66rem] uppercase tracking-[0.2em]",
                turn.speaker === "ai" ? "text-brass-500" : "text-espresso-400",
              )}
            >
              {turn.speaker === "ai" ? "Swift Receptionist" : "Caller"}
            </p>
            <p
              className={cn(
                "mt-1.5 leading-relaxed",
                turn.speaker === "ai"
                  ? "font-display text-lg font-light text-espresso-950"
                  : "text-[0.98rem] text-espresso-600",
              )}
            >
              {turn.text}
            </p>
          </m.div>
        ))}
      </m.div>
      <p className="border-t border-line px-6 py-4 text-[0.66rem] uppercase tracking-[0.18em] text-espresso-400">
        Example conversation — scripts are tailored to your business during setup
      </p>
    </figure>
  );
}
