import { site } from "@/lib/site";
import type { NicheFaq } from "@/content/niches/types";

/**
 * JSON-LD builders. Rendered via <JsonLd /> so structured data stays
 * consistent and in one place.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.contact.email,
    description:
      "24/7 AI receptionist service for local service businesses. Every call answered, jobs booked, emergencies triaged.",
    sameAs: [site.social.linkedin, site.social.twitter].filter(Boolean),
  };
}

export function serviceJsonLd(options: {
  name: string;
  description: string;
  url: string;
  audience?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    url: options.url,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    serviceType: "AI phone answering service",
    ...(options.audience && {
      audience: { "@type": "Audience", audienceType: options.audience },
    }),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: NicheFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
