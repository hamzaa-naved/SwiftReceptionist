"use client";

import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";
import type { ScriptTurn } from "@/content/niches/types";

/**
 * A real call as a clean transcript card. Lines settle in one after
 * another as it scrolls into view; reduced motion renders it whole.
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
    <figure
      className={cn("rounded-3xl border border-line bg-white shadow-card", className)}
    >
      <figcaption
        className="flex items-center gap-3 border-b border-line px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-carbon-400"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-azure-500" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
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
                "text-[0.68rem] font-semibold uppercase tracking-[0.12em]",
                turn.speaker === "ai" ? "text-azure-600" : "text-carbon-400",
              )}
            >
              {turn.speaker === "ai" ? "Swift Receptionist" : "Caller"}
            </p>
            <p
              className={cn(
                "mt-1.5 leading-relaxed",
                turn.speaker === "ai"
                  ? "text-[1.02rem] font-medium text-carbon-950"
                  : "text-[0.95rem] text-carbon-600",
              )}
            >
              {turn.text}
            </p>
          </m.div>
        ))}
      </m.div>
      <p
        className="border-t border-line px-6 py-4 text-[0.68rem] uppercase tracking-[0.1em] text-carbon-400"
      >
        Example conversation — scripts are tailored to your business during setup
      </p>
    </figure>
  );
}
