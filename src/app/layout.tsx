import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { AnalyticsScripts } from "@/components/shared/analytics-scripts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — 24/7 AI Receptionist for Local Service Businesses`,
    template: `%s | ${site.name}`,
  },
  description:
    "Every missed call is a job your competitor just booked. Swift Receptionist answers every inbound call 24/7, books jobs, and triages emergencies for local service businesses.",
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
  // Matches the page ground so mobile browser chrome blends with the site.
  themeColor: "#faf9f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
