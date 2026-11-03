import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const playwright = require('playwright');

const server = spawn(process.execPath, ['scripts/serve.mjs', '--no-build'], {
  env: {...process.env, PORT: '4185'},
  stdio: ['ignore', 'pipe', 'inherit']
});

try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Test server timed out')), 10000);
    server.stdout.on('data', s => {
      if (s.toString().includes('sarahUI ready')) {
        clearTimeout(timer);
        resolve();
      }
    });
  });

  const browser = await playwright.chromium.launch({headless: true});
  const page = await browser.newPage({viewport: {width: 1280, height: 800}});

  const url = 'http://127.0.0.1:4185';

  // 1. Visit Overview
  await page.goto(`${url}/#overview`);
  await page.waitForSelector('html[data-ready=true]');
  await page.waitForTimeout(300);

  let hasHideStyle = await page.evaluate(() => !!document.getElementById('s-smooth-cursor-hide-native'));
  let isDirectBody = await page.evaluate(() => {
    const c = document.querySelector('[data-s-smooth-cursor]');
    return c ? c.parentElement === document.body : false;
  });
  console.log('1. On #overview:');
  console.log('   hasHideStyle:', hasHideStyle);
  console.log('   isDirectBody:', isDirectBody);
  assert.equal(hasHideStyle, false, 'Hide style should not exist on #overview');
  assert.equal(isDirectBody, false, 'Container should not be direct child of body on #overview');

  // 2. Visit Components catalog
  await page.evaluate(() => { location.hash = 'components'; });
  await page.waitForTimeout(300);
  hasHideStyle = await page.evaluate(() => !!document.getElementById('s-smooth-cursor-hide-native'));
  isDirectBody = await page.evaluate(() => {
    const c = document.querySelector('[data-s-smooth-cursor]');
    return c ? c.parentElement === document.body : false;
  });
  console.log('2. On #components catalog:');
  console.log('   hasHideStyle:', hasHideStyle);
  console.log('   isDirectBody:', isDirectBody);
  assert.equal(hasHideStyle, false, 'Hide style should not exist on #components catalog');
  assert.equal(isDirectBody, false, 'Container should not be direct child of body on #components catalog');

  // 3. Visit Lens component
  await page.evaluate(() => { location.hash = 'components/Lens'; });
  await page.waitForTimeout(300);
  hasHideStyle = await page.evaluate(() => !!document.getElementById('s-smooth-cursor-hide-native'));
  isDirectBody = await page.evaluate(() => {
    const c = document.querySelector('[data-s-smooth-cursor]');
    return c ? c.parentElement === document.body : false;
  });
  console.log('3. On #components/Lens:');
  console.log('   hasHideStyle:', hasHideStyle);
  console.log('   isDirectBody:', isDirectBody);
  assert.equal(hasHideStyle, false, 'Hide style should not exist on #components/Lens');
  assert.equal(isDirectBody, false, 'Container should not be direct child of body on #components/Lens');

  // 4. Visit SmoothCursor component
  await page.evaluate(() => { location.hash = 'components/SmoothCursor'; });
  await page.waitForTimeout(300);
  hasHideStyle = await page.evaluate(() => !!document.getElementById('s-smooth-cursor-hide-native'));
  isDirectBody = await page.evaluate(() => {
    const c = document.querySelector('[data-s-smooth-cursor]');
    return c ? c.parentElement === document.body : false;
  });
  console.log('4. On #components/SmoothCursor:');
  console.log('   hasHideStyle:', hasHideStyle);
  console.log('   isDirectBody:', isDirectBody);
  assert.equal(hasHideStyle, true, 'Hide style MUST exist on #components/SmoothCursor');
  assert.equal(isDirectBody, true, 'Container MUST be direct child of body on #components/SmoothCursor');

  // Test mouse movement on SmoothCursor
  await page.mouse.move(500, 300);
  await page.waitForTimeout(100);
  const followerOpacity = await page.evaluate(() => {
    const el = document.querySelector('.s-smooth-cursor-follower');
    return el ? el.style.opacity : null;
  });
  console.log('   followerOpacity after mousemove:', followerOpacity);
  assert.equal(followerOpacity, '1');

  // 5. Navigate away to Lens
  await page.evaluate(() => { location.hash = 'components/Lens'; });
  await page.waitForTimeout(300);
  hasHideStyle = await page.evaluate(() => !!document.getElementById('s-smooth-cursor-hide-native'));
  isDirectBody = await page.evaluate(() => {
    const c = document.querySelector('[data-s-smooth-cursor]');
    return c ? c.parentElement === document.body : false;
  });
  console.log('5. Navigated away to #components/Lens:');
  console.log('   hasHideStyle:', hasHideStyle);
  console.log('   isDirectBody:', isDirectBody);
  assert.equal(hasHideStyle, false, 'Hide style must be removed when leaving SmoothCursor');
  assert.equal(isDirectBody, false, 'Container must be restored into card when leaving SmoothCursor');

  // 6. Navigate back to SmoothCursor
  await page.evaluate(() => { location.hash = 'components/SmoothCursor'; });
  await page.waitForTimeout(300);
  hasHideStyle = await page.evaluate(() => !!document.getElementById('s-smooth-cursor-hide-native'));
  isDirectBody = await page.evaluate(() => {
    const c = document.querySelector('[data-s-smooth-cursor]');
    return c ? c.parentElement === document.body : false;
  });
  console.log('6. Returned to #components/SmoothCursor:');
  console.log('   hasHideStyle:', hasHideStyle);
  console.log('   isDirectBody:', isDirectBody);
  assert.equal(hasHideStyle, true, 'Hide style must re-appear when returning to SmoothCursor');
  assert.equal(isDirectBody, true, 'Container must be direct child of body when returning to SmoothCursor');

  console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  await browser.close();
} finally {
  server.kill();
}
