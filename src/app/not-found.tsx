import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Branded 404 — mistyped or expired outreach links land here. */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 pt-16">
      <div className="mx-auto max-w-md text-center">
        <p className="eyebrow justify-center text-brass-500">Error 404</p>
        <h1 className="font-display mt-5 text-balance text-5xl font-light sm:text-6xl">
          This page missed the call.
        </h1>
        <p className="mt-4 text-muted-foreground">
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
