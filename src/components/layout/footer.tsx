import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/layout/logo";

const productLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Live demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "Results", href: "/results" },
];

const industryLinks = [
  { label: "Garage door repair", href: "/industries/garage-door" },
  { label: "Septic & porta-potty", href: "/industries/septic" },
  { label: "Tree service", href: "/industries/tree-service" },
  { label: "Well & pump", href: "/industries/well-pump" },
  { label: "Self-storage", href: "/industries/self-storage" },
];

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
              <Logo className="[&_span]:text-paper" />
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

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-800 pt-6 text-xs leading-relaxed sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legal.entityName}. All rights
            reserved.
          </p>
          <p className="max-w-md">
            {site.legal.entityName}, {site.legal.address}
          </p>
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
