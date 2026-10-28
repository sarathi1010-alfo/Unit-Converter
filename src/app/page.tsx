import { Metadata } from "next";
import { Suspense } from "react";
import { ConverterForm } from "@/components/converter/ConverterForm";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { RelatedToolsWidget } from "@/components/layout/RelatedToolsWidget";
import { getAllCategories } from "@/lib/pairs";
import Link from "next/link";
import popularPairsData from "@/data/popularPairs.json";
import { Ruler, Scale, Thermometer, Gauge, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Unit Converter - Free Online Unit Conversion Tool",
  description:
    "Convert length, weight, temperature, volume, area, and speed instantly. Free online unit converter with precise real-time calculations and conversion guides.",
  alternates: {
    canonical: "https://unit-converter-kappa-nine.vercel.app/",
  },
  openGraph: {
    title: "Unit Converter - Free Online Unit Conversion Tool",
    description:
      "Convert length, weight, temperature, volume, area, and speed instantly. Free online unit converter with precise real-time calculations and conversion guides.",
    url: "https://unit-converter-kappa-nine.vercel.app/",
    siteName: "UnitConverter",
    type: "website",
    images: [
      {
        url: "https://unit-converter-kappa-nine.vercel.app/og-image.png",
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
    images: ["https://unit-converter-kappa-nine.vercel.app/og-image.png"],
  },
};

export default function Home() {
  const categories = getAllCategories();

  const popularLinks = popularPairsData.map((pair) => ({
    href: `/convert/${pair.from}-to-${pair.to}`,
    label: `${pair.from.toUpperCase()} to ${pair.to.toUpperCase()}`,
  }));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "UnitConverter",
      url: "https://unit-converter-kappa-nine.vercel.app/",
      description:
        "Free online unit conversion tool for instant calculations across length, mass, temperature, speed, volume, and digital units.",
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How accurate are the unit conversions on UnitConverter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All unit conversions are calculated using verified NIST international conversion standards and exact physical definitions, guaranteeing high precision for scientific, engineering, and everyday use.",
          },
        },
        {
          "@type": "Question",
          name: "Does UnitConverter support both metric and imperial measurements?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, UnitConverter offers complete two-way support between SI metric units (such as meters, kilograms, and Celsius) and imperial or US customary units (like feet, pounds, and Fahrenheit).",
          },
        },
        {
          "@type": "Question",
          name: "Can I convert temperature values between Celsius, Fahrenheit, and Kelvin?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our temperature converter implements exact affine formulas to convert seamlessly between Celsius, Fahrenheit, Kelvin, and Rankine scales.",
          },
        },
        {
          "@type": "Question",
          name: "Is UnitConverter free for commercial and academic applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, UnitConverter is 100% free with no subscription, registration, or usage limits required for engineering, research, educational, or commercial projects.",
          },
        },
        {
          "@type": "Question",
          name: "How do I share or save a specific conversion formula?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click the Copy Link button on any conversion screen. The tool generates a direct shareable URL preserving your exact source unit, target unit, and input value.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Convert Units with UnitConverter",
      description: "Follow these 4 simple steps to convert any measurement unit instantly.",
      step: [
        {
          "@type": "HowToStep",
          name: "Choose Measurement Category",
          text: "Select your desired physical quantity such as length, weight, temperature, or volume.",
          position: 1,
        },
        {
          "@type": "HowToStep",
          name: "Enter Source Value",
          text: "Type the numerical magnitude you wish to convert into the primary input field.",
          position: 2,
        },
        {
          "@type": "HowToStep",
          name: "Select Target Unit",
          text: "Choose the target unit of measure from the dropdown list to see instant dynamic calculation.",
          position: 3,
        },
        {
          "@type": "HowToStep",
          name: "Copy or Share Results",
          text: "Copy the formatted conversion result or share the direct link with colleagues and students.",
          position: 4,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://unit-converter-kappa-nine.vercel.app/",
        },
      ],
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Composite JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Free Online Unit Converter and Precision Measurement Tools
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          UnitConverter delivers instant, highly accurate conversions across length, mass, temperature, speed, volume, and digital storage. Designed for engineers, students, and travelers, our free tool combines real-time calculation with intuitive visual references so you always have the right conversion at your fingertips.
        </p>
      </section>

      {/* Main Converter Form */}
      <section className="max-w-3xl mx-auto">
        <Suspense fallback={<div className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>}>
          <ConverterForm />
        </Suspense>
      </section>

      {/* How It Works (4-Step Sequential Guide) */}
      <section className="py-12 bg-white rounded-3xl border border-slate-200 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">How It Works</h2>
            <p className="text-slate-600">Quick, 4-step workflow to calculate and verify any unit conversion.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-start">
              <span className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center mb-4 text-lg">
                1
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Select Category</h3>
              <p className="text-sm text-slate-600">
                Pick your measurement domain including length, weight, speed, or volume.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-start">
              <span className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center mb-4 text-lg">
                2
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Enter Source Value</h3>
              <p className="text-sm text-slate-600">
                Input your starting number and choose your initial unit from the unit list.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-start">
              <span className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center mb-4 text-lg">
                3
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Choose Target Unit</h3>
              <p className="text-sm text-slate-600">
                Select your output unit to immediately view synchronized, high-precision results.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-start">
              <span className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center mb-4 text-lg">
                4
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Copy &amp; Share</h3>
              <p className="text-sm text-slate-600">
                Copy your formatted answer or save a permalink with your active parameters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Browse Categories</h2>
          <div className="flex flex-col items-end gap-1">
            <Link
              href="/blog/conversion-hacks-for-travelers"
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors min-h-[44px]"
            >
              Guide: Conversion Hacks for Travelers →
            </Link>
            <Link
              href="/blog/quick-unit-conversion-guide-2026"
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors min-h-[44px]"
            >
              Guide: How to Convert Quickly &amp; Accurately →
            </Link>
            <Link
              href="/blog/conversion-hacks-for-engineers"
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors min-h-[44px]"
            >
              Guide: Conversion Hacks for Engineers →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}-converter`}
              className="block p-6 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-slate-500 text-sm">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Conversions */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Popular Conversions</h2>
          <Link
            href="/blog/quick-unit-conversion-guide-2026"
            className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors min-h-[44px]"
          >
            Guide: How to Convert Quickly &amp; Accurately →
          </Link>
        </div>
        <RelatedLinks links={popularLinks} />
        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-sm text-slate-600">
            Want to learn how to convert faster? Master mental math and avoid common mistakes with our comprehensive guide on <Link href="/blog/quick-unit-conversion-guide-2026" className="text-primary font-bold hover:underline">How to Convert Units Quickly and Accurately</Link>.
            Also, be sure to read <Link href="/blog/the-complete-guide-to-length-conversion" className="text-primary font-bold hover:underline">The Complete Guide to Length Conversion</Link> to master metric and imperial distance measurements.
          </p>
        </div>
      </section>

      {/* 5 Machine-Parseable FAQs with Schema Parity */}
      <section className="py-12 bg-white rounded-3xl border border-slate-200 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                How accurate are the unit conversions on UnitConverter?
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                All unit conversions are calculated using verified NIST international conversion standards and exact physical definitions, guaranteeing high precision for scientific, engineering, and everyday use.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Does UnitConverter support both metric and imperial measurements?
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Yes, UnitConverter offers complete two-way support between SI metric units (such as meters, kilograms, and Celsius) and imperial or US customary units (like feet, pounds, and Fahrenheit).
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Can I convert temperature values between Celsius, Fahrenheit, and Kelvin?
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Yes, our temperature converter implements exact affine formulas to convert seamlessly between Celsius, Fahrenheit, Kelvin, and Rankine scales.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Is UnitConverter free for commercial and academic applications?
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Yes, UnitConverter is 100% free with no subscription, registration, or usage limits required for engineering, research, educational, or commercial projects.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                How do I share or save a specific conversion formula?
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Click the Copy Link button on any conversion screen. The tool generates a direct shareable URL preserving your exact source unit, target unit, and input value.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedToolsWidget />
    </div>
  );
}