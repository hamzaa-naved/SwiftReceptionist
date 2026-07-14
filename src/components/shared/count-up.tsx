"use client";

import { useEffect, useState } from "react";
import { useSpring, useTransform, m, useReducedMotion } from "motion/react";
import { SPRING_SOFT } from "@/lib/motion";

/**
 * Serif-friendly animated number: springs toward `value` whenever it
 * changes and renders through `format`. The animated span is aria-hidden
 * with an sr-only live value beside it, and reduced motion jumps straight
 * to the target.
 */
export function CountUp({
  value,
  format = (n) => Math.round(n).toLocaleString("en-US"),
  className,
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const spring = useSpring(value, SPRING_SOFT);
  const text = useTransform(spring, (v) => format(v));
  // Spring output only streams post-hydration; keep SSR/first paint exact.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
    if (reduceMotion) spring.jump(value);
    else spring.set(value);
  }, [value, reduceMotion, spring]);

  return (
    <span className={className}>
      <m.span aria-hidden>{hydrated ? text : format(value)}</m.span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
