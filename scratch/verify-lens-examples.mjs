import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';

const artifactDir = 'C:\\Users\\Marketing\\.gemini\\antigravity\\brain\\b1852804-c4a7-4b37-a4c8-120b7a58db86';
const server = spawn('node', ['scripts/serve.mjs', '--no-build'], {
  cwd: 'd:\\Nazmus Sakib\\sarahui',
  env: { ...process.env, PORT: '4187' },
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
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  await page.goto('http://127.0.0.1:4187/#components/Lens');
  await page.waitForSelector('html[data-ready=true]');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(500);

  // Scroll down to show the Examples section
  await page.evaluate(() => window.scrollBy(0, 950));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'lens-examples-dark.png'), fullPage: false });

  // Switch to Static Lens tab
  const staticTab = page.locator('button:has-text("Static Lens"), [role="tab"]:has-text("Static Lens")').first();
  if (await staticTab.count() > 0) {
    await staticTab.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactDir, 'lens-static-tab-dark.png'), fullPage: false });
  }

  // Switch to Default Position tab
  const defPosTab = page.locator('button:has-text("Lens with a Default Position"), [role="tab"]:has-text("Lens with a Default Position")').first();
  if (await defPosTab.count() > 0) {
    await defPosTab.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactDir, 'lens-defaultpos-tab-dark.png'), fullPage: false });
  }

  console.log('All example tabs captured successfully');
  await browser.close();
} finally {
  server.kill();
}

