import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Branded 404 — mistyped or expired outreach links land here. */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-snow px-5 pt-16 text-carbon-950">
      <div className="mx-auto max-w-md text-center">
        <p className="eyebrow justify-center text-carbon-400">Error 404</p>
        <h1 className="mt-5 text-balance font-display text-5xl sm:text-6xl">
          This page missed the call.
        </h1>
        <p className="mt-4 text-carbon-600">
          The link is wrong or the page moved — but unlike your phone line,
          we can point you somewhere useful.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Back to the homepage</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/demo">Try the live demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
