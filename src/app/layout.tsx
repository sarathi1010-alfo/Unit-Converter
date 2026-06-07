import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdBlock } from "@/components/ads/AdBlock";
import { RecentlyLaunchedStrip } from "@/components/layout/RecentlyLaunchedStrip";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "UnitConverter - Fast, Visual, SEO-First | alfo.online",
  description: "Convert any unit instantly with clean visuals, smart comparisons, and ready-to-use examples.",
  keywords: "free unit converter, visual unit converter, length converter, weight converter, custom conversions",
  openGraph: {
    title: "UnitConverter - Fast, Visual, SEO-First | alfo.online",
    description: "Convert any unit instantly with clean visuals, smart comparisons, and ready-to-use examples.",
    url: "https://unitconverter.com",
    type: "website",
    images: [
      {
        url: "https://unitconverter.com/og-image.jpg",
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
    images: ["https://unitconverter.com/og-image.jpg"],
  },
  other: {
    "google-adsense-account": "ca-pub-6393936268623951"
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
        {/* Google Tag Manager (Placeholder) */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');`
        }} />
        {/* End Google Tag Manager */}

        {/* Google Analytics (Placeholder) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');`
        }} />
        {/* End Google Analytics */}

        <meta name="google-adsense-account" content="ca-pub-6393936268623951" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC]">
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}

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
