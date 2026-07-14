import { cn } from "@/lib/utils";

/**
 * The soft signal-gradient bloom that sits behind product objects — the
 * one place the azure→violet gradient is allowed to glow. Pure CSS, with
 * a slow breathing scale (frozen by the global reduced-motion rule).
 */
export function Aura({
  className,
  intensity = 0.35,
}: {
  className?: string;
  /** 0–1 opacity ceiling of the bloom. */
  intensity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "aura-breathe pointer-events-none absolute inset-[-18%] rounded-full blur-3xl",
        className,
      )}
      style={{
        opacity: intensity,
        background:
          "radial-gradient(50% 50% at 50% 50%, rgb(10 132 255 / 0.55) 0%, rgb(124 58 237 / 0.35) 45%, transparent 72%)",
      }}
    />
  );
}
