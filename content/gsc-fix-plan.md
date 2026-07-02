# Search Console Maintenance & Fix Plan (GSC)

## Current Status Analysis (Mocked for alfo.online)
Based on current crawl patterns for programmatic utility sites:
1. **Excluded (Crawled - currently not indexed):** Expected for new /convert/ or /[category]/ paths.
2. **Discovered - currently not indexed:** High volume of programmatic pairs might be throttled.
3. **404 Errors:** Old routes from previous iterations or competitor vs pages that were removed.

## Immediate Action Plan

### 1. Address Exclusions & Discovery
- **Action:** Ping XML Sitemaps for `sitemap-products.xml` which contains all 114+ conversion pairs.
- **Action:** Use IndexNow API to submit the new `/blog/quick-unit-conversion-guide` and the 10 prioritized programmatic URLs.
- **Priority URLs:**
  - `/blog/quick-unit-conversion-guide`
  - `/length/feet-to-meters`
  - `/weight/kg-to-lbs`
  - `/temperature/c-to-f`
  - `/clothing/us-to-eu`

### 2. 404 Management & Redirects
- **Action:** Monitor GSC 'Coverage' report. If old `/convert/` paths show as 404 while `/[category]/` is the new preferred, implement a 301 redirect in `next.config.js` or middleware.
- **Current Status:** Both routes are active and canonicalized to the category-based path. This is a safe transition state.

### 3. Internal Link Refresh
- **Action:** Update `content/guides/cm-to-inches.mdx` (Old Content) to link to the new authority article.
- **Action:** Update `src/app/page.tsx` (Popular Conversions) to feature the new guide. (COMPLETED)

### 4. Technical Hygiene
- **Action:** Ensure `robots.txt` correctly allows all `/category/` and `/[category]/` paths while blocking Vercel preview headers. (COMPLETED)
- **Action:** Verify JSON-LD validation for all new schemas. (COMPLETED)

## Schedule
- **Daily:** Ping sitemap and check for 5xx errors in GSC.
- **Weekly:** Review 'Core Web Vitals' and 'Mobile Usability' for programmatic templates.
- **Monthly:** Bulk submit 'Discovered - not indexed' URLs that haven't moved after 30 days.
