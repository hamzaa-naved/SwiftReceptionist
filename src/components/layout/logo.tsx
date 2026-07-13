import { cn } from "@/lib/utils";

/**
 * Brand mark: a serif monogram "S" inside a hairline circle — an
 * editorial maker's-mark. Understated, luxe, and legible at any size.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <circle cx="20" cy="20" r="19" className="stroke-current" strokeWidth="1" opacity="0.4" />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-current"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "22px",
          fontStyle: "italic",
          fontWeight: 500,
        }}
      >
        S
      </text>
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "light" renders for dark grounds */
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        tone === "light" ? "text-ivory" : "text-espresso-950",
        className,
      )}
    >
      <LogoMark />
      <span className="font-display text-[19px] font-medium leading-none tracking-tight">
        Swift{" "}
        <span className="italic text-brass-500">Receptionist</span>
      </span>
    </span>
  );
}
