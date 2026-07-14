import Link from "next/link";
import { niches } from "@/content/niches";

/**
 * Night masthead under the cold open. No fake logos — the two trades
 * we're built deep for, set like a film credit. Swap for real client
 * marks once permission exists.
 */
export function ProofStrip() {
  return (
    <div className="border-y border-espresso-800/70 bg-night-990">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-7 sm:px-10">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-espresso-500">
          Built deep for
        </p>
        {niches.map((n) => (
          <Link
            key={n.slug}
            href={`/industries/${n.slug}`}
            className="font-display text-lg italic text-espresso-300 transition-colors duration-500 hover:text-brass-400"
          >
            {n.shortName}
          </Link>
        ))}
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-espresso-500">
          — not shallow for twenty
        </p>
      </div>
    </div>
  );
}
