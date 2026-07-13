import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

/** Closing CTA — a cinematic espresso scene, reused across pages. */
export function FinalCta({
  title,
  lede,
  demoHref = "/demo",
  location,
}: {
  title: string;
  lede: string;
  demoHref?: string;
  location: string;
}) {
  return (
    <Section tone="ink">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-7 justify-center text-brass-400">
          The next call — yours or theirs
        </p>
        <h2 className="font-display text-balance text-4xl font-light leading-[1.02] text-ivory sm:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-espresso-300">
          {lede}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-ivory text-espresso-950 hover:bg-brass-100">
            <TrackedLink event="cta_book_call" eventProps={{ location }} href="/contact">
              Book a 15-minute call
            </TrackedLink>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-espresso-950"
          >
            <TrackedLink event="cta_try_demo" eventProps={{ location }} href={demoHref}>
              Talk to the AI first
            </TrackedLink>
          </Button>
        </div>
        <p className="mt-7 text-[0.7rem] uppercase tracking-[0.24em] text-espresso-500">
          No contracts · set up in days · cancel anytime
        </p>
      </div>
    </Section>
  );
}
