import type { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { RoiCalculator } from "@/components/shared/roi-calculator";
import { FaqAccordion } from "@/components/shared/faq-section";
import { FinalCta } from "@/components/shared/final-cta";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat monthly rate, no contracts, cancel anytime. A fraction of a receptionist's salary — get your exact price on a 15-minute call.",
  alternates: { canonical: `${site.url}/pricing` },
};

const included = [
  "24/7 answering — nights, weekends, holidays",
  "Unlimited simultaneous calls (no busy signal, ever)",
  "Job booking straight into your calendar",
  "Emergency triage with instant escalation to your phone",
  "Text summary + full transcript of every call",
  "Scripts built for your trade, prices, and service area",
  "Setup done for you — typically live in days",
  "Ongoing tuning: we review calls with you and adjust",
];

const pricingFaqs = [
  {
    q: "Why isn't the price just listed here?",
    a: "Because it depends on your call volume, and we'd rather quote you accurately than post a teaser number with asterisks. On the call you get one flat monthly figure for your business — no per-minute meter, no surprise line items. If it's not clearly worth it against the jobs you're losing, don't buy it.",
  },
  {
    q: "Roughly what should I expect?",
    a: "A fraction of what one part-time receptionist costs — and she can't work at 2am or take three calls at once. Most owner-operated businesses cover the monthly cost with the first one or two calls it saves.",
  },
  {
    q: "Is there a setup fee?",
    a: "You'll get the complete picture — monthly rate and any one-time setup — on the call, before you commit to anything. No numbers appear later that you didn't hear up front.",
  },
  {
    q: "Is there a contract or minimum term?",
    a: "No. Month to month, cancel with an email. We keep customers by answering their calls well, not by locking the door.",
  },
  {
    q: "What if my call volume changes seasonally?",
    a: "Tell us. Summer AC-overload season, storm weeks, the January quiet — we'll set pricing that doesn't punish you for the slow months.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />

      <Section className="pt-32 md:pt-40">
        <SectionHeader
          kicker="Pricing"
          title="One flat monthly rate. Quoted straight, on one call."
          lede="No tiers to decode, no per-minute meter running against you. You tell us your call volume; we tell you one number and what it includes."
        />

        <div className="mx-auto grid max-w-4xl items-stretch gap-6 md:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-lift">
              <h2 className="font-display text-xl font-bold">
                Everything is included
              </h2>
              <ul className="mt-5 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-ink-950 p-8 text-paper shadow-lift">
              <div>
                <p className="streak-lines text-sm font-semibold uppercase tracking-widest text-flame-400">
                  The comparison that matters
                </p>
                <p className="mt-5 text-sm text-ink-300">A human receptionist:</p>
                <p className="font-display text-3xl font-bold text-paper">
                  $3,000+<span className="text-base font-medium text-ink-300">/mo</span>
                </p>
                <p className="mt-1 text-xs text-ink-300">
                  One person, business hours, one call at a time.
                </p>
                <p className="mt-5 text-sm text-ink-300">Swift Receptionist:</p>
                <p className="font-display text-3xl font-bold text-flame-400">
                  A fraction of that
                </p>
                <p className="mt-1 text-xs text-ink-300">
                  Every call, all hours, exact quote on your 15-minute call.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="mt-8 w-full bg-flame-500 text-ink-950 hover:bg-flame-400"
              >
                <TrackedLink
                  event="cta_book_call"
                  eventProps={{ location: "pricing_card" }}
                  href="/contact"
                >
                  Get my exact price
                </TrackedLink>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeader
          kicker="Sanity check"
          title="Weigh the cost against the leak"
          lede="Before any quote, know what doing nothing costs. Your numbers, your math:"
        />
        <RoiCalculator
          defaults={{ missedCallsPerWeek: 8, avgJobValue: 500, closeRatePct: 55 }}
        />
      </Section>

      <Section>
        <SectionHeader kicker="Pricing questions" title="Asked and answered" />
        <FaqAccordion items={pricingFaqs} />
      </Section>

      <FinalCta
        title="Get a number, not a runaround."
        lede="Fifteen minutes: see it work on your kind of calls, hear the exact monthly price, decide with real information."
        location="pricing_final"
      />
    </>
  );
}
