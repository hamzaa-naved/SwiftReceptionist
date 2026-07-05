"use client";

import { LazyMotion, domAnimation } from "motion/react";
import { type ReactNode } from "react";

/**
 * App-wide LazyMotion: components animate via `m.*` (not `motion.*`),
 * so the full animation runtime is code-split and only the small
 * domAnimation feature set ships in the first-load bundle. `strict`
 * throws in dev if anyone accidentally imports `motion.*` again.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
