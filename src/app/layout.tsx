import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdBlock } from "@/components/ads/AdBlock";
import { RecentlyLaunchedStrip } from "@/components/layout/RecentlyLaunchedStrip";
import Script from "next/script";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://unitflow.alfo.online"),
  title: "Unit Converter - Free Online Unit Conversion Tool",
  description:
    "Convert length, weight, temperature, volume, area, and speed instantly. Free online unit converter with precise real-time calculations and conversion guides.",
  keywords: "free unit converter, visual unit converter, length converter, weight converter, custom conversions",
  alternates: {
    canonical: "https://unitflow.alfo.online/",
  },
  openGraph: {
    title: "Unit Converter - Free Online Unit Conversion Tool",
    description:
      "Convert length, weight, temperature, volume, area, and speed instantly. Free online unit converter with precise real-time calculations and conversion guides.",
    url: "https://unitflow.alfo.online/",
    siteName: "UnitConverter",
    type: "website",
    images: [
      {
        url: "https://unitflow.alfo.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "UnitConverter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Converter - Free Online Unit Conversion Tool",
    description:
      "Convert length, weight, temperature, volume, area, and speed instantly. Free online unit converter with precise real-time calculations and conversion guides.",
    images: ["https://unitflow.alfo.online/og-image.png"],
  },
  other: {
    "google-adsense-account": "ca-pub-6393936268623951",
    "monetag": "86950f5308b2a836fd804730ef0e5e7d",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6393936268623951" />
        <meta name="monetag" content="86950f5308b2a836fd804730ef0e5e7d" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <a
          href="#main-content"
          id="skip-link"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZQ3QT11QC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
              window['ga-disable-G-HZQ3QT11QC'] = true;
            } else {
              gtag('config', 'G-HZQ3QT11QC', {
                cookie_domain: 'auto',
                linker: { domains: ['alfo.online', 'sm-clinics.vercel.app', 'pdfutility.app'] },
                cookie_flags: 'SameSite=None;Secure'
              });
            }
          `}
        </Script>

        <RecentlyLaunchedStrip />
        <Header />
        <main id="main-content" className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <AdBlock type="leaderboard" />
          {children}
          <AdBlock type="footer" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
