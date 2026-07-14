import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { Magnetic } from "@/components/shared/magnetic";
import { Aura } from "@/components/shared/aura";
import { Reveal } from "@/components/shared/reveal";

/**
 * The close: one giant declaration over a faint aura, one pill, one
 * quiet reassurance line. Every page ends here.
 */
export function FinalCta({
  title = "Stop losing jobs to voicemail.",
  lede = "Fifteen minutes. Your call volume, your prices, one flat number. If it isn't clearly worth it, we'll say so.",
  demoHref = "/demo",
  location = "final_cta",
}: {
  title?: string;
  lede?: string;
  demoHref?: string;
  location?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-snow">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 text-center sm:px-10 md:py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2">
          <Aura intensity={0.16} />
        </div>
        <Reveal className="relative">
          <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] text-carbon-950">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-carbon-600">
            {lede}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <Button asChild size="lg">
                <TrackedLink
                  event="cta_book_call"
                  eventProps={{ location }}
                  href="/contact"
                >
                  Book a 15-minute call
                </TrackedLink>
              </Button>
            </Magnetic>
            <Button asChild variant="link" size="lg">
              <TrackedLink event="cta_try_demo" eventProps={{ location }} href={demoHref}>
                Hear it answer →
              </TrackedLink>
            </Button>
          </div>
          <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-carbon-400">
            No contracts · Live in days · Cancel with an email
          </p>
        </Reveal>
      </div>
    </section>
  );
}
