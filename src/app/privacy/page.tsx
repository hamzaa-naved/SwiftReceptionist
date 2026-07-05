import type { Metadata } from "next";
import { site, isPlaceholder } from "@/lib/site";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  alternates: { canonical: `${site.url}/privacy` },
};

/**
 * [REVIEW REQUIRED] This is a solid working draft, not legal advice.
 * Have a lawyer review before launch, and fill in the entity fields in
 * src/lib/site.ts.
 */
export default function PrivacyPage() {
  // Until real values are set in site.ts, prose falls back to the brand
  // name and the address line is omitted (README launch checklist).
  const entity = isPlaceholder(site.legal.entityName) ? site.name : site.legal.entityName;
  return (
    <LegalPage title="Privacy Policy" updated="July 4, 2026">
      <p>
        This Privacy Policy explains how {entity} (“
        {site.name},” “we,” “us”) collects, uses, and shares information when
        you visit {site.domain}, use our demo, or become a customer.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us:</strong> name, business name,
          email, phone number, and anything you include in forms or emails.
        </li>
        <li>
          <strong>Demo interactions:</strong> if you use the voice or chat
          demo, the audio and/or text of that interaction is processed to
          provide the demo and may be reviewed to improve our service.
        </li>
        <li>
          <strong>Usage data:</strong> pages visited, actions taken (e.g.
          starting the demo), device and browser type, collected via
          privacy-respecting analytics.
        </li>
        <li>
          <strong>Customer call data:</strong> if you are a customer, calls
          answered on your behalf are recorded and transcribed so you can
          review them. Your callers interact with an automated assistant.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to inquiries and provide the service</li>
        <li>To operate, maintain, and improve our AI receptionist</li>
        <li>To send service-related communications</li>
        <li>To understand how visitors use the site so we can improve it</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t sell your personal information.</li>
        <li>We don&apos;t use customer call recordings for advertising.</li>
        <li>
          We don&apos;t send marketing email without an unsubscribe link, and
          we honor opt-outs immediately.
        </li>
      </ul>

      <h2>Service providers</h2>
      <p>
        We use third-party processors to run the service — for example voice
        AI infrastructure, calendar booking, analytics, email delivery, and
        hosting. They receive only the data needed to perform their function
        and are bound by their own privacy obligations.
      </p>

      <h2>Call recording consent</h2>
      <p>
        Calls handled by our AI receptionist may be recorded and transcribed
        for quality and so the business you called can serve you. Where
        required by law, callers are notified of recording at the start of a
        call. Customers are responsible for configuring recording disclosures
        appropriate to their jurisdiction; we help set this up.
      </p>

      <h2>Data retention & your rights</h2>
      <p>
        We keep personal information only as long as needed for the purposes
        above or as required by law. You may request access to, correction
        of, or deletion of your personal information by emailing{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. We
        respond to all verified requests within 30 days.
      </p>

      <h2>Cookies & analytics</h2>
      <p>
        We aim to run cookie-light. Our analytics measure aggregate usage and
        do not build advertising profiles. Where a cookie or similar
        technology is strictly necessary (e.g. spam protection), we use it
        for that purpose only.
      </p>

      <h2>Children</h2>
      <p>
        Our services are for businesses and are not directed at children
        under 13. We do not knowingly collect their information.
      </p>

      <h2>Changes</h2>
      <p>
        We&apos;ll post any changes to this policy on this page and update
        the date above. Material changes will be flagged prominently.
      </p>

      <h2>Contact</h2>
      <p>
        {entity}
        <br />
        {!isPlaceholder(site.legal.address) && (
          <>
            {site.legal.address}
            <br />
          </>
        )}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>
    </LegalPage>
  );
}
