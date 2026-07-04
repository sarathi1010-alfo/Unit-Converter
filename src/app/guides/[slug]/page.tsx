import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AICitationBlock } from "@/components/seo/AICitationBlock";
import { FAQAccordion } from "@/components/seo/FAQAccordion";
import { TrustReinforcement } from "@/components/seo/TrustReinforcement";
import { SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content/guides");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contentDir = path.join(process.cwd(), "content/guides");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  let title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  let description = `Learn how to master ${title.toLowerCase()} with our step-by-step unit conversion guides. Accurate, simple, and fast.`;

  if (fs.existsSync(filePath)) {
    const source = fs.readFileSync(filePath, "utf8");
    const { frontmatter } = await compileMDX<{ title?: string; description?: string }>({
      source,
      options: { parseFrontmatter: true },
    });
    if (frontmatter.title) title = frontmatter.title;
    if (frontmatter.description) description = frontmatter.description;
  }

  const canonicalPath = `/guides/${slug}`;

  return {
    title: `${title} | UnitFlow Guides`,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      url: canonicalPath,
      title: `${title} | UnitFlow Guides`,
      description,
      type: 'article',
    }
  };
}

export default async function GuidePage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const contentDir = path.join(process.cwd(), "content/guides");
  const filePath = path.join(contentDir, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content, frontmatter } = await compileMDX<{
    title?: string;
    description?: string;
    datePublished?: string;
    dateModified?: string;
    faqs?: { question: string; answer: string }[];
    steps?: { name: string; text: string }[];
  }>({
    source,
    options: { parseFrontmatter: true },
    components: {
      AICitationBlock: (props) => <AICitationBlock {...props} />,
      FAQAccordion: (props) => <FAQAccordion {...props} />,
      TrustReinforcement: () => <TrustReinforcement />,
    }
  });

  const pageTitle = frontmatter?.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // HowTo Schema if steps are provided, otherwise Article
  let mainSchema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "datePublished": frontmatter?.datePublished || "2026-01-01",
    "dateModified": frontmatter?.dateModified || "2026-01-01",
    "publisher": {
      "@type": "Organization",
      "name": "UnitFlow"
    }
  };

  if (frontmatter?.steps) {
    mainSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": pageTitle,
      "description": frontmatter.description || `Step-by-step guide on ${pageTitle}`,
      "step": frontmatter.steps.map((step, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": step.name,
        "itemListElement": [{
          "@type": "HowToDirection",
          "text": step.text
        }]
      }))
    };
  }

  const faqSchema = frontmatter?.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": frontmatter.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }, { label: pageTitle }]} />

      <article className="prose prose-slate lg:prose-xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {content}

        {frontmatter?.faqs && (
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Common Questions</h2>
            <FAQAccordion items={frontmatter.faqs} />
          </div>
        )}
      </article>

      <section className="max-w-prose mx-auto">
        <TrustReinforcement />
      </section>
    </div>
  );
}
