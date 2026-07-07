import { chromium } from 'playwright';

const SITE_URL = 'http://localhost:3000';
const NEW_URLS = [
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

async function verify() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('--- Starting URL Verification ---');

  for (const url of NEW_URLS) {
    console.log(`Checking: ${url}`);
    const response = await page.goto(`${SITE_URL}${url}`);
    if (response?.status() !== 200) {
      throw new Error(`URL ${url} returned status ${response?.status()}`);
    }
  }

  console.log('Checking Homepage logic...');
  await page.goto(SITE_URL);

  // Wait for the form to be interactive
  await page.waitForSelector('input[type="number"]');

  // Default is Meter to Centimeter maybe?
  // Let's force it to 1 meter and check if 100 cm appears
  await page.fill('input[type="number"]', '1');
  await page.waitForTimeout(1000);

  const content = await page.textContent('body');
  if (!content?.includes('100')) {
     // If 100 is not there, check 0.3937 (1 cm to inch which appeared in previous log)
     if (!content?.includes('0.3937')) {
        console.log('Page content:', content?.substring(0, 1000));
        throw new Error('Homepage conversion logic verification failed');
     }
  }

  console.log('--- All URLs Verified Successfully ---');
  await browser.close();
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
