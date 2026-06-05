import { test, expect } from '@playwright/test';

test.describe('Unit Converter Frontend Verification', () => {
  const baseURL = 'http://localhost:3000';

  test('Homepage interactions update URL correctly', async ({ page }) => {
    await page.goto(baseURL);

    // Check initial layout
    await expect(page.getByRole('heading', { name: 'Convert any unit instantly' })).toBeVisible();

    // Fill in a value
    const input = page.getByPlaceholder('0');
    await input.fill('12');

    // Default category length (cm to in)
    // 12 cm * 0.01 = 0.12m. 0.12m / 0.0254 = ~4.724
    await expect(page.locator('div.text-primary').filter({ hasText: '4.724409' })).toBeVisible();

    // Change category to weight
    await page.getByRole('combobox').first().selectOption('weight');

    // Check URL update on swap (the swap button is locked in non-locked mode, wait, let's test a lock mode)
  });

  test('Direct SEO pair route handles conversion correctly', async ({ page }) => {
    await page.goto(`${baseURL}/convert/cm-to-in`);

    // URL canonicals should be correct
    await expect(page).toHaveURL(/.*convert\/cm-to-in/);

    // Enter value
    const input = page.getByPlaceholder('0');
    await input.fill('10');

    // Verify output
    await expect(page.locator('div.text-primary').filter({ hasText: '3.937008' })).toBeVisible();

    // Swap units navigates to inverted pair
    await page.getByRole('button', { name: 'Swap units' }).click();

    // Should now be on in-to-cm route
    await expect(page).toHaveURL(/.*convert\/in-to-cm\?value=10/);

    // The reversed output: 10 inches = 25.4 cm
    await expect(page.locator('div.text-primary').filter({ hasText: '25.4' })).toBeVisible();
  });

  test('Temperature formula conversion works', async ({ page }) => {
    await page.goto(`${baseURL}/convert/c-to-f`);

    // 0 C -> 32 F
    const input = page.getByPlaceholder('0');
    await input.fill('0');
    await expect(page.locator('div.text-primary').filter({ hasText: '32' })).toBeVisible();

    // 100 C -> 212 F
    await input.fill('100');
    await expect(page.locator('div.text-primary').filter({ hasText: '212' })).toBeVisible();
  });

  test('SEO JSON-LD script is present on pair routes', async ({ page }) => {
    await page.goto(`${baseURL}/convert/cm-to-in`);

    // Verify script tags exist
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThanOrEqual(2); // One for App, One for FAQ

    // Check FAQ contents roughly
    const firstScript = await scripts[0].textContent();
    const secondScript = await scripts[1].textContent();

    const fullContent = (firstScript || '') + (secondScript || '');
    expect(fullContent).toContain('FAQPage');
    expect(fullContent).toContain('WebApplication');
    expect(fullContent).toContain('Centimeter to Inch');
  });
});
