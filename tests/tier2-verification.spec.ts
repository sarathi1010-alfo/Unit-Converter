import { test, expect } from '@playwright/test';

const SITE_URL = 'http://localhost:3000';

const urlsToTest = [
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

test.describe('Tier 2 Programmatic Pages Verification', () => {
  for (const url of urlsToTest) {
    test(`Verify ${url} returns 200 OK, has H1, and no console errors`, async ({ page }) => {
      // Check for console errors
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      const response = await page.goto(`${SITE_URL}${url}`);
      expect(response?.status()).toBe(200);

      // Verify H1 exists and is not empty
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.innerText();
      expect(h1Text.length).toBeGreaterThan(0);

      expect(errors).toHaveLength(0);
    });
  }
});
