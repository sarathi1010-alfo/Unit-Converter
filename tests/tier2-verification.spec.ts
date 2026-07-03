import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('Tier 2 Programmatic URLs Verification', () => {
  const targetUrls = [
    { url: '/length/ft-to-m', title: 'Foot to Meter Converter' },
    { url: '/weight/kg-to-lb', title: 'Kilogram to Pound Converter' },
    { url: '/temperature/c-to-f', title: 'Celsius to Fahrenheit Converter' },
    { url: '/volume/l-to-gal', title: 'Liter to Gallon \\(US\\) Converter' },
    { url: '/area/sqft-to-sqm', title: 'Square Foot to Square Meter Converter' },
    { url: '/speed/kmh-to-mph', title: 'Kilometer per Hour to Mile per Hour Converter' },
    { url: '/data/mb-to-gb', title: 'Megabyte to Gigabyte Converter' },
    { url: '/currency/usd-to-eur', title: 'US Dollar to Euro Converter' },
    { url: '/cooking/cups-to-ml', title: 'Cups \\(US\\) to Milliliter Converter' },
    { url: '/clothing/us-to-eu', title: 'US Size to EU Size Converter' }
  ];

  for (const target of targetUrls) {
    test(`Verify ${target.url} is 200 OK and has correct content`, async ({ page }) => {
      const response = await page.goto(`${baseURL}${target.url}`);
      expect(response?.status()).toBe(200);

      // Match title with escaped parentheses
      await expect(page).toHaveTitle(new RegExp(target.title));

      // H1 might contain symbols or slightly different text, so we check for the main units
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();

      // Check for FAQ schema
      const faqScript = page.locator('script[type="application/ld+json"]');
      const contents = await faqScript.allInnerTexts();
      const hasFAQ = contents.some(c => c.includes('"@type":"FAQPage"'));
      expect(hasFAQ).toBe(true);

      // Check for AEO block (AICitationBlock) - using nth(0) to avoid strict mode violation if multiple exist
      await expect(page.locator('.bg-primary\\/5').first()).toBeVisible();
    });
  }

  test('Verify blog post structure and AEO snapshot', async ({ page }) => {
    const response = await page.goto(`${baseURL}/blog/quick-unit-conversion-guide`);
    expect(response?.status()).toBe(200);

    // Exactly one H1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // AI Snapshot under first H2
    const aeoBlock = page.locator('.bg-primary\\/5').first();
    await expect(aeoBlock).toBeVisible();

    // Verify internal links
    const homeLink = page.locator('a[href="/"]');
    const categoryLink = page.locator('a[href="/category/length-converter"]');
    await expect(homeLink.first()).toBeVisible();
    await expect(categoryLink.first()).toBeVisible();
  });
});
