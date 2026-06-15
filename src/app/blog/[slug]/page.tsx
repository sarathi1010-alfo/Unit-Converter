export async function generateStaticParams() {
  return [
    { slug: "how-to-convert-units-fast" } // Add real blog slugs here in the future
  ];
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const title = params.slug.replace(/-/g, ' ');

  return (
    <article className="prose prose-slate max-w-3xl mx-auto py-12">
      <h1 className="capitalize">{title}</h1>
      <p className="text-sm text-slate-500 mb-8">Written by alfo.online editorial</p>

      <p className="lead">
        This is a programmatic long-tail blog post targeting the keyword: <strong>{title}</strong>.
      </p>

      <h2>Introduction</h2>
      <p>
        In this guide, we will explore the concepts behind {title} and how you can apply
        them to your daily workflow.
      </p>

      <h2>Use Cases</h2>
      <p>
        Whether you are a student, developer, or professional, understanding this topic
        is crucial for efficiency.
      </p>
    </article>
  );
}
