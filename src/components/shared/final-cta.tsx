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
    <Section tone="ink">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-balance text-3xl font-bold leading-tight text-paper sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-300">{lede}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-flame-500 text-ink-950 hover:bg-flame-400"
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
            className="border-ink-700 bg-transparent text-paper hover:bg-ink-800 hover:text-paper"
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
        <p className="mt-5 text-sm text-ink-300">
          No contracts. Set up in days. Cancel anytime.
        </p>
      </div>
    </Section>
  );
}
