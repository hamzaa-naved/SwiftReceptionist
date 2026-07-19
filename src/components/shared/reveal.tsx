"use client";

import { m, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { EASE_CRISP as EASE } from "@/lib/motion";

/**
 * Scroll-reveal: content resolves into focus as it enters — a weighted
 * rise, a whisper of scale, and a blur that clears fast. The signature
 * "assembles as you scroll" feel of the DAYLIGHT system.
 *
 * The blur is animated as a discrete keyframe track so it clears on the
 * first ~45% of the timeline (content reads sharp almost immediately),
 * while position and opacity ride the full crisp curve.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.985, filter: "blur(10px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-96px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: EASE,
        filter: { duration: 0.5, delay, ease: EASE },
      }}
    >
      {children}
    </m.div>
  );
}
