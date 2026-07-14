import type { Metadata } from "next";
import { CalendarClock, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { getBookingEmbed } from "@/lib/integrations/booking";
import { Section, SectionHeader } from "@/components/shared/section";
import { LeadForm } from "@/components/shared/lead-form";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a 15-minute call: we'll show the AI receptionist configured for your business and give you straight answers on pricing and setup.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  const booking = getBookingEmbed();

  return (
    <>
      <Section tone="night" className="pt-32 md:pt-40">
        <SectionHeader
          tone="ink"
          kicker="Book a call"
          title="Fifteen minutes. No pitch deck, no pressure."
          lede="We'll ask about your call volume, show you the receptionist handling your kind of calls, and give you an exact price. If it's not a fit, we'll say so."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          {booking.embedUrl ? (
            <div className="overflow-hidden border border-line bg-ivory-raised">
              <iframe
                src={booking.embedUrl}
                title="Book a call"
                loading="lazy"
                className="h-[640px] w-full"
              />
            </div>
          ) : (
            <div className="relative flex h-full min-h-72 flex-col items-center justify-center border border-espresso-700/60 bg-espresso-900/40 p-8 text-center">
              <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l border-t border-brass-400" />
              <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r border-t border-brass-400" />
              <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-brass-400" />
              <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-brass-400" />
              <CalendarClock className="mb-5 h-8 w-8 text-brass-400" strokeWidth={1.5} aria-hidden />
              <h2 className="font-display text-2xl font-medium text-ivory">
                Calendar booking is almost live
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-espresso-300">
                Use the form and we&apos;ll call you back to find a time —
                usually the same business day.
              </p>
            </div>
          )}

          <div>
            <h2 className="font-display mb-5 text-2xl font-medium text-ivory">
              Prefer we call you?
            </h2>
            {/* The form is a lit island — paper under a desk lamp */}
            <div className="shadow-[0_0_80px_-20px_rgba(195,154,86,0.25)]">
              <LeadForm />
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-espresso-300">
              <Mail className="h-4 w-4 text-brass-400" aria-hidden />
              Or email us directly:{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="link-underline font-medium text-ivory"
              >
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
