import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { FinalCta } from "@/components/shared/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Swift Receptionist exists: local service businesses lose real jobs to missed calls every day. We fix exactly that — nothing more, nothing less.",
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            align="left"
            kicker="About us"
            title="We do one thing: make sure your phone gets answered."
          />
          <div className="space-y-5 text-lg leading-relaxed text-espresso-700">
            <p>
              Swift Receptionist started with a pattern we couldn&apos;t
              unsee. Call ten local service companies — electricians, garage
              door techs, tree crews — and most of the time nobody picks up. Not because
              the owners are lazy; because they&apos;re working. The person
              who can fix your problem is the same person who can&apos;t
              reach the phone.
            </p>
            <p>
              Meanwhile, every one of those unanswered rings is a customer
              with money in hand, calling the next number on the list. The
              best technician in town loses the job to whoever answered
              fastest. That&apos;s not a fair fight, and it has nothing to do
              with the quality of the work.
            </p>
            <p>
              AI voice technology finally got good enough to fix this — good
              enough that a caller with a burning smell at the breaker panel
              at 9pm gets helped, booked, and reassured in seconds. But the tools are
              built for tech people, with dashboards and per-minute pricing
              and settings nobody has time to learn. So we became the layer
              in between: we build it, tune it to your trade, and hand you a
              phone line that simply never goes unanswered.
            </p>
            <p>
              We&apos;re deliberately small and deliberately focused. No
              suite of 40 marketing tools, no upsells to a “growth platform.”
              One job: every call answered, every job captured. If that&apos;s
              the leak in your business, we&apos;re the company that plugs
              it.
            </p>
          </div>

          <div className="mt-12 border border-line bg-ivory-raised p-8">
            <h2 className="font-display text-2xl font-medium">How we work with you</h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-espresso-700">
              <li>
                <strong className="text-foreground">Straight answers.</strong>{" "}
                You get one flat price, on the first call. If we&apos;re not a
                fit for your business, we&apos;ll tell you that too.
              </li>
              <li>
                <strong className="text-foreground">Founder-level service.</strong>{" "}
                Early clients work directly with the people who build the
                product. Your call scripts aren&apos;t configured by a support
                queue.
              </li>
              <li>
                <strong className="text-foreground">Proof over promises.</strong>{" "}
                Every call is recorded and transcribed to your dashboard. Our
                results page publishes real client numbers only — it&apos;s
                sparse today because we won&apos;t fake it.
              </li>
            </ul>
          </div>

          <p className="mt-10 text-base text-espresso-700">
            Questions, skepticism, edge cases — we want all of it:{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="link-underline font-medium text-espresso-950"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </Section>

      <FinalCta
        title="Judge us by the product, not the About page."
        lede="The demo receptionist is one click away. Grill it like a customer would — then let's talk."
        location="about_page"
      />
    </>
  );
}
