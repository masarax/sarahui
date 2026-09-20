import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

const distDir = path.resolve('dist');

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(4174, async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const artifactsDir = 'C:\\Users\\Marketing\\.gemini\\antigravity\\brain\\b1852804-c4a7-4b37-a4c8-120b7a58db86';

  const capture = async (hash, filename, isDark = true) => {
    await page.goto(`http://localhost:4174/${hash}`);
    await page.waitForTimeout(600);
    if (isDark) {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
      });
    } else {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.setAttribute('data-theme', 'light');
      });
    }
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactsDir, filename), fullPage: true });
    console.log(`Saved: ${filename}`);
  };

  await capture('#overview', 'full-overview-dark.png', true);
  await capture('#start', 'full-start-dark.png', true);
  await capture('#foundations', 'full-foundations-dark.png', true);
  await capture('#patterns', 'full-patterns-dark.png', true);
  await capture('#components', 'full-components-dark.png', true);
  await capture('#components/ShineBorder', 'full-shineborder-dark.png', true);
  await capture('#components/BorderBeam', 'full-borderbeam-dark.png', true);
  await capture('#components/Dock', 'full-dock-dark.png', true);

  await browser.close();
  server.close();
});
