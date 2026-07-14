import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { DrawLine } from "@/components/shared/draw-line";

/** Setup as three acts on a single brass filament — a genuine sequence. */
export const steps = [
  {
    n: "01",
    title: "We wire it to your business",
    body: "One 15-minute call. We set up your receptionist with your services, prices, service area, and how you want emergencies handled. You approve every word it will say.",
    tag: "Day 1–2",
  },
  {
    n: "02",
    title: "You forward the phone",
    body: "Keep your number. Forward everything, or only the calls you can't take — after hours, busy line, no answer. Flip it on or off anytime from your phone.",
    tag: "Day 3",
  },
  {
    n: "03",
    title: "It answers forever",
    body: "In seconds, every time. It books the job or takes the lead, and texts you a summary with a full transcript. Real emergencies ring through to you immediately.",
    tag: "Every night after",
  },
];

export function HowItWorks({ standalone = false }: { standalone?: boolean }) {
  return (
    <Section tone="night" id="how-it-works">
      <SectionHeader
        tone="ink"
        kicker="The fix"
        title={standalone ? "Live in days, not weeks." : "We wire it. You forward the phone. It answers forever."}
        lede="You don't install anything, learn anything, or change your number."
      />
      <div className="relative">
        {/* The brass filament that connects the three acts, drawn by scroll */}
        <DrawLine
          path="M 4 0 L 4 100"
          viewBox="0 0 8 100"
          strokeWidth={1.5}
          className="absolute bottom-10 left-[13px] top-10 hidden h-auto w-2 text-brass-500/60 md:block"
        />
        <ol className="space-y-6 md:space-y-8">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="relative md:pl-14">
                {/* Node on the filament */}
                <span
                  aria-hidden
                  className="absolute left-2 top-12 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-brass-400 bg-night-990 md:block"
                />
                <SpotlightCard className="grid items-baseline gap-4 border border-espresso-800 bg-espresso-900/40 p-8 md:grid-cols-[auto_1fr_auto] md:gap-10 md:p-12">
                  <span className="font-display text-5xl font-light italic text-brass-400 md:text-6xl">
                    {step.n}
                  </span>
                  <div className="max-w-xl">
                    <h3 className="font-display text-2xl font-medium leading-tight text-ivory md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-espresso-300">{step.body}</p>
                  </div>
                  <span className="text-[0.68rem] uppercase tracking-[0.24em] text-espresso-500 md:text-right">
                    {step.tag}
                  </span>
                </SpotlightCard>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-10 text-center text-[0.7rem] uppercase tracking-[0.24em] text-espresso-500">
          Live in days · Nothing to learn · Nothing to install
        </p>
      </div>
    </Section>
  );
}
