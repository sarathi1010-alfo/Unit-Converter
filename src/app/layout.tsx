import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdBlock } from "@/components/ads/AdBlock";
import { RecentlyLaunchedStrip } from "@/components/layout/RecentlyLaunchedStrip";
import { METADATA_BASE } from "@/lib/seo";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
   metadataBase: METADATA_BASE,
  title: "UnitConverter - Fast, Visual, SEO-First | alfo.online",
  description: "Convert any unit instantly with clean visuals, smart comparisons, and ready-to-use examples.",
  keywords: "free unit converter, visual unit converter, length converter, weight converter, custom conversions",
  openGraph: {
    title: "UnitConverter - Fast, Visual, SEO-First | alfo.online",
    description: "Convert any unit instantly with clean visuals, smart comparisons, and ready-to-use examples.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Next.js will automatically expand this relative to metadataBase
        width: 1200,
        height: 630,
        alt: "UnitConverter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UnitConverter - Fast, Visual, SEO-First | alfo.online",
    description: "Convert any unit instantly with clean visuals, smart comparisons, and ready-to-use examples.",
    images: ["/og-image.jpg"],
  },
  other: {
    "google-adsense-account": "ca-pub-6393936268623951",
    "monetag": "86950f5308b2a836fd804730ef0e5e7d"
  }
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
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}

        <RecentlyLaunchedStrip />
        <Header />
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <AdBlock type="leaderboard" />
          {children}
          <AdBlock type="footer" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
