import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content/guides");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
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
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Guides" }, { label: params.slug }]} />
      <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {content}
      </article>
    </div>
  );
}