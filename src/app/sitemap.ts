import { MetadataRoute } from 'next';
import { classifyIntent, getIntentPriority } from '@/lib/intent';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unitflow.alfo.online';

  const staticPages = ['/privacy-policy', '/terms-and-conditions', '/terms-of-service', '/contact', '/about'].map(path => ({
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
    ...staticPages
  ];
}
