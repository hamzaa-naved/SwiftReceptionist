import type { Metadata } from "next";
import Link from "next/link";
import { niches } from "@/content/niches";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { DawnCta } from "@/components/shared/dawn-cta";

export const metadata: Metadata = {
  title: "Industries We Answer For",
  description:
    "AI receptionists built deep for two trades — electrical contractors and garage door companies — trained on the calls, emergencies, and jobs of each.",
  alternates: { canonical: `${site.url}/industries` },
};

/**
 * TWO DOORS. Not a directory of tiles — two full doors, one per trade,
 * each opening onto a page that knows that trade cold. The narrowness
 * IS the pitch.
 */
export default function IndustriesPage() {
  const [electrical, garageDoor] = niches;

  return (
    <>
      <Section tone="night" className="pb-8 pt-32 md:pb-10 md:pt-40">
        <SectionHeader
          tone="ink"
          kicker="Industries"
          title="Two doors. Both answered."
          lede="A generic answering bot doesn't know a torsion spring from a tripped breaker. We build deep for two trades, so every caller hears someone who knows the work."
          align="center"
        />
      </Section>

      <Section tone="night" className="pt-0">
        <div className="grid gap-px overflow-hidden border border-espresso-800 bg-espresso-800 lg:grid-cols-2">
          {[electrical, garageDoor].map((niche, i) => (
            <Reveal key={niche.slug} delay={i * 0.1} className="h-full">
              <SpotlightCard className={i === 0 ? "h-full bg-night-990" : "h-full bg-espresso-900/40"}>
                <Link
                  href={`/industries/${niche.slug}`}
                  className="group flex h-full min-h-[26rem] flex-col justify-between p-9 sm:p-14"
                >
                  <div>
                    <span className={`text-[0.66rem] uppercase tracking-[0.26em] ${i === 0 ? "text-brass-400" : "text-espresso-300"}`}>
                      {i === 0 ? "The flagship trade" : "The proven second"}
                    </span>
                    <h2 className="font-display mt-6 text-4xl font-light leading-tight text-ivory sm:text-5xl">
                      {niche.name}
                    </h2>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-espresso-300">
                      {niche.homeHook}
                    </p>
                    <ul className="mt-8 space-y-2.5 text-[0.95rem] text-espresso-300">
                      {niche.emergencies.slice(0, 3).map((e) => (
                        <li key={e} className="flex items-baseline gap-3">
                          <span aria-hidden className="text-brass-400">—</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-12 inline-flex items-center gap-2 text-sm text-brass-400">
                    See how it answers for {niche.shortName.toLowerCase()}
                    <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-espresso-500">
          A different trade that lives on inbound calls?{" "}
          <Link href="/contact" className="link-underline text-espresso-300">
            Tell us what you do →
          </Link>
        </p>
      </Section>

      <DawnCta
        title="Every trade has the same phone problem."
        italicLine="Yours doesn't have to."
        lede="Missed calls become someone else's booked jobs. Fifteen minutes on a call and we'll show you how to close the leak."
        location="industries_index"
      />
    </>
  );
}
