/**
 * Booking adapter. Both Cal.com and Calendly support plain iframe embeds,
 * so we avoid their JS SDKs entirely (lighter, faster, same result).
 *
 *   NEXT_PUBLIC_BOOKING_PROVIDER = "calcom" | "calendly"
 *   NEXT_PUBLIC_BOOKING_URL      = full booking link, e.g.
 *                                  https://cal.com/swift/15min
 *
 * Unconfigured → embedUrl is null and the contact page shows the lead
 * form as the primary action instead.
 */

const provider = process.env.NEXT_PUBLIC_BOOKING_PROVIDER ?? "calcom";
const rawUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

export function getBookingEmbed(): { provider: string; embedUrl: string | null } {
  if (!rawUrl) return { provider, embedUrl: null };

  try {
    const url = new URL(rawUrl);
    if (provider === "calendly") {
      // Hide Calendly's cookie banner chrome inside the iframe
      url.searchParams.set("hide_gdpr_banner", "1");
      url.searchParams.set("hide_landing_page_details", "1");
    } else {
      // Cal.com embed view
      url.searchParams.set("embed", "true");
      url.searchParams.set("theme", "light");
    }
    return { provider, embedUrl: url.toString() };
  } catch {
    return { provider, embedUrl: null };
  }
}
