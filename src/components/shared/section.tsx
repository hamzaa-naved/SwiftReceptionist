import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";

/**
 * Section rhythm with generous editorial air. Midnight Cinema tones:
 * "night" is the deepest ground between scenes, "ink" a raised espresso
 * scene, "dawn" the rare lit "morning" beat, "warm" a recessed light
 * panel (legacy light pages).
 */
export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "ink" | "warm" | "night" | "dawn" | "cloud";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-36",
        tone === "ink" && "bg-espresso-950 text-ivory",
        tone === "warm" && "bg-ivory-deep",
        tone === "night" && "bg-night-990 text-ivory",
        tone === "dawn" && "bg-ivory text-espresso-950",
        tone === "cloud" && "bg-cloud text-carbon-950",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>
    </section>
  );
}

/**
 * Editorial section header: a numbered eyebrow + large Fraunces headline
 * with a serif lede. Left-anchored, generous, magazine-like.
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
        "mb-14 md:mb-20",
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" && "max-w-3xl",
      )}
    >
      {kicker && (
        <p
          className={cn(
            "eyebrow mb-6",
            align === "center" && "justify-center",
            tone === "ink" ? "text-brass-400" : "text-brass-500",
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-balance text-[2.6rem] font-medium leading-[1.02] sm:text-6xl",
          tone === "ink" ? "text-ivory" : "text-espresso-950",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl",
            tone === "ink" ? "text-espresso-300" : "text-espresso-700",
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
