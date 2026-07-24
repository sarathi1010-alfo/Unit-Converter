import { test, expect } from '@playwright/test';

const SITE_URL = 'http://localhost:3000';

const newUrls = [
  '/blog/conversion-hacks-for-engineers.html',
  '/blog/ultimate-guide-to-unit-conversion.html',
  '/blog/what-is-a-conversion-factor.html',
  '/blog/what-is-the-metric-system.html',
  '/blog/what-is-the-imperial-system.html',
  '/blog/what-is-an-si-unit.html',
  '/blog/what-is-significant-figures.html',
  '/length/cm-to-in.html',
  '/length/in-to-cm.html',
  '/length/km-to-mi.html',
  '/length/mi-to-km.html',
  '/length/m-to-ft.html',
  '/weight/g-to-oz.html',
  '/weight/oz-to-g.html',
  '/length/yd-to-m.html',
  '/weight/oz-to-lb.html',
  '/weight/lb-to-kg.html',
  '/blog/everyday-unit-conversions-for-travelers.html',
  '/temperature/c-to-f.html',
  '/temperature/f-to-c.html',
  '/speed/kmh-to-mph.html',
  '/speed/mph-to-kmh.html',
  '/currency/usd-to-eur.html',
  '/currency/eur-to-usd.html',
  '/clothing/us-to-eu.html',
  '/clothing/eu-to-us.html',
  '/volume/l-to-gal.html',
  '/volume/gal-to-l.html',
  '/blog/essential-unit-conversions-for-diy.html',
  '/length/mm-to-in.html',
  '/length/in-to-mm.html',
  '/length/cm-to-ft.html',
  '/length/ft-to-cm.html',
  '/weight/kg-to-g.html',
  '/weight/g-to-kg.html',
  '/weight/lb-to-oz.html',
  '/area/sqm-to-sqft.html',
  '/volume/ml-to-floz.html',
  '/volume/floz-to-ml.html',
  '/blog/cooking-and-baking-conversions.html',
  '/data/gb-to-mb.html',
  '/data/tb-to-gb.html',
  '/data/kb-to-mb.html',
  '/volume/m3-to-l.html',
  '/volume/l-to-m3.html',
  '/cooking/ml-to-cups.html',
  '/speed/ms-to-kmh.html',
  '/area/sqft-to-acre.html',
  '/area/acre-to-sqft.html',
  '/pressure/psi-to-kpa.html',
  '/blog/digital-data-storage-unit-conversion-guide.html',
  '/data/b-to-kb.html',
  '/data/kb-to-b.html',
  '/speed/mph-to-ms.html',
  '/power/w-to-kw.html',
  '/power/kw-to-w.html',
  '/power/hp-to-kw.html',
  '/power/kw-to-hp.html',
  '/energy/j-to-cal.html',
  '/energy/cal-to-j.html'
,
  '/blog/understanding-pressure-and-energy.html',
  '/pressure/psi-to-bar.html',
  '/pressure/bar-to-psi.html',
  '/pressure/kpa-to-bar.html',
  '/pressure/bar-to-kpa.html',
  '/pressure/kpa-to-atm.html',
  '/pressure/atm-to-kpa.html',
  '/energy/j-to-kwh.html',
  '/energy/kwh-to-j.html',
  '/energy/btu-to-cal.html',
  '/energy/cal-to-btu.html'
,
  '/blog/scientific-and-precision-measurement-conversions.html',
  '/temperature/c-to-k.html',
  '/temperature/k-to-c.html',
  '/temperature/f-to-k.html',
  '/temperature/k-to-f.html',
  '/weight/kg-to-oz.html',
  '/weight/oz-to-kg.html',
  '/weight/g-to-lb.html',
  '/weight/lb-to-g.html',
  '/weight/mt-to-kg.html',
  '/weight/kg-to-mt.html'];

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
