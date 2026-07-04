import type { Metadata } from "next";
import { site } from "@/lib/site";
import { organizationJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { Section, SectionHeader } from "@/components/shared/section";
import { RoiCalculator } from "@/components/shared/roi-calculator";
import { FinalCta } from "@/components/shared/final-cta";
import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { Problem } from "@/components/home/problem";
import { HowItWorks } from "@/components/home/how-it-works";
import { DemoBlock } from "@/components/home/demo-block";
import { Comparison } from "@/components/home/comparison";
import { NicheGrid } from "@/components/home/niche-grid";
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
      <Problem />

      <Section tone="ink">
        <SectionHeader
          tone="ink"
          kicker="Do the math"
          title="What is voicemail costing you, exactly?"
          lede="Your calls, your job values, your close rate. Drag the sliders — the math is printed on the card."
        />
        <RoiCalculator defaults={roiDefaults} />
      </Section>

      <HowItWorks />
      <DemoBlock />
      <Comparison />
      <NicheGrid />
      <HomeFaq />
      <RiskReversal />

      <FinalCta
        title="The next missed call is already dialing."
        lede="Fifteen minutes with us, live within days — or try the demo first and let the AI make its own case."
        location="home_final"
      />
      <ScrollCta />
    </>
  );
}
