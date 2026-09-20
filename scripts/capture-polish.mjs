import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const playwright = require('playwright');

const ARTIFACT_DIR = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
const PORT = '4185';
const server = spawn(process.execPath, ['scripts/serve.mjs', '--no-build'], {
  env: { ...process.env, PORT },
  stdio: ['ignore', 'pipe', 'inherit']
});

try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Server timeout')), 10000);
    server.stdout.on('data', s => {
      if (s.toString().includes('sarahUI ready')) {
        clearTimeout(timer);
        resolve();
      }
    });
  });

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 950 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  const base = `http://127.0.0.1:${PORT}`;

  const shot = async (name, fullPage = false) => {
    const p = path.join(ARTIFACT_DIR, `${name}.png`);
    await page.screenshot({ path: p, fullPage });
    console.log(`Saved screenshot: ${name}.png`);
  };

  // 1. Desktop Overview - Dark
  await page.goto(`${base}/#overview`);
  await page.waitForSelector('html[data-ready=true]');
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await shot('magicui-polished-overview-dark');

  // 2. Desktop Overview - Light
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  await shot('magicui-polished-overview-light');

  // 3. Getting Started - Dark
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    location.hash = '#start';
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  await shot('magicui-polished-getstarted-dark');

  // 4. Foundations - Dark
  await page.evaluate(() => {
    location.hash = '#foundations';
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  await shot('magicui-polished-foundations-dark');

  // 5. Component Detail with Shiki Code Syntax - Dark
  await page.evaluate(() => {
    location.hash = '#components/ShineBorder';
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  // Switch to Code Tab
  const codeTab = page.locator('#component-shineborder [data-tab-type="code"]');
  if (await codeTab.count()) {
    await codeTab.click();
    await page.waitForTimeout(300);
  }
  await shot('magicui-shiki-code-dark');

  // 6. Component Detail with Shiki Code Syntax - Light
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
  });
  await page.waitForTimeout(300);
  await shot('magicui-shiki-code-light');

  // 7. ShineBorder Preview - Dark
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
  });
  const previewTab = page.locator('#component-shineborder [data-tab-type="preview"]');
  if (await previewTab.count()) {
    await previewTab.click();
    await page.waitForTimeout(300);
  }
  await shot('magicui-polished-shineborder-dark');

  await browser.close();
} finally {
  server.kill();
}

