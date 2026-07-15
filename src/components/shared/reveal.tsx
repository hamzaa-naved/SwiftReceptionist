"use client";

import { m, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { EASE_LUXE as EASE } from "@/lib/motion";

/**
 * Scroll-reveal: a slow, weighted rise + fade with luxe easing. The
 * signature "assembles as you scroll" feel of the editorial system.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
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
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
