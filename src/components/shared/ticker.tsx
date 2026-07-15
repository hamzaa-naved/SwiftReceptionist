import { cn } from "@/lib/utils";

/**
 * Infinite marquee of short lines (call outcomes). Pure CSS animation —
 * the track holds two copies of the row and translates -50%; the global
 * reduced-motion block freezes it into a static strip. Pauses on hover.
 */
export function Ticker({
  items,
  className,
  itemClassName,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={i}
          className={cn(
            "flex items-center gap-3 whitespace-nowrap px-6 text-[0.7rem] uppercase tracking-[0.12em]",
            itemClassName,
          )}
        >
          <span aria-hidden className="h-1 w-1 rounded-full bg-azure-500/70" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("ticker-mask", className)}>
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
