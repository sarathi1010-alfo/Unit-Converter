import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "UnitFlow Blog – Conversion Guides, Tips & Measurement Education",
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
        <h1 className="text-3xl font-extrabold text-slate-900">UnitFlow Blog – Conversion Guides, Tips & Measurement Education</h1>
        <div className="text-slate-600 prose">
          <p>
            Welcome to the UnitFlow Blog, your ultimate resource for mastering measurements and conversions in every aspect of life. Whether you are an engineer looking for precise technical concepts, a chef trying to adjust a recipe, or a traveler navigating foreign measurements, our guides provide clarity and accuracy.
          </p>
          <p>
            Understanding units isn't just about formulas—it's about how those numbers apply to the real world. That's why our content is structured to give you the exact information you need, fast. From comprehensive pillar guides that break down the history and science behind measurement systems, to quick-reference charts and practical use-case examples, we have it all covered. Explore our curated categories below to find tips on avoiding common calculation errors, deep dives into SI and imperial units, and head-to-head comparisons of digital conversion tools to ensure you are always using the right method for the job.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <Link href="/" className="text-primary font-medium hover:underline">Unit Converter Tool</Link>
          <Link href="/categories/area" className="text-primary font-medium hover:underline">Browse Categories</Link>
          <Link href="/category/length-converter" className="text-primary font-medium hover:underline">Length Conversions</Link>
          <Link href="/category/weight-converter" className="text-primary font-medium hover:underline">Weight Conversions</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Unit Conversion Fundamentals</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ultimate-guide-to-unit-conversion" className="text-primary hover:underline font-medium">The Ultimate Guide to Unit Conversion in 2026</Link>
              </li>
              <li>
                <Link href="/blog/what-is-a-conversion-factor" className="text-primary hover:underline font-medium">What is a Conversion Factor?</Link>
              </li>
              <li>
                <Link href="/blog/what-is-the-metric-system" className="text-primary hover:underline font-medium">What is the Metric System?</Link>
              </li>
              <li>
                <Link href="/blog/what-is-an-si-unit" className="text-primary hover:underline font-medium">What is an SI Unit?</Link>
              </li>
              <li>
                <Link href="/blog/what-is-dimensional-analysis" className="text-primary hover:underline font-medium">What is Dimensional Analysis?</Link>
              </li>
              <li>
                <Link href="/blog/what-is-a-unit-of-measurement" className="text-primary hover:underline font-medium">What is a Unit of Measurement?</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Use-Case Guides</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/cooking-and-baking-conversions" className="text-primary hover:underline font-medium">Cooking Conversions</Link>
              </li>
              <li>
                <Link href="/blog/everyday-unit-conversions-for-travelers" className="text-primary hover:underline font-medium">Travel Conversions</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Technical Concepts</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/what-is-an-si-unit" className="text-primary hover:underline font-medium">SI Units Explained</Link>
              </li>
              <li>
                <Link href="/blog/what-is-the-imperial-system" className="text-primary hover:underline font-medium">Imperial vs Metric Systems</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Comparisons</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/vs/google-converter" className="text-primary hover:underline font-medium">UnitFlow vs Google Converter</Link>
              </li>
              <li>
                <Link href="/vs/calculator-net" className="text-primary hover:underline font-medium">UnitFlow vs Calculator.net</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Charts & Tables</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/quick-unit-conversion-guide" className="text-primary hover:underline font-medium">Quick Reference Charts</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">All Articles</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
