import { chromium } from 'playwright';
import path from 'node:path';

const artifactDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
const htmlPath = path.resolve('dist/index.html').replace(/\\/g, '/');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--allow-file-access-from-files']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  
  await page.goto(`file:///${htmlPath}`);
  await page.waitForLoadState('domcontentloaded');

  // 1. Overview / Home in light & dark
  for (const theme of ['light', 'dark']) {
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('sarahui-theme', t);
      location.hash = '#overview';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      window.scrollTo(0, 0);
    }, theme);

    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, `full-blur-home-${theme}.png`) });
    console.log(`Captured full-blur-home-${theme}.png`);

    // Scrolled state to verify sticky topbar without announcement overlap
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactDir, `full-scrolled-header-${theme}.png`) });
    console.log(`Captured full-scrolled-header-${theme}.png`);
  }

  // 2. Button Component detail in light & dark
  for (const theme of ['light', 'dark']) {
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('sarahui-theme', t);
      location.hash = '#components/Button';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      window.scrollTo(0, 0);
    }, theme);

    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, `full-buttons-detail-${theme}.png`) });
    console.log(`Captured full-buttons-detail-${theme}.png`);
  }

  // 3. Components Catalog in light & dark
  for (const theme of ['light', 'dark']) {
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('sarahui-theme', t);
      location.hash = '#components';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      window.scrollTo(0, 0);
    }, theme);

    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, `full-blur-catalog-${theme}.png`) });
    console.log(`Captured full-blur-catalog-${theme}.png`);
  }

  // 4. OrbitingCircles detail in light & dark
  for (const theme of ['light', 'dark']) {
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('sarahui-theme', t);
      location.hash = '#components/OrbitingCircles';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      window.scrollTo(0, 0);
    }, theme);

    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, `full-blur-detail-${theme}.png`) });
    console.log(`Captured full-blur-detail-${theme}.png`);
  }

  await browser.close();
  console.log('All UI verification screenshots captured successfully!');
})();
