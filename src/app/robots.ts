import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
fix-sitemap-site-url-4794970102639254297
    sitemap: `${SITE_URL}/sitemap.xml`,

    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://unitconverter.com'}/sitemap.xml`,
 jules-16680094041159827713-0e0fd200
  };
}
