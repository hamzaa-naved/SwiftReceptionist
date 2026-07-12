import Link from "next/link";
import { niches } from "@/content/niches";

/**
 * Trust strip. No client logos yet and we won't fake them — earn trust
 * with specificity: the trades we're built for, as a mono ticker row.
 * Swap in real logos here once clients agree to be shown.
 */
export function ProofStrip() {
  return (
    <div className="border-b border-border bg-concrete-100">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 sm:px-8">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-graphite-500">
          Purpose-built for
        </p>
        {niches.map((n) => (
          <Link
            key={n.slug}
            href={`/industries/${n.slug}`}
            className="font-display text-sm font-semibold uppercase tracking-wide text-graphite-700 transition-colors hover:text-graphite-950"
          >
            {n.shortName}
          </Link>
        ))}
        {/* [PLACEHOLDER] Replace with real client logos/stats once you have
            permission to show them. Never fake this. */}
      </div>
    </div>
  );
}
