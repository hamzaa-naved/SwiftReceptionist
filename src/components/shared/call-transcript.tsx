"use client";

import { m, useReducedMotion } from "motion/react";
import { PhoneIncoming } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScriptTurn } from "@/content/niches/types";

/**
 * A realistic call rendered as a transcript. This is proof-by-example:
 * skeptical owners don't believe adjectives, they believe a call that
 * sounds like their Tuesday morning.
 *
 * The bubbles play out in sequence when the transcript scrolls into view —
 * the conversation "happens" in front of the visitor instead of sitting
 * there as a block. Reduced-motion renders everything statically.
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

  // The variant structure stays in place for everyone (SSR renders the
  // hidden state, so whileInView must always fire to un-hide); reduced
  // motion just zeroes the timings so the transcript appears instantly.
  const list = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.28, delayChildren: 0.15 },
    },
  };
  const bubble = {
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
        "overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 shadow-lift",
        className,
      )}
    >
      <figcaption className="flex items-center gap-2.5 border-b border-ink-800 px-5 py-3.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-flame-500" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-flame-500" />
        </span>
        <PhoneIncoming className="h-4 w-4 text-ink-300" aria-hidden />
        <span className="text-sm font-medium text-ink-300">{scenario}</span>
      </figcaption>
      <m.div
        className="space-y-3.5 px-5 py-6"
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {turns.map((turn, i) => (
          <m.div
            key={i}
            variants={bubble}
            className={cn(
              "flex",
              turn.speaker === "ai" ? "justify-start" : "justify-end",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                turn.speaker === "ai"
                  ? "rounded-bl-sm bg-ink-800 text-paper"
                  : "rounded-br-sm bg-flame-500/15 text-flame-100",
              )}
            >
              <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wider opacity-60">
                {turn.speaker === "ai" ? "Swift Receptionist" : "Caller"}
              </span>
              {turn.text}
            </div>
          </m.div>
        ))}
      </m.div>
      <p className="border-t border-ink-800 px-5 py-3 text-xs text-ink-300">
        Example conversation — scripts are tailored to your business during
        setup.
      </p>
    </figure>
  );
}
