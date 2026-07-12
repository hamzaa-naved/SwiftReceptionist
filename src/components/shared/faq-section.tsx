"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { track } from "@/lib/integrations/analytics";
import type { NicheFaq } from "@/content/niches/types";

/** Objection-handling FAQ accordion. Pair with faqJsonLd() on the page. */
export function FaqAccordion({ items }: { items: NicheFaq[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto w-full max-w-3xl border-2 border-graphite-950 bg-card px-6"
      onValueChange={(value) => {
        if (value) track("faq_opened", { question: value });
      }}
    >
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q}>
          <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
