"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

/** Routes whose hero is ink-dark; the transparent header must go light there. */
function hasInkHero(pathname: string) {
  return pathname === "/" || pathname.startsWith("/demo");
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  // While transparent over a dark hero, every header element flips to a
  // light treatment; once scrolled (paper glass) or the menu is open, the
  // standard dark-on-paper treatment applies.
  const light = hasInkHero(pathname) && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled || open
          ? "border-b border-border bg-paper/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo tone={light ? "light" : "dark"} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                light
                  ? "text-ink-300 hover:bg-ink-800/60 hover:text-paper"
                  : "text-ink-700 hover:bg-paper-warm hover:text-foreground",
                pathname === item.href && (light ? "text-paper" : "text-foreground"),
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(light && "text-paper hover:bg-ink-800/60 hover:text-paper")}
          >
            <TrackedLink event="cta_try_demo" eventProps={{ location: "nav" }} href={site.cta.secondary.href}>
              {site.cta.secondary.label}
            </TrackedLink>
          </Button>
          <Button
            asChild
            size="sm"
            className={cn(light && "bg-volt-400 text-graphite-950 hover:bg-volt-400/90")}
          >
            <TrackedLink event="cta_book_call" eventProps={{ location: "nav" }} href={site.cta.primary.href}>
              {site.cta.primary.label}
            </TrackedLink>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            asChild
            size="sm"
            className={cn(light && "bg-volt-400 text-graphite-950 hover:bg-volt-400/90")}
          >
            <TrackedLink event="cta_book_call" eventProps={{ location: "nav_mobile" }} href={site.cta.primary.href}>
              {site.cta.primary.label}
            </TrackedLink>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "rounded-md p-2 focus-visible:outline-2 focus-visible:outline-ring",
              light
                ? "text-paper hover:bg-ink-800/60"
                : "text-ink-700 hover:bg-paper-warm",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-paper px-5 pb-6 pt-2 lg:hidden"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block rounded-md px-2 py-3 text-base font-medium text-ink-700 hover:bg-paper-warm hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 grid gap-2">
            <Button asChild variant="outline">
              <TrackedLink
                event="cta_try_demo"
                eventProps={{ location: "nav_mobile_menu" }}
                href={site.cta.secondary.href}
                onClick={closeMenu}
              >
                {site.cta.secondary.label}
              </TrackedLink>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
