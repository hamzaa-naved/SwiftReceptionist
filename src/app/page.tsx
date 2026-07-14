import type { Metadata } from "next";
import { site } from "@/lib/site";
import { organizationJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { Section, SectionHeader } from "@/components/shared/section";
import { RoiCalculator } from "@/components/shared/roi-calculator";
import { DawnCta } from "@/components/shared/dawn-cta";
import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { RingScene } from "@/components/home/ring-scene";
import { HowItWorks } from "@/components/home/how-it-works";
import { DemoBlock } from "@/components/home/demo-block";
import { Comparison } from "@/components/home/comparison";
import { TwoTrades } from "@/components/home/two-trades";
import { HomeFaq } from "@/components/home/home-faq";
import { RiskReversal } from "@/components/home/risk-reversal";
import { ScrollCta } from "@/components/home/scroll-cta";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

const roiDefaults = {
  missedCallsPerWeek: 8,
  avgJobValue: 500,
  closeRatePct: 55,
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          name: `${site.name} — 24/7 AI Receptionist`,
          description:
            "AI receptionist for local service businesses: answers every call in seconds, books jobs, captures leads, and triages emergencies around the clock.",
          url: site.url,
          audience: "Local service businesses",
        })}
      />

      <Hero />
      <ProofStrip />
      <RingScene />

      <Section tone="dawn">
        <SectionHeader
          kicker="The morning math"
          title="Run the numbers you've been avoiding."
          lede="Your calls, your job values, your close rate. Move the sliders — the number counts itself against you."
        />
        <RoiCalculator defaults={roiDefaults} />
      </Section>

      <HowItWorks />
      <DemoBlock />
      <Comparison />
      <TwoTrades />
      <HomeFaq />
      <RiskReversal />

      <DawnCta location="home_final" />
      <ScrollCta />
    </>
  );
}
