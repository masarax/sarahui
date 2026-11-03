import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const distDir = path.resolve('dist');
const outDir = 'C:\\Users\\Marketing\\.gemini\\antigravity\\brain\\b1852804-c4a7-4b37-a4c8-120b7a58db86';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function createServer() {
  return http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url.split('?')[0].split('#')[0]);
    if (filePath === distDir || filePath.endsWith(path.sep)) {
      filePath = path.join(distDir, 'index.html');
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (err) {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

async function run() {
  const server = createServer();
  await new Promise((resolve) => server.listen(4321, resolve));
  console.log('Server started on port 4321');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  // 1. Navigate to IconCloud
  await page.goto('http://localhost:4321/#components/IconCloud', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Take screenshot in Light Mode
  const cloudCard = page.locator('.is-detail-active');
  await cloudCard.screenshot({ path: path.join(outDir, 'icon-cloud-detail-light.png') });

  // Switch to dark theme
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');
  });
  await page.waitForTimeout(1500);

  // Take screenshot in Dark Mode
  await cloudCard.screenshot({ path: path.join(outDir, 'icon-cloud-detail-dark.png') });

  // Focus on preview canvas
  const previewBox = page.locator('.is-detail-active .component-preview-box').first();
  await previewBox.screenshot({ path: path.join(outDir, 'icon-cloud-preview-dark.png') });

  await browser.close();
  server.close();
  console.log('IconCloud screenshots captured successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
