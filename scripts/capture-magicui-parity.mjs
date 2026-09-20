import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const outDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.png': 'image/png'
};

function startServer() {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0].split('#')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(distDir, reqPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function run() {
  const { server, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log('Static server started at', baseUrl);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 2
  });

  // Open overview and set dark theme
  await page.goto(baseUrl + '/#overview', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    window.dispatchEvent(new CustomEvent('sarah:themechange', { detail: { theme: 'dark', preference: 'dark' } }));
  });
  await page.waitForTimeout(300);

  const targets = [
    { hash: '#overview', name: 'full-overview-dark.png' },
    { hash: '#start', name: 'full-start-dark.png' },
    { hash: '#foundations', name: 'full-foundations-dark.png' },
    { hash: '#components', name: 'full-components-dark.png' },
    { hash: '#components/ShineBorder', name: 'full-shineborder-dark.png' },
    { hash: '#components/BorderBeam', name: 'full-borderbeam-dark.png' },
    { hash: '#components/Dock', name: 'full-dock-dark.png' },
    { hash: '#components/Marquee', name: 'full-marquee-dark.png' },
    { hash: '#components/Meteors', name: 'full-meteors-dark.png' },
    { hash: '#components/BentoGrid', name: 'full-bentogrid-dark.png' },
    { hash: '#components/Terminal', name: 'full-terminal-dark.png' },
    { hash: '#components/TweetCard', name: 'full-tweetcard-dark.png' },
    { hash: '#patterns', name: 'full-patterns-dark.png' }
  ];

  for (const t of targets) {
    console.log('Capturing', t.hash, '->', t.name);
    await page.goto(baseUrl + '/' + t.hash, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outDir, t.name),
      fullPage: false
    });
  }

  // Also capture light theme
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
    window.dispatchEvent(new CustomEvent('sarah:themechange', { detail: { theme: 'light', preference: 'light' } }));
  });
  await page.waitForTimeout(300);

  console.log('Capturing #overview (light)');
  await page.goto(baseUrl + '/#overview', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'full-overview-light.png'), fullPage: false });

  console.log('Capturing #components/ShineBorder (light)');
  await page.goto(baseUrl + '/#components/ShineBorder', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'full-shineborder-light.png'), fullPage: false });

  await browser.close();
  server.close();
  console.log('All screenshots captured successfully in', outDir);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
