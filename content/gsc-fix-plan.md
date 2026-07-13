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

## July 2026 Update (July 13, 2026)
- **Tier 1 Published:** `/blog/quick-unit-conversion-guide` has been refreshed and optimized for AEO.
- **Tier 2 Verified:** 10 core programmatic pairs (ft-to-m, kg-to-lb, etc.) verified for 200 OK and schema correctness.
- **Internal Linking:** Established reciprocal links between `/blog/quick-unit-conversion-guide` and `/guides/cm-to-inches`.
- **Discovery:** Triggered IndexNow and sitemap pings for all updated URLs.
