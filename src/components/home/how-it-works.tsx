import { PhoneForwarded, Settings2, CalendarCheck2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export const steps = [
  {
    icon: Settings2,
    title: "We build it for your business",
    body: "One 15-minute call. We set up your receptionist with your services, prices, service area, and how you want emergencies handled. You approve everything it will say.",
    tag: "Day 1–2",
  },
  {
    icon: PhoneForwarded,
    title: "Your calls forward to it",
    body: "Keep your number. Forward everything, or only the calls you can't take — after hours, busy line, no answer. Flip it on or off anytime from your phone.",
    tag: "Day 3",
  },
  {
    icon: CalendarCheck2,
    title: "Jobs land on your calendar",
    body: "It answers in seconds, books the job or takes the lead, and texts you a summary with a full transcript. Real emergencies ring through to you immediately.",
    tag: "Every day after",
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
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08}>
            <li className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lift">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950 text-lg font-bold text-flame-400">
                  {i + 1}
                </span>
                <span className="rounded-full bg-flame-50 px-3 py-1 text-xs font-semibold text-flame-600">
                  {step.tag}
                </span>
              </div>
              <step.icon className="mb-3 h-6 w-6 text-ink-700" aria-hidden />
              <h3 className="font-display mb-2 text-lg font-bold">{step.title}</h3>
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
