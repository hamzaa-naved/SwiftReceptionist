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
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label="Before you go"
      tabIndex={-1}
      className="fixed bottom-6 right-6 z-50 hidden w-96 animate-in fade-in slide-in-from-bottom-4 border border-espresso-700 bg-espresso-950 p-7 text-ivory shadow-lift duration-500 focus-visible:outline-2 focus-visible:outline-ring md:block"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-3 rounded-[2px] p-1.5 text-espresso-500 hover:bg-espresso-800 hover:text-ivory focus-visible:outline-2 focus-visible:outline-ring"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
      <p className="font-display text-2xl font-light italic leading-snug">
        Still reading? The demo talks.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-espresso-300">
        Sixty seconds, no form, no sales call. Just hear what your customers
        would hear.
      </p>
      <Button
        asChild
        className="mt-5 w-full bg-ivory text-espresso-950 hover:bg-brass-100"
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
