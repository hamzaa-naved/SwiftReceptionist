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
    <footer className="border-t border-line bg-cloud text-carbon-600">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 md:py-20">
        <p className="mb-14 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-carbon-950 sm:text-4xl">
          Never miss another call.
        </p>

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={`${site.name} home`}>
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              The 24/7 AI receptionist for electrical contractors and garage
              door companies. Every call answered, every job captured.
            </p>
            <p className="mt-5 text-sm">
              <a
                href={`mailto:${site.contact.email}`}
                className="link-underline font-medium text-carbon-950"
              >
                {site.contact.email}
              </a>
            </p>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Industries" links={industryLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs leading-relaxed text-carbon-400 sm:flex-row sm:items-center sm:justify-between">
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
      <h3 className="eyebrow mb-5 text-carbon-400">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-carbon-600 transition-colors duration-300 hover:text-carbon-950"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
