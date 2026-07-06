import { MetadataRoute } from 'next';
import { classifyIntent, getIntentPriority } from '@/lib/intent';

export const dynamic = 'force-static';



export async function generateSitemaps() {
  return Array.from({ length: 1000 }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
   const resolvedId = await Promise.resolve(id);
   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unitflow.alfo.online';

  const staticPages = ['/privacy-policy', '/terms-and-conditions', '/terms-of-service', '/contact', '/about'].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: getIntentPriority(classifyIntent(path)),
  }));

  const pages = Array.from({ length: 20 }, (_, i) => ({
    url: `${baseUrl}/sitemap-${resolvedId}-${i}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  if (resolvedId === 0) {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: getIntentPriority(classifyIntent('/')),
      },
      ...staticPages,
      ...pages
    ];
  }

  return pages;
}
