import { cn } from "@/lib/utils";

/**
 * Brand mark: a phone-handset dot trailed by speed lines — "the call,
 * answered fast". Pure SVG so it's crisp at any size and costs nothing.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <rect x="0" y="0" width="32" height="32" rx="9" className="fill-ink-950" />
      <path
        d="M4.5 11.5h9"
        className="stroke-flame-500"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M4.5 16h6.5"
        className="stroke-flame-500"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M4.5 20.5h4"
        className="stroke-flame-500"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M18.2 9.6c.5-.9 1.6-1.3 2.5-.8l2.6 1.4c.9.5 1.3 1.5.9 2.4l-.7 1.7a1.9 1.9 0 0 1-2 1.1c.1 1.5.6 2.9 1.5 4.1a1.9 1.9 0 0 1 2.3-.2l1.5 1.1c.8.6 1 1.7.5 2.6l-1.4 2.5c-.5.9-1.6 1.3-2.5.8-4.9-2.7-7.8-8-7.3-13.6.1-1 .8-1.8 1.7-2l.4-1.1Z"
        className="fill-paper"
        transform="translate(2.2 0)"
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
          "font-display text-lg font-bold tracking-tight",
          tone === "light" ? "text-paper" : "text-foreground",
        )}
      >
        Swift
        <span className={tone === "light" ? "text-flame-400" : "text-flame-600"}>
          {" "}
          Receptionist
        </span>
      </span>
    </span>
  );
}
