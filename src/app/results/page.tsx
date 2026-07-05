import type { Metadata } from "next";
import { BarChart3, PhoneCall, CalendarCheck2, Clock3 } from "lucide-react";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/shared/final-cta";

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
      <Section className="pt-32 md:pt-40">
        <SectionHeader
          kicker="Results"
          title="We'll show you real numbers or none at all."
          lede="Plenty of companies fill this page with stock photos and suspiciously round percentages. We're new, we're growing, and we'd rather earn this page one documented client at a time."
        />

        {caseStudies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.business} delay={i * 0.06}>
                <article className="h-full rounded-2xl border border-border bg-card p-8 shadow-card">
                  <p className="text-sm font-semibold uppercase tracking-widest text-flame-600">
                    {cs.niche} · {cs.location}
                  </p>
                  <h2 className="font-display mt-2 text-xl font-bold">{cs.business}</h2>
                  <blockquote className="mt-4 border-l-2 border-flame-500 pl-4 text-muted-foreground">
                    “{cs.quote}”
                  </blockquote>
                  <dl className="mt-6 grid grid-cols-2 gap-4">
                    {cs.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                          {m.label}
                        </dt>
                        <dd className="font-display text-2xl font-bold text-flame-600">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-input bg-paper-warm p-10 text-center">
            <h2 className="font-display text-xl font-bold">
              Case studies are being documented now
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Early clients are on the phones as you read this. As each agrees
              to share their numbers — calls answered, jobs booked, after-hours
              revenue captured — they&apos;ll be published here with their name on
              it. No composites, no “results may vary” fine print doing the
              heavy lifting.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm font-medium">
              Want to see it work before the testimonials exist? That&apos;s
              exactly what the live demo is for.
            </p>
          </div>
        )}
      </Section>

      <Section tone="warm">
        <SectionHeader
          kicker="What we measure"
          title="Every client sees these four numbers"
          lede="This is the scoreboard your dashboard shows — and what future case studies here will report."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tracked.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lift">
                <t.icon className="mb-4 h-6 w-6 text-flame-600" aria-hidden />
                <h3 className="font-display mb-1.5 text-base font-bold">{t.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta
        title="Be the case study your competitors read."
        lede="Early clients get founder-level attention — we're building our proof on your phone lines, and we both win when the numbers are good."
        location="results_page"
      />
    </>
  );
}
