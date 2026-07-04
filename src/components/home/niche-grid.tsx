import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { niches } from "@/content/niches";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

/** Niche proof: speaks each trade's language, links to its dedicated page. */
export function NicheGrid() {
  return (
    <Section tone="warm">
      <SectionHeader
        kicker="Your trade, your calls"
        title="Not a generic bot. Built for how your phone actually rings."
        lede="Every industry gets its own setup: the emergencies, the questions, the booking flow, the vocabulary."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {niches.map((niche, i) => (
          <Reveal key={niche.slug} delay={i * 0.05}>
            <Link
              href={`/industries/${niche.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift focus-visible:outline-2 focus-visible:outline-ring"
            >
              <h3 className="font-display text-base font-bold">{niche.name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {niche.homeHook}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-flame-600">
                See how it answers
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </Reveal>
        ))}
        <Reveal delay={niches.length * 0.05}>
          <Link
            href="/industries"
            className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-input p-5 text-center transition-colors hover:border-flame-500 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span className="font-display text-base font-bold">
              Another trade?
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              See all industries →
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
