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
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={item.q} className="border-b border-line">
          <AccordionTrigger className="group gap-6 py-6 text-left hover:no-underline">
            <span className="flex items-baseline gap-5">
              <span className="font-display text-sm italic text-brass-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl font-medium leading-snug text-espresso-950 sm:text-2xl">
                {item.q}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-7 pl-10 text-[1.02rem] leading-relaxed text-espresso-700">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
