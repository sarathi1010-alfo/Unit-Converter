import { test, expect } from '@playwright/test';

const SITE_URL = 'http://localhost:3000';

const newUrls = [
  '/blog/conversion-hacks-for-engineers',
  '/blog/ultimate-guide-to-unit-conversion',
  '/blog/what-is-a-conversion-factor',
  '/blog/what-is-the-metric-system',
  '/blog/what-is-the-imperial-system',
  '/blog/what-is-an-si-unit',
  '/blog/what-is-significant-figures',
  '/length/cm-to-in',
  '/length/in-to-cm',
  '/length/km-to-mi',
  '/length/mi-to-km',
  '/length/m-to-ft',
  '/weight/g-to-oz',
  '/weight/oz-to-g',
  '/length/yd-to-m',
  '/weight/oz-to-lb',
  '/weight/lb-to-kg',
  '/blog/everyday-unit-conversions-for-travelers',
  '/temperature/c-to-f',
  '/temperature/f-to-c',
  '/speed/kmh-to-mph',
  '/speed/mph-to-kmh',
  '/currency/usd-to-eur',
  '/currency/eur-to-usd',
  '/clothing/us-to-eu',
  '/clothing/eu-to-us',
  '/volume/l-to-gal',
  '/volume/gal-to-l'
];

test.describe('Daily Publishing Verification', () => {
  for (const url of newUrls) {
    test(`Verify ${url} returns 200 OK and has content`, async ({ page }) => {
      const response = await page.goto(`${SITE_URL}${url}`);
      expect(response?.status()).toBe(200);

      // Basic content check
      const h1 = await page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.innerText();
      expect(h1Text.length).toBeGreaterThan(0);

      // Check for console errors
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));
      await page.goto(`${SITE_URL}${url}`);
      expect(errors).toHaveLength(0);
    });
  }

  test('Verify homepage unit conversion functionality', async ({ page }) => {
    await page.goto(SITE_URL);

    // Length: 1 Foot to Meters
    await page.selectOption('select[name="category"]', 'length');
    await page.selectOption('select[name="from"]', 'ft');
    await page.selectOption('select[name="to"]', 'm');
    await page.fill('input[name="value"]', '1');
    // Wait for debounce/calculation
    await page.waitForTimeout(500);
    let result = await page.textContent('[data-testid="result-display"]');
    expect(parseFloat(result || "0")).toBeCloseTo(0.3048, 4);

    // Weight: 1 KG to LBS
    await page.selectOption('select[name="category"]', 'weight');
    await page.selectOption('select[name="from"]', 'kg');
    await page.selectOption('select[name="to"]', 'lb');
    await page.fill('input[name="value"]', '1');
    await page.waitForTimeout(500);
    result = await page.textContent('[data-testid="result-display"]');
    expect(parseFloat(result || "0")).toBeCloseTo(2.2046, 4);

    // Temperature: 0 Celsius to Fahrenheit
    await page.selectOption('select[name="category"]', 'temperature');
    await page.selectOption('select[name="from"]', 'c');
    await page.selectOption('select[name="to"]', 'f');
    await page.fill('input[name="value"]', '0');
    await page.waitForTimeout(500);
    result = await page.textContent('[data-testid="result-display"]');
    expect(parseFloat(result || "0")).toBe(32);
  });
});
