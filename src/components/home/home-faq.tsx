import { Section, SectionHeader } from "@/components/shared/section";
import { FaqAccordion } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/shared/json-ld";
import { faqJsonLd } from "@/lib/seo";
import type { NicheFaq } from "@/content/niches/types";

export const homeFaqs: NicheFaq[] = [
  {
    q: "Does it sound robotic?",
    a: "Judge it yourself — the demo on this site is the same voice technology your customers would hear. It talks at a normal pace, handles interruptions, and doesn't read menus at people. Some callers realize it's AI, most just notice someone finally picked up.",
  },
  {
    q: "What happens when it can't answer something?",
    a: "It does what a good employee would: takes the caller's details, tells them exactly when they'll hear back, and texts you the question with the full transcript. It's set up to never bluff about your prices or your work.",
  },
  {
    q: "I'm not a tech person. What do I actually have to do?",
    a: "One phone call with us, then forward your calls — which we walk you through, it's the same as forwarding to any other number. There's no app to learn and nothing to install. If you can set up voicemail, you're overqualified.",
  },
  {
    q: "What if it books something wrong?",
    a: "Every booking follows rules you set — service area, hours, job types, buffer times — and you get a text summary of every call the moment it ends, so nothing sneaks onto your calendar. In the first weeks we review calls with you and tighten anything that's off.",
  },
  {
    q: "Am I locked into a contract?",
    a: "No. Month to month, cancel with an email. We'd rather earn the next month than trap you into it.",
  },
  {
    q: "How is this different from an answering service?",
    a: "A call center puts your customer in a hold queue so a stranger with a generic script can take a message you still have to return. This answers instantly, knows your business, books the job on the spot, and costs a flat rate instead of per-minute fees.",
  },
  {
    q: "Do I have to change my phone number?",
    a: "No. You keep your number exactly as it is and forward calls when you want the receptionist to catch them — all calls, after-hours only, or just when you don't pick up.",
  },
];

export function HomeFaq() {
  return (
    <Section tone="warm" id="faq">
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <SectionHeader
        kicker="No. 08 — Straight answers"
        title="The questions every owner asks before saying yes"
      />
      <FaqAccordion items={homeFaqs} />
    </Section>
  );
}
