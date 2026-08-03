import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const TIER1_URL = `${BASE_URL}/blog/quick-unit-conversion-guide.html`;
const TIER2_URLS = [
  `${BASE_URL}/length/ft-to-m.html`,
  `${BASE_URL}/weight/kg-to-lb.html`,
  `${BASE_URL}/temperature/c-to-f.html`,
  `${BASE_URL}/volume/l-to-gal.html`,
  `${BASE_URL}/area/sqft-to-sqm.html`,
  `${BASE_URL}/speed/kmh-to-mph.html`,
  `${BASE_URL}/data/mb-to-gb.html`,
  `${BASE_URL}/currency/usd-to-eur.html`,
  `${BASE_URL}/cooking/cups-to-ml.html`,
  `${BASE_URL}/clothing/us-to-eu.html`
];

test.describe('Daily Publishing Verification - July 15, 2026', () => {

  test('Tier 1 Article: Status, H1, AI Snapshot, Schema', async ({ page }) => {
    const response = await page.goto(TIER1_URL);
    expect(response?.status()).toBe(200);

    // One H1
    const h1s = await page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s).toContainText('How to Convert Units Quickly and Accurately');

    // AI Snapshot under H2
    const h2 = await page.locator('h2').filter({ hasText: 'How to convert units quickly and accurately?' });
    await expect(h2).toBeVisible();

    // Article Schema
    const schema = await page.locator('script[type="application/ld+json"]').first().innerHTML();
    const json = JSON.parse(schema);
    expect(json['@type']).toBe('Article');
    expect(json['headline']).toContain('How to Convert Units Quickly and Accurately');
  });

  for (const url of TIER2_URLS) {
    test(`Tier 2 Page ${url}: Status, H1, FAQ Schema`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);

      // One H1
      const h1s = await page.locator('h1');
      await expect(h1s).toHaveCount(1);
      await expect(h1s).toContainText('to');
      await expect(h1s).toContainText('Converter');

      // FAQ Schema
      const schemas = await page.locator('script[type="application/ld+json"]').all();
      let hasFAQ = false;
      for (const s of schemas) {
        const content = await s.innerHTML();
        const json = JSON.parse(content);
        if (json['@type'] === 'FAQPage') {
          hasFAQ = true;
          break;
        }
      }
      expect(hasFAQ).toBe(true);
    });
  }

  test('Core Functionality: Accuracy Tests', async ({ page }) => {
    await page.goto(`${BASE_URL}/index.html`);

    // Length: 10 ft to m
    await page.selectOption('select[name="category"]', 'length');
    await page.selectOption('select[name="from"]', 'ft');
    await page.selectOption('select[name="to"]', 'm');
    await page.fill('input[name="value"]', '10');
    await expect(page.locator('[data-testid="result-display"]')).toContainText('3.048');

    // Weight: 10 kg to lb
    await page.selectOption('select[name="category"]', 'weight');
    await page.selectOption('select[name="from"]', 'kg');
    await page.selectOption('select[name="to"]', 'lb');
    await page.fill('input[name="value"]', '10');
    await expect(page.locator('[data-testid="result-display"]')).toContainText('22.046');

    // Temperature: 20 C to F
    await page.selectOption('select[name="category"]', 'temperature');
    await page.selectOption('select[name="from"]', 'c');
    await page.selectOption('select[name="to"]', 'f');
    await page.fill('input[name="value"]', '20');
    await expect(page.locator('[data-testid="result-display"]')).toContainText('68');
  });

  test('No Console Errors', async ({ page }) => {
    const errors: any[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(`${BASE_URL}/index.html`);
    await page.goto(TIER1_URL);

    expect(errors).toEqual([]);
  });
});
