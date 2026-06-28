import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // Check if we're deployed on Vercel preview/production domains
  const isVercelDomain = process.env.NEXT_PUBLIC_SITE_URL?.includes('vercel.app');

  // If on Vercel default domains, prevent indexing
  if (isVercelDomain) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Production rules for custom domain
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://unitconverter.com'}/sitemap.xml`,
  };
}
