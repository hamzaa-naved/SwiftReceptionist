import Link from "next/link";
import { niches } from "@/content/niches";

/**
 * Social-proof strip. We don't have client logos yet and won't fake them —
 * so this strip earns trust with specificity instead: the trades we're
 * built for. Swap in a logo row here once real clients agree to be shown
 * (slot is ready in the layout below).
 */
export function ProofStrip() {
  return (
    <div className="border-b border-border bg-paper-warm">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Purpose-built for
        </p>
        {niches.map((n) => (
          <Link
            key={n.slug}
            href={`/industries/${n.slug}`}
            className="text-sm font-semibold text-ink-700 underline-offset-4 transition-colors hover:text-flame-600 hover:underline"
          >
            {n.name}
          </Link>
        ))}
        {/* [PLACEHOLDER] Replace this strip with real client logos/stats once
            you have permission to show them. Never fake this. */}
      </div>
    </div>
  );
}
