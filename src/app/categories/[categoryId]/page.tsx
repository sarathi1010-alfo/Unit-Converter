import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getAllCategories } from "@/lib/pairs";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    categoryId: cat.id,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ categoryId: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.id === params.categoryId);

  if (!category) return { title: "Not Found" };

  return {
    title: `${category.name} Conversions Hub | UnitFlow`,
    description: `Explore our comprehensive ${category.name.toLowerCase()} conversion guides, tools, and charts.`,
    alternates: { canonical: `/categories/${params.categoryId}` }
  };
}

export default async function CategoryHubPage(
  props: { params: Promise<{ categoryId: string }> }
) {
  const params = await props.params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.id === params.categoryId);

  if (!category) {
    notFound();
  }

  // Find popular links for this category to list
  const popularPairsData = (await import("@/data/popularPairs.json")).default;
  const categoryLinks = popularPairsData
    .filter((p) => p.categoryId === params.categoryId)
    .map((p) => ({
      href: `/convert/${p.from}-to-${p.to}`,
      label: `${p.from.toUpperCase()} to ${p.to.toUpperCase()}`,
    }));

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      <Breadcrumbs items={[{ label: "Categories", href: "/#categories" }, { label: category.name }]} />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900">
          {category.name} Conversion Hub
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Welcome to the {category.name.toLowerCase()} conversion hub. {category.description}
          Below you can access our dedicated converter tool or explore quick reference guides for common {category.name.toLowerCase()} units.
        </p>
      </section>

      <section className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-start gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Ready to convert?</h2>
          <p className="text-slate-600 mb-4">Use our smart, fast calculator for all your {category.name.toLowerCase()} conversion needs.</p>
        </div>
        <Link
          href={`/category/${category.id}-converter`}
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
        >
          Open {category.name} Converter Tool →
        </Link>
      </section>

      {categoryLinks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common {category.name} Conversions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categoryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-primary hover:text-primary transition-colors font-medium text-slate-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="pt-8">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Learn More on the Blog</h3>
          <p className="text-slate-600 text-sm mb-4">
            Want to understand the math behind these conversions? Check out our <Link href="/blog/quick-unit-conversion-guide" className="text-primary hover:underline font-medium">Quick Unit Conversion Guide</Link> or visit the <Link href="/blog" className="text-primary hover:underline font-medium">UnitFlow Blog</Link> for more tips.
          </p>
        </div>
      </section>
    </div>
  );
}
