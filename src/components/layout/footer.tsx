import Link from "next/link";
import { site, isPlaceholder } from "@/lib/site";
import { niches } from "@/content/niches";
import { Logo } from "@/components/layout/logo";

const productLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Live demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "Results", href: "/results" },
];

// Derived from the niche registry so a niche swap never leaves stale links.
const industryLinks = niches.map((n) => ({
  label: n.name,
  href: `/industries/${n.slug}`,
}));

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Resources", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-ink-300">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={`${site.name} home`}>
              <Logo tone="light" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              24/7 AI receptionists for local service businesses. Every call
              answered, every job captured — while you&apos;re on the job.
            </p>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${site.contact.email}`}
                className="text-paper underline-offset-4 hover:underline"
              >
                {site.contact.email}
              </a>
            </p>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Industries" links={industryLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        {/* Until the real legal identity is set in src/lib/site.ts (README
            launch checklist), show only the brand line — never raw
            [PLACEHOLDER] text to visitors. */}
        <div className="mt-12 flex flex-col gap-3 border-t border-ink-800 pt-6 text-xs leading-relaxed sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            {isPlaceholder(site.legal.entityName) ? site.name : site.legal.entityName}
            . All rights reserved.
          </p>
          {!isPlaceholder(site.legal.entityName) && !isPlaceholder(site.legal.address) && (
            <p className="max-w-md">
              {site.legal.entityName}, {site.legal.address}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-paper">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
