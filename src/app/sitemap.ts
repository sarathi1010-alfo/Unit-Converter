import { MetadataRoute } from 'next';
import { generateAllPairs, getAllCategories } from '@/lib/conversion_helpers';
import { classifyIntent, getIntentPriority } from '@/lib/intent';
import { SITE_URL } from '@/lib/seo';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // 1. Core static pages
  const staticPaths = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/terms-and-conditions', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/terms-of-service', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((item) => ({
    url: `${baseUrl}${item.path === '/' ? '' : item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Category Hubs & Converter tools
  const categories = getAllCategories();
  const categoryEntries: MetadataRoute.Sitemap = [];
  for (const cat of categories) {
    categoryEntries.push({
      url: `${baseUrl}/categories/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    categoryEntries.push({
      url: `${baseUrl}/category/${cat.id}-converter`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // 3. Genuine conversion pairs (/convert/[slug])
  const pairs = generateAllPairs();
  const pairEntries: MetadataRoute.Sitemap = pairs.map((pair) => {
    const routePath = `/convert/${pair.slug}`;
    const intent = classifyIntent(routePath);
    return {
      url: `${baseUrl}${routePath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: getIntentPriority(intent),
    };
  });

  // 4. Comparison routes
  const vsEntries: MetadataRoute.Sitemap = ['google-converter', 'calculator-net', 'example-competitor'].map((comp) => ({
    url: `${baseUrl}/vs/${comp}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 5. Guides and blog posts
  const guideEntries: MetadataRoute.Sitemap = [];
  const guidesDir = path.join(process.cwd(), 'content/guides');
  if (fs.existsSync(guidesDir)) {
    const files = fs.readdirSync(guidesDir);
    files.forEach((file) => {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const slug = file.replace(/\.mdx?$/, '');
        guideEntries.push({
          url: `${baseUrl}/guides/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  const blogEntries: MetadataRoute.Sitemap = [];
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    files.forEach((file) => {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const slug = file.replace(/\.mdx?$/, '');
        blogEntries.push({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  return [
    ...staticEntries,
    ...categoryEntries,
    ...pairEntries,
    ...vsEntries,
    ...guideEntries,
    ...blogEntries,
  ];
}
