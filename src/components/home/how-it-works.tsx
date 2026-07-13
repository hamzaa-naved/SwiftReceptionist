import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

/** Setup as three editorial acts — a genuine sequence, numbered as such. */
export const steps = [
  {
    n: "01",
    title: "We build it for your business",
    body: "One 15-minute call. We set up your receptionist with your services, prices, service area, and how you want emergencies handled. You approve every word it will say.",
    tag: "Day 1–2",
  },
  {
    n: "02",
    title: "Your calls forward to it",
    body: "Keep your number. Forward everything, or only the calls you can't take — after hours, busy line, no answer. Flip it on or off anytime from your phone.",
    tag: "Day 3",
  },
  {
    n: "03",
    title: "Jobs land on your calendar",
    body: "It answers in seconds, books the job or takes the lead, and texts you a summary with a full transcript. Real emergencies ring through to you immediately.",
    tag: "Every day after",
  },
];

export function HowItWorks({ standalone = false }: { standalone?: boolean }) {
  return (
    <Section tone="warm" id="how-it-works">
      <SectionHeader
        kicker="No. 03 — The remedy"
        title={standalone ? "Live in days, not weeks." : "Set up in days. Simpler than a new phone."}
        lede="You don't install anything, learn anything, or change your number."
      />
      <ol className="space-y-px overflow-hidden border-y border-line bg-line">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1}>
            <li className="grid items-baseline gap-4 bg-ivory-deep p-8 transition-colors duration-500 hover:bg-ivory-raised md:grid-cols-[auto_1fr_auto] md:gap-10 md:p-12">
              <span className="font-display text-5xl font-light italic text-brass-500 md:text-6xl">
                {step.n}
              </span>
              <div className="max-w-xl">
                <h3 className="font-display text-2xl font-medium leading-tight md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-espresso-700">{step.body}</p>
              </div>
              <span className="text-[0.68rem] uppercase tracking-[0.24em] text-espresso-500 md:text-right">
                {step.tag}
              </span>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
