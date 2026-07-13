import type { Metadata } from "next";
import { MessageSquareText, PhoneForwarded, ClipboardCheck, BellRing, FileText, RefreshCcw } from "lucide-react";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { HowItWorks } from "@/components/home/how-it-works";
import { FinalCta } from "@/components/shared/final-cta";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Three steps, live in days: we build your AI receptionist, you forward your calls, jobs land on your calendar. No apps, no new number, nothing to learn.",
  alternates: { canonical: `${site.url}/how-it-works` },
};

const details = [
  {
    icon: MessageSquareText,
    title: "It answers like your best day on the phone",
    body: "Callers hear your business name and get helped immediately — no menus, no 'press 1'. It asks the questions you'd ask, gives the answers you approved, and never gets flustered by three calls at once.",
  },
  {
    icon: ClipboardCheck,
    title: "Booking follows your rules",
    body: "Service area, working hours, job types you take, buffers between jobs — it books inside the lines you set. Anything outside them becomes a message, not a mess.",
  },
  {
    icon: BellRing,
    title: "Real emergencies reach you instantly",
    body: "You define what counts as an emergency for your trade. When one hits, it alerts your on-call phone immediately and tells the caller exactly when to expect a callback.",
  },
  {
    icon: FileText,
    title: "You see everything",
    body: "Every call is recorded, transcribed, and summarized to your phone within seconds of hanging up. You'll never wonder what it said on your behalf.",
  },
  {
    icon: PhoneForwarded,
    title: "Your number stays yours",
    body: "No porting, no new lines on your truck decals. Standard call forwarding you can turn on and off yourself — total control stays with you.",
  },
  {
    icon: RefreshCcw,
    title: "It gets sharper every week",
    body: "In the first weeks we review real calls with you and tune the scripts. It's not 'set and pray' — it's a receptionist you train once, that never forgets the training.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-32 md:pt-40 pb-0">
        <SectionHeader
          kicker="How it works"
          title="Simpler than hiring. Faster than training."
          lede="If you can forward your phone, you can run this. Here's the whole process, start to finish."
        />
      </Section>

      <HowItWorks standalone />

      <Section>
        <SectionHeader
          kicker="Under the hood"
          title="What 'it just answers' actually means"
        />
        <div className="grid gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {details.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05} className="h-full">
              <div className="h-full bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-raised">
                <d.icon className="mb-5 h-6 w-6 text-brass-500" strokeWidth={1.5} aria-hidden />
                <h3 className="font-display mb-2 text-xl font-medium leading-tight">{d.title}</h3>
                <p className="text-sm leading-relaxed text-espresso-700">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta
        title="Days from now, your phone answers itself."
        lede="Book the setup call — or talk to the demo first and hear what your callers would hear."
        location="how_it_works"
      />
    </>
  );
}
