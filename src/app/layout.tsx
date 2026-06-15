import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
fix-sitemap-site-url-4794970102639254297
  metadataBase: new URL(SITE_URL),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://unitconverter.com"),
 jules-16680094041159827713-0e0fd200
  title: "UnitConverter - Fast, Visual, SEO-First",
  description: "Convert any unit instantly with clean visuals, smart comparisons, and ready-to-use examples.",
  openGraph: {
    title: "UnitConverter - Fast, Visual, SEO-First",
    description: "Convert any unit instantly with clean visuals, smart comparisons, and ready-to-use examples.",
    siteName: "UnitConverter",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "UnitConverter - Fast, Visual, SEO-First",
    description: "Convert any unit instantly with clean visuals, smart comparisons, and ready-to-use examples."
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
        <Header />
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
