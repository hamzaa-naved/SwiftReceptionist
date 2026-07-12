import { PhoneForwarded, Settings2, CalendarCheck2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

/**
 * Setup as three job tickets — a genuine sequence, so the numbering is
 * information, styled as mono ticket IDs rather than decorative 01/02/03.
 */
export const steps = [
  {
    icon: Settings2,
    title: "We build it for your business",
    body: "One 15-minute call. We set up your receptionist with your services, prices, service area, and how you want emergencies handled. You approve everything it will say.",
    tag: "DAY 1–2",
  },
  {
    icon: PhoneForwarded,
    title: "Your calls forward to it",
    body: "Keep your number. Forward everything, or only the calls you can't take — after hours, busy line, no answer. Flip it on or off anytime from your phone.",
    tag: "DAY 3",
  },
  {
    icon: CalendarCheck2,
    title: "Jobs land on your calendar",
    body: "It answers in seconds, books the job or takes the lead, and texts you a summary with a full transcript. Real emergencies ring through to you immediately.",
    tag: "EVERY DAY AFTER",
  },
];

export function HowItWorks({ standalone = false }: { standalone?: boolean }) {
  return (
    <Section tone="warm" id="how-it-works">
      <SectionHeader
        kicker="How it works"
        title={standalone ? "Live in days, not weeks." : "Set up in days. Simpler than a new phone."}
        lede="You don't install anything, learn anything, or change your number."
      />
      <ol className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08} className="h-full">
            <li className="flex h-full flex-col bg-card p-6">
              <div className="mb-5 flex items-center justify-between border-b-2 border-graphite-950 pb-3">
                <span className="font-mono text-xs font-medium tracking-[0.12em] text-graphite-700">
                  TICKET {String(i + 1).padStart(2, "0")}
                </span>
                <span className="bg-volt-100 px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.1em] text-graphite-950">
                  {step.tag}
                </span>
              </div>
              <step.icon className="mb-3 h-6 w-6 text-graphite-700" strokeWidth={1.75} aria-hidden />
              <h3 className="font-display mb-2 text-xl font-bold uppercase leading-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
