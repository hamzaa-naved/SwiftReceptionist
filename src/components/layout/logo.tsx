import { cn } from "@/lib/utils";

/**
 * Brand mark: a clean Geist wordmark with the "line open" dot — a small
 * signal-gradient point with a live pulse. Product-first, zero ornament.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "light" renders for dark grounds (rare in DAYLIGHT). */
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "light" ? "text-snow" : "text-carbon-950",
        className,
      )}
    >
      <span aria-hidden className="relative flex h-2.5 w-2.5">
        <span
          className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full"
          style={{ background: "rgb(10 132 255 / 0.5)" }}
        />
        <span
          className="relative inline-flex h-2.5 w-2.5 rounded-full"
          style={{ background: "linear-gradient(135deg, #0a84ff, #7c3aed)" }}
        />
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.02em]">
        Swift Receptionist
      </span>
    </span>
  );
}
