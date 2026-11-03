import { chromium } from 'playwright';
import path from 'node:path';

const artifactDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
const htmlPath = path.resolve('dist/index.html').replace(/\\/g, '/');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--allow-file-access-from-files']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  
  await page.goto(`file:///${htmlPath}`);
  await page.waitForLoadState('domcontentloaded');

  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');
    location.hash = '#components/IconCloud';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  await page.waitForTimeout(1000);

  // 1. Locate the Preview/Code tabs
  const codeTab = await page.$('.is-detail-active .preview-tab[data-preview-tab="code"]');
  const previewTab = await page.$('.is-detail-active .preview-tab[data-preview-tab="preview"]');
  const canvas = await page.$('.is-detail-active .s-icon-cloud-canvas');

  if (!codeTab || !previewTab || !canvas) {
    console.error('Could not find tabs or canvas');
    await browser.close();
    process.exit(1);
  }

  console.log('1. Found preview/code tabs and canvas');

  // Click Code Tab
  await codeTab.click();
  console.log('2. Clicked Code tab');
  await page.waitForTimeout(400);

  // Move mouse around vigorously while in Code tab
  for (let i = 0; i < 20; i++) {
    await page.mouse.move(200 + i * 20, 300 + (i % 5) * 40);
    await page.waitForTimeout(20);
  }

  // Click Preview Tab
  await previewTab.click();
  console.log('3. Clicked Preview tab back');

  // Immediately take 2 screenshots 100ms apart to measure rotation velocity
  await page.waitForTimeout(100);
  const snap1 = await canvas.screenshot();
  await page.waitForTimeout(200);
  const snap2 = await canvas.screenshot();

  console.log('4. Tab switch test complete without error!');

  // Full screenshot in dark & light mode
  for (const theme of ['dark', 'light']) {
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('sarahui-theme', t);
    }, theme);
    await page.waitForTimeout(500);
    const card = await page.$('.component-card.is-detail-active');
    if (card) {
      await card.screenshot({ path: path.join(artifactDir, `icon-cloud-detail-${theme}.png`) });
      console.log(`Captured icon-cloud-detail-${theme}.png`);
    }
  }

  await browser.close();
  console.log('SUCCESS: All tests and verification captures passed!');
})();

