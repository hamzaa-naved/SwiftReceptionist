import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DemoExperience } from "@/components/demo/demo-experience";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { resolveDemo } from "@/lib/outreach/service";

export const dynamic = "force-dynamic";

export default async function PersonalizedDemoPage({ params }: PageProps<"/demo/[token]">) {
  const { token } = await params;
  const demo = await resolveDemo(token);
  if (!demo) notFound();
  return (
    <div className="relative min-h-screen overflow-hidden bg-snow pb-24 pt-32 md:pt-40">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <DemoExperience
          demoToken={token}
          initialBusiness={String(demo.business)}
          initialCity={typeof demo.city === "string" && demo.city.toLowerCase() !== String(demo.state ?? "").toLowerCase() ? demo.city : ""}
          initialNiche="electrical"
        />
        <div className="relative mx-auto mt-16 max-w-2xl rounded-3xl border border-line bg-white p-8 text-center shadow-card sm:p-10">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-carbon-950 sm:text-3xl">
            Impressed? Skeptical? Either way — let&apos;s talk.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-carbon-600">
            A 15-minute call is all it takes to see it configured for your business, your prices, your service area.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <TrackedLink event="cta_book_call" eventProps={{ location: "personalized_demo" }} href="/contact">
                Book a 15-minute call
              </TrackedLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/how-it-works">How setup works <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
