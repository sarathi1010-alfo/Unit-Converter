import { MetadataRoute } from 'next';
alfo-ecosystem-standardization-10716047684776820565
import { SITE_URL } from '@/lib/seo';
import { SITE_URL } from '@/lib/utils';
 jules-16680094041159827713-0e0fd200

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
 alfo-ecosystem-standardization-10716047684776820565
    sitemap: `${SITE_URL}/sitemap.xml`,
fix-sitemap-site-url-4794970102639254297
    sitemap: `${SITE_URL}/sitemap.xml`,

    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://unitconverter.com'}/sitemap.xml`,
 jules-16680094041159827713-0e0fd200
jules-16680094041159827713-0e0fd200
  };
}
