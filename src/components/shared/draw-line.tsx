"use client";

import { useRef, type RefObject } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * An SVG path that draws itself as it scrolls into view — the brass
 * filament connecting a sequence of acts. Reduced motion renders the
 * path fully drawn.
 */
export function DrawLine({
  path,
  viewBox,
  className,
  strokeWidth = 1.5,
  preserveAspectRatio = "none",
}: {
  path: string;
  viewBox: string;
  className?: string;
  strokeWidth?: number;
  preserveAspectRatio?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({
    // useScroll only reads getBoundingClientRect, which SVG roots provide
    target: ref as unknown as RefObject<HTMLElement>,
    offset: ["start 0.85", "end 0.35"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      fill="none"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <m.path
        d={path}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={reduceMotion ? undefined : { pathLength }}
      />
    </svg>
  );
}
