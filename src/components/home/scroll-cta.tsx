"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { track } from "@/lib/integrations/analytics";

const DISMISS_KEY = "sr-exit-cta-dismissed";

/**
 * Exit-intent CTA (desktop only — mobile already has the sticky bar).
 * Fires once per session when the cursor leaves through the top of the
 * viewport, i.e. heading for the back button or the URL bar.
 */
export function ScrollCta() {
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    // Pointer-precision check keeps this desktop-only.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null && e.clientY <= 0) {
        setShow(true);
        track("exit_cta_shown");
        document.removeEventListener("mouseout", onMouseOut);
      }
    };
    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  // Keyboard-complete: focus moves into the dialog when it appears,
  // Escape dismisses it.
  useEffect(() => {
    if (!show) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label="Before you go"
      tabIndex={-1}
      className="fixed bottom-6 right-6 z-50 hidden w-96 rounded-2xl border border-ink-800 bg-ink-950 p-6 text-paper shadow-lift focus-visible:outline-2 focus-visible:outline-ring md:block"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-3 rounded-md p-1.5 text-ink-500 hover:bg-ink-800 hover:text-paper focus-visible:outline-2 focus-visible:outline-ring"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
      <p className="font-display text-lg font-bold leading-snug">
        60 seconds. Talk to the AI before you decide anything.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-300">
        No form, no email, no sales call. Just hear what your customers would
        hear.
      </p>
      <Button
        asChild
        className="mt-4 w-full bg-flame-500 text-ink-950 hover:bg-flame-400"
        onClick={() => track("exit_cta_clicked")}
      >
        <TrackedLink
          event="cta_try_demo"
          eventProps={{ location: "exit_intent" }}
          href="/demo"
        >
          Try the live demo
        </TrackedLink>
      </Button>
    </div>
  );
}
