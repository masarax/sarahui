import { chromium } from 'playwright';
import path from 'node:path';

const artifactDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
const htmlPath = path.resolve('dist/index.html').replace(/\\/g, '/');

const componentNames = [
  'BentoGrid',
  'RetroGrid',
  'Confetti',
  'BlurFade',
  'RainbowButton',
  'WarpBackground',
  'NeonGradientCard',
  'LineShadowText',
  'AuroraText',
  'GlareHover',
  'CodeComparison',
  'FileTree',
  'Lens',
  'Pointer',
  'TweetCard',
  'AnimatedShinyText',
  'AnimatedGradientText',
  'Highlighter',
  'VideoText',
  'Text3DFlip'
];

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--allow-file-access-from-files']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: 'light'
  });
  const page = await context.newPage();

  // Initial navigation
  await page.goto(`file:///${htmlPath}`);
  await page.waitForLoadState('domcontentloaded');

  // Explicitly ensure light theme
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('sarahui-theme', 'light');
  });

  for (const name of componentNames) {
    const slug = name.toLowerCase();
    await page.evaluate((compName) => {
      location.hash = '#components/' + compName;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }, name);
    await page.waitForTimeout(600);

    const canvas = await page.$(`#preview-canvas-${slug}`);
    if (canvas) {
      const box = await canvas.boundingBox();
      if (box && box.width > 0 && box.height > 0) {
        const screenshotPath = path.join(artifactDir, `verify-${slug}-light.png`);
        await canvas.screenshot({ path: screenshotPath });
        console.log(`Captured verify-${slug}-light.png (${Math.round(box.width)}x${Math.round(box.height)})`);
      } else {
        console.warn(`Canvas for ${name} has invalid box:`, box);
      }
    } else {
      console.warn(`Canvas #preview-canvas-${slug} not found`);
    }
  }

  await browser.close();
  console.log('Finished capturing all verification screenshots.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

