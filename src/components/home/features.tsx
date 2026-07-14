import {
  BellRing,
  CalendarCheck2,
  FileX2,
  Layers,
  MessageSquareText,
  Tags,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TiltCard } from "@/components/shared/tilt-card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: CalendarCheck2,
    title: "Books jobs into your calendar",
    body: "Inside the rules you set — service area, hours, buffers. Straight from call to booked slot.",
    gradient: true,
  },
  {
    icon: BellRing,
    title: "Flags real emergencies",
    body: "You define urgent. It rings you through instantly and tells the caller exactly what happens next.",
  },
  {
    icon: MessageSquareText,
    title: "Texts you every call",
    body: "Summary and full transcript on your phone, seconds after hangup. You hear everything.",
  },
  {
    icon: Layers,
    title: "Takes three calls at once",
    body: "No busy signal, no hold queue. Storm night and a full line — every caller gets answered.",
  },
  {
    icon: Tags,
    title: "Quotes your prices",
    body: "The ranges you approve, worded the way you'd say them. It never invents a number.",
  },
  {
    icon: FileX2,
    title: "No contracts",
    body: "Month to month. Cancel with an email — we keep you by answering well, not by lock-in.",
  },
];

/** The bento: what it actually does, in six tiles. */
export function Features() {
  return (
    <Section id="features">
      <SectionHeader
        kicker="What it does"
        title="It does the front desk. You do the work."
        lede="Everything a great phone person does — without the salary, the sick days, or the 5 PM cutoff."
        align="center"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05} className="h-full">
            <TiltCard className="group relative h-full rounded-3xl">
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-7 transition-shadow duration-300",
                  f.gradient
                    ? "border-transparent text-white shadow-lift"
                    : "border-line bg-white shadow-card hover:shadow-lift",
                )}
                style={
                  f.gradient
                    ? { background: "linear-gradient(135deg, #0a84ff, #7c3aed)" }
                    : undefined
                }
              >
                <span
                  className={cn(
                    "mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                    f.gradient ? "bg-white/15" : "bg-cloud",
                  )}
                >
                  <f.icon
                    className={cn("h-5 w-5", f.gradient ? "text-white" : "text-azure-600")}
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.01em]">{f.title}</h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    f.gradient ? "text-white/85" : "text-carbon-600",
                  )}
                >
                  {f.body}
                </p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
