import Link from "next/link";
import { ArrowRight, Wrench, Zap } from "lucide-react";
import { niches } from "@/content/niches";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TiltCard } from "@/components/shared/tilt-card";

const icons = { zap: Zap, wrench: Wrench } as const;

/** Two trades, two doors. Depth over breadth — the layout says it. */
export function TwoTrades() {
  return (
    <Section id="industries">
      <SectionHeader
        kicker="Your trade"
        title="Two trades. Known cold."
        lede="Every setup knows the emergencies, the vocabulary, the job values, and the booking flow of your trade — because there are only two."
        align="center"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {niches.map((niche, i) => {
          const Icon = icons[niche.icon];
          return (
            <Reveal key={niche.slug} delay={i * 0.08} className="h-full">
              <TiltCard className="group relative h-full rounded-3xl">
                <Link
                  href={`/industries/${niche.slug}`}
                  className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift sm:p-10"
                >
                  <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cloud">
                    <Icon className="h-6 w-6 text-azure-600" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-carbon-950 sm:text-3xl">
                    {niche.name}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-carbon-600">
                    {niche.homeHook}
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-carbon-600">
                    {niche.emergencies.slice(0, 2).map((e) => (
                      <li key={e} className="flex items-baseline gap-2.5">
                        <span aria-hidden className="mt-1 h-1 w-1 shrink-0 rounded-full bg-azure-600" />
                        {e}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-azure-600">
                    See the {niche.shortName.toLowerCase()} setup
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-carbon-600">
        A different trade that lives on inbound calls?{" "}
        <Link href="/contact" className="link-underline font-medium text-azure-600">
          Tell us what you do →
        </Link>
      </p>
    </Section>
  );
}
