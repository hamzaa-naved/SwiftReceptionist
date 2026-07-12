import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { niches } from "@/content/niches";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * Niche proof as panel switches: the two featured trades (registry
 * front) get the big breakers; the rest sit as smaller circuits below.
 */
export function NicheGrid() {
  const featured = niches.slice(0, 2);
  const rest = niches.slice(2);

  return (
    <Section tone="warm">
      <SectionHeader
        kicker="Your trade, your calls"
        title="Not a generic bot. Built for how your phone rings."
        lede="Every industry gets its own setup: the emergencies, the questions, the booking flow, the vocabulary."
      />

      {/* Featured trades */}
      <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {featured.map((niche, i) => (
          <Reveal key={niche.slug} delay={i * 0.06} className="h-full">
            <Link
              href={`/industries/${niche.slug}`}
              className="group flex h-full flex-col bg-graphite-950 p-6 text-concrete-50 transition-colors hover:bg-graphite-900 focus-visible:outline-2 focus-visible:outline-ring sm:p-8"
            >
              <span className="mb-4 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-volt-400">
                <span className="h-2 w-2 bg-volt-400" />
                {i === 0 ? "Primary trade" : "Proven trade"}
              </span>
              <h3 className="font-display text-2xl font-bold uppercase leading-none">
                {niche.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite-300">
                {niche.homeHook}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.1em] text-volt-400">
                See how it answers
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Secondary trades */}
      <div className="mt-px grid gap-px overflow-hidden border border-t-0 border-border bg-border sm:grid-cols-3">
        {rest.map((niche, i) => (
          <Reveal key={niche.slug} delay={0.12 + i * 0.05} className="h-full">
            <Link
              href={`/industries/${niche.slug}`}
              className={cn(
                "group flex h-full flex-col bg-card p-5 transition-colors hover:bg-concrete-50 focus-visible:outline-2 focus-visible:outline-ring",
              )}
            >
              <h3 className="font-display text-lg font-bold uppercase leading-none">
                {niche.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {niche.homeHook}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-graphite-700">
                Open
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </Reveal>
        ))}
        <Reveal delay={0.3} className="h-full">
          <Link
            href="/contact"
            className="flex h-full flex-col justify-center bg-card p-5 text-center transition-colors hover:bg-concrete-50 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span className="font-display text-lg font-bold uppercase">
              Another trade?
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              If your business lives on inbound calls, we can build for it →
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
