import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { AnalyticsScripts } from "@/components/shared/analytics-scripts";
import { MotionProvider } from "@/components/shared/motion-provider";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import "./globals.css";

// Display: Fraunces — a soft, high-contrast old-style serif with an
// optical-size axis; warm and crafted, ideal for cinematic headlines.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body: Instrument Sans — a refined grotesque with subtle character that
// pairs with the serif without the default-Inter look.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — 24/7 AI Receptionist for Electrical Contractors & Garage Door Companies`,
    template: `%s | ${site.name}`,
  },
  description:
    "The call you miss is the job they get. Swift Receptionist answers every inbound call 24/7, books the job, and flags real emergencies — built deep for electrical contractors and garage door companies.",
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  // Matches the night ground so mobile browser chrome blends with the site.
  themeColor: "#0c0a06",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <MotionProvider>
          <SmoothScroll />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-espresso-950 focus:px-4 focus:py-2 focus:text-ivory"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCtaBar />
          <GrainOverlay />
        </MotionProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
