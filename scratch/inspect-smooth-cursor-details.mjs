import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const port = 4195;
const host = '127.0.0.1';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let decoded;
  try { decoded = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  const target = path.resolve(dist, '.' + decoded + (decoded.endsWith('/') ? 'index.html' : ''));
  try {
    const real = fs.realpathSync(target);
    if (!real.startsWith(dist + path.sep) || !fs.statSync(real).isFile()) throw new Error('Invalid path');
    res.writeHead(200, { 'Content-Type': types[path.extname(real)] || 'application/octet-stream' });
    fs.createReadStream(real).pipe(res);
  } catch {
    const indexFile = path.join(dist, 'index.html');
    if (fs.existsSync(indexFile)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(indexFile).pipe(res);
      return;
    }
    res.writeHead(404); res.end('Not found');
  }
});

const artifactDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';

async function run() {
  await new Promise(resolve => server.listen(port, host, resolve));
  console.log(`Server listening at http://${host}:${port}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(`http://${host}:${port}/#components/SmoothCursor`);
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'smoothcursor-fullpage-dark.png'), fullPage: true });

  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'smoothcursor-fullpage-light.png'), fullPage: true });

  await browser.close();
  server.close();
  console.log('Screenshots captured!');
}

run().catch(err => {
  console.error(err);
  server.close();
});

