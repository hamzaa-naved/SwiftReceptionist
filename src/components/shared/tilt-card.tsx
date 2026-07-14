"use client";

import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 260, damping: 24, mass: 0.8 };

/**
 * Apple-feel 3D tilt: the card leans a few degrees toward the pointer
 * with a moving specular highlight, and settles back on leave. Pure CSS
 * transforms driven by springs — pointer-only, inert on touch and under
 * reduced motion.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 5,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  maxTilt?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, SPRING);
  const ry = useSpring(0, SPRING);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * maxTilt * 2);
        rx.set(-py * maxTilt * 2);
        el.style.setProperty("--tilt-x", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--tilt-y", `${(py + 0.5) * 100}%`);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
      {/* moving specular highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--tilt-x,50%)_var(--tilt-y,50%),rgb(255_255_255/0.55),transparent_60%)] group-hover:opacity-100"
      />
    </m.div>
  );
}
