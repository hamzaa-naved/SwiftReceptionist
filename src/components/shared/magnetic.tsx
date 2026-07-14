"use client";

import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useSpring } from "motion/react";
import { SPRING_MAGNET } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper for primary CTAs: the child leans a few pixels toward
 * the pointer and springs back on leave. Pointer-only by nature (no
 * pointermove on touch) and fully inert under reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.25,
  max = 8,
  className,
}: {
  children: ReactNode;
  /** Fraction of the pointer's offset from center to follow. */
  strength?: number;
  /** Clamp in px. */
  max?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, SPRING_MAGNET);
  const y = useSpring(0, SPRING_MAGNET);

  if (reduceMotion) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  const clamp = (v: number) => Math.max(-max, Math.min(max, v));

  return (
    <m.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
