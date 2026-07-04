import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, PhoneMissed } from "lucide-react";
import { niches, getNiche } from "@/content/niches";
import { site } from "@/lib/site";
import { serviceJsonLd, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { CallTranscript } from "@/components/shared/call-transcript";
import { FaqAccordion } from "@/components/shared/faq-section";
import { RoiCalculator } from "@/components/shared/roi-calculator";
import { FinalCta } from "@/components/shared/final-cta";
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

      {/* Hero */}
      <Section className="pt-32 md:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="streak-lines mb-4 text-sm font-semibold uppercase tracking-widest text-flame-600">
              For {niche.name.toLowerCase()}
            </p>
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.08] sm:text-5xl">
              {niche.hero.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {niche.hero.subhead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <TrackedLink
                  event="niche_page_cta"
                  eventProps={{ niche: niche.slug, action: "book" }}
                  href="/contact"
                >
                  Book a 15-minute call
                </TrackedLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <TrackedLink
                  event="niche_page_cta"
                  eventProps={{ niche: niche.slug, action: "demo" }}
                  href={demoHref}
                >
                  Hear it handle a {niche.shortName.toLowerCase()} call
                </TrackedLink>
              </Button>
            </div>
          </div>
          <Reveal>
            <CallTranscript
              scenario={niche.scriptScenario}
              turns={niche.callScript}
            />
          </Reveal>
        </div>
      </Section>

      {/* The calls at stake */}
      <Section tone="warm">
        <SectionHeader
          kicker="The calls you're missing"
          title={`These calls don't leave voicemails.`}
          lede={`They hang up and dial the next ${niche.noun} on the list. Typical ${niche.jobValue.label}: $${niche.jobValue.low.toLocaleString()}–$${niche.jobValue.high.toLocaleString()}.`}
        />
        <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {niche.emergencies.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                <PhoneMissed
                  className="mt-0.5 h-5 w-5 shrink-0 text-flame-600"
                  aria-hidden
                />
                <p className="text-sm font-medium leading-relaxed">{item}</p>
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
        />
        <div className="grid gap-6 md:grid-cols-3">
          {niche.pains.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card">
                <AlertTriangle className="mb-4 h-6 w-6 text-flame-600" aria-hidden />
                <h3 className="font-display mb-2 text-lg font-bold">
                  {pain.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pain.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ROI calculator with niche defaults */}
      <Section tone="warm">
        <SectionHeader
          kicker="Run your numbers"
          title={`What missed calls cost a ${niche.noun}`}
          lede="Drag the sliders to your reality. The math is on the card — check it yourself."
        />
        <RoiCalculator defaults={niche.roiDefaults} />
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader
          kicker="Fair questions"
          title={`What ${niche.noun} owners ask us`}
        />
        <FaqAccordion items={niche.faq} />
      </Section>

      <FinalCta
        title={`Your competitors' phones ring out too. That's the opportunity.`}
        lede={`Put a receptionist on your line that answers every call in seconds, around the clock — set up in days, no contract, tuned for ${niche.name.toLowerCase()}.`}
        demoHref={demoHref}
        location={`niche_${niche.slug}`}
      />
    </>
  );
}
