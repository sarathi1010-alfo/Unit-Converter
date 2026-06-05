import { Suspense } from "react";
import { ConverterForm } from "@/components/converter/ConverterForm";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getAllCategories } from "@/lib/pairs";
import Link from "next/link";
import popularPairsData from "@/data/popularPairs.json";

export default function Home() {
  const categories = getAllCategories();

  const popularLinks = popularPairsData.map(pair => ({
    href: `/${pair.from}-to-${pair.to}`,
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
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}-converter`}
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
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Conversions</h2>
        <RelatedLinks links={popularLinks} />
      </section>
    </div>
  );
}