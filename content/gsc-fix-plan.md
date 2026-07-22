# GSC Fix Plan - June 2024

## Current Status
- Property: alfo.online
- Focus: unitflow.alfo.online

## Identified Issues
1. **Discovered - currently not indexed:** Some programmatic pair pages are discovered but not yet indexed by Google.
2. **Crawled - currently not indexed:** A subset of `/convert/` pages are crawled but waiting for indexing.
3. **Missing Canonical Tags:** Ensure all dynamic routes have a strict 1:1 canonical mapping.

## Resolution Steps

### 1. Technical Hygiene (High Priority)
- [x] **Canonical Enforcement:** Verified that `src/app/convert/[slug]/page.tsx` and `src/app/[category]/[slug]/page.tsx` both set explicit canonical URLs using `SITE_URL`.
- [x] **Robots.txt Optimization:** Ensure `robots.txt` explicitly points to the `sitemap-index.xml`.

### 2. Speeding up Discovery
- [x] **Sitemap Indexing:** Point Google to `/sitemap-index.xml` which contains all articles, products, and programmatic pairs.
- [x] **IndexNow Integration:** Trigger IndexNow for all new Tier 1 and Tier 2 URLs.

### 3. Content Authority Signals
- [x] **Internal Linking:** Linked from high-authority Tier 1 articles (e.g., `/blog/quick-unit-conversion-guide`) to programmatic categories and home.
- [x] **Retroactive Linking:** Added links from existing guides (e.g., `/guides/cm-to-inches`) and Popular Conversions to new authority content.

### 4. Ongoing Monitoring
- Monitor GSC "Pages" report weekly for "Indexed" count increases.
- Use "URL Inspection Tool" for critical Tier 1 pages to request manual indexing if they remain unindexed for > 48 hours.

## July 2026 Update (July 14, 2026)
- **Tier 1 Published:** `/blog/quick-unit-conversion-guide` has been refreshed and optimized for AEO with today's date.
- **Tier 2 Verified:** 10 core programmatic pairs (ft-to-m, kg-to-lb, etc.) verified for 200 OK and schema correctness across both `/convert/` and `/[category]/` routes.
- **Internal Linking:** Established reciprocal links between `/blog/quick-unit-conversion-guide` and `/guides/cm-to-inches`. Updated "last modified" on old content.
- **Discovery:** Triggered IndexNow and sitemap pings for all updated URLs. Verified technical integrity with Playwright.

## July 2026 Update (July 15, 2026)
- **Tier 1 Published:** `/blog/quick-unit-conversion-guide` date updated and content refreshed.
- **Tier 2 Verified:** 10 core programmatic pairs (ft-to-m, kg-to-lb, c-to-f, l-to-gal, sqft-to-sqm, kmh-to-mph, mb-to-gb, usd-to-eur, cups-to-ml, us-to-eu) verified.
- **Internal Linking:** Verified reciprocal links between Tier 1 article and pillar pages. Updated "last modified" on existing guide.
- **Discovery:** Triggered IndexNow and sitemap pings for today's updates.

## July 2026 Update (July 16, 2026)
- **Tier 1 Published:** `/blog/quick-unit-conversion-guide` refreshed for July 16. Verified 1,200+ word count and AEO compliance.
- **Tier 2 Verified:** 10 core programmatic pairs verified for 200 OK and FAQ schema (ft-to-m, kg-to-lb, c-to-f, l-to-gal, sqft-to-sqm, kmh-to-mph, mb-to-gb, usd-to-eur, cups-to-ml, us-to-eu).
- **Internal Linking:** Updated internal links from `/guides/cm-to-inches` to the Tier 1 article. Refreshed "last modified" date.
- **Discovery:** Scheduled sitemap pings and IndexNow triggers for all new and updated URLs.

## July 2026 Update (July 17, 2026)
- **Tier 1 Published:** `/blog/conversion-hacks-for-engineers` published targeting engineering conversion hacks.
- **Tier 2 Verified:** 10 programmatic pairs verified (cm-to-in, in-to-cm, km-to-mi, mi-to-km, m-to-ft, g-to-oz, oz-to-g, yd-to-m, oz-to-lb, lb-to-kg).
- **Internal Linking:** Added internal link from `/blog/quick-unit-conversion-guide` to `/blog/conversion-hacks-for-engineers` and updated "Last updated" date to today.
- **Discovery:** Scheduled sitemap pings and IndexNow triggers for all new and updated URLs.

### Action Log - July 18, 2026
- **Execution:** Created Tier 1 Authority Article: "Everyday Unit Conversions for Travelers".
- **Execution:** Selected 10 traveler-focused programmatic conversion pairs for verification.
- **Execution:** Generated 10 new social media distribution posts.
- **Execution:** Injected `AICitationBlock` for AI Answer Engine Optimization.
- **Execution:** Completed retro-linking from existing high-value guides (`quick-unit-conversion-guide` and `ultimate-guide-to-unit-conversion`) and updated `lastModified` tags to refresh indexing.
- **Execution:** Verified static export builds and headless tests pass via `npx playwright test`.
- **Status:** GREEN. Zero console errors. Indexing API signals manually requested.

### Action Log - July 19, 2026
- **Execution:** Created Tier 1 Authority Article: "Essential Unit Conversions for Home DIY Projects".
- **Execution:** Added 10 new programmatic pairs focusing on DIY and construction workflows.
- **Execution:** Added 10 new social media distribution posts.
- **Execution:** Retro-linked existing guides to the new DIY guide and updated `lastModified` tags.
- **Status:** Complete. Proceeding with headless test validation and manual indexing API signals.

### Action Log - July 20, 2026
- **Execution:** Created Tier 1 Authority Article: "The Ultimate Guide to Cooking and Baking Conversions".
- **Execution:** Added 10 new programmatic pairs focusing on cooking, volume, data, speed, pressure, and area workflows.
- **Execution:** Added 10 new social media distribution posts.
- **Execution:** Retro-linked existing guides to the new cooking guide and updated `lastModified` tags.
- **Status:** Complete. Proceeding with headless test validation and manual indexing API signals.

### Action Log - July 21, 2026
- **Execution:** Created Tier 1 Authority Article: "Understanding Digital Data: From Bytes to Yottabytes and Beyond".
- **Execution:** Added 10 new programmatic pairs focusing on data, speed, power, and energy conversions (e.g. b-to-kb, mph-to-ms, w-to-kw, j-to-cal).
- **Execution:** Added 10 new social media distribution posts.
- **Execution:** Retro-linked existing guides to the new data guide and updated `lastModified` tags.
- **Status:** Complete. Proceeding with headless test validation and manual indexing API signals.

### Action Log - July 22, 2026
- **Execution:** Created Tier 1 Authority Article: "Understanding Pressure and Energy: A Guide to Industrial Conversions".
- **Execution:** Added 10 new programmatic pairs focusing on pressure and energy conversions.
- **Execution:** Added 10 new social media distribution posts.
- **Execution:** Retro-linked existing ultimate guide to the new pressure and energy guide and updated `lastModified` tag.
- **Status:** Complete. Proceeding with headless test validation and manual indexing API signals.
