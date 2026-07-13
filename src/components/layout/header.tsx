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

/** Routes with an espresso-dark hero; the transparent header goes light there. */
function hasDarkHero(pathname: string) {
  return pathname === "/" || pathname.startsWith("/demo");
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);
  const light = hasDarkHero(pathname) && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        scrolled || open
          ? "border-b border-line/70 bg-ivory/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo tone={light ? "light" : "dark"} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-underline text-sm tracking-wide transition-colors",
                light
                  ? "text-espresso-300 hover:text-ivory"
                  : "text-espresso-700 hover:text-espresso-950",
                pathname === item.href && (light ? "text-ivory" : "text-espresso-950"),
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(light && "text-ivory hover:bg-ivory/10 hover:text-ivory")}
          >
            <TrackedLink event="cta_try_demo" eventProps={{ location: "nav" }} href={site.cta.secondary.href}>
              {site.cta.secondary.label}
            </TrackedLink>
          </Button>
          <Button
            asChild
            size="sm"
            className={cn(light && "bg-ivory text-espresso-950 hover:bg-brass-100")}
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
            className={cn(light && "bg-ivory text-espresso-950 hover:bg-brass-100")}
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
              "rounded-[2px] p-2 focus-visible:outline-2 focus-visible:outline-ring",
              light ? "text-ivory hover:bg-ivory/10" : "text-espresso-800 hover:bg-espresso-950/5",
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
          className="border-t border-line bg-ivory px-6 pb-8 pt-3 lg:hidden"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="font-display block py-3 text-2xl font-medium text-espresso-950"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 grid gap-2">
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
