import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ConverterForm } from "@/components/converter/ConverterForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { FAQAccordion } from "@/components/seo/FAQAccordion";
import { AdBlock } from "@/components/ads/AdBlock";
import { RelatedToolsWidget } from "@/components/layout/RelatedToolsWidget";
import { TrustReinforcement } from "@/components/seo/TrustReinforcement";
import { AICitationBlock } from "@/components/seo/AICitationBlock";
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

  const path = `/${params.category}/${params.slug}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: `${fromName} to ${toName} Converter`,
    description: `Convert ${fromName.toLowerCase()} to ${toName.toLowerCase()} instantly. Includes formula, examples, and a quick reference conversion table.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: path,
      title: `${fromName} to ${toName} Converter | alfo.online`,
      description: `Convert ${fromName.toLowerCase()} to ${toName.toLowerCase()} instantly. Includes formula, examples, and a quick reference conversion table.`,
    }
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

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${fromUnit.name} to ${toUnit.name} Converter`,
    "url": `${SITE_URL}/${params.category}/${params.slug}`,
    "applicationCategory": "Utility",
    "operatingSystem": "All",
    "description": `Free online tool to convert ${fromUnit.name} to ${toUnit.name}.`
  };

  const faqs = [
    {
      question: `How many ${toUnit.name} are in a ${fromUnit.name}?`,
      answer: categoryId === 'temperature' || categoryId === 'clothing'
        ? `Conversion between ${fromUnit.name} and ${toUnit.name} follows a non-linear formula. Use our calculator for an accurate result.`
        : `There are ${fromUnit.baseFactor / toUnit.baseFactor} ${toUnit.name} in 1 ${fromUnit.name}.`
    },
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


  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${fromUnit.name} to ${toUnit.name} Converter`,
    "description": `Convert ${fromUnit.name.toLowerCase()} to ${toUnit.name.toLowerCase()} instantly. Includes formula, examples, and a quick reference conversion table.`,
    "datePublished": "2026-07-16",
    "author": {
      "@type": "Organization",
      "name": "alfo.online editorial"
    },
    "publisher": {
      "@type": "Organization",
      "name": "UnitConverter"
    }
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumbs items={[
        { label: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Converter`, href: `/category/${categoryId}-converter` },
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
        summary={`To convert ${fromUnit.name} to ${toUnit.name}, simply enter your value into the calculator. ${categoryId === 'temperature' || categoryId === 'clothing' ? 'This conversion uses a specific formula.' : `1 ${fromUnit.name} is equal to ${fromUnit.baseFactor / toUnit.baseFactor} ${toUnit.name}.`}`}
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

      <AdBlock type="in-content" />

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
      </div>

      <RelatedToolsWidget />
    </div>
  );
}
