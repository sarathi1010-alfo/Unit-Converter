import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { generateAllPairs, getAllCategories } from '@/lib/conversion_helpers';
alfo-ecosystem-standardization-10716047684776820565
import { SITE_URL } from '@/lib/seo';

import { classifyIntent, getIntentPriority } from '@/lib/intent';
import { SITE_URL } from '@/lib/utils';
 jules-16680094041159827713-0e0fd200

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
 alfo-ecosystem-standardization-10716047684776820565
  const baseUrl = SITE_URL;

 fix-sitemap-site-url-4794970102639254297
  const baseUrl = SITE_URL;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unitconverter.com';
 jules-16680094041159827713-0e0fd200
jules-16680094041159827713-0e0fd200

  // Get dynamic conversion pair routes
  const pairRoutes = generateAllPairs().map((pair) => {
    const path = `/convert/${pair.slug}`;
    const intent = classifyIntent(path);
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: getIntentPriority(intent),
    };
  });

  // Get dynamic category routes
  const categoryRoutes = getAllCategories().map((cat) => {
    const path = `/category/${cat.id}-converter`;
    const intent = classifyIntent(path);
    return {
      url: `${baseUrl}${path}`,
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
      const path = `/guides/${slug}`;
      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: getIntentPriority(classifyIntent(path)),
      };
    });
  }


  const staticPages = ['/privacy-policy', '/terms-and-conditions', '/contact'].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: getIntentPriority(classifyIntent(path)),
  }));

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
