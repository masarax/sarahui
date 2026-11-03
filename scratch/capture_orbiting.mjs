import { chromium } from 'playwright';
import path from 'node:path';

const outDir = 'C:\\Users\\Marketing\\.gemini\\antigravity\\brain\\b1852804-c4a7-4b37-a4c8-120b7a58db86';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  
  // Navigate to OrbitingCircles
  await page.goto('http://localhost:4173/#components/OrbitingCircles', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Screenshot light mode stage
  const demoBox = page.locator('.is-detail-active .component-preview-box');
  if (await demoBox.count() > 0) {
    await demoBox.first().screenshot({ path: path.join(outDir, 'orbiting-circles-preview-light.png') });
  }
  
  // Switch to dark theme
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('sarah-docs-theme', 'dark');
  });
  await page.waitForTimeout(500);
  
  if (await demoBox.count() > 0) {
    await demoBox.first().screenshot({ path: path.join(outDir, 'orbiting-circles-preview-dark.png') });
  }
  
  await browser.close();
  console.log('OrbitingCircles screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

