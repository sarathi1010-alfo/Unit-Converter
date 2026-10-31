import { notFound } from "next/navigation";
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

  const categoryId = pair.categoryId as CategoryId;
  const units = getUnitsForCategory(categoryId);
  const fromUnit = units[pair.from];
  const toUnit = units[pair.to];
  const canonicalPath = `/convert/${pair.slug}`;

  return (
    <>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${canonicalPath}`} />
        <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== 'undefined') { window.location.replace('${canonicalPath}'); }`,
          }}
        />
      </head>
      <div className="max-w-xl mx-auto text-center py-20 px-4 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900">
          {fromUnit?.name || pair.from} to {toUnit?.name || pair.to} Converter
        </h1>
        <p className="text-slate-600">
          This conversion tool has moved to our primary conversion directory.
        </p>
        <div>
          <a
            href={canonicalPath}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            Go to {fromUnit?.name || pair.from} to {toUnit?.name || pair.to} Converter →
          </a>
        </div>
      </div>
    </>
  );
}
