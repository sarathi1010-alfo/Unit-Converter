import { Metadata } from "next";
import { Suspense } from "react";
import { ConverterForm } from "@/components/converter/ConverterForm";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { RelatedToolsWidget } from "@/components/layout/RelatedToolsWidget";
import { getAllCategories } from "@/lib/pairs";
import Link from "next/link";
import popularPairsData from "@/data/popularPairs.json";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  }
};



export default function Home() {
  const categories = getAllCategories();

  const popularLinks = popularPairsData.map(pair => ({
    href: `/convert/${pair.from}-to-${pair.to}`,
    label: `${pair.from.toUpperCase()} to ${pair.to.toUpperCase()}`
  }));

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Convert any unit <span className="text-primary">instantly</span>
        </h1>
        <p className="text-lg text-slate-600">
          Clean visuals, smart comparisons, and ready-to-use examples for length, weight, temperature and more.
        </p>
      </section>

      {/* Main Converter */}
      <section className="max-w-3xl mx-auto">
        <Suspense fallback={<div className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>}>
          <ConverterForm />
        </Suspense>
      </section>

      {/* Categories Grid */}
      <section id="categories">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Browse Categories</h2>
          <div className="flex flex-col items-end gap-1">
            <Link
              href="/blog/quick-unit-conversion-guide-2026"
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              Guide: How to Convert Quickly & Accurately →
            </Link>
            <Link
              href="/blog/conversion-hacks-for-engineers"
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
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
            className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            Guide: How to Convert Quickly & Accurately →
          </Link>
        </div>
        <RelatedLinks links={popularLinks} />
        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-sm text-slate-600">
            Want to learn how to convert faster? Master mental math and avoid common mistakes with our comprehensive guide on <Link href="/blog/quick-unit-conversion-guide-2026" className="text-primary font-bold hover:underline">How to Convert Units Quickly and Accurately</Link>.
            Also, be sure to read <Link href="/blog/the-complete-guide-to-length-conversion" className="text-primary font-bold hover:underline">The Complete Guide to Length Conversion</Link> to master metric and imperial distance measurements, and <Link href="/blog/the-complete-guide-to-pressure-conversions-for-mechanics" className="text-primary font-bold hover:underline">The Complete Guide to Pressure Conversions for Mechanics</Link> for mechanical conversions.
            Engineers looking for advanced tips should check out our <Link href="/blog/conversion-hacks-for-engineers" className="text-primary font-bold hover:underline">Conversion Hacks for Engineers</Link>, and developers can read our guide on <Link href="/blog/unit-conversions-for-software-developers" className="text-primary font-bold hover:underline">Unit Conversions for Software Developers</Link>. (Last modified: September 01, 2026)
          </p>
        </div>
      </section>

      <RelatedToolsWidget />
    </div>
  );
}