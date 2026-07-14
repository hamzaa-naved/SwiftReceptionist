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

/**
 * Kinetic headline: splits text into words (or provided lines) that rise
 * from a clipped baseline, one after another — the cinematic type moment.
 * Renders plain text for reduced motion.
 */
export function KineticText({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "p";
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-flex overflow-hidden pb-[0.12em] align-baseline"
          style={{ marginRight: "0.26em" }}
        >
          <m.span
            className={wordClassName}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.95,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
