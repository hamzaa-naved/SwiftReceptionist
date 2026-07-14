import type { Metadata } from "next";
import { BarChart3, PhoneCall, CalendarCheck2, Clock3 } from "lucide-react";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { DawnCta } from "@/components/shared/dawn-cta";

export const metadata: Metadata = {
  title: "Results & Case Studies",
  description:
    "Real numbers from real service businesses using Swift Receptionist — published as they come in, never invented.",
  alternates: { canonical: `${site.url}/results` },
};

/**
 * Case studies render from this array. Add one entry per client who has
 * agreed IN WRITING to be featured. Until then the page says, honestly,
 * that proof is coming — which itself signals trustworthiness.
 */
interface CaseStudy {
  business: string;
  niche: string;
  location: string;
  quote: string;
  metrics: { label: string; value: string }[];
}
const caseStudies: CaseStudy[] = [];

const tracked = [
  {
    icon: PhoneCall,
    label: "Calls answered",
    detail: "Every call, timestamped — including the 2am ones you used to sleep through.",
  },
  {
    icon: Clock3,
    label: "Speed to answer",
    detail: "Seconds from first ring to a live answer, versus the industry norm of voicemail.",
  },
  {
    icon: CalendarCheck2,
    label: "Jobs booked",
    detail: "Appointments created by the receptionist, straight from call to calendar.",
  },
  {
    icon: BarChart3,
    label: "Revenue captured after hours",
    detail: "The value of jobs booked outside business hours — money that used to leak.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <Section tone="night" className="pt-32 md:pt-40">
        <SectionHeader
          tone="ink"
          kicker="Results"
          title="We'll show you real numbers or none at all."
          lede="Plenty of companies fill this page with stock photos and suspiciously round percentages. We're new, we're growing, and we'd rather earn this page one documented client at a time."
        />

        {caseStudies.length > 0 ? (
          <div className="grid gap-px overflow-hidden border border-espresso-800 bg-espresso-800 md:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.business} delay={i * 0.06} className="h-full">
                <SpotlightCard className="h-full bg-espresso-900/40 p-8 md:p-10">
                  <article>
                  <p className="eyebrow text-brass-400">
                    {cs.niche} · {cs.location}
                  </p>
                  <h2 className="font-display mt-4 text-2xl font-medium text-ivory">{cs.business}</h2>
                  <blockquote className="font-display mt-4 border-l-2 border-brass-400 pl-4 text-lg italic leading-snug text-espresso-300">
                    “{cs.quote}”
                  </blockquote>
                  <dl className="mt-6 grid grid-cols-2 gap-4">
                    {cs.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xs uppercase tracking-wider text-espresso-500">
                          {m.label}
                        </dt>
                        <dd className="font-display text-3xl font-light text-brass-400">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  </article>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="relative mx-auto max-w-2xl border border-espresso-700/60 bg-espresso-900/40 p-10 text-center">
            <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l border-t border-brass-400" />
            <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r border-t border-brass-400" />
            <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-brass-400" />
            <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-brass-400" />
            <h2 className="font-display text-2xl font-medium text-ivory">
              Case studies are being documented now
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-espresso-300">
              Early clients are on the phones as you read this. As each agrees
              to share their numbers — calls answered, jobs booked, after-hours
              revenue captured — they&apos;ll be published here with their name on
              it. No composites, no “results may vary” fine print doing the
              heavy lifting.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm font-medium text-ivory">
              Want to see it work before the testimonials exist? That&apos;s
              exactly what the live demo is for.
            </p>
          </div>
        )}
      </Section>

      <Section tone="night">
        <SectionHeader
          tone="ink"
          kicker="What we measure"
          title="Every client sees these four numbers"
          lede="This is the scoreboard your dashboard shows — and what future case studies here will report."
        />
        <div className="grid gap-px overflow-hidden border border-espresso-800 bg-espresso-800 sm:grid-cols-2 lg:grid-cols-4">
          {tracked.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.05} className="h-full">
              <SpotlightCard className="h-full bg-espresso-900/40 p-8">
                <t.icon className="mb-5 h-6 w-6 text-brass-400" strokeWidth={1.5} aria-hidden />
                <h3 className="font-display mb-2 text-xl font-medium leading-tight text-ivory">{t.label}</h3>
                <p className="text-sm leading-relaxed text-espresso-300">{t.detail}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <DawnCta
        title="Be the case study your competitors read."
        italicLine="Real numbers, with your name on them."
        lede="Early clients get founder-level attention — we're building our proof on your phone lines, and we both win when the numbers are good."
        location="results_page"
      />
    </>
  );
}
