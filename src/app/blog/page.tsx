import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Blog | UnitConverter",
  description: "Read our latest articles and guides on unit conversion, tips, and tricks.",
};

export default function BlogIndexPage() {
  const contentDir = path.join(process.cwd(), "content/blog");
  let posts: { slug: string, title: string }[] = [];

  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir);
    posts = files.map(file => {
      const slug = file.replace(/\.mdx$/, "");
      const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return { slug, title };
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Blog</h1>
        <p className="text-slate-600">
          Articles and guides to help you master unit conversions.
        </p>
      </section>

      <div className="space-y-4">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all group"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
