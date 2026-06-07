import { MetadataRoute } from 'next';
import { generateAllPairs, getAllCategories } from '@/lib/conversion_helpers';
import { classifyIntent, getIntentPriority } from '@/lib/intent';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unitconverter.com'; // Change to actual domain

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
  const guideRoutes = [
    {
      url: `${baseUrl}/guides/cm-to-inches`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: getIntentPriority(classifyIntent('/guides/cm-to-inches')),
    }
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: getIntentPriority(classifyIntent('/')),
    },
    ...categoryRoutes,
    ...pairRoutes,
    ...guideRoutes
  ];
}
