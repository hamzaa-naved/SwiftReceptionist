import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { CallTranscript } from "@/components/shared/call-transcript";
import { niches } from "@/content/niches";

/**
 * Live demo block: the most disarming section for a skeptic. Full
 * interactive experience lives on /demo (kept off first paint); here a
 * real transcript plays and sends high-intent visitors there.
 */
export function DemoBlock() {
  return (
    <Section id="live-demo">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-6 text-brass-500">No. 04 — The proof</p>
          <h2 className="font-display text-balance text-4xl font-light leading-[1.04] sm:text-5xl">
            Don&apos;t take our word for it.{" "}
            <span className="italic text-brass-500">Talk to it.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-espresso-700">
            The demo receptionist answers like it&apos;s working your front
            desk. Interrupt it, mumble, ask it something strange — do exactly
            what your customers would do at nine on a Saturday night.
          </p>
          <ul className="mt-8 space-y-3 text-[0.98rem] text-espresso-700">
            <li className="flex items-baseline gap-3">
              <span className="text-brass-500">—</span>
              Talk to it out loud, or type if you&apos;re somewhere quiet
            </li>
            <li className="flex items-baseline gap-3">
              <span className="text-brass-500">—</span>
              Personalised to your business name and trade
            </li>
          </ul>
          <div className="mt-10">
            <Button asChild size="lg">
              <TrackedLink event="cta_try_demo" eventProps={{ location: "demo_block" }} href="/demo">
                Start the live demo →
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
