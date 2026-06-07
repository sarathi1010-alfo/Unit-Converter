import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ConverterForm } from "@/components/converter/ConverterForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getAllCategories } from "@/lib/pairs";
import type { Metadata } from "next";
import { type CategoryId } from "@/lib/conversion";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: `${cat.id}-converter`,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const categoryId = params.category.replace("-converter", "");
  const categories = getAllCategories();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) return { title: "Not Found" };

  return {
    title: `${category.name} Converter | UnitConverter`,
    description: category.description,
  };
}

export default async function CategoryPage(
  props: { params: Promise<{ category: string }> }
) {
  const params = await props.params;
  const categoryId = params.category.replace("-converter", "");
  const categories = getAllCategories();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    notFound();
  }

  // Find popular links for this category
  const popularPairsData = (await import("@/data/popularPairs.json")).default;
  const categoryLinks = popularPairsData
    .filter((p) => p.categoryId === categoryId)
    .map((p) => ({
      href: `/convert/${p.from}-to-${p.to}`,
      label: `${p.from.toUpperCase()} to ${p.to.toUpperCase()}`,
    }));

  return (
    <div className="space-y-12">
      <Breadcrumbs items={[{ label: `${category.name} Converter` }]} />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900">
          {category.name} Converter
        </h1>
        <p className="text-slate-600 max-w-2xl">
          {category.description} Use the free calculator below to instantly convert between {category.name.toLowerCase()} units.
        </p>
      </section>

      <section className="max-w-3xl">
        <Suspense fallback={<div className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>}>
          <ConverterForm initialCategoryId={categoryId as CategoryId} />
        </Suspense>
      </section>

      {categoryLinks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common {category.name} Conversions</h2>
          <RelatedLinks links={categoryLinks} />
        </section>
      )}
    </div>
  );
}