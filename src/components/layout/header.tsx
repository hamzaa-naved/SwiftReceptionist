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
import { EASE_LUXE as EASE } from "@/lib/motion";

/**
 * Midnight Cinema: every route now opens on the night ground, so the
 * chrome is always the light (ivory-on-dark) treatment. Reintroduce a
 * pathname check here if a light route ever needs to opt out.
 */
function hasDarkHero() {
  return true;
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

  const reduceMotion = useReducedMotion();
  const closeMenu = () => setOpen(false);
  // Night routes keep light (ivory-on-dark) chrome even once scrolled —
  // the glass tints night instead of ivory so the scene stays cinematic.
  const light = hasDarkHero() && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        scrolled || open
          ? light
            ? "border-b border-espresso-800/70 bg-night-990/85 backdrop-blur-xl"
            : "border-b border-line/70 bg-ivory/80 backdrop-blur-xl"
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

      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="overflow-hidden border-t border-line bg-ivory lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="px-6 pb-8 pt-3">
              {site.nav.map((item, i) => (
                <m.div
                  key={item.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.04, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="font-display block py-3 text-2xl font-medium text-espresso-950"
                  >
                    {item.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                className="mt-5 grid gap-2.5"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + site.nav.length * 0.04, ease: EASE }}
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
