import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { generateAllPairs, getAllCategories } from '@/lib/conversion_helpers';
import { SITE_URL } from '@/lib/seo';

import { classifyIntent, getIntentPriority } from '@/lib/intent';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unitconverter.com';

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
