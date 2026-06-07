import { MetadataRoute } from 'next';
import { generateAllPairs, getAllCategories } from '@/lib/conversion_helpers';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unitconverter.com'; // Change to actual domain

  // Get dynamic conversion pair routes
  const pairRoutes = generateAllPairs().map((pair) => ({
    url: `${baseUrl}/convert/${pair.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Get dynamic category routes
  const categoryRoutes = getAllCategories().map((cat) => ({
    url: `${baseUrl}/category/${cat.id}-converter`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Custom manual guides/pages
  const guideRoutes = [
    {
      url: `${baseUrl}/guides/cm-to-inches`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  ];

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
      priority: 1,
    },
    ...categoryRoutes,
    ...pairRoutes,
    ...guideRoutes,
    ...staticPages
  ];
}
