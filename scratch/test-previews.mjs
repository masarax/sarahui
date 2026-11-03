import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const PORT = 8089;
const DIST_DIR = path.resolve('dist');
const brainDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.mjs': 'application/javascript',
      '.css': 'text/css',
      '.svg': 'image/svg+xml',
      '.json': 'application/json'
    };
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  // Navigate to #components/animatedbeam
  await page.goto(`http://localhost:${PORT}/#components/animatedbeam`);
  await page.waitForTimeout(1000);

  // Set dark theme
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.waitForTimeout(500);

  // 1. Capture Main Demo in Dark Mode
  const beamCard = page.locator('[data-component-name="AnimatedBeam"]');
  const mainDemo = beamCard.locator('.animated-beam-demo-container').first();
  if (await mainDemo.count() > 0) {
    await mainDemo.screenshot({ path: path.join(brainDir, 'beam-main-demo-dark.png') });
  }

  // 2. Capture all example variants in Dark Mode
  const exampleItems = beamCard.locator('.example-item');
  const count = await exampleItems.count();
  console.log('Found AnimatedBeam example items count:', count);
  for (let i = 0; i < count; i++) {
    const item = exampleItems.nth(i);
    await item.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await item.screenshot({ path: path.join(brainDir, `beam-variant-${i+1}-dark.png`) });
  }

  // Switch to Light Theme
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await page.waitForTimeout(500);

  // 3. Capture Main Demo in Light Mode
  if (await mainDemo.count() > 0) {
    await mainDemo.screenshot({ path: path.join(brainDir, 'beam-main-demo-light.png') });
  }

  // 4. Capture all example variants in Light Mode
  for (let i = 0; i < count; i++) {
    const item = exampleItems.nth(i);
    await item.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await item.screenshot({ path: path.join(brainDir, `beam-variant-${i+1}-light.png`) });
  }

  // 5. Check mobile viewport (width 390)
  await page.setViewportSize({ width: 390, height: 800 });
  await page.waitForTimeout(500);
  if (await mainDemo.count() > 0) {
    await mainDemo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await mainDemo.screenshot({ path: path.join(brainDir, 'beam-main-demo-mobile.png') });
  }

  // Also full page screenshot of the detail view
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.screenshot({ path: path.join(brainDir, 'beam-full-page-light.png'), fullPage: true });

  await browser.close();
  server.close();
  console.log('Screenshots completed!');
});

