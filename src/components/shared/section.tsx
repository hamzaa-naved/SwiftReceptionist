import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";

/** Consistent section rhythm + optional graphite (dark panel) treatment. */
export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "ink" | "warm";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        tone === "ink" && "bg-graphite-950 text-concrete-50",
        tone === "warm" && "bg-concrete-100",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/**
 * Dispatch-board section header: volt tab bar + LED/mono kicker +
 * condensed uppercase title. Left-anchored by default — the whole
 * system reads like a job ticket, not centered marketing sections.
 */
export function SectionHeader({
  kicker,
  title,
  lede,
  tone = "default",
  align = "left",
}: {
  kicker?: string;
  title: string;
  lede?: string;
  tone?: "default" | "ink";
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" &&
          cn(
            "max-w-2xl border-l-[3px] pl-5",
            tone === "ink" ? "border-volt-400" : "border-graphite-950",
          ),
      )}
    >
      {kicker && (
        <p
          className={cn(
            "streak-lines mb-3 text-xs font-medium uppercase tracking-[0.18em]",
            align === "center" && "justify-center",
            tone === "ink" ? "text-graphite-300" : "text-graphite-700",
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-balance text-4xl font-bold uppercase leading-[0.98] sm:text-5xl",
          tone === "ink" ? "text-concrete-50" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 max-w-xl text-lg leading-relaxed",
            tone === "ink" ? "text-graphite-300" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
