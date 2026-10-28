import { MetadataRoute } from 'next';
import { getAllCategories } from '@/lib/pairs';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://unit-converter-kappa-nine.vercel.app';

  const staticPages = [
    '',
    '/privacy-policy',
    '/terms-and-conditions',
    '/terms-of-service',
    '/contact',
    '/about',
    '/guides',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  const categoryPages = getAllCategories().map((cat) => ({
    url: `${baseUrl}/category/${cat.id}-converter`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages];
}
