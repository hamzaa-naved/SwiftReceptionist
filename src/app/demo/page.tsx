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
    <div className="relative min-h-screen overflow-hidden bg-night-990 pb-24 pt-36 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(180deg, black, transparent 65%)",
          color: "#f6f1e7",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Suspense fallback={null}>
          <DemoExperience />
        </Suspense>

        <div className="relative mx-auto mt-16 max-w-2xl border border-espresso-700/60 bg-espresso-900/50 p-8 text-center backdrop-blur-sm sm:p-10">
          {/* corner ticks — the framed-print detail from the hero still */}
          <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l border-t border-brass-400" />
          <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r border-t border-brass-400" />
          <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-brass-400" />
          <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-brass-400" />

          <h2 className="font-display text-2xl font-light text-ivory sm:text-3xl">
            Impressed? Skeptical? Either way — <span className="italic text-brass-400">let&apos;s talk.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-espresso-300">
            A 15-minute call is all it takes to see it configured for your
            business, your prices, your service area.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-ivory text-espresso-950 hover:bg-brass-100">
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
              className="border-ivory/30 bg-transparent text-ivory hover:border-ivory hover:bg-ivory hover:text-espresso-950"
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
