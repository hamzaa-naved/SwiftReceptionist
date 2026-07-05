import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";

/** Consistent section rhythm + optional dark ink treatment. */
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
        tone === "ink" && "bg-ink-950 text-paper",
        tone === "warm" && "bg-paper-warm",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/** Kicker + headline + optional lede, with the swift-streak motif. */
export function SectionHeader({
  kicker,
  title,
  lede,
  tone = "default",
  align = "center",
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
        align === "left" && "max-w-2xl",
      )}
    >
      {kicker && (
        <p
          className={cn(
            "streak-lines mb-3 text-sm font-semibold uppercase tracking-widest",
            tone === "ink" ? "text-flame-400" : "text-flame-600",
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-balance text-3xl font-bold leading-tight sm:text-4xl",
          tone === "ink" ? "text-paper" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "ink" ? "text-ink-300" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
