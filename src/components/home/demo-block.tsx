import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { CallTranscript } from "@/components/shared/call-transcript";
import { niches } from "@/content/niches";

/**
 * HEAR IT FOR YOURSELF — the most disarming scene for a skeptic. A real
 * transcript plays like a lit phone screen in the dark; the full
 * interactive experience lives on /demo (kept off first paint).
 */
export function DemoBlock() {
  return (
    <Section tone="night" id="live-demo">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-6 text-brass-400">Hear it</p>
          <h2 className="font-display text-balance text-4xl font-light leading-[1.04] text-ivory sm:text-5xl">
            Don&apos;t believe a website.{" "}
            <span className="italic text-brass-400">Believe your ears.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-espresso-300">
            The demo receptionist answers like it&apos;s working your front
            desk. Interrupt it, mumble, ask it something strange — do exactly
            what your customers would do at nine on a Saturday night.
          </p>
          <ul className="mt-8 space-y-3 text-[0.98rem] text-espresso-300">
            <li className="flex items-baseline gap-3">
              <span className="text-brass-400">—</span>
              Talk to it out loud, or type if you&apos;re somewhere quiet
            </li>
            <li className="flex items-baseline gap-3">
              <span className="text-brass-400">—</span>
              Personalised to your business name and trade
            </li>
          </ul>
          <div className="mt-10">
            <Button asChild size="lg" className="btn-sheen bg-ivory text-espresso-950 hover:bg-brass-100">
              <TrackedLink event="cta_try_demo" eventProps={{ location: "demo_block" }} href="/demo">
                Start the live demo →
              </TrackedLink>
            </Button>
          </div>
        </div>
        <Reveal>
          {/* Flagship niche transcript (registry index 0), lit like a phone
              screen someone answered in a dark kitchen */}
          <div className="shadow-[0_0_90px_-18px_rgba(195,154,86,0.28)]">
            <CallTranscript
              tone="night"
              scenario={niches[0].scriptScenario}
              turns={niches[0].callScript.slice(0, 6)}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
