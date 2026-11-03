import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const playwright = require('playwright');

const server = spawn(process.execPath, ['scripts/serve.mjs', '--no-build'], {
  env: {...process.env, PORT: '4186'},
  stdio: ['ignore', 'pipe', 'inherit']
});

try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Server timed out')), 10000);
    server.stdout.on('data', s => {
      if (s.toString().includes('sarahUI ready')) {
        clearTimeout(timer);
        resolve();
      }
    });
  });

  const browser = await playwright.chromium.launch({headless: true});
  const page = await browser.newPage({viewport: {width: 1440, height: 1800}});

  const url = 'http://127.0.0.1:4186';
  await page.goto(`${url}/#components/SmoothCursor`);
  await page.waitForSelector('html[data-ready=true]');
  await page.waitForTimeout(500);

  // Check section elements exist
  const hidingCursorSec = await page.locator('#sec-smoothcursor-hiding-cursor').count();
  const springConfigSec = await page.locator('#sec-smoothcursor-spring-config').count();
  const browserSupportSec = await page.locator('#sec-smoothcursor-browser-support').count();
  const accessibilitySec = await page.locator('#sec-smoothcursor-accessibility').count();
  const creditsSec = await page.locator('#sec-smoothcursor-credits').count();

  console.log('Sections check:');
  console.log('hidingCursorSec:', hidingCursorSec);
  console.log('springConfigSec:', springConfigSec);
  console.log('browserSupportSec:', browserSupportSec);
  console.log('accessibilitySec:', accessibilitySec);
  console.log('creditsSec:', creditsSec);

  assert.equal(hidingCursorSec, 1);
  assert.equal(springConfigSec, 1);
  assert.equal(browserSupportSec, 1);
  assert.equal(accessibilitySec, 1);
  assert.equal(creditsSec, 1);

  // Take screenshot of dark mode
  await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
  await page.screenshot({path: 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/smooth-cursor-docs-dark.png', fullPage: true});

  // Take screenshot of light mode
  await page.evaluate(() => document.documentElement.dataset.theme = 'light');
  await page.screenshot({path: 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/smooth-cursor-docs-light.png', fullPage: true});

  console.log('Screenshots saved successfully!');
  await browser.close();
} finally {
  server.kill();
}
