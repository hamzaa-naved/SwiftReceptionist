import Link from "next/link";
import { niches } from "@/content/niches";

/**
 * Trust strip as a quiet editorial masthead line. No fake logos — the
 * trades we're built for, set in refined tracked caps. Swap for real
 * client marks once permission exists.
 */
export function ProofStrip() {
  return (
    <div className="border-y border-line bg-ivory">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-7 sm:px-10">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-espresso-500">
          Purpose-built for
        </p>
        {niches.map((n) => (
          <Link
            key={n.slug}
            href={`/industries/${n.slug}`}
            className="font-display text-lg italic text-espresso-700 transition-colors hover:text-brass-500"
          >
            {n.shortName}
          </Link>
        ))}
      </div>
    </div>
  );
}
