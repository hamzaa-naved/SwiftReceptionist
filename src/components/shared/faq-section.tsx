"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { track } from "@/lib/integrations/analytics";
import { cn } from "@/lib/utils";
import type { NicheFaq } from "@/content/niches/types";

/** Objection-handling FAQ as an editorial index. Pair with faqJsonLd(). */
export function FaqAccordion({
  items,
  tone = "paper",
}: {
  items: NicheFaq[];
  /** "paper" for light grounds, "night" for the midnight scenes. */
  tone?: "paper" | "night";
}) {
  const night = tone === "night";
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "mx-auto w-full max-w-3xl border-t",
        night ? "border-espresso-800" : "border-line",
      )}
      onValueChange={(value) => {
        if (value) track("faq_opened", { question: value });
      }}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.q}
          value={item.q}
          className={cn("border-b", night ? "border-espresso-800" : "border-line")}
        >
          <AccordionTrigger className="group gap-6 py-6 text-left hover:no-underline">
            <span
              className={cn(
                "text-lg font-semibold leading-snug tracking-[-0.01em] sm:text-xl",
                night ? "text-ivory" : "text-carbon-950",
              )}
            >
              {item.q}
            </span>
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "pb-7 pr-10 text-[1rem] leading-relaxed",
              night ? "text-espresso-300" : "text-carbon-600",
            )}
          >
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
