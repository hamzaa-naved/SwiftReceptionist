import { Section } from "@/components/shared/section";
import type { ReactNode } from "react";

/** Shared shell for legal pages: readable measure, consistent typography. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Section className="pt-32 md:pt-40">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-carbon-950 sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-carbon-400">Last updated: {updated}</p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-carbon-600 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-carbon-950 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>
      </article>
    </Section>
  );
}
