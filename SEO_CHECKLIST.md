# Ecosystem SEO Checklist

This guide explains the centralized SEO architecture designed for scaling multiple tools under the `alfo.online` ecosystem, mitigating Vercel indexing issues, and providing an exact checklist for new deployments.

## Why Centralized SEO configuration matters

By default, Vercel deployments generate automatic `.vercel.app` URLs for every commit. Crawlers (like Googlebot) will find these subdomains, leading to massive duplicate content penalties.
To prevent this, the ecosystem relies on **one unified canonical truth source:** the `NEXT_PUBLIC_SITE_URL` environment variable.

### Before vs After

**Before (Hardcoded or Vercel-dependent):**
```ts
// sitemap.ts
const baseUrl = 'https://unitconverter.com'; // Brittle, requires code changes per site

// robots.ts
sitemap: 'https://unitconverter.com/sitemap.xml'

// layout.tsx metadata
openGraph: { url: "https://unitconverter.com" }
```

**After (Dynamic & Environment-Driven):**
```ts
// src/lib/seo.ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const METADATA_BASE = new URL(SITE_URL);

// sitemap.ts
const baseUrl = SITE_URL;

// robots.ts
sitemap: `${SITE_URL}/sitemap.xml`

// layout.tsx metadata
metadataBase: METADATA_BASE,
alternates: { canonical: '/' } // Automatically resolves using metadataBase
openGraph: { url: '/' }
```

## Production Deployment Checklist

When deploying a new tool in the ecosystem, follow these steps exactly:

1. **Vercel Dashboard Setup:**
   - Go to your Project -> Settings -> Domains.
   - Add your custom domain (e.g., `unitflow.alfo.online`).
   - Go to Settings -> Environment Variables.
   - Add `NEXT_PUBLIC_SITE_URL` with the exact URL (e.g., `https://unitflow.alfo.online` — **no trailing slash**).

2. **Search Console Validation:**
   - Go to Google Search Console.
   - Add a "URL Prefix" property matching your `NEXT_PUBLIC_SITE_URL`.
   - Go to Sitemaps and submit `https://your-domain.alfo.online/sitemap.xml`.

3. **Verify Robots & Sitemaps Post-Deployment:**
   - Visit `https://your-domain.alfo.online/robots.txt` and ensure it says `allow: /`.
   - Visit `https://your-domain.alfo.online/sitemap.xml` and ensure all paths start with your custom domain.
   - Visit the `.vercel.app` equivalent domain's `/robots.txt` — it MUST say `disallow: /` (handled via our `VERCEL_ENV` check in `robots.ts`).

4. **Testing Commands (Local):**
   ```bash
   # Build the project to verify generation
   npm run build

   # Inspect generated artifacts in out/ or .next/
   cat .next/server/app/robots.txt.body
   cat .next/server/app/sitemap.xml.body
   ```
