import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wrench, Zap } from "lucide-react";
import { niches } from "@/content/niches";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TiltCard } from "@/components/shared/tilt-card";
import { FinalCta } from "@/components/shared/final-cta";

export const metadata: Metadata = {
  title: "Industries We Answer For",
  description:
    "AI receptionists built deep for two trades — electrical contractors and garage door companies — trained on the calls, emergencies, and jobs of each.",
  alternates: { canonical: `${site.url}/industries` },
};

const icons = { zap: Zap, wrench: Wrench } as const;

/** Two trades, two doors. The narrowness IS the pitch. */
export default function IndustriesPage() {
  return (
    <>
      <Section className="pb-6 pt-32 md:pb-8 md:pt-40">
        <SectionHeader
          kicker="Industries"
          title="Two trades. Known cold."
          lede="A generic answering bot doesn't know a torsion spring from a tripped breaker. We build deep for two trades, so every caller hears someone who knows the work."
          align="center"
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          {niches.map((niche, i) => {
            const Icon = icons[niche.icon];
            return (
              <Reveal key={niche.slug} delay={i * 0.08} className="h-full">
                <TiltCard className="group relative h-full rounded-3xl">
                  <Link
                    href={`/industries/${niche.slug}`}
                    className="flex h-full min-h-[24rem] flex-col rounded-3xl border border-line bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift sm:p-12"
                  >
                    <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cloud">
                      <Icon className="h-6 w-6 text-azure-600" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="eyebrow text-carbon-400">
                      {i === 0 ? "The flagship trade" : "The proven second"}
                    </span>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-carbon-950 sm:text-4xl">
                      {niche.name}
                    </h2>
                    <p className="mt-4 max-w-md flex-1 text-lg leading-relaxed text-carbon-600">
                      {niche.homeHook}
                    </p>
                    <ul className="mt-6 space-y-2.5 text-sm text-carbon-600">
                      {niche.emergencies.slice(0, 3).map((e) => (
                        <li key={e} className="flex items-baseline gap-2.5">
                          <span aria-hidden className="mt-1 h-1 w-1 shrink-0 rounded-full bg-azure-600" />
                          {e}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-9 inline-flex items-center gap-1.5 text-sm font-medium text-azure-600">
                      See how it answers for {niche.shortName.toLowerCase()}
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

      <FinalCta
        title="Every trade has the same phone problem."
        lede="Missed calls become someone else's booked jobs. Fifteen minutes on a call and we'll show you how to close the leak."
        location="industries_index"
      />
    </>
  );
}
