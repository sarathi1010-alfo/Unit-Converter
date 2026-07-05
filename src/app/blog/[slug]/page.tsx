import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AICitationBlock } from "@/components/seo/AICitationBlock";

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
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const path = `/blog/${slug}`;

  return {
    title: `${title} | UnitConverter Blog`,
    description: `Read our comprehensive guide on ${title.toLowerCase()} to learn the best tips and tricks for quick and accurate unit conversions.`,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: path,
      title: `${title} | UnitConverter Blog`,
      description: `Read our comprehensive guide on ${title.toLowerCase()} to learn the best tips and tricks for quick and accurate unit conversions.`,
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
    description?: string;
  }>({
    source,
    options: { parseFrontmatter: true },
    components: {
      AICitationBlock: (props) => <AICitationBlock {...props} />
    }
  });

  const pageTitle = frontmatter?.title || params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Comprehensive Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": frontmatter?.description,
    "datePublished": frontmatter?.datePublished,
    "dateModified": frontmatter?.dateModified,
    "author": {
      "@type": "Organization",
      "name": "alfo.online editorial"
    },
    "publisher": {
      "@type": "Organization",
      "name": "UnitConverter",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://unitflow.alfo.online'}/favicon.ico`
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: pageTitle }]} />
      <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {content}
      </article>
    </div>
  );
}
