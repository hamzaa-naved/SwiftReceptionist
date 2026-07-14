"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/tracked-link";

/**
 * Sticky bottom CTA bar on mobile. Most cold-outreach visitors arrive on a
 * phone; this keeps the two conversion actions one thumb-tap away. Appears
 * after modest scroll so it never covers the hero CTAs.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The demo and contact pages already are the conversion action.
  if (pathname.startsWith("/demo") || pathname.startsWith("/contact")) {
    return null;
  }

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/80 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-12px_rgb(13_13_18/0.12)] backdrop-blur-xl transition-transform duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <Button asChild variant="outline" tabIndex={visible ? 0 : -1}>
          <TrackedLink event="cta_try_demo" eventProps={{ location: "mobile_bar" }} href={site.cta.secondary.href}>
            Try the demo
          </TrackedLink>
        </Button>
        <Button asChild tabIndex={visible ? 0 : -1}>
          <TrackedLink event="cta_book_call" eventProps={{ location: "mobile_bar" }} href={site.cta.primary.href}>
            {site.cta.primary.label}
          </TrackedLink>
        </Button>
      </div>
    </div>
  );
}
