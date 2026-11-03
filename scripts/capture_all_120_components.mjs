import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const artifactDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
const htmlPath = path.resolve('dist/index.html').replace(/\\/g, '/');

async function run() {
  const catalogMod = await import('../apps/docs/catalog.mjs');
  const catalog = catalogMod.catalog;

  console.log(`Starting visual audit of all ${catalog.length} components...`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--allow-file-access-from-files']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1080 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  await page.goto(`file:///${htmlPath}`);
  await page.waitForLoadState('domcontentloaded');

  const auditReport = [];

  for (let i = 0; i < catalog.length; i++) {
    const item = catalog[i];
    const name = item.name;
    const slug = name.toLowerCase();

    // Test in Dark Mode (primary showcase theme)
    await page.evaluate((compName) => {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('sarahui-theme', 'dark');
      location.hash = '#components/' + compName;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }, name);

    await page.waitForTimeout(300);

    const card = await page.$(`.component-card.is-detail-active`);
    let heroBox = null;
    let variantsCount = 0;

    if (card) {
      const heroPreview = await card.$('.component-preview-box');
      if (heroPreview) {
        const box = await heroPreview.boundingBox();
        if (box && box.width > 0 && box.height > 0) {
          heroBox = { width: Math.round(box.width), height: Math.round(box.height) };
        }
      }

      const variantItems = await card.$$('.example-item');
      variantsCount = variantItems.length;

      const screenshotDarkPath = path.join(artifactDir, `component-${String(i + 1).padStart(3, '0')}-${slug}-dark.png`);
      await card.screenshot({ path: screenshotDarkPath });

      // Test in Light Mode
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('sarahui-theme', 'light');
      });
      await page.waitForTimeout(100);
      const screenshotLightPath = path.join(artifactDir, `component-${String(i + 1).padStart(3, '0')}-${slug}-light.png`);
      await card.screenshot({ path: screenshotLightPath });

      // Reset back to Dark Mode
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('sarahui-theme', 'dark');
      });
    }

    auditReport.push({
      index: i + 1,
      name,
      category: item.group,
      hasCard: !!card,
      heroBox,
      variantsCount,
      errorsSinceLast: consoleErrors.length
    });

    if ((i + 1) % 15 === 0 || i === catalog.length - 1) {
      console.log(`Audited & captured ${i + 1} / ${catalog.length} components...`);
    }
  }

  await browser.close();

  fs.writeFileSync('scripts/audit_120_report.json', JSON.stringify({
    total: catalog.length,
    timestamp: new Date().toISOString(),
    consoleErrors,
    report: auditReport
  }, null, 2));

  console.log(`Finished visual audit of all ${catalog.length} components. Total console errors: ${consoleErrors.length}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

