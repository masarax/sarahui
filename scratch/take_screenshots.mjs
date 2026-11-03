import { chromium } from 'playwright';
import path from 'node:path';

const outDir = 'C:\\Users\\Marketing\\.gemini\\antigravity\\brain\\b1852804-c4a7-4b37-a4c8-120b7a58db86';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  
  // Navigate to Button component detail
  await page.goto('http://localhost:4173/#components/Button', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Screenshot light mode Usage section
  const usageSection = page.locator('#sec-button-usage');
  if (await usageSection.count() > 0) {
    await usageSection.screenshot({ path: path.join(outDir, 'usage-copy-btn-light.png') });
  }
  
  // Full detail page screenshot light
  await page.screenshot({ path: path.join(outDir, 'button-detail-light.png') });
  
  // Switch to dark theme
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('sarah-docs-theme', 'dark');
  });
  await page.waitForTimeout(500);
  
  if (await usageSection.count() > 0) {
    await usageSection.screenshot({ path: path.join(outDir, 'usage-copy-btn-dark.png') });
  }
  
  await page.screenshot({ path: path.join(outDir, 'button-detail-dark.png') });

  // Let's also check OrbitingCircles component detail
  await page.goto('http://localhost:4173/#components/OrbitingCircles', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const usageOrbit = page.locator('#sec-orbitingcircles-usage');
  if (await usageOrbit.count() > 0) {
    await usageOrbit.screenshot({ path: path.join(outDir, 'usage-orbitingcircles-dark.png') });
  }
  
  await browser.close();
  console.log('Screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

