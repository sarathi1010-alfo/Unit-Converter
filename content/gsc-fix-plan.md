# Google Search Console (GSC) Maintenance & Fix Plan

## 1. Overview of Current Coverage Status (Simulated)
Based on the current technical setup and the nature of the unit converter niche, the following coverage issues are expected in GSC for the `alfo.online` property:
- **Excluded (Crawled - currently not indexed):** Programmatic conversion pairs that lack significant unique content beyond the calculation.
- **Discovered - currently not indexed:** New Tier 2 URLs that haven't been crawled yet.
- **404 Errors:** Old URLs from previous versions of the tool or typos in backlinks.

## 2. Immediate Fix Actions

### A. Addressing Excluded/Discovery Issues
- **Problem:** Programmatic pages often struggle with "thin content" flags.
- **Fix:** Each Tier 2 page now includes a unique FAQ schema and an AI Citation Block (AEO) to increase the "information density" and signal authority to Google.
- **Action:** Monitor GSC 'Pages' report. For URLs in "Discovered - currently not indexed", use the 'Request Indexing' tool for the top 10 most popular pairs.

### B. Managing 404s and Redirects
- **Problem:** Broken internal links or legacy URLs causing 404s.
- **Fix:**
    - Ensure all internal links in `Popular Conversions` and `Categories` are up to date.
    - Implement a `next.config.ts` redirect mapping if legacy URL patterns are identified in GSC.
- **Action:** Export the '404' list from GSC. Identify patterns. For example, if old URLs used `_` instead of `-`, create a wildcard redirect.

### C. Technical Hygiene Check
- **Problem:** Canonical drift or missing schemas.
- **Fix:** Automated validation via `npm run validate:seo` (already implemented in CI/CD).
- **Action:** Review CI/CD logs daily for any SEO Quality Gate failures.

## 3. Content Refresh Strategy
- **Weekly Task:** Identify 1 piece of "old" content (e.g., a Pillar page or a popular Category) and update its internal links to point to the latest Tier 1 articles.
- **Update Signal:** Refresh the `lastModified` date in the source data (e.g., `src/data/categories.json`) to trigger a re-crawl.

## 4. Internal Link Audit (January 2025)
- **Status:** New Tier 1 article "How to convert units quickly and accurately" has been linked from:
    - Homepage (/)
    - Category pillar pages (e.g., `/category/length-converter`)
- **Backlinking:** Older category descriptions have been updated to reference this guide as the authoritative source for manual conversion math.

---
*Maintained by the SEO Automation Team. Last Review: 2025-01-24.*
