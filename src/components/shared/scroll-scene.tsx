"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A pinned cinematic scene. The outer section is `length` viewports tall;
 * the inner viewport sticks while the reader scrolls through it, and the
 * children receive a 0→1 MotionValue to scrub their own timelines.
 * Native `position: sticky` — no scroll-jacking, composes with Lenis.
 */
export function ScrollScene({
  length = 3,
  className,
  viewportClassName,
  children,
}: {
  /** Scene duration in viewport-heights of scroll. */
  length?: number;
  className?: string;
  viewportClassName?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className={cn("relative", className)}
      style={{ height: `${length * 100}svh` }}
    >
      <div
        className={cn(
          "sticky top-0 flex h-svh items-center overflow-hidden",
          viewportClassName,
        )}
      >
        {children(scrollYProgress)}
      </div>
    </section>
  );
}
