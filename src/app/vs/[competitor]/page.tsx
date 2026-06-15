import Link from "next/link";

export async function generateStaticParams() {
  return [
    { competitor: "example-competitor" } // Add real competitors here in the future
  ];
}

export default async function ComparisonPage(props: { params: Promise<{ competitor: string }> }) {
  const params = await props.params;
  const competitor = params.competitor.replace(/-/g, ' ');

  return (
    <article className="prose prose-slate max-w-3xl mx-auto py-12">
      <h1 className="capitalize">UnitConverter vs. {competitor}</h1>
      <p className="lead">
        Trying to decide between UnitConverter and {competitor}? Here is a comprehensive
        breakdown of why UnitConverter is built for speed and privacy.
      </p>

      <h2>Speed and Performance</h2>
      <p>
        Unlike {competitor}, UnitConverter calculates measurements instantly on the
        client-side. There are no API delays or page reloads required.
      </p>

      <h2>Privacy First</h2>
      <p>
        We do not collect personal conversion data. Your calculations happen directly
        in your browser, ensuring maximum privacy compared to {competitor}.
      </p>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
        <h3 className="text-blue-900 mt-0">Ready to try the faster alternative?</h3>
        <p className="text-blue-800 mb-0">Head back to our <Link href="/">homepage</Link> to start converting instantly.</p>
      </div>
    </article>
  );
}
