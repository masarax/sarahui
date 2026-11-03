import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';

const artifactDir = 'C:\\Users\\Marketing\\.gemini\\antigravity\\brain\\b1852804-c4a7-4b37-a4c8-120b7a58db86';
const server = spawn('node', ['scripts/serve.mjs', '--no-build'], {
  cwd: 'd:\\Nazmus Sakib\\sarahui',
  env: { ...process.env, PORT: '4188' },
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

  await page.goto('http://127.0.0.1:4188/#components/Lens');
  await page.waitForSelector('html[data-ready=true]');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(500);

  // Full page screenshot in dark mode
  await page.screenshot({ path: path.join(artifactDir, 'lens-fullpage-dark.png'), fullPage: true });

  // Full page screenshot in light mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'lens-fullpage-light.png'), fullPage: true });

  console.log('Full page screenshots captured successfully');
  await browser.close();
} finally {
  server.kill();
}

