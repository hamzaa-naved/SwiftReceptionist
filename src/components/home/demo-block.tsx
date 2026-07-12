import { MessageSquareText, Mic } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { CallTranscript } from "@/components/shared/call-transcript";
import { niches } from "@/content/niches";

/**
 * Live demo block: the single most disarming section for a skeptic.
 * The full interactive experience lives on /demo (kept off the homepage
 * to protect first-paint); this block shows a real transcript and sends
 * high-intent visitors there.
 */
export function DemoBlock() {
  return (
    <Section tone="ink" id="live-demo">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="streak-lines mb-4 text-xs font-medium uppercase tracking-[0.18em] text-graphite-300">
            Don&apos;t take our word for it
          </p>
          <h2 className="font-display text-balance text-3xl font-bold leading-tight text-paper sm:text-4xl">
            Talk to it right now. Try to trip it up.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            The demo receptionist answers like it&apos;s working your front
            desk. Interrupt it, mumble, ask it something weird — do exactly
            what your customers would do at 9pm on a Saturday.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-300">
            <li className="flex items-center gap-2.5">
              <Mic className="h-4 w-4 shrink-0 text-flame-400" aria-hidden />
              Talk to it out loud — or type if you&apos;re somewhere quiet
            </li>
            <li className="flex items-center gap-2.5">
              <MessageSquareText className="h-4 w-4 shrink-0 text-flame-400" aria-hidden />
              Personalized to your business name and trade
            </li>
          </ul>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-volt-400 font-semibold uppercase tracking-wide text-graphite-950 hover:bg-volt-400/90"
            >
              <TrackedLink
                event="cta_try_demo"
                eventProps={{ location: "demo_block" }}
                href="/demo"
              >
                Start the live demo
              </TrackedLink>
            </Button>
          </div>
        </div>
        <Reveal>
          {/* Flagship niche transcript (registry index 0) */}
          <CallTranscript
            scenario={niches[0].scriptScenario}
            turns={niches[0].callScript.slice(0, 6)}
          />
        </Reveal>
      </div>
    </Section>
  );
}
