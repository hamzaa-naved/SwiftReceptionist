import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern use of ${site.name}'s website and services.`,
  alternates: { canonical: `${site.url}/terms` },
};

/**
 * [REVIEW REQUIRED] Working draft — have a lawyer review before launch,
 * and fill in the entity fields in src/lib/site.ts.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 4, 2026">
      <p>
        These Terms of Service (“Terms”) govern your use of the website at{" "}
        {site.domain} and the services provided by {site.legal.entityName}
        (“{site.name},” “we,” “us”). By using the site or services, you agree
        to these Terms.
      </p>

      <h2>The service</h2>
      <p>
        {site.name} provides an AI-powered call answering service for
        businesses: answering inbound calls, capturing lead information,
        scheduling appointments, and escalating calls per your
        configuration. Specific features, limits, and pricing are set out in
        your order or service agreement.
      </p>

      <h2>Accounts & acceptable use</h2>
      <ul>
        <li>You must provide accurate business information.</li>
        <li>
          You may not use the service for unlawful purposes, including
          deceptive robocalling, harassment, or violating telemarketing and
          call-recording laws.
        </li>
        <li>
          You are responsible for ensuring your use of call recording and
          automated answering complies with the laws of your jurisdiction;
          we assist with sensible defaults but do not provide legal advice.
        </li>
      </ul>

      <h2>Billing & cancellation</h2>
      <p>
        Paid services bill monthly in advance at the rate quoted to you.
        There are no long-term contracts: you may cancel at any time with
        written notice (email suffices), effective at the end of the current
        billing period. Fees already paid are non-refundable except where
        required by law or stated otherwise in writing.
      </p>

      <h2>AI limitations</h2>
      <p>
        Our receptionist is an automated system. It is designed to answer
        accurately within the configuration you approve, but like any
        receptionist — human or AI — it can make mistakes. You are
        responsible for reviewing call summaries and confirming bookings that
        are critical to your business. We work with you to correct and tune
        any recurring issues.
      </p>

      <h2>Demo usage</h2>
      <p>
        The public demo is provided for evaluation, subject to fair-use
        session limits. Don&apos;t abuse it, probe it for vulnerabilities, or
        use it to process real customer calls.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The site, service, and all related software and content are owned by{" "}
        {site.legal.entityName} or its licensors. Your business information,
        call recordings, and transcripts remain yours; you grant us the
        license needed to operate the service for you.
      </p>

      <h2>Disclaimers & limitation of liability</h2>
      <p>
        The service is provided “as is” without warranties of any kind, and
        we do not guarantee uninterrupted operation or that every call will
        be answered or handled without error. To the maximum extent
        permitted by law, our total liability arising out of the service is
        limited to the fees you paid us in the three months preceding the
        claim, and neither party is liable for indirect or consequential
        damages.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate service for material breach of these
        Terms, unlawful use, or non-payment, with notice where practicable.
        You may terminate as described under Billing & cancellation.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of {site.legal.jurisdiction},
        without regard to conflict-of-law rules.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms; material changes will be posted here with
        an updated date. Continued use after changes take effect constitutes
        acceptance.
      </p>

      <h2>Contact</h2>
      <p>
        {site.legal.entityName}
        <br />
        {site.legal.address}
        <br />
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>
    </LegalPage>
  );
}
