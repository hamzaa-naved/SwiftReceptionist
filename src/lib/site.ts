/**
 * Central site configuration. Everything identity-related lives here so
 * copy, legal pages, and JSON-LD stay consistent.
 *
 * [BRACKETED] values are placeholders you must replace before launch.
 */
export const site = {
  name: "Swift Receptionist",
  tagline: "The AI receptionist that answers before your competitor does",
  domain: "swiftreceptionist.com",
  url: "https://swiftreceptionist.com",
  demoUrl: "/demo", // point demo.swiftreceptionist.com here later via Vercel domain settings

  contact: {
    email: "hello@swiftreceptionist.com",
    // [REPLACE] with a real business phone before launch — it matters for trust.
    phone: "[BUSINESS PHONE]",
  },

  legal: {
    // [REPLACE] with your registered entity + address. Required for
    // cold-email compliance (CAN-SPAM) and for looking legitimate.
    entityName: "[LEGAL ENTITY NAME, e.g. Swift Receptionist LLC]",
    address: "[REGISTERED BUSINESS ADDRESS]",
    jurisdiction: "[STATE/COUNTRY OF REGISTRATION]",
  },

  social: {
    // Add real profiles as they exist; empty entries are hidden.
    linkedin: "",
    twitter: "",
  },

  nav: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "Results", href: "/results" },
    { label: "Resources", href: "/blog" },
    { label: "About", href: "/about" },
  ],

  cta: {
    primary: { label: "Book a call", href: "/contact" },
    secondary: { label: "Try the live demo", href: "/demo" },
  },
} as const;

export type SiteConfig = typeof site;
