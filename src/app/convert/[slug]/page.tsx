import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ConverterForm } from "@/components/converter/ConverterForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { FAQAccordion } from "@/components/seo/FAQAccordion";
import { TrustReinforcement } from "@/components/seo/TrustReinforcement";
import { AICitationBlock } from "@/components/seo/AICitationBlock";
import { generateAllPairs, getPairBySlug, getUnitsForCategory } from "@/lib/conversion_helpers";
import { logPagePerformance } from "@/lib/searchIntelligence";
import { type CategoryId } from "@/lib/conversion";
import type { Metadata } from "next";

interface WebApplicationStructuredData {
  "@context": "https://schema.org";
  "@type": "WebApplication";
  "name": string;
  "applicationCategory": string;
  "operatingSystem": string;
  "description": string;
}

export async function generateStaticParams() {
  const pairs = generateAllPairs();
  return pairs.map((pair) => ({
    slug: pair.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const pair = getPairBySlug(params.slug);
  if (!pair) return { title: "Not Found" };

  const units = getUnitsForCategory(pair.categoryId as CategoryId);
  const fromName = units[pair.from]?.name || pair.from.toUpperCase();
  const toName = units[pair.to]?.name || pair.to.toUpperCase();

  return {
    title: `${fromName} to ${toName} Converter`,
    description: `Convert ${fromName.toLowerCase()} to ${toName.toLowerCase()} instantly. Includes formula, examples, and a quick reference conversion table.`,
    alternates: {
      canonical: `/convert/${params.slug}`
    }
  };
}

export default async function ConversionPairPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const pair = getPairBySlug(params.slug);

  // Log intelligence for this page rendering
  logPagePerformance(`/convert/${params.slug}`, {
    impressions: 0, // Mock initial state
    ctr: 0,
    averagePosition: 0,
    isIndexed: true,
  }).catch(console.error);


  if (!pair) {
    if (params.slug.endsWith("-converter")) {
      notFound();
    }
    notFound();
  }

  const categoryId = pair.categoryId as CategoryId;
  const units = getUnitsForCategory(categoryId);
  const fromUnit = units[pair.from];
  const toUnit = units[pair.to];

  const appJsonLd: WebApplicationStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${fromUnit.name} to ${toUnit.name} Converter`,
    "applicationCategory": "Utility",
    "operatingSystem": "All",
    "description": `Free online tool to convert ${fromUnit.name} to ${toUnit.name}.`
  };

  const relatedPairs = generateAllPairs()
    .filter(p => p.categoryId === pair.categoryId && p.slug !== pair.slug && (p.from === pair.from || p.to === pair.to))
    .slice(0, 6)
    .map(p => ({
      href: `/convert/${p.slug}`,
      label: `${units[p.from]?.name || p.from} to ${units[p.to]?.name || p.to}`
    }));

  const faqs = [
    {
      question: `How do I convert ${fromUnit.name} to ${toUnit.name}?`,
      answer: `Enter your value in ${fromUnit.name} into the converter above. It will instantly calculate and display the equivalent value in ${toUnit.name}.`
    },
    {
      question: `What is the symbol for ${fromUnit.name}?`,
      answer: `The symbol for ${fromUnit.name} is "${fromUnit.symbol}".`
    },
    {
      question: `What is the symbol for ${toUnit.name}?`,
      answer: `The symbol for ${toUnit.name} is "${toUnit.symbol}".`
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumbs items={[
        { label: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Converter`, href: `/category/${categoryId}` },
        { label: `${fromUnit.symbol} to ${toUnit.symbol}` }
      ]} />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900">
          {fromUnit.name} to {toUnit.name} Converter
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Instantly convert {fromUnit.name.toLowerCase()} ({fromUnit.symbol}) to {toUnit.name.toLowerCase()} ({toUnit.symbol}) using the calculator below.
        </p>
      </section>

      <AICitationBlock
        summary={`To convert ${fromUnit.name} to ${toUnit.name}, simply multiply your value by the conversion factor or use the calculator below. 1 ${fromUnit.name} is equal to ${fromUnit.baseFactor / toUnit.baseFactor} ${toUnit.name}.`}
        keyPoints={[
          `${fromUnit.name} (${fromUnit.symbol}) is a unit of ${categoryId}.`,
          `${toUnit.name} (${toUnit.symbol}) is a unit of ${categoryId}.`,
          `This converter provides instant, accurate calculations using standard international conversion rates.`
        ]}
        entityFocus={`${categoryId} Conversion`}
      />

      <section className="max-w-3xl">
        <Suspense fallback={<div className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>}>
          <ConverterForm
            initialCategoryId={categoryId}
            initialFrom={pair.from}
            initialTo={pair.to}
            isPairLocked={true}
          />
        </Suspense>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <TrustReinforcement />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {fromUnit.name} to {toUnit.name} Conversion Table
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <ConversionTable categoryId={categoryId} from={pair.from} to={pair.to} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Conversions</h3>
            <div className="flex flex-col gap-2">
              {relatedPairs.map((rp, i) => (
                <a key={i} href={rp.href} className="text-primary hover:underline text-sm font-medium">
                  {rp.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
