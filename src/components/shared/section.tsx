import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";

/** Section rhythm. DAYLIGHT tones: snow (default) or cloud. */
export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "cloud";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-32",
        tone === "cloud" && "bg-cloud text-carbon-950",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>
    </section>
  );
}

/** Section header: tracked-caps kicker + colossal Geist headline. */
export function SectionHeader({
  kicker,
  title,
  lede,
  align = "left",
}: {
  kicker?: string;
  title: string;
  lede?: string;
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
            "eyebrow mb-5 text-azure-600",
            align === "center" && "justify-center",
          )}
        >
          {kicker}
        </p>
      )}
      <h2 className="font-display text-balance text-[2.5rem] leading-[1.03] text-carbon-950 sm:text-6xl">
        {title}
      </h2>
      {lede && (
        <p className={cn("mt-5 max-w-2xl text-lg leading-relaxed text-carbon-600 sm:text-xl", align === "center" && "mx-auto")}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}
