import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TiltCard } from "@/components/shared/tilt-card";

/** Setup in three numbered steps. A genuine sequence, kept plain. */
export const steps = [
  {
    n: "1",
    title: "We set it up for you",
    body: "One 15-minute call. We configure your receptionist with your services, prices, service area, and how you want emergencies handled. You approve every word it will say.",
    tag: "Day 1–2",
  },
  {
    n: "2",
    title: "You forward the phone",
    body: "Keep your number. Forward everything, or only the calls you can't take — after hours, busy line, no answer. Flip it on or off anytime from your phone.",
    tag: "Day 3",
  },
  {
    n: "3",
    title: "It answers from then on",
    body: "In seconds, every time. It books the job or takes the lead, and texts you a summary with a full transcript. Real emergencies ring through to you immediately.",
    tag: "Every day after",
  },
];

export function HowItWorks({ standalone = false }: { standalone?: boolean }) {
  return (
    <Section tone="cloud" id="how-it-works">
      <SectionHeader
        kicker="How it works"
        title={standalone ? "Live in days, not weeks." : "Set up in days. Nothing to learn."}
        lede="You don't install anything, learn anything, or change your number."
        align="center"
      />
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.07} className="h-full">
            <TiltCard className="h-full rounded-3xl">
              <li className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-card">
                <span
                  className="bg-clip-text font-display text-5xl text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #0a84ff, #7c3aed)" }}
                >
                  {step.n}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-carbon-950">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-carbon-600">{step.body}</p>
                <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-carbon-400">
                  {step.tag}
                </p>
              </li>
            </TiltCard>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
