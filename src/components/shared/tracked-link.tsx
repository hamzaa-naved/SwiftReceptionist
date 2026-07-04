"use client";

import Link from "next/link";
import { type ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/integrations/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  eventProps?: Record<string, string | number | boolean | undefined>;
};

/** A next/link that fires an analytics event on click. Use for every CTA. */
export function TrackedLink({ event, eventProps, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
