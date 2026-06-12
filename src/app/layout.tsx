import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://unitconverter.com"),
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
        <meta name="google-adsense-account" content="ca-pub-6393936268623951" />
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
