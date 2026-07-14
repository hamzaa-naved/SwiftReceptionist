import Link from "next/link";
import { niches } from "@/content/niches";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";

/**
 * TWO TRADES, ONE PROMISE — no grid of tiles, two doors. Electrical is
 * the marquee panel; garage door the proven second. Depth over breadth
 * is the pitch, so the layout says it before the copy does.
 */
export function TwoTrades() {
  const [electrical, garageDoor] = niches;

  return (
    <Section tone="night">
      <SectionHeader
        tone="ink"
        kicker="Your trade"
        title="Built deep for two trades — not shallow for twenty."
        lede="Every setup knows the emergencies, the vocabulary, the job values, and the booking flow of your trade. Because there are only two, it knows them cold."
      />

      <div className="grid gap-px overflow-hidden border border-espresso-800 bg-espresso-800 lg:grid-cols-[1.6fr_1fr]">
        {/* The marquee door */}
        <Reveal className="h-full">
          <SpotlightCard className="h-full bg-night-990">
            <Link
              href={`/industries/${electrical.slug}`}
              className="group flex h-full flex-col justify-between p-9 sm:p-14"
            >
              <div>
                <span className="text-[0.66rem] uppercase tracking-[0.26em] text-brass-400">
                  The flagship trade
                </span>
                <h3 className="font-display mt-6 text-4xl font-light leading-tight text-ivory sm:text-5xl">
                  {electrical.name}
                </h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-espresso-300">
                  {electrical.homeHook}
                </p>
                <ul className="mt-8 space-y-2.5 text-[0.95rem] text-espresso-300">
                  {electrical.emergencies.slice(0, 3).map((e) => (
                    <li key={e} className="flex items-baseline gap-3">
                      <span aria-hidden className="text-brass-400">—</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="mt-12 inline-flex items-center gap-2 text-sm text-brass-400">
                See how it answers for electricians
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </SpotlightCard>
        </Reveal>

        {/* The second door */}
        <Reveal delay={0.12} className="h-full">
          <SpotlightCard className="h-full bg-espresso-900/40">
            <Link
              href={`/industries/${garageDoor.slug}`}
              className="group flex h-full flex-col justify-between p-9 sm:p-12"
            >
              <div>
                <span className="text-[0.66rem] uppercase tracking-[0.26em] text-espresso-300">
                  The proven second
                </span>
                <h3 className="font-display mt-6 text-3xl font-light leading-tight text-ivory sm:text-4xl">
                  {garageDoor.name}
                </h3>
                <p className="mt-5 max-w-sm leading-relaxed text-espresso-300">
                  {garageDoor.homeHook}
                </p>
              </div>
              <span className="mt-12 inline-flex items-center gap-2 text-sm text-brass-400">
                See the garage door setup
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </SpotlightCard>
        </Reveal>
      </div>

      <p className="mt-8 text-center text-sm text-espresso-500">
        A different trade that lives on inbound calls?{" "}
        <Link href="/contact" className="link-underline text-espresso-300">
          Tell us what you do →
        </Link>
      </p>
    </Section>
  );
}
