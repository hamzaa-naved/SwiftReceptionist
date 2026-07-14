import type { Metadata } from "next";
import { ArrowRight, Wrench, Zap } from "lucide-react";
import Link from "next/link";
import { niches } from "@/content/niches";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/shared/final-cta";

export const metadata: Metadata = {
  title: "Industries We Answer For",
  description:
    "AI receptionists built deep for two trades — electrical contractors and garage door companies — trained on the calls, emergencies, and jobs of each.",
  alternates: { canonical: `${site.url}/industries` },
};

const icons = {
  zap: Zap,
  wrench: Wrench,
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
        <div className="grid gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {niches.map((niche, i) => {
            const Icon = icons[niche.icon];
            return (
              <Reveal key={niche.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/industries/${niche.slug}`}
                  className="group flex h-full flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-raised"
                >
                  <div className="mb-6 inline-flex h-11 w-11 items-center justify-center border border-line bg-ivory-raised">
                    <Icon className="h-5 w-5 text-brass-500" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h2 className="font-display text-2xl font-medium leading-tight">{niche.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-espresso-700">
                    {niche.homeHook}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-brass-500">
                    See the {niche.shortName.toLowerCase()} page
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={niches.length * 0.06} className="h-full">
            <div className="flex h-full flex-col justify-center bg-ivory-deep p-8 text-center">
              <h2 className="font-display text-2xl font-medium">
                Don&apos;t see your trade?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-espresso-700">
                If your business lives and dies by inbound calls, we can build
                for it. Tell us what you do.
              </p>
              <Link
                href="/contact"
                className="link-underline mx-auto mt-5 text-sm font-medium text-espresso-950"
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
