import { cn } from "@/lib/utils";

/**
 * Brand mark: a volt bolt on a graphite panel square — the answered
 * call as a live circuit. Echoes the square LED used as the section
 * kicker device. Pure SVG, crisp at any size.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <rect x="0" y="0" width="32" height="32" rx="3" className="fill-graphite-950" />
      <rect x="2" y="2" width="28" height="28" rx="2" className="stroke-graphite-800" strokeWidth="1.5" fill="none" />
      <path
        d="M17.8 5.5 9.5 17.5h6l-1.3 9 8.3-12h-6z"
        className="fill-volt-400"
      />
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "light" renders the wordmark for dark backgrounds */
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-xl font-bold uppercase tracking-wide",
          tone === "light" ? "text-concrete-50" : "text-foreground",
        )}
      >
        Swift{" "}
        <span className={tone === "light" ? "text-volt-400" : "text-graphite-500"}>
          Receptionist
        </span>
      </span>
    </span>
  );
}
