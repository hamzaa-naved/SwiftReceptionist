"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { track } from "@/lib/integrations/analytics";
import type { NicheFaq } from "@/content/niches/types";

/** Objection-handling FAQ as an editorial index. Pair with faqJsonLd(). */
export function FaqAccordion({ items }: { items: NicheFaq[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto w-full max-w-3xl border-t border-line"
      onValueChange={(value) => {
        if (value) track("faq_opened", { question: value });
      }}
    >
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q} className="border-b border-line">
          <AccordionTrigger className="group gap-6 py-6 text-left hover:no-underline">
            <span className="text-lg font-semibold leading-snug tracking-[-0.01em] text-carbon-950 sm:text-xl">
              {item.q}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-7 pr-10 text-[1rem] leading-relaxed text-carbon-600">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
