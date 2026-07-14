import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { niches, getNiche } from "@/content/niches";
import { site } from "@/lib/site";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { articleFor } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { CallTranscript } from "@/components/shared/call-transcript";
import { FaqAccordion } from "@/components/shared/faq-section";
import { RoiCalculator } from "@/components/shared/roi-calculator";
import { DawnCta } from "@/components/shared/dawn-cta";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Magnetic } from "@/components/shared/magnetic";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

export function generateStaticParams() {
  return niches.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const niche = getNiche((await params).slug);
  if (!niche) return {};
  return {
    title: niche.seo.title,
    description: niche.seo.description,
    alternates: { canonical: `${site.url}/industries/${niche.slug}` },
    openGraph: {
      title: niche.seo.title,
      description: niche.seo.description,
      url: `${site.url}/industries/${niche.slug}`,
    },
  };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const niche = getNiche((await params).slug);
  if (!niche) notFound();

  const demoHref = `/demo?niche=${niche.slug}`;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: niche.seo.title,
          description: niche.seo.description,
          url: `${site.url}/industries/${niche.slug}`,
          audience: niche.name,
        })}
      />
      <JsonLd data={faqJsonLd(niche.faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: site.url },
          { name: "Industries", url: `${site.url}/industries` },
          { name: niche.name, url: `${site.url}/industries/${niche.slug}` },
        ])}
      />

      {/* Night hero */}
      <Section tone="night" className="relative overflow-hidden pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 70% at 85% 0%, rgba(195,154,86,0.1), transparent 55%)",
          }}
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6 text-brass-400">
              For {niche.name.toLowerCase()} · after hours, every hour
            </p>
            <h1 className="font-display text-balance text-[clamp(2.6rem,5.5vw,4.5rem)] font-light leading-[1.0] text-ivory">
              {niche.hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso-300">
              {niche.hero.subhead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Button asChild size="lg" className="btn-sheen bg-ivory text-espresso-950 hover:bg-brass-100">
                  <TrackedLink
                    event="niche_page_cta"
                    eventProps={{ niche: niche.slug, action: "book" }}
                    href="/contact"
                  >
                    Book a 15-minute call
                  </TrackedLink>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-espresso-950"
                >
                  <TrackedLink
                    event="niche_page_cta"
                    eventProps={{ niche: niche.slug, action: "demo" }}
                    href={demoHref}
                  >
                    Hear it handle a {niche.shortName.toLowerCase()} call
                  </TrackedLink>
                </Button>
              </Magnetic>
            </div>
          </div>
          <Reveal>
            <div className="shadow-[0_0_90px_-18px_rgba(195,154,86,0.28)]">
              <CallTranscript
                tone="night"
                scenario={niche.scriptScenario}
                turns={niche.callScript}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The calls at stake — a lit ledger of the night's emergencies */}
      <Section tone="night">
        <SectionHeader
          tone="ink"
          kicker="The calls you're missing"
          title="These calls don't leave voicemails."
          lede={`They hang up and dial the next ${niche.noun} on the list. Typical ${niche.jobValue.label}: $${niche.jobValue.low.toLocaleString()}–$${niche.jobValue.high.toLocaleString()}.`}
        />
        <div className="mx-auto grid max-w-3xl gap-px overflow-hidden border border-espresso-800 bg-espresso-800 sm:grid-cols-2">
          {niche.emergencies.map((item, i) => (
            <Reveal key={item} delay={i * 0.06} className="h-full">
              <SpotlightCard className="flex h-full items-start gap-4 bg-espresso-900/40 p-6">
                <span className="mt-1 text-brass-400" aria-hidden>—</span>
                <p className="leading-relaxed text-espresso-300">{item}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pains */}
      <Section tone="night">
        <SectionHeader
          tone="ink"
          kicker="Why it keeps happening"
          title="It's not a you problem. It's a phone problem."
        />
        <div className="grid gap-px overflow-hidden border border-espresso-800 bg-espresso-800 md:grid-cols-3">
          {niche.pains.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 0.08} className="h-full">
              <SpotlightCard className="h-full bg-night-990 p-8 md:p-10">
                <span className="font-display text-2xl italic text-brass-400">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-5 text-2xl font-medium leading-tight text-ivory">
                  {pain.title}
                </h3>
                <p className="mt-3 leading-relaxed text-espresso-300">
                  {pain.body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ROI calculator — the morning math */}
      <Section tone="dawn">
        <SectionHeader
          kicker="The morning math"
          title={`What missed calls cost ${articleFor(niche.noun)} ${niche.noun}`}
          lede="Drag the sliders to your reality. The math is on the card — check it yourself."
        />
        <RoiCalculator defaults={niche.roiDefaults} />
      </Section>

      {/* FAQ */}
      <Section tone="night">
        <SectionHeader
          tone="ink"
          kicker="Fair questions"
          title={`What ${niche.noun} owners ask us`}
        />
        <FaqAccordion tone="night" items={niche.faq} />
      </Section>

      <DawnCta
        title={`Tomorrow morning, every ${niche.shortName.toLowerCase()} call gets answered.`}
        italicLine="Tonight is the last night one rings out."
        lede={`Fifteen minutes: hear it handle your calls, get one flat number, decide with real information — set up in days, no contract, tuned for ${niche.name.toLowerCase()}.`}
        demoHref={demoHref}
        location={`niche_${niche.slug}`}
      />
    </>
  );
}
