import { chromium } from 'playwright';
import path from 'node:path';

const artifactDir = 'C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86';
const htmlPath = path.resolve('dist/index.html').replace(/\\/g, '/');

const testComponents = [
  'AnimatedList',
  'Dock',
  'Globe',
  'OrbitingCircles',
  'Pointer',
  'SmoothCursor',
  'DottedMap',
  'AnimatedBeam',
  'MagicCard',
  'GlareHover',
  'Meteors',
  'Confetti',
  'Particles',
  'VideoText',
  'NumberTicker',
  'HyperText',
  'MorphingText',
  'Highlighter',
  'Text3DFlip',
  'RetroGrid',
  'Ripple',
  'WarpBackground',
  'Floating3DParticles',
  'InteractiveHoverButton',
  'RainbowButton',
  'ShimmerButton',
  'RippleButton',
  'PulsatingButton',
  'CoolMode',
  'FileTree',
  'CodeComparison',
  'ScrollProgress',
  'Backlight',
  'GlyphMatrix',
  'Safari',
  'Iphone',
  'Android',
  'Terminal',
  'BentoGrid',
  'BorderBeam',
  'ShineBorder',
  'BlurFade',
  'TextAnimate',
  'TypingAnimation',
  'LineShadowText',
  'AuroraText',
  'FlickeringGrid',
  'Button',
  'Input',
  'Tabs',
  'Dialog',
  'Accordion',
  'Card',
  'DataTable',
  'Spinner'
];

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--allow-file-access-from-files']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 }
  });
  const page = await context.newPage();

  await page.goto(`file:///${htmlPath}`);
  await page.waitForLoadState('domcontentloaded');

  for (const theme of ['light', 'dark']) {
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('sarahui-theme', t);
    }, theme);

    for (const name of testComponents) {
      const slug = name.toLowerCase();
      await page.evaluate((compName) => {
        location.hash = '#components/' + compName;
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }, name);
      await page.waitForTimeout(600);

      const card = await page.$(`.component-card.is-detail-active`);
      if (card) {
        const screenshotPath = path.join(artifactDir, `full-${slug}-${theme}.png`);
        await card.screenshot({ path: screenshotPath });
        console.log(`Captured full-${slug}-${theme}.png`);
      }
    }
  }

  await browser.close();
  console.log('Finished capturing all verification screenshots.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
