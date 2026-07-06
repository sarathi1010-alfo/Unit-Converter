import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unitflow.alfo.online';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Array.from({ length: 1000 }, (_, i) => `
  <sitemap>
    <loc>${baseUrl}/sitemap/${i}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
