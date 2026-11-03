import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const port = 4188;
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

  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  // 1. Visit Catalog Overview (grid of cards)
  await page.goto(`http://${host}:${port}/#components`);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'catalog-grid-overview.png'), fullPage: false });

  // Evaluate all component cards in catalog mode
  const catalogAnalysis = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.component-card'));
    return cards.map(c => {
      const title = c.querySelector('h2')?.textContent?.trim();
      const rect = c.getBoundingClientRect();
      const preview = c.querySelector('.component-demo');
      const previewRect = preview ? preview.getBoundingClientRect() : null;
      return {
        name: c.dataset.componentName,
        category: c.dataset.componentCategory,
        title,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
        previewHeight: previewRect ? Math.round(previewRect.height) : 0,
        hasDetailSectionsVisible: c.querySelector('.component-detail-sections')?.offsetHeight > 0
      };
    });
  });

  console.log('Catalog Analysis Summary:');
  console.log('Total cards:', catalogAnalysis.length);
  const abnormal = catalogAnalysis.filter(c => c.rect.width === 0 || c.rect.height === 0 || c.hasDetailSectionsVisible);
  console.log('Abnormal in catalog mode:', abnormal);

  // Take screenshots of newly added cards & component cards
  const newComponents = [
    'BentoGrid',
    'NeonGradientCard',
    'TweetCard',
    'Lens',
    'SmoothCursor',
    'IconCloud',
    'DottedMap',
    'PixelImage',
    'GlyphMatrix',
    'Backlight',
    'WarpBackground',
    'Globe',
    'Terminal',
    'CodeComparison',
    'FileTree',
    'InteractiveGridPattern',
    'Meteors',
    'RetroGrid',
    'Ripple',
    'OrbitingCircles',
    'Particles',
    'ShineBorder',
    'BorderBeam',
    'AnimatedBeam',
    'RainbowButton',
    'PulsatingButton',
    'InteractiveHoverButton',
    'ScrollProgress',
    'AnimatedCircularProgressBar',
    'CoolMode',
    'NoiseTexture',
    'AnimatedList',
    'Marquee'
  ];

  for (const comp of newComponents) {
    await page.goto(`http://${host}:${port}/#components/${comp}`);
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(artifactDir, `inspect-comp-${comp.toLowerCase()}.png`),
      fullPage: false
    });
  }

  // Also check BentoGrid in full page
  await page.goto(`http://${host}:${port}/#components/BentoGrid`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'inspect-bentogrid-full.png'), fullPage: true });

  // Check TweetCard in full page
  await page.goto(`http://${host}:${port}/#components/TweetCard`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'inspect-tweetcard-full.png'), fullPage: true });

  // Check NeonGradientCard in full page
  await page.goto(`http://${host}:${port}/#components/NeonGradientCard`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'inspect-neongradientcard-full.png'), fullPage: true });

  await browser.close();
  server.close();
  console.log('All inspections complete!');
}

run().catch(err => {
  console.error(err);
  server.close();
});

