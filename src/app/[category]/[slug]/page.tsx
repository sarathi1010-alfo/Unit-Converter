import { notFound, permanentRedirect } from "next/navigation";
import { generateAllPairs, getPairBySlug, getUnitsForCategory } from "@/lib/conversion_helpers";
import { type CategoryId } from "@/lib/conversion";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const pairs = generateAllPairs();
  return pairs.map((pair) => ({
    category: pair.categoryId,
    slug: pair.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ category: string; slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const pair = getPairBySlug(params.slug);
  if (!pair || pair.categoryId !== params.category) return { title: "Not Found" };

  const units = getUnitsForCategory(pair.categoryId as CategoryId);
  const fromName = units[pair.from]?.name || pair.from.toUpperCase();
  const toName = units[pair.to]?.name || pair.to.toUpperCase();

  // Consolidate canonical URL to /convert/[slug] to eliminate duplicate content and crawl loops
  const canonicalUrl = `${SITE_URL}/convert/${params.slug}`;

  return {
    title: `${fromName} to ${toName} Converter | UnitFlow`,
    description: `Convert ${fromName.toLowerCase()} to ${toName.toLowerCase()} instantly on UnitFlow.`,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CategoryConversionPairPage(
  props: { params: Promise<{ category: string; slug: string }> }
) {
  const params = await props.params;
  const pair = getPairBySlug(params.slug);

  if (!pair || pair.categoryId !== params.category) {
    notFound();
  }

  permanentRedirect(`/convert/${pair.slug}`);
}
