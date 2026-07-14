import Link from "next/link";
import { niches } from "@/content/niches";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

/**
 * Niche proof as an editorial index: the two featured trades as large
 * plates, the rest as a refined list of entries.
 */
export function NicheGrid() {
  const featured = niches.slice(0, 2);
  const rest = niches.slice(2);

  return (
    <Section tone="warm">
      <SectionHeader
        kicker="No. 06 — Your trade"
        title="Not a generic bot. Built for how your phone actually rings."
        lede="Every industry gets its own setup: the emergencies, the questions, the booking flow, the vocabulary."
      />

      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {featured.map((niche, i) => (
          <Reveal key={niche.slug} delay={i * 0.1} className="h-full">
            <Link
              href={`/industries/${niche.slug}`}
              className="group flex h-full flex-col justify-between bg-espresso-950 p-9 text-ivory transition-colors duration-500 hover:bg-espresso-900 sm:p-12"
            >
              <div>
                <span className="text-[0.66rem] uppercase tracking-[0.26em] text-brass-400">
                  {i === 0 ? "Primary trade" : "Proven trade"}
                </span>
                <h3 className="font-display mt-6 text-3xl font-light leading-tight sm:text-4xl">
                  {niche.name}
                </h3>
                <p className="mt-4 max-w-sm leading-relaxed text-espresso-300">
                  {niche.homeHook}
                </p>
              </div>
              <span className="mt-10 inline-flex items-center gap-2 text-sm text-brass-400">
                See how it answers
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {rest.length > 0 && (
      <div className="mt-px overflow-hidden border border-t-0 border-line">
        {rest.map((niche, i) => (
          <Reveal key={niche.slug} delay={0.12 + i * 0.06}>
            <Link
              href={`/industries/${niche.slug}`}
              className="group flex items-baseline justify-between gap-6 border-b border-line bg-ivory px-6 py-6 transition-colors duration-500 last:border-b-0 hover:bg-ivory-raised sm:px-10"
            >
              <span className="font-display text-xl font-medium sm:text-2xl">
                {niche.name}
              </span>
              <span className="hidden flex-1 border-b border-dotted border-line/80 sm:block" />
              <span className="hidden max-w-xs text-sm text-espresso-500 md:block">
                {niche.homeHook}
              </span>
              <span className="text-brass-500 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      )}
    </Section>
  );
}
