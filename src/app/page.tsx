import type { Metadata } from "next";
import { site } from "@/lib/site";
import { organizationJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { Section, SectionHeader } from "@/components/shared/section";
import { RoiCalculator } from "@/components/shared/roi-calculator";
import { FinalCta } from "@/components/shared/final-cta";
import { Hero } from "@/components/home/hero";
import { StatBar } from "@/components/home/stat-bar";
import { TranscriptScene } from "@/components/home/transcript-scene";
import { Features } from "@/components/home/features";
import { Comparison } from "@/components/home/comparison";
import { TwoTrades } from "@/components/home/two-trades";
import { HonestyStrip } from "@/components/home/honesty-strip";
import { HomeFaq } from "@/components/home/home-faq";
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
            "AI receptionist for electrical contractors and garage door companies: answers every call in seconds, books jobs, captures leads, and triages emergencies around the clock.",
          url: site.url,
          audience: "Electrical contractors and garage door companies",
        })}
      />

      <Hero />
      <StatBar />
      <TranscriptScene />
      <Features />

      <Section tone="cloud" id="roi">
        <SectionHeader
          kicker="The math"
          title="Do the math on your missed calls."
          lede="Your calls, your job values, your close rate. Move the sliders — the number counts itself."
          align="center"
        />
        <RoiCalculator defaults={roiDefaults} />
      </Section>

      <TwoTrades />
      <Comparison />
      <HonestyStrip />
      <HomeFaq />

      <FinalCta location="home_final" />
      <ScrollCta />
    </>
  );
}
