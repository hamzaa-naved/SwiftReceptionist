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
        <h1 className="font-display text-4xl font-light tracking-[-0.02em] sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-espresso-500">Last updated: {updated}</p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-espresso-700 [&_h2]:font-display [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>
      </article>
    </Section>
  );
}
