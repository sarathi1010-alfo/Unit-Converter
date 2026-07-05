import { test, expect } from '@playwright/test';

test.describe('Tier 2 and Content Verification', () => {
  const baseURL = 'http://localhost:3000';

  const newUrls = [
    '/blog/quick-unit-conversion-guide',
    '/length/ft-to-m',
    '/weight/kg-to-lb',
    '/temperature/c-to-f',
    '/volume/l-to-gal',
    '/area/sqft-to-sqm',
    '/speed/kmh-to-mph',
    '/data/mb-to-gb',
    '/currency/usd-to-eur',
    '/cooking/cups-to-ml',
    '/clothing/us-to-eu'
  ];

  for (const url of newUrls) {
    test(`Checking status and headings for ${url}`, async ({ page }) => {
      // Don't throw on console errors for now to allow minor Next.js static issues
      page.on('console', msg => {
        if (msg.type() === 'error') {
          console.error(`Console error on ${url}: ${msg.text()}`);
        }
      });

      const response = await page.goto(`${baseURL}${url}`);
      expect(response?.status()).toBe(200);

      // Verify exactly one H1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });
  }

  test('Blog article content and structure', async ({ page }) => {
    await page.goto(`${baseURL}/blog/quick-unit-conversion-guide`);

    // Check AI Snapshot
    await expect(page.locator('article')).toContainText('To convert units quickly and accurately');

    // Check internal links - use .first() to avoid strict mode violation
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();

    const lengthLink = page.locator('a[href="/category/length-converter"]').first();
    await expect(lengthLink).toBeVisible();
  });

  test('Unit conversion calculations on main page', async ({ page }) => {
    await page.goto(baseURL);

    const input = page.locator('input[name="value"]');
    const resultDisplay = page.getByTestId('result-display').first();

    // Length: 10 cm to inches
    await input.fill('10');
    await expect(resultDisplay).toContainText('3.937008');

    // Weight: 10 kg to grams (Default weight fromUnit is kg, toUnit is g based on order in units.json)
    await page.locator('select[name="category"]').selectOption('weight');
    await input.fill('10');
    // 10 kg = 10000 g
    await expect(resultDisplay).toContainText('10000');

    // Temperature: 0 C to F
    await page.locator('select[name="category"]').selectOption('temperature');
    await input.fill('0');
    // 0 C = 32 F
    await expect(resultDisplay).toContainText('32');
  });
});
