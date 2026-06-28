import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { generateAllPairs, getAllCategories } from '@/lib/conversion_helpers';
import { SITE_URL } from '@/lib/seo';
import { classifyIntent, getIntentPriority } from '@/lib/intent';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Get dynamic conversion pair routes
  const pairRoutes = generateAllPairs().map((pair) => {
    const routePath = `/convert/${pair.slug}`;
    const intent = classifyIntent(routePath);
    return {
      url: `${baseUrl}${routePath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: getIntentPriority(intent),
    };
  });

  // Get dynamic category routes
  const categoryRoutes = getAllCategories().map((cat) => {
    const routePath = `/category/${cat.id}-converter`;
    const intent = classifyIntent(routePath);
    return {
      url: `${baseUrl}${routePath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: getIntentPriority(intent),
    };
  });

  // Custom manual guides/pages
  const guidesDir = path.join(process.cwd(), 'content/guides');
  let guideRoutes: { url: string; lastModified: Date; changeFrequency: "monthly"; priority: number }[] = [];
  if (fs.existsSync(guidesDir)) {
    const files = fs.readdirSync(guidesDir);
    guideRoutes = files.map(file => {
      const slug = file.replace(/\.mdx?$/, '');
      const routePath = `/guides/${slug}`;
      return {
        url: `${baseUrl}${routePath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: getIntentPriority(classifyIntent(routePath)),
      };
    });
  }

  const staticPages = [
    '/privacy-policy',
    '/terms-of-service',
    '/contact',
    '/about'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: getIntentPriority(classifyIntent('/')),
    },
    ...categoryRoutes,
    ...pairRoutes,
    ...guideRoutes,
    ...staticPages
  ];
}
