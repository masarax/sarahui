import { chromium } from 'playwright';
import path from 'node:path';

const artifactDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
const htmlPath = path.resolve('dist/index.html').replace(/\\/g, '/');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--allow-file-access-from-files']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  
  await page.goto(`file:///${htmlPath}`);
  await page.waitForLoadState('domcontentloaded');

  for (const theme of ['light', 'dark']) {
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('sarahui-theme', t);
      location.hash = '#components/TweetCard';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }, theme);

    await page.waitForTimeout(1000);

    const card = await page.$('.component-card.is-detail-active');
    if (card) {
      await card.screenshot({ path: path.join(artifactDir, `full-tweetcard-${theme}.png`) });
      console.log(`Captured full-tweetcard-${theme}.png`);
    }
  }

  await browser.close();
  console.log('TweetCard screenshots captured successfully!');
})();
