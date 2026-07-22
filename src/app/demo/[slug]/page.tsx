import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { demoLeads, getDemoLead } from "@/content/demo-leads";
import { DemoExperience } from "@/components/demo/demo-experience";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

export async function generateStaticParams() {
  return demoLeads.map((lead) => ({ slug: lead.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lead = getDemoLead(slug);
  if (!lead) return {};

  return {
    title: `${lead.business} — Live AI Receptionist Demo`,
    description: `Talk to the AI receptionist built for ${lead.business} and hear exactly what your customers would hear.`,
    alternates: { canonical: `${site.url}/demo/${lead.slug}` },
  };
}

export default async function DemoLeadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lead = getDemoLead(slug);
  if (!lead) notFound();

  return (
    <div className="relative min-h-screen overflow-hidden bg-snow pb-24 pt-32 md:pt-40">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Suspense fallback={null}>
          <DemoExperience
            initialBusiness={lead.business}
            initialCity={lead.city}
            initialNiche="electrical"
          />
        </Suspense>

        <div className="relative mx-auto mt-16 max-w-2xl rounded-3xl border border-line bg-white p-8 text-center shadow-card sm:p-10">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-carbon-950 sm:text-3xl">
            Impressed? Skeptical? Either way — let&apos;s talk.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-carbon-600">
            A 15-minute call is all it takes to see it configured for {lead.business}, your prices, your service area.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <TrackedLink event="cta_book_call" eventProps={{ location: "demo_page", slug: lead.slug }} href="/contact">
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
