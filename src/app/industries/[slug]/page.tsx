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
import { FinalCta } from "@/components/shared/final-cta";
import { TiltCard } from "@/components/shared/tilt-card";
import { Magnetic } from "@/components/shared/magnetic";
import { Aura } from "@/components/shared/aura";
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

      {/* Hero */}
      <Section className="pt-32 md:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-azure-600">
              For {niche.name.toLowerCase()}
            </p>
            <h1 className="mt-5 text-balance font-display text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[1.0] text-carbon-950">
              {niche.hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-carbon-600">
              {niche.hero.subhead}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Magnetic>
                <Button asChild size="lg">
                  <TrackedLink
                    event="niche_page_cta"
                    eventProps={{ niche: niche.slug, action: "book" }}
                    href="/contact"
                  >
                    Book a 15-minute call
                  </TrackedLink>
                </Button>
              </Magnetic>
              <Button asChild variant="link" size="lg">
                <TrackedLink
                  event="niche_page_cta"
                  eventProps={{ niche: niche.slug, action: "demo" }}
                  href={demoHref}
                >
                  Hear a {niche.shortName.toLowerCase()} call →
                </TrackedLink>
              </Button>
            </div>
          </div>
          <Reveal className="relative">
            <Aura intensity={0.22} />
            <div className="relative">
              <CallTranscript
                scenario={niche.scriptScenario}
                turns={niche.callScript}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The calls at stake */}
      <Section tone="cloud">
        <SectionHeader
          kicker="The calls you're missing"
          title="These calls don't leave voicemails."
          lede={`They hang up and dial the next ${niche.noun} on the list. Typical ${niche.jobValue.label}: $${niche.jobValue.low.toLocaleString()}–$${niche.jobValue.high.toLocaleString()}.`}
          align="center"
        />
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {niche.emergencies.map((item, i) => (
            <Reveal key={item} delay={i * 0.05} className="h-full">
              <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-6 shadow-card">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-azure-600" />
                <p className="leading-relaxed text-carbon-950">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pains */}
      <Section>
        <SectionHeader
          kicker="Why it keeps happening"
          title="It's not a you problem. It's a phone problem."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {niche.pains.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 0.06} className="h-full">
              <TiltCard className="h-full rounded-3xl">
                <div className="h-full rounded-3xl border border-line bg-white p-8 shadow-card">
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-carbon-950">
                    {pain.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-carbon-600">
                    {pain.body}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ROI calculator */}
      <Section tone="cloud">
        <SectionHeader
          kicker="The math"
          title={`What missed calls cost ${articleFor(niche.noun)} ${niche.noun}`}
          lede="Drag the sliders to your reality. The math is on the card — check it yourself."
          align="center"
        />
        <RoiCalculator defaults={niche.roiDefaults} />
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader
          kicker="Fair questions"
          title={`What ${niche.noun} owners ask us`}
          align="center"
        />
        <FaqAccordion items={niche.faq} />
      </Section>

      <FinalCta
        title={`Every ${niche.shortName.toLowerCase()} call. Answered.`}
        lede={`Fifteen minutes: hear it handle your calls, get one flat number, decide with real information — set up in days, tuned for ${niche.name.toLowerCase()}.`}
        demoHref={demoHref}
        location={`niche_${niche.slug}`}
      />
    </>
  );
}
