"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { m, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Link2, Check, TrendingDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { track } from "@/lib/integrations/analytics";
import { cn } from "@/lib/utils";

export interface RoiDefaults {
  missedCallsPerWeek: number;
  avgJobValue: number;
  closeRatePct: number;
}

const WEEKS_PER_MONTH = 4.33;

function formatUsd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

/**
 * The missed-call ROI calculator. Interactive, honest math, shareable via
 * URL params (?mc=&jv=&cr=). The single most persuasive asset on the site:
 * the visitor computes their own loss with their own numbers.
 */
export function RoiCalculator({
  defaults,
  className,
}: {
  defaults: RoiDefaults;
  className?: string;
}) {
  const [missedCalls, setMissedCalls] = useState(defaults.missedCallsPerWeek);
  const [jobValue, setJobValue] = useState(defaults.avgJobValue);
  const [closeRate, setCloseRate] = useState(defaults.closeRatePct);
  const [copied, setCopied] = useState(false);
  const trackedInteraction = useRef(false);

  // Shared links (?mc=&jv=&cr=) pre-fill the sliders. Read client-side so
  // pages using the calculator stay fully static.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const clamp = (raw: string | null, min: number, max: number) => {
      const n = Number(raw);
      return raw !== null && Number.isFinite(n)
        ? Math.min(max, Math.max(min, n))
        : undefined;
    };
    const mc = clamp(q.get("mc"), 1, 40);
    const jv = clamp(q.get("jv"), 50, 5000);
    const cr = clamp(q.get("cr"), 10, 90);
    // One-time sync with the URL (browser-only); keeps the page static.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mc !== undefined) setMissedCalls(mc);
    if (jv !== undefined) setJobValue(jv);
    if (cr !== undefined) setCloseRate(cr);
  }, []);

  const monthlyLoss = useMemo(
    () => Math.round(missedCalls * WEEKS_PER_MONTH * (closeRate / 100) * jobValue),
    [missedCalls, jobValue, closeRate],
  );
  const yearlyLoss = monthlyLoss * 12;

  const onInteract = () => {
    if (!trackedInteraction.current) {
      trackedInteraction.current = true;
      track("calculator_used");
    }
  };

  const copyShareLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mc", String(missedCalls));
    url.searchParams.set("jv", String(jobValue));
    url.searchParams.set("cr", String(closeRate));
    url.hash = "roi-calculator";
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      track("calculator_shared");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — ignore.
    }
  };

  return (
    <div
      id="roi-calculator"
      className={cn(
        "grid overflow-hidden rounded-2xl border border-border bg-card shadow-lift md:grid-cols-[1.1fr_1fr]",
        className,
      )}
    >
      <div className="space-y-8 p-6 sm:p-8">
        <CalcSlider
          label="Calls you can't answer per week"
          hint="Ringing out, voicemail, after-hours — be honest."
          value={missedCalls}
          onChange={(v) => {
            setMissedCalls(v);
            onInteract();
          }}
          min={1}
          max={40}
          step={1}
          format={(v) => `${v} calls`}
        />
        <CalcSlider
          label="Average job value"
          hint="Your typical ticket, not your biggest."
          value={jobValue}
          onChange={(v) => {
            setJobValue(v);
            onInteract();
          }}
          min={50}
          max={5000}
          step={50}
          format={(v) => formatUsd(v)}
        />
        <CalcSlider
          label="How many callers would've booked"
          hint="Callers are high intent — most shops close 40–70%."
          value={closeRate}
          onChange={(v) => {
            setCloseRate(v);
            onInteract();
          }}
          min={10}
          max={90}
          step={5}
          format={(v) => `${v}%`}
        />
      </div>

      <div className="flex flex-col justify-between gap-6 bg-ink-950 p-6 text-paper sm:p-8">
        <div>
          <p className="streak-lines text-sm font-semibold uppercase tracking-widest text-flame-400">
            <TrendingDown className="mr-1 inline h-4 w-4" aria-hidden />
            Leaking to voicemail
          </p>
          <p className="font-display mt-4 text-5xl font-bold tabular-nums tracking-tight text-flame-400">
            <AnimatedUsd value={monthlyLoss} />
            <span className="text-lg font-medium text-ink-300"> /month</span>
          </p>
          <p className="mt-2 text-ink-300">
            That&apos;s{" "}
            <strong className="font-semibold text-paper">
              {formatUsd(yearlyLoss)} a year
            </strong>{" "}
            in jobs going to whoever answered instead.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-ink-500">
            Math: {missedCalls} missed calls/week × {WEEKS_PER_MONTH} weeks ×{" "}
            {closeRate}% booking rate × {formatUsd(jobValue)} per job.
          </p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-flame-500 text-ink-950 hover:bg-flame-400"
          >
            <TrackedLink
              event="cta_book_call"
              eventProps={{ location: "roi_calculator" }}
              href="/contact"
            >
              Stop the leak — book a call
            </TrackedLink>
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={copyShareLink}
            className="border-ink-700 bg-transparent text-paper hover:bg-ink-800 hover:text-paper"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" aria-hidden /> Copied
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" aria-hidden /> Copy my numbers
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Spring count-up for the headline dollar figure. The animated span is
 * aria-hidden; a static sr-only value with aria-live announces one settled
 * number to screen readers instead of a stream of intermediate frames.
 */
function AnimatedUsd({ value }: { value: number }) {
  const reduceMotion = useReducedMotion();
  const spring = useSpring(value, { stiffness: 120, damping: 24 });
  const display = useTransform(spring, (v) => formatUsd(Math.round(v)));

  useEffect(() => {
    if (reduceMotion) spring.jump(value);
    else spring.set(value);
  }, [value, spring, reduceMotion]);

  return (
    <>
      <m.span aria-hidden>{display}</m.span>
      <span className="sr-only" aria-live="polite">
        {formatUsd(value)}
      </span>
    </>
  );
}

function CalcSlider({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <label className="text-sm font-semibold">{label}</label>
        <output className="font-display text-lg font-bold tabular-nums text-flame-600">
          {format(value)}
        </output>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{hint}</p>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        aria-label={label}
      />
    </div>
  );
}
