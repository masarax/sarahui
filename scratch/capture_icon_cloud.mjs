import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:3000/#IconCloud', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Take screenshot in light mode
  await page.screenshot({ path: 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/icon-cloud-compact-light.png' });

  // Switch to dark mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(1000);

  // Take screenshot in dark mode
  await page.screenshot({ path: 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/icon-cloud-compact-dark.png' });

  // Take preview card screenshot specifically
  const preview = await page.$('.component-preview-card, .component-stage, .component-main');
  if (preview) {
    await preview.screenshot({ path: 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/icon-cloud-compact-preview.png' });
  }

  await browser.close();
  console.log('Screenshots captured successfully');
})();

