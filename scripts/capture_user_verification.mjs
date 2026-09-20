import { chromium } from 'playwright';
import path from 'node:path';

const artifactDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
const htmlPath = path.resolve('dist/index.html').replace(/\\/g, '/');

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--allow-file-access-from-files']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: 'light'
  });
  const page = await context.newPage();

  await page.goto(`file:///${htmlPath}#overview`);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);

  // 1. Sidebar deduplication verification
  await page.screenshot({ path: path.join(artifactDir, 'verify-sidebar-dedup-light.png') });
  console.log('Saved verify-sidebar-dedup-light.png');

  // 2. Marquee Component Page (Preview, TOC, Examples)
  await page.evaluate(() => { location.hash = '#components/Marquee'; });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(artifactDir, 'verify-marquee-page-light.png') });
  console.log('Saved verify-marquee-page-light.png');

  // 3. Marquee Code Tab with compact line height
  const codeTab = await page.$('#component-marquee .preview-tab[data-preview-tab="code"]');
  if (codeTab) {
    await codeTab.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactDir, 'verify-marquee-code-light.png') });
    console.log('Saved verify-marquee-code-light.png');
    // Switch back to preview
    const previewTab = await page.$('#component-marquee .preview-tab[data-preview-tab="preview"]');
    if (previewTab) await previewTab.click();
  }

  // 4. Scroll to Examples section showing Vertical and 3D
  await page.evaluate(() => {
    const exSec = document.querySelector('#sec-marquee-examples');
    if (exSec) exSec.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'verify-marquee-examples-light.png') });
  console.log('Saved verify-marquee-examples-light.png');

  // 5. Scroll to Props table
  await page.evaluate(() => {
    const propsSec = document.querySelector('#sec-marquee-props');
    if (propsSec) propsSec.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'verify-marquee-props-light.png') });
  console.log('Saved verify-marquee-props-light.png');

  // 6. BorderBeam Component (2 Border Beams, Reverse)
  await page.evaluate(() => { location.hash = '#components/BorderBeam'; });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    const exSec = document.querySelector('#sec-borderbeam-examples');
    if (exSec) exSec.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'verify-borderbeam-examples-light.png') });
  console.log('Saved verify-borderbeam-examples-light.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
