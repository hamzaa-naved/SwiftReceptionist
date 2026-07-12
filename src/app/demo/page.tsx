import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { DemoExperience } from "@/components/demo/demo-experience";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

export const metadata: Metadata = {
  title: "Talk to the AI Receptionist — Live Demo",
  description:
    "Don't take our word for it. Talk to the Swift Receptionist demo out loud (or type to it) and hear exactly what your customers would hear at 9pm on a Saturday.",
  alternates: { canonical: `${site.url}/demo` },
};

/**
 * The demo page. Reads ?biz=&city=&niche= to personalize (used by cold
 * outreach links, e.g. /demo?biz=Ace%20Electric&city=Tulsa&niche=electrical).
 * Point demo.swiftreceptionist.com at this route via Vercel later.
 */
export default function DemoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 pb-20 pt-32 md:pt-40">
      <div
        aria-hidden
        className="speed-drift pointer-events-none absolute inset-y-0 -left-40 -right-40 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 96px, currentColor 96px 160px)",
          maskImage: "linear-gradient(180deg, black, transparent 60%)",
          color: "#faf9f6",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Suspense fallback={null}>
          <DemoExperience />
        </Suspense>

        <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-ink-800 bg-ink-900/60 p-6 text-center sm:p-8">
          <h2 className="font-display text-xl font-bold text-paper">
            Impressed? Skeptical? Either way — let&apos;s talk.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-300">
            A 15-minute call is all it takes to see it configured for your
            business, your prices, your service area.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-flame-500 text-ink-950 hover:bg-flame-400">
              <TrackedLink
                event="cta_book_call"
                eventProps={{ location: "demo_page" }}
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
              <Link href="/how-it-works">
                How setup works <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
