import { test, expect } from '@playwright/test';

const SITE_URL = 'http://localhost:3000';

const newUrls = [
  '/blog/conversion-hacks-for-engineers',
  '/blog/ultimate-guide-to-unit-conversion',
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
  '/volume/gal-to-l',
  '/blog/essential-unit-conversions-for-diy',
  '/length/mm-to-in',
  '/length/in-to-mm',
  '/length/cm-to-ft',
  '/length/ft-to-cm',
  '/weight/kg-to-g',
  '/weight/g-to-kg',
  '/weight/lb-to-oz',
  '/area/sqm-to-sqft',
  '/volume/ml-to-floz',
  '/volume/floz-to-ml',
  '/blog/cooking-and-baking-conversions',
  '/data/gb-to-mb',
  '/data/tb-to-gb',
  '/data/kb-to-mb',
  '/volume/m3-to-l',
  '/volume/l-to-m3',
  '/cooking/ml-to-cups',
  '/speed/ms-to-kmh',
  '/area/sqft-to-acre',
  '/area/acre-to-sqft',
  '/pressure/psi-to-kpa',
  '/blog/digital-data-storage-unit-conversion-guide',
  '/data/b-to-kb',
  '/data/kb-to-b',
  '/speed/mph-to-ms',
  '/power/w-to-kw',
  '/power/kw-to-w',
  '/power/hp-to-kw',
  '/power/kw-to-hp',
  '/energy/j-to-cal',
  '/energy/cal-to-j',
  '/blog/understanding-pressure-and-energy',
  '/pressure/psi-to-bar',
  '/pressure/bar-to-psi',
  '/pressure/kpa-to-bar',
  '/pressure/bar-to-kpa',
  '/pressure/kpa-to-atm',
  '/pressure/atm-to-kpa',
  '/energy/j-to-kwh',
  '/energy/kwh-to-j',
  '/energy/btu-to-cal',
  '/energy/cal-to-btu',
  '/blog/the-complete-guide-to-temperature-conversion',
  '/temperature/c-to-k',
  '/temperature/k-to-c',
  '/temperature/f-to-k',
  '/temperature/k-to-f',
  '/area/acre-to-sqm',
  '/area/sqm-to-acre',
  '/area/hectare-to-acre',
  '/area/sqkm-to-sqmi',
  '/length/m-to-yd',
  '/length/km-to-ft',
  '/blog/unit-conversions-for-fitness-and-health',
  '/weight/kg-to-oz',
  '/weight/oz-to-kg',
  '/weight/g-to-lb',
  '/weight/lb-to-g',
  '/weight/stone-to-kg',
  '/weight/kg-to-stone',
  '/weight/stone-to-lb',
  '/weight/lb-to-stone',
  '/length/mi-to-ft',
  '/length/ft-to-mi',
  '/blog/the-complete-guide-to-area-conversions-for-real-estate',
  '/area/sqm-to-hectare',
  '/area/hectare-to-sqm',
  '/area/sqmi-to-sqkm',
  '/area/sqmi-to-acre',
  '/area/acre-to-sqmi',
  '/area/sqkm-to-hectare',
  '/area/hectare-to-sqkm',
  '/area/sqft-to-hectare',
  '/area/hectare-to-sqft',
  '/area/acre-to-hectare',
  '/blog/the-complete-guide-to-speed-conversions',
  '/speed/kmh-to-ms',
  '/speed/kmh-to-knot',
  '/speed/mph-to-knot',
  '/speed/ms-to-mph',
  '/speed/ms-to-knot',
  '/speed/knot-to-kmh',
  '/speed/knot-to-mph',
  '/speed/knot-to-ms',
  '/volume/l-to-ml',
  '/volume/l-to-cup',
  '/blog/the-complete-guide-to-weight-and-mass-conversions',
  '/weight/mg-to-g',
  '/weight/g-to-mg',
  '/weight/mt-to-kg',
  '/weight/kg-to-mt',
  '/weight/ton-to-kg',
  '/weight/kg-to-ton',
  '/weight/ton-to-lb',
  '/weight/lb-to-ton',
  '/weight/mt-to-ton',
  '/weight/ton-to-mt',
  '/blog/quick-unit-conversion-guide',
  '/convert/ft-to-m',
  '/convert/kg-to-lb',
  '/convert/c-to-f',
  '/convert/l-to-gal',
  '/convert/sqft-to-sqm',
  '/convert/kmh-to-mph',
  '/convert/mb-to-gb',
  '/convert/usd-to-eur',
  '/convert/cups-to-ml',
  '/convert/us-to-eu',
  '/length/ft-to-m',
  '/weight/kg-to-lb',
  '/area/sqft-to-sqm',
  '/data/mb-to-gb',
  '/cooking/cups-to-ml',
  '/blog/the-complete-guide-to-length-conversion',
  '/length/nm-to-m',
  '/length/m-to-nm',
  '/length/mm-to-cm',
  '/length/cm-to-mm',
  '/length/m-to-cm',
  '/length/cm-to-m',
  '/length/km-to-m',
  '/length/m-to-km',
  '/length/yd-to-ft',
  '/length/ft-to-yd'
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
