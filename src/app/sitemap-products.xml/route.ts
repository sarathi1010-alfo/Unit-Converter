import { NextResponse } from 'next/server';
import { generateAllPairs, getAllCategories } from '@/lib/conversion_helpers';
import { classifyIntent, getIntentPriority } from '@/lib/intent';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = SITE_URL;
  const lastmod = new Date().toISOString().split('T')[0];

  // Get dynamic conversion pair routes (canonical single source of truth: /convert/[slug])
  const pairRoutes = generateAllPairs().map((pair) => {
    const routePath = `/convert/${pair.slug}`;
    const intent = classifyIntent(routePath);
    return {
      loc: `${baseUrl}${routePath}`,
      lastmod,
      changefreq: 'weekly',
      priority: getIntentPriority(intent),
    };
  });

  // Get dynamic category routes
  const categoryRoutes = getAllCategories().map((cat) => {
    const routePath = `/category/${cat.id}-converter`;
    const intent = classifyIntent(routePath);
    return {
      loc: `${baseUrl}${routePath}`,
      lastmod,
      changefreq: 'weekly',
      priority: getIntentPriority(intent),
    };
  });

  // Competitor comparison routes
  const vsRoutes = ['google-converter', 'calculator-net', 'example-competitor'].map((comp) => {
    const routePath = `/vs/${comp}`;
    const intent = classifyIntent(routePath);
    return {
      loc: `${baseUrl}${routePath}`,
      lastmod,
      changefreq: 'monthly',
      priority: getIntentPriority(intent),
    };
  });

  const routes = [...categoryRoutes, ...pairRoutes, ...vsRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
