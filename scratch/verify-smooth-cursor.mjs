import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';

const artifactDir = 'C:\\Users\\Marketing\\.gemini\\antigravity\\brain\\b1852804-c4a7-4b37-a4c8-120b7a58db86';
const server = spawn('node', ['scripts/serve.mjs', '--no-build'], {
  cwd: 'd:\\Nazmus Sakib\\sarahui',
  env: { ...process.env, PORT: '4189' },
  stdio: ['ignore', 'pipe', 'inherit']
});

try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Test server timeout')), 10000);
    server.stdout.on('data', s => {
      if (s.toString().includes('sarahUI ready')) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.on('error', reject);
  });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  // 1. Dark mode
  await page.goto('http://127.0.0.1:4189/#components/SmoothCursor');
  await page.waitForSelector('html[data-ready=true]');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(400);

  // Move mouse outside the preview box (e.g. at header / navigation area)
  await page.mouse.move(200, 100);
  await page.waitForTimeout(50);
  await page.mouse.move(500, 180, { steps: 15 });
  await page.waitForTimeout(150);

  // Take screenshot showing smooth cursor floating outside box on the page
  await page.screenshot({ path: path.join(artifactDir, 'smooth-cursor-outside-dark.png'), fullPage: false });

  // Move mouse inside the preview box
  const cursorBox = page.locator('.s-smooth-cursor-box').first();
  await cursorBox.scrollIntoViewIfNeeded();
  const box = await cursorBox.boundingBox();
  console.log('Cursor box bounding box:', box);

  if (box) {
    // Move into the box
    await page.mouse.move(box.x + 80, box.y + 80);
    await page.waitForTimeout(50);
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5, { steps: 20 });
    await page.waitForTimeout(150);

    await cursorBox.screenshot({ path: path.join(artifactDir, 'smooth-cursor-hover-dark.png') });
    await page.screenshot({ path: path.join(artifactDir, 'smooth-cursor-fullpage-dark.png'), fullPage: true });
  }

  // 2. Light mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.waitForTimeout(300);

  if (box) {
    await page.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.38, { steps: 15 });
    await page.waitForTimeout(150);
    await cursorBox.screenshot({ path: path.join(artifactDir, 'smooth-cursor-hover-light.png') });
    await page.screenshot({ path: path.join(artifactDir, 'smooth-cursor-fullpage-light.png'), fullPage: true });
  }

  console.log('SmoothCursor screenshots captured successfully');
  await browser.close();
} finally {
  server.kill();
}


