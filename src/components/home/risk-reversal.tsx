import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

const promises = [
  { title: "No contracts", body: "Month to month. Cancel anytime from a single email — no retention call, no 'account specialist.'" },
  { title: "Live in days", body: "Most businesses are answering calls with it within three days of the first conversation." },
  { title: "You hear everything", body: "Every call is recorded and transcribed to your dashboard. You'll know exactly how it represents you." },
  { title: "Tuned until it's right", body: "We review your first weeks of calls with you and adjust the scripts until it handles them the way you would." },
];

/**
 * THE HONESTY CARD — the fine print face up, signed. One framed note
 * (corner ticks, like the hero still) carrying the no-fake-proof
 * manifesto and the four commitments.
 */
export function RiskReversal() {
  return (
    <Section tone="night">
      <SectionHeader
        tone="ink"
        kicker="The fine print, face up"
        title="Trying it shouldn't be a risk. So it isn't."
      />
      <Reveal>
        <div className="relative mx-auto max-w-4xl border border-espresso-700/60 bg-espresso-900/40 p-8 sm:p-14">
          {/* corner ticks — the framed-print motif */}
          <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l border-t border-brass-400" />
          <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r border-t border-brass-400" />
          <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-brass-400" />
          <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-brass-400" />

          <p className="font-display max-w-2xl text-2xl font-light italic leading-snug text-ivory sm:text-3xl">
            We&apos;ll show you real numbers or none at all. No stock photos,
            no invented reviews, no testimonials we haven&apos;t earned yet.
          </p>

          <div className="mt-10 grid gap-x-12 gap-y-8 border-t border-espresso-800 pt-10 sm:grid-cols-2">
            {promises.map((p, i) => (
              <div key={p.title}>
                <h3 className="flex items-baseline gap-4">
                  <span className="font-display text-lg italic text-brass-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-medium text-ivory">{p.title}</span>
                </h3>
                <p className="mt-2.5 pl-9 text-sm leading-relaxed text-espresso-300">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <p className="font-display mt-10 text-right text-lg italic text-espresso-300">
            — Swift Receptionist
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
