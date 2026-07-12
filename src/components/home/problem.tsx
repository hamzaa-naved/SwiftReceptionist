import { PhoneMissed, Voicemail, UserX } from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

const problems = [
  {
    icon: PhoneMissed,
    title: "The call rings out",
    body: "You're in a panel, up a ladder, or driving. The customer with a right-now problem gets six rings and silence. They don't think 'he must be busy' — they think 'next number'.",
  },
  {
    icon: Voicemail,
    title: "Voicemail finishes the job",
    body: "Most emergency callers won't leave a message, and the ones who do keep dialing while they wait. By the time you call back at 6pm, someone else's truck is in their driveway.",
  },
  {
    icon: UserX,
    title: "You never even know",
    body: "The worst part: lost calls don't show up anywhere. No invoice, no complaint, no record. Just a quieter month and a competitor who seems to be everywhere lately.",
  },
];

export function Problem() {
  return (
    <Section>
      <SectionHeader
        kicker="The leak in your business"
        title="You don't have a marketing problem. You have an answering problem."
        lede="You already paid — in ads, in reputation, in years of work — to make that phone ring. Here's how the job leaks out anyway:"
      />
      <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="h-full">
            <div className="h-full bg-card p-6">
              <p.icon className="mb-4 h-6 w-6 text-graphite-700" strokeWidth={1.75} aria-hidden />
              <h3 className="font-display mb-2 text-xl font-bold uppercase leading-tight">
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
