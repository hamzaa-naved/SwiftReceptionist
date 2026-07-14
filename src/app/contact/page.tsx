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
      <Section className="pt-32 md:pt-40">
        <SectionHeader
          kicker="Book a call"
          title="Fifteen minutes. No pitch deck, no pressure."
          lede="We'll ask about your call volume, show you the receptionist handling your kind of calls, and give you an exact price. If it's not a fit, we'll say so."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          {booking.embedUrl ? (
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <iframe
                src={booking.embedUrl}
                title="Book a call"
                loading="lazy"
                className="h-[640px] w-full"
              />
            </div>
          ) : (
            <div className="relative flex h-full min-h-72 flex-col items-center justify-center rounded-3xl border border-line bg-white p-8 text-center shadow-card">
              <CalendarClock className="mb-5 h-8 w-8 text-azure-600" strokeWidth={1.5} aria-hidden />
              <h2 className="text-2xl font-semibold tracking-[-0.01em] text-carbon-950">
                Calendar booking is almost live
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-carbon-600">
                Use the form and we&apos;ll call you back to find a time —
                usually the same business day.
              </p>
            </div>
          )}

          <div>
            <h2 className="mb-5 text-2xl font-semibold tracking-[-0.01em] text-carbon-950">
              Prefer we call you?
            </h2>
            <LeadForm />
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-carbon-600">
              <Mail className="h-4 w-4 text-azure-600" aria-hidden />
              Or email us directly:{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="link-underline font-medium text-azure-600"
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
