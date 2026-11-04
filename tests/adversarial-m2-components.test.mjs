import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Entry points under test
import * as RootPkg from '../packages/ui/src/index.js';
import * as TemplatesPkg from '../packages/ui/src/templates.js';
import * as ComponentsPkg from '../packages/ui/src/components/index.js';

// The 21 audited components in Milestone 2
const AUDITED_COMPONENTS = [
  'Marquee',
  'Terminal',
  'HeroVideoDialog',
  'BentoGrid',
  'AnimatedList',
  'Dock',
  'Globe',
  'TweetCard',
  'OrbitingCircles',
  'AvatarCircles',
  'IconCloud',
  'Lens',
  'Pointer',
  'SmoothCursor',
  'ProgressiveBlur',
  'DottedMap',
  'AnimatedBeam',
  'BorderBeam',
  'ShineBorder',
  'MagicCard',
  'GlareHover'
];

describe('Adversarial Challenger Suite 1: Entry Point Uniformity & Re-Export Architecture', () => {
  it('all 21 audited components are exported as functions from packages/ui/src/index.js', () => {
    for (const name of AUDITED_COMPONENTS) {
      assert.equal(typeof RootPkg[name], 'function', `RootPkg should export ${name} as a function`);
    }
  });

  it('all 21 audited components are exported as functions from packages/ui/src/templates.js', () => {
    for (const name of AUDITED_COMPONENTS) {
      assert.equal(typeof TemplatesPkg[name], 'function', `TemplatesPkg should export ${name} as a function`);
    }
  });

  it('all 21 audited components are exported as functions from packages/ui/src/components/index.js', () => {
    for (const name of AUDITED_COMPONENTS) {
      assert.equal(typeof ComponentsPkg[name], 'function', `ComponentsPkg should export ${name} as a function`);
    }
  });

  it('verifies BentoCard is exported alongside BentoGrid across all relevant module barrels', async () => {
    // 1. Direct component barrel
    const bentoDir = await import('../packages/ui/src/components/BentoGrid/index.js');
    assert.equal(typeof bentoDir.BentoGrid, 'function', 'BentoGrid/index.js must export BentoGrid');
    assert.equal(typeof bentoDir.BentoCard, 'function', 'BentoGrid/index.js must export BentoCard');

    // 2. Components master aggregator
    assert.equal(typeof ComponentsPkg.BentoGrid, 'function', 'components/index.js must export BentoGrid');
    assert.equal(typeof ComponentsPkg.BentoCard, 'function', 'components/index.js must export BentoCard');

    // 3. Templates barrel
    assert.equal(typeof TemplatesPkg.BentoGrid, 'function', 'templates.js must export BentoGrid');
    assert.equal(typeof TemplatesPkg.BentoCard, 'function', 'templates.js must export BentoCard');

    // 4. Root barrel
    assert.equal(typeof RootPkg.BentoGrid, 'function', 'index.js must export BentoGrid');
    assert.equal(typeof RootPkg.BentoCard, 'function', 'index.js must export BentoCard');
  });

  it('verifies AnimatedSpan is exported alongside Terminal across all relevant module barrels', async () => {
    const termDir = await import('../packages/ui/src/components/Terminal/index.js');
    assert.equal(typeof termDir.Terminal, 'function', 'Terminal/index.js must export Terminal');
    assert.equal(typeof termDir.AnimatedSpan, 'function', 'Terminal/index.js must export AnimatedSpan');

    assert.equal(typeof ComponentsPkg.AnimatedSpan, 'function', 'components/index.js must export AnimatedSpan');
    assert.equal(typeof TemplatesPkg.AnimatedSpan, 'function', 'templates.js must export AnimatedSpan');
    assert.equal(typeof RootPkg.AnimatedSpan, 'function', 'index.js must export AnimatedSpan');
  });

  it('each of the 21 audited component directories contains the mandatory 6-file suite', () => {
    const baseDir = path.resolve('packages/ui/src/components');
    const requiredFiles = (comp) => [
      'index.js',
      `${comp}.js`,
      `${comp}.d.ts`,
      'styles.css',
      `${comp}.test.mjs`,
      'README.md'
    ];

    for (const comp of AUDITED_COMPONENTS) {
      const dir = path.join(baseDir, comp);
      assert.ok(fs.existsSync(dir), `Directory packages/ui/src/components/${comp} must exist`);
      for (const file of requiredFiles(comp)) {
        const filePath = path.join(dir, file);
        assert.ok(fs.existsSync(filePath), `File ${filePath} must exist`);
        const stat = fs.statSync(filePath);
        assert.ok(stat.size > 0, `File ${filePath} must not be empty (size=${stat.size})`);
      }
    }
  });

  it('the master components barrel re-exports exactly all 120 modular component directories', () => {
    const baseDir = path.resolve('packages/ui/src/components');
    const entries = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
    assert.equal(entries.length, 120, 'packages/ui/src/components must contain exactly 120 component directories');

    // Verify each directory has an index.js
    for (const dir of entries) {
      const idxPath = path.join(baseDir, dir, 'index.js');
      assert.ok(fs.existsSync(idxPath), `Directory ${dir} must have an index.js`);
    }
  });

  it('renders components identically from individual component path vs root barrel', async () => {
    for (const comp of AUDITED_COMPONENTS) {
      const compModule = await import(`../packages/ui/src/components/${comp}/index.js`);
      const directHtml = compModule[comp]().toString();
      const rootHtml = RootPkg[comp]().toString();
      assert.ok(directHtml.length > 0, `${comp} direct render should produce markup`);
      assert.ok(rootHtml.length > 0, `${comp} root render should produce markup`);
      // Structural tags should match
      const directTag = directHtml.match(/^<([a-z0-9-]+)/i)?.[1];
      const rootTag = rootHtml.match(/^<([a-z0-9-]+)/i)?.[1];
      assert.equal(directTag, rootTag, `${comp} should render the same root element tag name`);
    }
  });
});

describe('Adversarial Challenger Suite 2: Dynamic Inline CSS Variables Injection Under Hostile Values', () => {
  it('GlareHover handles extreme negative angles, zero duration, extreme size, and complex RGBA colors', () => {
    const rendered = RootPkg.GlareHover({
      angle: -180,
      duration: 0,
      size: 5000,
      color: 'rgba(255, 99, 71, 0.65)',
      opacity: 0,
      width: '100vw',
      height: 0
    }).toString();

    assert.ok(rendered.includes('--gh-angle:-180deg;'), 'Should inject negative angle in deg');
    assert.ok(rendered.includes('--gh-duration:0ms;'), 'Should inject zero duration in ms');
    assert.ok(rendered.includes('--gh-size:5000%;'), 'Should inject extreme size in %');
    assert.ok(rendered.includes('--gh-color:rgba(255, 99, 71, 0.65);'), 'Should inject complex RGBA color');
    assert.ok(rendered.includes('--gh-opacity:0;'), 'Should inject zero opacity');
    assert.ok(rendered.includes('width:100vw;'), 'Should inject custom width unit');
    assert.ok(rendered.includes('height:0px;'), 'Should inject zero height with px unit');
  });

  it('GlareHover neutralizes malicious style attribute breakout attempts', () => {
    const hostileRender = RootPkg.GlareHover({
      color: 'red; background: url("evil.png"); --injected: "><script>alert(1)</script>',
      angle: -45
    }).toString();

    assert.ok(!hostileRender.includes('<script>alert(1)</script>'), 'Hostile script tag must not be rendered raw');
    assert.ok(hostileRender.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'Angle brackets in style variable must be escaped');
    assert.ok(hostileRender.includes('&quot;&gt;&lt;script&gt;'), 'Quotes must be escaped to &quot; preventing attribute breakout');
  });

  it('BorderBeam correctly binds negative offsets, zero duration, and complex gradient color stops', () => {
    const rendered = RootPkg.BorderBeam({
      initialOffset: -50,
      duration: 0,
      delay: -2.5,
      size: 150,
      borderWidth: 0,
      colorFrom: 'rgba(255, 0, 128, 0.9)',
      colorTo: 'color-mix(in srgb, #9c40ff 60%, transparent)',
      style: '--custom-var: 42px'
    }).toString();

    assert.ok(rendered.includes('--initial-offset:-50%'), 'Should format negative initial-offset');
    assert.ok(rendered.includes('--duration:0s'), 'Should format zero duration in seconds');
    assert.ok(rendered.includes('--delay:-2.5s'), 'Should format negative delay in seconds');
    assert.ok(rendered.includes('--border-beam-width:0px'), 'Should format zero border width');
    assert.ok(rendered.includes('--color-from:rgba(255, 0, 128, 0.9)'), 'Should bind complex RGBA colorFrom');
    assert.ok(rendered.includes('--color-to:color-mix(in srgb, #9c40ff 60%, transparent)'), 'Should bind color-mix colorTo');
    assert.ok(rendered.includes('--custom-var: 42px'), 'Should preserve custom user styles');
  });

  it('ShineBorder cleanly handles multi-stop color arrays and positive boundary dimensions', () => {
    const colors = ['#ff0055', 'rgba(0, 150, 255, 0.8)', 'var(--s-color-brand)'];
    const rendered = RootPkg.ShineBorder({
      borderWidth: 2,
      duration: 0.5,
      shineColor: colors
    }).toString();

    assert.ok(rendered.includes('border-width:2px;'), 'Should set border-width:2px');
    assert.ok(rendered.includes('--border-width:2px;'), 'Should set --border-width:2px');
    assert.ok(rendered.includes('--shine-duration:0.5s;'), 'Should set fractional --shine-duration:0.5s');
    assert.ok(rendered.includes('--duration:0.5s;'), 'Should set fractional --duration:0.5s');
    assert.ok(rendered.includes('--shine-color:#ff0055,rgba(0, 150, 255, 0.8),var(--s-color-brand);'), 'Should format comma-delimited multi-color stops');

    // Zero fallback test: borderWidth=0 falls back safely to default 1px rather than crashing
    const fallbackRender = RootPkg.ShineBorder({ borderWidth: 0, duration: 0 }).toString();
    assert.ok(fallbackRender.includes('border-width:1px;'), 'Zero borderWidth falls back safely to 1px');
    assert.ok(fallbackRender.includes('--shine-duration:14s;'), 'Zero duration falls back safely to 14s');
  });

  it('AnimatedBeam handles negative curvature, zero delay, fractional duration, and custom SVG paths', () => {
    const renderedCurved = RootPkg.AnimatedBeam({
      curvature: -80,
      startX: 10,
      startY: 50,
      endX: 200,
      endY: 50,
      duration: 1.5,
      delay: 0,
      gradientStartColor: 'rgba(255, 170, 64, 0.8)',
      gradientStopColor: '#9c40ff'
    }).toString();

    assert.ok(renderedCurved.includes('--beam-duration:1.5s;--beam-delay:0s;'), 'Should bind fractional duration and zero delay');
    // Quadratic bezier with negative curvature: midX = (10+200)/2 = 105, controlY = 50 - (-80) = 130
    assert.ok(renderedCurved.includes('M 10 50 Q 105 130 200 50'), 'Should calculate quadratic curve with negative curvature correctly');

    const renderedCustom = RootPkg.AnimatedBeam({
      d: 'M 0 0 C 20 40, 60 40, 80 0'
    }).toString();
    assert.ok(renderedCustom.includes('d="M 0 0 C 20 40, 60 40, 80 0"'), 'Should prioritize explicit custom path definition d');
  });

  it('OrbitingCircles clamps negative radius and computes duration from speed accurately', () => {
    const rendered = RootPkg.OrbitingCircles({
      radius: -100, // Should clamp to minimum 10
      duration: 60,
      speed: 3,     // 60 / 3 = 20
      delay: -5,
      iconSize: 10  // Clamps to min 12
    }).toString();

    assert.ok(rendered.includes('--radius:10;'), 'Should clamp negative radius to minimum 10');
    assert.ok(rendered.includes('--duration:20;'), 'Should calculate duration / speed = 20');
    assert.ok(rendered.includes('--delay:-5;'), 'Should format negative delay');
    assert.ok(rendered.includes('--icon-size:12px;'), 'Should clamp icon-size to minimum 12px');
  });

  it('Marquee handles numeric speed, zero repeat, and custom gap with CSS variables', () => {
    const rendered = RootPkg.Marquee({
      speed: 0, // Fallback to 40s
      gap: 'var(--s-spacing-32)',
      repeat: 1 // Clamped to min 2
    }).toString();

    assert.ok(rendered.includes('--gap:var(--s-spacing-32);'), 'Should bind CSS variable gap');
    assert.ok(rendered.includes('--s-gap:var(--s-spacing-32);'), 'Should bind --s-gap alias');
    assert.ok(rendered.includes('--duration:0s;'), 'Should format zero speed as 0s');
    const tracks = rendered.match(/class="s-marquee-track"/g);
    assert.equal(tracks?.length, 2, 'Should clamp repeat to minimum 2 tracks');
  });

  it('BentoGrid binds dynamic column count and BentoCard binds grid placement bounds', () => {
    const grid = RootPkg.BentoGrid({
      cols: 5,
      className: 'my-custom-grid'
    }).toString();
    assert.ok(grid.includes('--bento-cols:5;'), 'Should bind --bento-cols variable');
    assert.ok(grid.includes('my-custom-grid'), 'Should preserve custom dynamic class');

    const card = RootPkg.BentoCard({
      colSpan: 3,
      rowSpan: 2,
      colStart: 1,
      rowStart: 2,
      colEnd: 4,
      rowEnd: 4,
      className: 'hover:border-brand'
    }).toString();

    assert.ok(card.includes('s-bento-card--col-3'), 'Should include colSpan class');
    assert.ok(card.includes('s-bento-card--row-2'), 'Should include rowSpan class');
    assert.ok(card.includes('s-bento-card--col-start-1'), 'Should include colStart class');
    assert.ok(card.includes('s-bento-card--row-start-2'), 'Should include rowStart class');
    assert.ok(card.includes('s-bento-card--col-end-4'), 'Should include colEnd class');
    assert.ok(card.includes('s-bento-card--row-end-4'), 'Should include rowEnd class');
    assert.ok(card.includes('hover:border-brand'), 'Should preserve dynamic Tailwind utility class');
  });

  it('MagicCard binds all glow and gradient styling variables under boundary values', () => {
    const card = RootPkg.MagicCard({
      glowAngle: -90,
      glowOpacity: 0,
      glowBlur: 0,
      glowSize: 9999,
      gradientSize: 0,
      gradientOpacity: 1,
      gradientColor: 'rgba(100, 200, 255, 0.5)'
    }).toString();

    assert.ok(card.includes('--glow-angle:-90deg'), 'Should format negative glow angle');
    assert.ok(card.includes('--glow-opacity:0'), 'Should format zero glow opacity');
    assert.ok(card.includes('--glow-blur:0px'), 'Should format zero glow blur');
    assert.ok(card.includes('--glow-size:9999px'), 'Should format extreme glow size');
    assert.ok(card.includes('--gradient-size:0px'), 'Should format zero gradient size');
    assert.ok(card.includes('--gradient-opacity:1'), 'Should format full gradient opacity');
    assert.ok(card.includes('--magic-color:rgba(100, 200, 255, 0.5)'), 'Should format RGBA magic color');
  });
});

describe('Adversarial Challenger Suite 3: Adversarial Edge Cases & Boundary Conditions', () => {
  it('all 21 components survive invocation with empty object ({}) without throwing', () => {
    for (const comp of AUDITED_COMPONENTS) {
      assert.doesNotThrow(() => {
        const out = RootPkg[comp]({});
        assert.ok(out != null, `${comp}({}) must return a valid output`);
      }, `${comp}({}) should not throw`);
    }
  });

  it('all 21 components survive invocation with no arguments () without throwing', () => {
    for (const comp of AUDITED_COMPONENTS) {
      assert.doesNotThrow(() => {
        const out = RootPkg[comp]();
        assert.ok(out != null, `${comp}() must return a valid output`);
      }, `${comp}() should not throw`);
    }
  });

  it('components survive null and undefined children and attrs props', () => {
    for (const comp of AUDITED_COMPONENTS) {
      assert.doesNotThrow(() => {
        const out = RootPkg[comp]({
          children: null,
          attrs: undefined,
          className: undefined
        });
        assert.ok(out != null, `${comp} with null children/attrs should render safely`);
      }, `${comp} should not crash on null children / undefined attrs`);
    }
  });

  it('Terminal safely handles null steps, empty command, and XSS attack strings', () => {
    const term = RootPkg.Terminal({
      command: '<script>alert("pwnd")</script>',
      steps: null,
      output: '<img src=x onerror=alert(1)>',
      sequence: false
    }).toString();

    assert.ok(!term.includes('<script>'), 'Terminal must escape script tags in command');
    assert.ok(term.includes('&lt;script&gt;alert(&quot;pwnd&quot;)&lt;/script&gt;'), 'Command must be safely escaped in attribute');
    assert.ok(!term.includes('<img src=x'), 'Terminal must escape HTML tags in output');
    assert.ok(term.includes('&lt;img src=x onerror=alert(1)&gt;'), 'Output must be safely escaped in attribute');
  });

  it('AnimatedList cleanly handles null items and custom string arrays', () => {
    const listNull = RootPkg.AnimatedList({ items: null, children: null }).toString();
    assert.ok(listNull.includes('s-animated-list'), 'Should render animated list with default items on null');

    const customItems = ['<span>Notification 1</span>', '<span>Notification 2</span>'];
    const listCustom = RootPkg.AnimatedList({ items: customItems }).toString();
    assert.ok(listCustom.includes('Notification 1'), 'Should serialize custom items array');
    assert.ok(listCustom.includes('data-items='), 'Should attach data-items attribute');
  });

  it('Dock safely handles null items and separator edge cases', () => {
    const dockNull = RootPkg.Dock({ items: null, children: null }).toString();
    assert.ok(dockNull.includes('s-dock'), 'Should render default dock items when items is null');

    const dockCustom = RootPkg.Dock({
      items: [
        { separator: true },
        { icon: 'spark', label: '<b onmouseover="alert(1)">Exploit</b>', bg: 'rgba(0,0,0,0.5)' },
        { separator: true }
      ]
    }).toString();

    assert.ok(!dockCustom.includes('<b onmouseover'), 'Dock item labels must be escaped');
    assert.ok(dockCustom.includes('&lt;b onmouseover=&quot;alert(1)&quot;&gt;Exploit&lt;/b&gt;'), 'Label must be escaped in attribute title and aria-label');
  });

  it('HeroVideoDialog neutralizes javascript: pseudo-protocol in videoSrc and thumbnailSrc', () => {
    const dialog = RootPkg.HeroVideoDialog({
      videoSrc: 'javascript:alert(document.domain)',
      thumbnailSrc: 'javascript:alert(1)'
    }).toString();

    assert.ok(!dialog.includes('data-video-src="javascript:'), 'Malicious videoSrc protocol must be blocked');
    assert.ok(!dialog.includes('src="javascript:'), 'Malicious thumbnailSrc protocol must be blocked');
    assert.ok(dialog.includes('data-video-src="#"'), 'Dangerous video protocol must resolve to #');
    assert.ok(dialog.includes('src="#"'), 'Dangerous thumbnail protocol must resolve to #');
  });

  it('TweetCard neutralizes hostile author links and handles RTL / Unicode characters', () => {
    const tweet = RootPkg.TweetCard({
      name: 'اختبار تجريبي 🚀',
      handle: 'arabic_dev',
      content: 'مرحبا بالعالم! SarahUI supports full multilingual text rendering 🌍✨',
      verified: true
    }).toString();

    assert.ok(tweet.includes('اختبار تجريبي 🚀'), 'TweetCard must render Arabic and emoji text cleanly');
    assert.ok(tweet.includes('مرحبا بالعالم! SarahUI supports full multilingual text rendering 🌍✨'), 'TweetCard content must preserve Unicode');
    assert.ok(tweet.includes('s-tweet-verified'), 'Should render verified badge svg');
  });

  it('renders massive children payloads without stack overflow or performance degradation', () => {
    const largeContent = 'A'.repeat(50000);
    const start = performance.now();
    const marquee = RootPkg.Marquee({ children: largeContent }).toString();
    const elapsed = performance.now() - start;

    assert.ok(marquee.includes(largeContent), 'Marquee should contain large payload');
    assert.ok(elapsed < 200, `Rendering 50KB payload should take <200ms (took ${elapsed.toFixed(2)}ms)`);
  });
});

describe('Adversarial Challenger Suite 4: WAI-ARIA Semantic Role & Accessibility Contract Verification', () => {
  it('Terminal declares role="region", aria-label="Terminal", and aria-live="polite"', () => {
    const term = RootPkg.Terminal().toString();
    assert.ok(term.includes('role="region"'), 'Terminal must declare role="region"');
    assert.ok(term.includes('aria-label="Terminal"'), 'Terminal must declare aria-label="Terminal"');
    assert.ok(term.includes('aria-live="polite"'), 'Terminal must declare aria-live="polite"');
  });

  it('AnimatedList declares role="log" and aria-live="polite"', () => {
    const list = RootPkg.AnimatedList().toString();
    assert.ok(list.includes('role="log"'), 'AnimatedList must declare role="log"');
    assert.ok(list.includes('aria-live="polite"'), 'AnimatedList must declare aria-live="polite"');
  });

  it('Dock declares role="toolbar" and aria-label="Quick tools"', () => {
    const dock = RootPkg.Dock().toString();
    assert.ok(dock.includes('role="toolbar"'), 'Dock must declare role="toolbar"');
    assert.ok(dock.includes('aria-label="Quick tools"'), 'Dock must declare aria-label="Quick tools"');
  });

  it('HeroVideoDialog declares aria-haspopup="dialog" and uses native <dialog> element', () => {
    const dialog = RootPkg.HeroVideoDialog().toString();
    assert.ok(dialog.includes('aria-haspopup="dialog"'), 'Thumbnail button must declare aria-haspopup="dialog"');
    assert.ok(dialog.includes('aria-label="Play video"'), 'Thumbnail button must have accessible label');
    assert.ok(dialog.includes('<dialog'), 'Must use native HTML5 <dialog> modal');
    assert.ok(dialog.includes('aria-label="Close video"'), 'Close button must have aria-label="Close video"');
  });

  it('BentoCard renders semantic <article> and safe anchor CTA', () => {
    const card = RootPkg.BentoCard({ cta: 'Explore now', href: 'https://sarahui.com/docs' }).toString();
    assert.ok(card.startsWith('<article') && card.endsWith('</article>'), 'BentoCard must render semantic article element');
    assert.ok(card.includes('href="https://sarahui.com/docs"'), 'Should render safe link');
  });

  it('Marquee enforces aria-hidden="true" strictly on duplicate tracks only', () => {
    const marquee = RootPkg.Marquee({ repeat: 3, children: 'Scrolling item' }).toString();
    // Track 1 should NOT be aria-hidden
    assert.ok(marquee.includes('<div class="s-marquee-track">Scrolling item</div>'), 'First track must remain accessible to screen readers');
    // Tracks 2 and 3 MUST be aria-hidden="true"
    const hiddenTracks = marquee.match(/<div class="s-marquee-track" aria-hidden="true">/g);
    assert.equal(hiddenTracks?.length, 2, 'Duplicate tracks must carry aria-hidden="true"');
  });

  it('Decorative visual FX components mark presentation layers with aria-hidden="true"', () => {
    assert.ok(RootPkg.BorderBeam().toString().includes('aria-hidden="true"'), 'BorderBeam container must be aria-hidden="true"');
    assert.ok(RootPkg.AnimatedBeam().toString().includes('aria-hidden="true"'), 'AnimatedBeam SVG must be aria-hidden="true"');
    assert.ok(RootPkg.ProgressiveBlur().toString().includes('aria-hidden="true"'), 'ProgressiveBlur layer must be aria-hidden="true"');
    assert.ok(RootPkg.Pointer().toString().includes('aria-hidden="true"'), 'Pointer glyph must be aria-hidden="true"');
  });

  it('Lens declares role="region" and aria-label', () => {
    const lens = RootPkg.Lens({ ariaLabel: 'Product image magnifier' }).toString();
    assert.ok(lens.includes('role="region"'), 'Lens container must declare role="region"');
    assert.ok(lens.includes('aria-label="Product image magnifier"'), 'Lens container must declare aria-label');
  });
});

describe('Adversarial Challenger Suite 5: prefers-reduced-motion CSS Rules & Animation Hardening', () => {
  const stylesPath = path.resolve('packages/ui/src/styles/styles.css');
  const tokensPath = path.resolve('packages/ui/src/styles/tokens.css');
  const stylesContent = fs.readFileSync(stylesPath, 'utf8');
  const tokensContent = fs.readFileSync(tokensPath, 'utf8');

  it('packages/ui/src/styles/styles.css contains comprehensive prefers-reduced-motion media blocks', () => {
    assert.ok(stylesContent.includes('@media(prefers-reduced-motion:reduce)') || stylesContent.includes('@media (prefers-reduced-motion: reduce)'),
      'styles.css must declare @media (prefers-reduced-motion: reduce)');
  });

  it('reduced motion block pauses Marquee track animations', () => {
    assert.ok(
      stylesContent.includes('.s-marquee-track') &&
      (stylesContent.includes('animation-play-state: paused !important') || stylesContent.includes('animation-play-state:paused!important') || stylesContent.includes('animation: none')),
      'Marquee track must be paused under reduced motion'
    );
  });

  it('reduced motion block disables OrbitingCircles rotation and computes static position', () => {
    assert.ok(
      stylesContent.includes('.s-orbit-item') &&
      stylesContent.includes('animation: none !important') &&
      stylesContent.includes('transform: rotate(calc(var(--angle, 0) * 1deg)) translateY(calc(var(--radius, 160) * 1px))'),
      'OrbitingCircles item must disable animation and render static position'
    );
  });

  it('reduced motion block neutralizes BorderBeam glow animation', () => {
    assert.ok(
      stylesContent.includes('.s-border-beam-glow') &&
      stylesContent.includes('animation: none !important'),
      'BorderBeam glow animation must be set to none under reduced motion'
    );
  });

  it('reduced motion block neutralizes ShineBorder laser animation', () => {
    assert.ok(
      stylesContent.includes('.s-shine-border') &&
      stylesContent.includes('animation: none !important'),
      'ShineBorder animation must be set to none under reduced motion'
    );
  });

  it('reduced motion block neutralizes GlareHover sheen transitions', () => {
    assert.ok(
      stylesContent.includes('.s-glare-hover-glare') &&
      stylesContent.includes('opacity: 0 !important'),
      'GlareHover glare sheen must be hidden with opacity: 0 under reduced motion'
    );
  });

  it('reduced motion block neutralizes AnimatedBeam laser motion', () => {
    assert.ok(
      (stylesContent.includes('.s-anim-beam-line') || stylesContent.includes('.s-beam-path')) &&
      stylesContent.includes('animation: none !important'),
      'AnimatedBeam path animation must be disabled under reduced motion'
    );
  });

  it('tokens.css specifies reduced motion block and collapses duration tokens to 0ms', () => {
    assert.ok(tokensContent.includes('@media (prefers-reduced-motion: reduce)'), 'tokens.css must declare @media (prefers-reduced-motion: reduce)');
    assert.ok(tokensContent.includes('--s-duration-fast: 0ms;'), 'Fast duration must collapse to 0ms');
    assert.ok(tokensContent.includes('--s-duration-normal: 0ms;'), 'Normal duration must collapse to 0ms');
    assert.ok(tokensContent.includes('--s-duration-slow: 0ms;'), 'Slow duration must collapse to 0ms');
  });
});
