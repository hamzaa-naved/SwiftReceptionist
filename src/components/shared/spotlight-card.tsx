"use client";

import { type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Dark panel with a pointer-tracked pool of warm brass light (the
 * `.spotlight-card` CSS does the drawing; this just feeds it pointer
 * coordinates via custom properties). Hover-only, so touch and
 * reduced-motion users simply see the panel.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <div className={cn("spotlight-card", className)} onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
