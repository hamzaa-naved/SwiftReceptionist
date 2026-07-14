"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";
import { EASE_CRISP as EASE } from "@/lib/motion";

/** DAYLIGHT chrome: white glass over the white void, carbon links. */
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

  const reduceMotion = useReducedMotion();
  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
        scrolled || open
          ? "border-b border-line/80 bg-white/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10 md:h-[4.5rem]">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors duration-300",
                pathname === item.href
                  ? "font-medium text-carbon-950"
                  : "text-carbon-600 hover:text-carbon-950",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <TrackedLink event="cta_try_demo" eventProps={{ location: "nav" }} href={site.cta.secondary.href}>
              {site.cta.secondary.label}
            </TrackedLink>
          </Button>
          <Button asChild size="sm">
            <TrackedLink event="cta_book_call" eventProps={{ location: "nav" }} href={site.cta.primary.href}>
              {site.cta.primary.label}
            </TrackedLink>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm">
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
            className="rounded-full p-2 text-carbon-600 hover:bg-cloud hover:text-carbon-950"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="overflow-hidden border-t border-line bg-white lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="px-6 pb-8 pt-3">
              {site.nav.map((item, i) => (
                <m.div
                  key={item.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 + i * 0.035, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-3 text-2xl font-semibold tracking-[-0.02em] text-carbon-950"
                  >
                    {item.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                className="mt-5 grid gap-2.5"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 + site.nav.length * 0.035, ease: EASE }}
              >
                <Button asChild size="lg">
                  <TrackedLink
                    event="cta_book_call"
                    eventProps={{ location: "nav_mobile_menu" }}
                    href={site.cta.primary.href}
                    onClick={closeMenu}
                  >
                    {site.cta.primary.label}
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <TrackedLink
                    event="cta_try_demo"
                    eventProps={{ location: "nav_mobile_menu" }}
                    href={site.cta.secondary.href}
                    onClick={closeMenu}
                  >
                    {site.cta.secondary.label}
                  </TrackedLink>
                </Button>
              </m.div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
