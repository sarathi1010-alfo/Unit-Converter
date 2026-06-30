import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { classifyIntent, getIntentPriority } from '@/lib/intent';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unitflow.alfo.online';

  // Custom manual guides
  const guidesDir = path.join(process.cwd(), 'content/guides');
  let guideRoutes: any[] = [];
  if (fs.existsSync(guidesDir)) {
    const files = fs.readdirSync(guidesDir);
    guideRoutes = files
      .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
      .map(file => {
        const slug = file.replace(/\.mdx?$/, '');
        const routePath = `/guides/${slug}`;
        return {
          loc: `${baseUrl}${routePath}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: getIntentPriority(classifyIntent(routePath)),
        };
      });
  }

  // Blog posts
  const blogDir = path.join(process.cwd(), 'content/blog');
  let blogRoutes: any[] = [];
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    blogRoutes = files
      .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
      .map(file => {
        const slug = file.replace(/\.mdx?$/, '');
        const routePath = `/blog/${slug}`;
        return {
          loc: `${baseUrl}${routePath}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: getIntentPriority(classifyIntent(routePath)),
        };
      });
  }

  const routes = [...guideRoutes, ...blogRoutes];

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
