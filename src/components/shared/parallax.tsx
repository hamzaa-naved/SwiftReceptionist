"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Vertical parallax driven by scroll position. `speed` is the fraction of
 * the travel range the element drifts (negative = moves up faster).
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y }}>{children}</m.div>
    </div>
  );
}
