import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { AnalyticsScripts } from "@/components/shared/analytics-scripts";
import { MotionProvider } from "@/components/shared/motion-provider";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import "./globals.css";

// One family, like Apple: Geist. Display weight/tracking is handled by
// the .font-display utility; body runs 400/500.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — 24/7 AI Receptionist for Electrical Contractors & Garage Door Companies`,
    template: `%s | ${site.name}`,
  },
  description:
    "Every call answered. Swift Receptionist picks up in two rings, books the job, and texts you the ticket — 24/7, built for electrical contractors and garage door companies.",
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
  // Matches the snow ground so mobile browser chrome blends with the site.
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="flex min-h-screen flex-col">
        <MotionProvider>
          <SmoothScroll />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-carbon-950 focus:px-4 focus:py-2 focus:text-snow"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCtaBar />
        </MotionProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
