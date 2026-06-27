import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // If we are on a Vercel preview deployment, block all crawling.
  if (process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://unitconverter.com'}/sitemap.xml`,
  };
}
