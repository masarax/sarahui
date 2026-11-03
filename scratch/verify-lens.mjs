import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';

const artifactDir = 'C:\\Users\\Marketing\\.gemini\\antigravity\\brain\\b1852804-c4a7-4b37-a4c8-120b7a58db86';
const server = spawn('node', ['scripts/serve.mjs', '--no-build'], {
  cwd: 'd:\\Nazmus Sakib\\sarahui',
  env: { ...process.env, PORT: '4186' },
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
  await page.goto('http://127.0.0.1:4186/#components/Lens');
  await page.waitForSelector('html[data-ready=true]');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(500);

  // Take full detail screenshot in dark mode
  await page.screenshot({ path: path.join(artifactDir, 'lens-detail-dark.png'), fullPage: false });

  // Hover over the lens container to test magnification interaction
  const lensTarget = page.locator('.s-lens-container').first();
  await lensTarget.scrollIntoViewIfNeeded();
  const box = await lensTarget.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.6);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(artifactDir, 'lens-hover-dark.png'), fullPage: false });
  }

  // Scroll down to Examples section and capture it
  const examplesSection = page.locator('#examples, [data-s-tab]').first();
  if (await examplesSection.count() > 0) {
    await examplesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(artifactDir, 'lens-examples-dark.png'), fullPage: false });
  }

  // 2. Light mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.waitForTimeout(400);

  await page.screenshot({ path: path.join(artifactDir, 'lens-detail-light.png'), fullPage: false });

  console.log('Screenshots captured successfully');
  await browser.close();
} finally {
  server.kill();
}

