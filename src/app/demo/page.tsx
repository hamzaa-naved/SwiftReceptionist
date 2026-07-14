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
    <div className="relative min-h-screen overflow-hidden bg-snow pb-24 pt-32 md:pt-40">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Suspense fallback={null}>
          <DemoExperience />
        </Suspense>

        <div className="relative mx-auto mt-16 max-w-2xl rounded-3xl border border-line bg-white p-8 text-center shadow-card sm:p-10">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-carbon-950 sm:text-3xl">
            Impressed? Skeptical? Either way — let&apos;s talk.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-carbon-600">
            A 15-minute call is all it takes to see it configured for your
            business, your prices, your service area.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <TrackedLink
                event="cta_book_call"
                eventProps={{ location: "demo_page" }}
                href="/contact"
              >
                Book a 15-minute call
              </TrackedLink>
            </Button>
            <Button asChild size="lg" variant="outline">
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
