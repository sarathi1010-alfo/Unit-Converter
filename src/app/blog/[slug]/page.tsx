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
  const contentDir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contentDir = path.join(process.cwd(), "content/blog");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  let title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  let description = `Read our comprehensive guide on ${title.toLowerCase()} to learn the best tips and tricks for quick and accurate unit conversions.`;

  if (fs.existsSync(filePath)) {
    const source = fs.readFileSync(filePath, "utf8");
    const { frontmatter } = await compileMDX<{ title?: string; description?: string }>({
      source,
      options: { parseFrontmatter: true },
    });
    if (frontmatter.title) title = frontmatter.title;
    if (frontmatter.description) description = frontmatter.description;
  }

  const canonicalPath = `/blog/${slug}`;

  return {
    title: `${title} | UnitFlow Blog`,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      url: canonicalPath,
      title: `${title} | UnitFlow Blog`,
      description,
      type: 'article',
    }
  };
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const contentDir = path.join(process.cwd(), "content/blog");
  const filePath = path.join(contentDir, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content, frontmatter } = await compileMDX<{
    title?: string;
    datePublished?: string;
    dateModified?: string;
    author?: string;
    faqs?: { question: string; answer: string }[];
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "datePublished": frontmatter?.datePublished || "2026-01-01",
    "dateModified": frontmatter?.dateModified || "2026-01-01",
    "author": {
      "@type": "Organization",
      "name": frontmatter?.author || "alfo.online editorial"
    },
    "publisher": {
      "@type": "Organization",
      "name": "UnitFlow",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.ico`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${params.slug}`
    }
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: pageTitle }]} />

      <article className="prose prose-slate lg:prose-xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {content}

        {frontmatter?.faqs && (
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
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
