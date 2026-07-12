import { ShieldCheck, CalendarX2, Timer, Ear } from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

const promises = [
  {
    icon: CalendarX2,
    title: "No contracts",
    body: "Month to month. Cancel anytime from a single email — no retention call, no 'account specialist'.",
  },
  {
    icon: Timer,
    title: "Live in days",
    body: "Most businesses are answering calls with it within 3 days of the first conversation.",
  },
  {
    icon: Ear,
    title: "You hear everything",
    body: "Every call is recorded and transcribed to your dashboard. You'll know exactly how it's representing you.",
  },
  {
    icon: ShieldCheck,
    title: "Tuned until it's right",
    body: "We review your first weeks of calls with you and adjust the scripts until it handles your calls the way you would.",
  },
];

export function RiskReversal() {
  return (
    <Section>
      <SectionHeader
        kicker="The fine print, up front"
        title="Trying it shouldn't be a risk. So it isn't."
      />
      <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="h-full">
            <div className="h-full bg-card p-6">
              <p.icon className="mb-4 h-6 w-6 text-graphite-700" strokeWidth={1.75} aria-hidden />
              <h3 className="font-display mb-2 text-lg font-bold uppercase leading-tight">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
