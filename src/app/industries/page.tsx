import type { Metadata } from "next";
import { ArrowRight, TreePine, Warehouse, Waves, Wrench, Zap } from "lucide-react";
import Link from "next/link";
import { niches } from "@/content/niches";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/shared/final-cta";

export const metadata: Metadata = {
  title: "Industries We Answer For",
  description:
    "AI receptionists built for the way local service businesses actually get calls: electrical, garage door, tree service, well & pump, self-storage, and more.",
  alternates: { canonical: `${site.url}/industries` },
};

const icons = {
  zap: Zap,
  wrench: Wrench,
  "tree-pine": TreePine,
  waves: Waves,
  warehouse: Warehouse,
} as const;

export default function IndustriesPage() {
  return (
    <>
      <Section className="pt-32 md:pt-40 pb-8 md:pb-10">
        <SectionHeader
          kicker="Industries"
          title="Built for businesses that work with their hands full."
          lede="A generic answering bot doesn't know a torsion spring from a drain field. We set up your receptionist for your trade, your calls, your emergencies."
          align="center"
        />
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {niches.map((niche, i) => {
            const Icon = icons[niche.icon];
            return (
              <Reveal key={niche.slug} delay={i * 0.06}>
                <Link
                  href={`/industries/${niche.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lift focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-flame-50">
                    <Icon className="h-5 w-5 text-flame-600" aria-hidden />
                  </div>
                  <h2 className="font-display text-lg font-bold">{niche.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {niche.homeHook}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-600">
                    See the {niche.shortName.toLowerCase()} page
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={niches.length * 0.06}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-input bg-paper-warm p-6 text-center">
              <h2 className="font-display text-lg font-bold">
                Don&apos;t see your trade?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                If your business lives and dies by inbound calls, we can build
                for it. Tell us what you do.
              </p>
              <Link
                href="/contact"
                className="mt-4 text-sm font-semibold text-flame-600 underline-offset-4 hover:underline"
              >
                Ask us about your industry →
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
      <FinalCta
        title="Every trade has the same phone problem."
        lede="Missed calls become someone else's booked jobs. Fifteen minutes on a call and we'll show you how to close the leak."
        location="industries_index"
      />
    </>
  );
}
