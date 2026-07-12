import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

/** Closing CTA block, reused across pages with tailored copy. */
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
    <Section tone="ink" className="border-t-[3px] border-volt-400">
      <div className="mx-auto max-w-2xl text-center">
        <p className="streak-lines mb-5 justify-center text-xs font-medium uppercase tracking-[0.18em] text-graphite-300">
          Next call · yours or theirs
        </p>
        <h2 className="font-display text-balance text-4xl font-bold uppercase leading-[0.98] text-concrete-50 sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-graphite-300">{lede}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-volt-400 font-semibold uppercase tracking-wide text-graphite-950 hover:bg-volt-400/90"
          >
            <TrackedLink
              event="cta_book_call"
              eventProps={{ location }}
              href="/contact"
            >
              Book a 15-minute call
            </TrackedLink>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-graphite-700 bg-transparent font-semibold uppercase tracking-wide text-concrete-50 hover:bg-graphite-800 hover:text-concrete-50"
          >
            <TrackedLink
              event="cta_try_demo"
              eventProps={{ location }}
              href={demoHref}
            >
              Talk to the AI first
            </TrackedLink>
          </Button>
        </div>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-graphite-300">
          No contracts · set up in days · cancel anytime
        </p>
      </div>
    </Section>
  );
}
