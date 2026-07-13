import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

const promises = [
  { title: "No contracts", body: "Month to month. Cancel anytime from a single email — no retention call, no 'account specialist.'" },
  { title: "Live in days", body: "Most businesses are answering calls with it within three days of the first conversation." },
  { title: "You hear everything", body: "Every call is recorded and transcribed to your dashboard. You'll know exactly how it represents you." },
  { title: "Tuned until it's right", body: "We review your first weeks of calls with you and adjust the scripts until it handles them the way you would." },
];

export function RiskReversal() {
  return (
    <Section>
      <SectionHeader
        kicker="No. 07 — The fine print, up front"
        title="Trying it shouldn't be a risk. So it isn't."
      />
      <div className="grid gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="h-full">
            <div className="flex h-full flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-raised">
              <span className="font-display text-2xl italic text-brass-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-5 text-xl font-medium leading-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-espresso-700">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
