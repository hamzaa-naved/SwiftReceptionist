import { Reveal } from "@/components/shared/reveal";

const commitments = [
  "No contracts — cancel by email",
  "Live in days",
  "Every call recorded & transcribed",
  "Tuned with you until it's right",
];

/**
 * The honesty position, stated once and quietly. No fake proof anywhere
 * on this site — that's the differentiator, so it gets a plain sentence
 * instead of a production number.
 */
export function HonestyStrip() {
  return (
    <div className="border-y border-line bg-snow">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 text-center sm:px-10">
        <Reveal>
          <p className="mx-auto max-w-2xl text-balance text-xl font-medium tracking-[-0.01em] text-carbon-950 sm:text-2xl">
            We&apos;ll show you real numbers or none at all. No stock photos,
            no invented reviews, no testimonials we haven&apos;t earned yet.
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-carbon-600">
            {commitments.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-azure-600" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
