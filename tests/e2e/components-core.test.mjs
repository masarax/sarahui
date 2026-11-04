import test from 'node:test';
import assert from 'node:assert/strict';
import * as UI from '../../packages/ui/src/index.js';

const { render, raw, Marquee, Terminal, HeroVideoDialog, BentoGrid, BentoCard, AnimatedList, Dock, Globe } = UI;

/* ==========================================================================
   FEATURE 5: Marquee Component (UI.Marquee)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F5-T1-01]: Marquee renders horizontal track with default repeat count', () => {
  const html = render(Marquee({ children: raw('<span>Item</span>') }));
  assert.ok(html.includes('class="s-marquee group"'), 'Default class s-marquee group missing');
  assert.ok(html.includes('data-s-marquee'), 'data-s-marquee attribute missing');
  const tracks = [...html.matchAll(/<div class="s-marquee-track"/g)];
  assert.equal(tracks.length, 4, 'Default repeat count must produce 4 track divs');
});

test('E2E [F5-T1-02]: Marquee duplicate tracks carry aria-hidden="true" for screen reader hygiene', () => {
  const html = render(Marquee({ children: raw('<span>Item</span>') }));
  const hiddenTracks = [...html.matchAll(/class="s-marquee-track"[^>]*aria-hidden="true"/g)];
  assert.equal(hiddenTracks.length, 3, 'Duplicate tracks must be marked aria-hidden="true"');
  assert.ok(html.includes('<div class="s-marquee-track"><span>Item</span></div>'), 'Primary track must NOT be aria-hidden');
});

test('E2E [F5-T1-03]: Marquee supports direction and vertical modifiers', () => {
  const vertical = render(Marquee({ vertical: true, children: 'V' }));
  assert.ok(vertical.includes('s-marquee--vertical'), 's-marquee--vertical class missing');

  const dirVertical = render(Marquee({ direction: 'vertical', children: 'V' }));
  assert.ok(dirVertical.includes('s-marquee--vertical'), 'direction vertical modifier missing');
});

test('E2E [F5-T1-04]: Marquee supports reverse and pause-on-hover modes', () => {
  const html = render(Marquee({ reverse: true, pauseOnHover: true, children: 'P' }));
  assert.ok(html.includes('s-marquee--reverse'), 's-marquee--reverse class missing');
  assert.ok(html.includes('s-marquee--pause'), 's-marquee--pause class missing');
});

test('E2E [F5-T1-05]: Marquee binds duration, gap, and custom CSS variables', () => {
  const html = render(Marquee({ duration: 25, gap: '2rem', children: 'G' }));
  assert.ok(html.includes('--duration:25s;'), '--duration token missing');
  assert.ok(html.includes('--gap:2rem;'), '--gap token missing');
  assert.ok(html.includes('--s-gap:2rem;'), '--s-gap token missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F5-T2-01]: Marquee repeat count clamps between minimum 2 and maximum 8', () => {
  const minClamped = render(Marquee({ repeat: 1, children: 'Min' }));
  const minTracks = [...minClamped.matchAll(/class="s-marquee-track"/g)];
  assert.equal(minTracks.length, 2, 'repeat:1 must clamp to minimum 2 tracks');

  const maxClamped = render(Marquee({ repeat: 99, children: 'Max' }));
  const maxTracks = [...maxClamped.matchAll(/class="s-marquee-track"/g)];
  assert.equal(maxTracks.length, 8, 'repeat:99 must clamp to maximum 8 tracks');
});

test('E2E [F5-T2-02]: Marquee handles numeric and string speed values gracefully', () => {
  const numSpeed = render(Marquee({ speed: 50, children: 'S' }));
  assert.ok(numSpeed.includes('--duration:50s;'));

  const strSpeed = render(Marquee({ speed: '15s', children: 'S' }));
  assert.ok(strSpeed.includes('--duration:15s;'));
});

test('E2E [F5-T2-03]: Marquee numeric gap converts to pixel units', () => {
  const pixelGap = render(Marquee({ gap: 32, children: 'Gap' }));
  assert.ok(pixelGap.includes('--gap:32px;'));
  assert.ok(pixelGap.includes('--s-gap:32px;'));
});

test('E2E [F5-T2-04]: Marquee preserves dynamic Tailwind utility classes on container', () => {
  const html = render(Marquee({ className: 'rounded-2xl border border-indigo-500 shadow-xl', children: 'C' }));
  assert.ok(html.includes('rounded-2xl border border-indigo-500 shadow-xl'));
});

test('E2E [F5-T2-05]: Marquee escapes hostile child text without corrupting tracks', () => {
  const hostile = '<script>alert("xss")</script>';
  const html = render(Marquee({ children: hostile }));
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'));
});


/* ==========================================================================
   FEATURE 6: Terminal Component (UI.Terminal)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F6-T1-01]: Terminal renders window container with semantic status dots', () => {
  const html = render(Terminal());
  assert.ok(html.includes('class="s-terminal"'), 's-terminal class missing');
  assert.ok(html.includes('data-s-terminal'), 'data-s-terminal hook missing');
  assert.ok(html.includes('class="s-terminal-header"'), 'Header missing');
  assert.ok(html.includes('class="s-dot-red"'), 'Red dot missing');
  assert.ok(html.includes('class="s-dot-yellow"'), 'Yellow dot missing');
  assert.ok(html.includes('class="s-dot-green"'), 'Green dot missing');
});

test('E2E [F6-T1-02]: Terminal renders pre/code block and prompt cursor', () => {
  const html = render(Terminal());
  assert.ok(html.includes('<pre><code>'), 'pre/code tags missing');
  assert.ok(html.includes('class="s-terminal-prompt"'), 'Prompt container missing');
  assert.ok(html.includes('class="s-terminal-cursor"'), 'Cursor element missing');
});

test('E2E [F6-T1-03]: Terminal serializes steps array to JSON data attribute', () => {
  const customSteps = ['Step 1: Init', 'Step 2: Build'];
  const html = render(Terminal({ steps: customSteps }));
  assert.ok(html.includes('data-steps="[&quot;Step 1: Init&quot;,&quot;Step 2: Build&quot;]"'), 'Steps JSON attribute mismatch');
});

test('E2E [F6-T1-04]: Terminal supports custom command and output parameters', () => {
  const html = render(Terminal({ command: 'pnpm test', output: 'Tests passed!' }));
  assert.ok(html.includes('data-command="pnpm test"'), 'Custom command missing');
  assert.ok(html.includes('data-output="Tests passed!"'), 'Custom output missing');
});

test('E2E [F6-T1-05]: Terminal sequence mode attaches data-sequence attribute with children', () => {
  const html = render(Terminal({ children: raw('<span>Custom line</span>'), sequence: true }));
  assert.ok(html.includes('data-sequence="true"'), 'data-sequence missing when children provided');
  assert.ok(html.includes('<span>Custom line</span>'), 'Child content missing in terminal');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F6-T2-01]: Terminal escapes metacharacters safely in command and output data attributes', () => {
  const html = render(Terminal({ command: '> echo <test> & exit', output: 'Done > 1' }));
  assert.ok(html.includes('data-command="&gt; echo &lt;test&gt; &amp; exit"'), 'Command attribute escaping error');
  assert.ok(html.includes('data-output="Done &gt; 1"'), 'Output attribute escaping error');
});

test('E2E [F6-T2-02]: Terminal handles empty steps and null output cleanly', () => {
  const html = render(Terminal({ steps: [], output: null }));
  assert.ok(!html.includes('data-steps='), 'Empty steps should omit data-steps attribute');
  assert.ok(!html.includes('data-output='), 'Null output should omit data-output attribute');
});

test('E2E [F6-T2-03]: Terminal preserves user Tailwind utilities on container', () => {
  const html = render(Terminal({ className: 'max-w-lg shadow-2xl bg-zinc-950 font-mono' }));
  assert.ok(html.includes('max-w-lg shadow-2xl bg-zinc-950 font-mono'));
});

test('E2E [F6-T2-04]: Terminal children mode preserves nested formatting and syntax markup', () => {
  const nested = '<span class="text-green-400">SUCCESS</span>';
  const html = render(Terminal({ children: raw(nested) }));
  assert.ok(html.includes('<span class="text-green-400">SUCCESS</span>'));
});

test('E2E [F6-T2-05]: Terminal custom attributes forward cleanly to outer element', () => {
  const html = render(Terminal({ attrs: { id: 'ci-terminal', 'data-testid': 'interactive-term' } }));
  assert.ok(html.includes('id="ci-terminal"'));
  assert.ok(html.includes('data-testid="interactive-term"'));
});


/* ==========================================================================
   FEATURE 7: HeroVideoDialog Component (UI.HeroVideoDialog)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F7-T1-01]: HeroVideoDialog renders thumbnail trigger with accessible label', () => {
  const html = render(HeroVideoDialog());
  assert.ok(html.includes('class="s-hero-video-wrap"'), 'Wrapper missing');
  assert.ok(html.includes('class="s-hero-video-thumbnail"'), 'Thumbnail trigger missing');
  assert.ok(html.includes('aria-label="Play video"'), 'Accessible play button label missing');
  assert.ok(html.includes('class="s-hero-video-play-btn"'), 'Play button icon missing');
});

test('E2E [F7-T1-02]: HeroVideoDialog creates native HTML5 dialog element with modal attributes', () => {
  const html = render(HeroVideoDialog());
  assert.ok(/<dialog id="([^"]+)" class="s-dialog s-video-modal/.test(html), 'Modal dialog missing');
  assert.ok(html.includes('data-video-src='), 'data-video-src attribute missing');
});

test('E2E [F7-T1-03]: HeroVideoDialog links thumbnail open trigger to dialog ID', () => {
  const html = render(HeroVideoDialog());
  const triggerMatch = html.match(/data-s-video-open="([^"]+)"/);
  const dialogMatch = html.match(/<dialog id="([^"]+)"/);
  assert.ok(triggerMatch, 'data-s-video-open attribute missing');
  assert.ok(dialogMatch, 'dialog id missing');
  assert.equal(triggerMatch[1], dialogMatch[1], 'Trigger data-s-video-open must equal dialog id');
});

test('E2E [F7-T1-04]: HeroVideoDialog backdrop and close button carry data-s-dialog-close', () => {
  const html = render(HeroVideoDialog());
  assert.ok(html.includes('<div class="s-dialog-backdrop" data-s-dialog-close aria-hidden="true"></div>'), 'Backdrop missing');
  assert.ok(html.includes('class="s-video-modal-close" data-s-dialog-close aria-label="Close video"'), 'Close button missing');
});

test('E2E [F7-T1-05]: HeroVideoDialog iframe specifies video player title and sandbox allowances', () => {
  const html = render(HeroVideoDialog());
  assert.ok(html.includes('<iframe src="" title="Video player"'), 'Iframe title missing');
  assert.ok(html.includes('allowfullscreen'), 'allowfullscreen missing on iframe');
  assert.ok(html.includes('allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"'));
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F7-T2-01]: HeroVideoDialog supports all animation styles with center fallback', () => {
  for (const style of ['from-center', 'from-bottom', 'from-top', 'from-left', 'from-right', 'fade', 'top-in-bottom-out', 'left-in-right-out']) {
    const html = render(HeroVideoDialog({ animationStyle: style }));
    assert.ok(html.includes(`s-video-anim--${style}`), `Animation style ${style} missing`);
  }
  const fallback = render(HeroVideoDialog({ animationStyle: 'invalid-style' }));
  assert.ok(fallback.includes('s-video-anim--from-center'), 'Invalid style must fallback to from-center');
});

test('E2E [F7-T2-02]: HeroVideoDialog blocks unsafe protocol in videoSrc and thumbnailSrc', () => {
  const malicious = render(HeroVideoDialog({
    videoSrc: 'javascript:alert("pwned")',
    thumbnailSrc: 'data:text/html,<script>alert(1)</script>'
  }));
  assert.ok(!malicious.includes('data-video-src="javascript:'));
  assert.ok(!malicious.includes('src="data:'));
  assert.ok(malicious.includes('data-video-src="#"'));
  assert.ok(malicious.includes('src="#"'));
});

test('E2E [F7-T2-03]: HeroVideoDialog thumbnail image includes descriptive alt text', () => {
  const html = render(HeroVideoDialog({ thumbnailAlt: 'SarahUI overview trailer' }));
  assert.ok(html.includes('alt="SarahUI overview trailer"'));
});

test('E2E [F7-T2-04]: HeroVideoDialog preserves dynamic Tailwind classes on outer wrap', () => {
  const html = render(HeroVideoDialog({ className: 'w-full max-w-4xl rounded-3xl overflow-hidden' }));
  assert.ok(html.includes('w-full max-w-4xl rounded-3xl overflow-hidden'));
});

test('E2E [F7-T2-05]: Multiple HeroVideoDialog instances produce distinct unique dialog IDs', () => {
  const html1 = render(HeroVideoDialog());
  const html2 = render(HeroVideoDialog());
  const id1 = html1.match(/<dialog id="([^"]+)"/)[1];
  const id2 = html2.match(/<dialog id="([^"]+)"/)[1];
  assert.notEqual(id1, id2, 'Dialog IDs must be distinct across calls');
});


/* ==========================================================================
   FEATURE 8: BentoGrid & BentoCard Components (UI.BentoGrid, UI.BentoCard)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F8-T1-01]: BentoGrid renders container with default 3-column layout', () => {
  const html = render(BentoGrid({ children: raw('<div>Card</div>') }));
  assert.ok(html.includes('class="s-bento-grid"'), 's-bento-grid class missing');
  assert.ok(html.includes('<div>Card</div>'), 'Child card missing');
});

test('E2E [F8-T1-02]: BentoGrid sets --bento-cols variable when columns count differs', () => {
  const html = render(BentoGrid({ columns: 4, children: 'C' }));
  assert.ok(html.includes('--bento-cols:4'), '--bento-cols:4 missing');

  const colsProp = render(BentoGrid({ cols: 2, children: 'C' }));
  assert.ok(colsProp.includes('--bento-cols:2'), '--bento-cols:2 missing');
});

test('E2E [F8-T1-03]: BentoCard renders semantic article element with title, description, and icon', () => {
  const html = render(BentoCard({
    title: 'Cloud Analytics',
    description: 'Instant data insights in real-time.',
    icon: 'cloud'
  }));
  assert.ok(html.includes('<article class="s-bento-card group"'), 'Semantic article missing');
  assert.ok(html.includes('<h3>Cloud Analytics</h3>'), 'Title missing');
  assert.ok(html.includes('<p>Instant data insights in real-time.</p>'), 'Description missing');
  assert.ok(html.includes('class="s-bento-card-icon"'), 'Card icon container missing');
});

test('E2E [F8-T1-04]: BentoCard renders background / graphic layer when provided', () => {
  const html = render(BentoCard({
    title: 'Visual Card',
    background: raw('<div class="custom-bg">Image</div>')
  }));
  assert.ok(html.includes('<div class="s-bento-card-bg"><div class="custom-bg">Image</div></div>'));
});

test('E2E [F8-T1-05]: BentoCard renders CTA link with accessible icon and safeHref', () => {
  const html = render(BentoCard({
    title: 'Link Card',
    cta: 'Explore docs',
    href: 'https://example.com/docs'
  }));
  assert.ok(html.includes('href="https://example.com/docs"'));
  assert.ok(html.includes('<span>Explore docs</span>'));
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F8-T2-01]: BentoCard maps colSpan and rowSpan to grid utility classes', () => {
  const html = render(BentoCard({ title: 'Span Card', colSpan: 2, rowSpan: 3 }));
  assert.ok(html.includes('s-bento-card--col-2'), 'colSpan class missing');
  assert.ok(html.includes('s-bento-card--row-3'), 'rowSpan class missing');
});

test('E2E [F8-T2-02]: BentoCard maps colStart, colEnd, rowStart, rowEnd grid bounds', () => {
  const html = render(BentoCard({
    title: 'Positioned Card',
    colStart: 1,
    colEnd: 3,
    rowStart: 2,
    rowEnd: 4
  }));
  assert.ok(html.includes('s-bento-card--col-start-1'));
  assert.ok(html.includes('s-bento-card--col-end-3'));
  assert.ok(html.includes('s-bento-card--row-start-2'));
  assert.ok(html.includes('s-bento-card--row-end-4'));
});

test('E2E [F8-T2-03]: BentoCard preserves user Tailwind dynamic classes (e.g. col-span-2)', () => {
  const html = render(BentoCard({
    title: 'Tailwind Card',
    className: 'col-span-2 row-span-1 bg-gradient-to-br from-indigo-900 to-black'
  }));
  assert.ok(html.includes('col-span-2 row-span-1 bg-gradient-to-br from-indigo-900 to-black'));
});

test('E2E [F8-T2-04]: BentoCard handles empty CTA without rendering dead anchor tags', () => {
  const html = render(BentoCard({ title: 'No CTA', cta: '' }));
  assert.ok(!html.includes('s-bento-card-cta-mobile'));
  assert.ok(!html.includes('s-bento-card-cta-desktop'));
});

test('E2E [F8-T2-05]: BentoCard neutralizes malicious href in CTA', () => {
  const html = render(BentoCard({ title: 'XSS CTA', href: 'javascript:alert(1)' }));
  assert.ok(html.includes('href="#"'));
  assert.ok(!html.includes('href="javascript:'));
});


/* ==========================================================================
   FEATURE 9: AnimatedList Component (UI.AnimatedList)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F9-T1-01]: AnimatedList renders container with data-s-animated-list hook', () => {
  const html = render(AnimatedList());
  assert.ok(html.includes('class="s-animated-list"'), 's-animated-list class missing');
  assert.ok(html.includes('data-s-animated-list'), 'data-s-animated-list attribute missing');
});

test('E2E [F9-T1-02]: AnimatedList sets configurable animation delay attribute', () => {
  const html = render(AnimatedList({ delay: 2500 }));
  assert.ok(html.includes('data-delay="2500"'), 'data-delay attribute mismatch');
});

test('E2E [F9-T1-03]: AnimatedList mounts initial item in .s-animated-list-item wrapper', () => {
  const html = render(AnimatedList({ items: ['First Item', 'Second Item'] }));
  assert.ok(html.includes('<div class="s-animated-list-item">First Item</div>'), 'Initial item wrapper missing');
});

test('E2E [F9-T1-04]: AnimatedList serializes items array to data-items JSON attribute', () => {
  const html = render(AnimatedList({ items: ['Item Alpha', 'Item Beta'] }));
  assert.ok(html.includes('data-items="[&quot;Item Alpha&quot;,&quot;Item Beta&quot;]"'), 'data-items serialization error');
});

test('E2E [F9-T1-05]: AnimatedList renders default notification figures when items omitted', () => {
  const html = render(AnimatedList());
  assert.ok(html.includes('Payment received'), 'Default item Payment received missing');
  assert.ok(html.includes('User signed up'), 'Default item User signed up missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F9-T2-01]: AnimatedList accepts single child or children array', () => {
  const single = render(AnimatedList({ children: '<div>Single Entry</div>' }));
  assert.ok(single.includes('Single Entry'));

  const multi = render(AnimatedList({ children: ['<div>Child 1</div>', '<div>Child 2</div>'] }));
  assert.ok(multi.includes('Child 1'));
  assert.ok(multi.includes('Child 2'));
});

test('E2E [F9-T2-02]: AnimatedList handles empty items array without crashing', () => {
  const html = render(AnimatedList({ items: [] }));
  assert.ok(html.includes('class="s-animated-list"'));
  assert.ok(html.includes('data-s-animated-list'));
});

test('E2E [F9-T2-03]: AnimatedList preserves dynamic Tailwind styling on outer frame', () => {
  const html = render(AnimatedList({ className: 'max-w-md mx-auto p-4 rounded-xl shadow-lg' }));
  assert.ok(html.includes('max-w-md mx-auto p-4 rounded-xl shadow-lg'));
});

test('E2E [F9-T2-04]: AnimatedList serializes complex HTML elements into data-items', () => {
  const complex = [
    raw('<div class="notif"><strong>Alert</strong><p>Disk full</p></div>')
  ];
  const html = render(AnimatedList({ items: complex }));
  assert.ok(html.includes('data-items='), 'data-items attribute missing');
  assert.ok(html.includes('Alert'), 'Alert text missing in data-items');
  assert.ok(html.includes('Disk full'), 'Disk full text missing in data-items');
});

test('E2E [F9-T2-05]: AnimatedList forwards custom HTML attributes', () => {
  const html = render(AnimatedList({ attrs: { id: 'live-feed', 'aria-live': 'polite' } }));
  assert.ok(html.includes('id="live-feed"'));
  assert.ok(html.includes('aria-live="polite"'));
});


/* ==========================================================================
   FEATURE 10: Dock Component (UI.Dock)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F10-T1-01]: Dock renders navigation landmark with accessible label and hook', () => {
  const html = render(Dock());
  assert.ok(html.includes('<nav class="s-dock"'), 's-dock class missing');
  assert.ok(html.includes('data-s-dock'), 'data-s-dock hook missing');
  assert.ok(html.includes('aria-label="Quick tools"'), 'aria-label Quick tools missing');
});

test('E2E [F10-T1-02]: Dock renders default tool items with accessible titles and labels', () => {
  const html = render(Dock());
  for (const label of ['Home', 'Blog', 'GitHub', 'LinkedIn', 'X', 'Send Email']) {
    assert.ok(html.includes(`title="${label}" aria-label="${label}"`), `Dock item ${label} missing`);
  }
});

test('E2E [F10-T1-03]: Dock renders separator elements with aria-hidden="true"', () => {
  const html = render(Dock());
  assert.ok(html.includes('<div class="s-dock-separator" aria-hidden="true"></div>'), 'Dock separator missing');
});

test('E2E [F10-T1-04]: Dock configures size, magnification, and distance attributes', () => {
  const html = render(Dock({ iconSize: 48, iconMagnification: 72, iconDistance: 160 }));
  assert.ok(html.includes('data-size="48"'), 'data-size missing');
  assert.ok(html.includes('data-magnification="72"'), 'data-magnification missing');
  assert.ok(html.includes('data-distance="160"'), 'data-distance missing');
});

test('E2E [F10-T1-05]: Dock supports vertical and directional orientation modifiers', () => {
  const vert = render(Dock({ direction: 'vertical' }));
  assert.ok(vert.includes('s-dock--vertical'), 's-dock--vertical modifier missing');

  const top = render(Dock({ direction: 'top' }));
  assert.ok(top.includes('s-dock--top'), 's-dock--top modifier missing');

  const bottom = render(Dock({ direction: 'bottom' }));
  assert.ok(bottom.includes('s-dock--bottom'), 's-dock--bottom modifier missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F10-T2-01]: Dock supports custom items with background colors and classes', () => {
  const items = [
    { icon: 'spark', label: 'Magic', bg: '#5B3DF5', className: 'dock-custom' },
    { separator: true },
    { icon: 'settings', label: 'Config' }
  ];
  const html = render(Dock({ items }));
  assert.ok(html.includes('style="background:#5B3DF5;"'));
  assert.ok(html.includes('class="s-dock-icon dock-custom"'));
  assert.ok(html.includes('title="Magic"'));
});

test('E2E [F10-T2-02]: Dock renders arbitrary child markup when children prop provided', () => {
  const html = render(Dock({ children: raw('<button class="custom-dock-item">Custom</button>') }));
  assert.ok(html.includes('<button class="custom-dock-item">Custom</button>'));
  assert.ok(!html.includes('title="Home"'));
});

test('E2E [F10-T2-03]: Dock preserves dynamic Tailwind utility classes', () => {
  const html = render(Dock({ className: 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50 shadow-2xl' }));
  assert.ok(html.includes('fixed bottom-4 left-1/2 -translate-x-1/2 z-50 shadow-2xl'));
});

test('E2E [F10-T2-04]: Dock handles empty items array without crashing', () => {
  const html = render(Dock({ items: [] }));
  assert.ok(html.includes('class="s-dock"'));
  assert.ok(html.includes('</nav>'));
});

test('E2E [F10-T2-05]: Dock escapes hostile item labels in attributes', () => {
  const items = [{ icon: 'info', label: '"><script>alert(1)</script>' }];
  const html = render(Dock({ items }));
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;'));
});


/* ==========================================================================
   FEATURE 11: Globe Component (UI.Globe)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F11-T1-01]: Globe renders container with canvas and glow elements', () => {
  const html = render(Globe());
  assert.ok(html.includes('class="s-globe-container"'), 'Container class missing');
  assert.ok(html.includes('class="s-globe-canvas" data-s-globe'), 'Canvas with data-s-globe missing');
  assert.ok(html.includes('class="s-globe-glow"'), 'Glow effect layer missing');
});

test('E2E [F11-T1-02]: Globe scales canvas internal resolution to 2x for Retina displays', () => {
  const html = render(Globe({ size: 300 }));
  assert.ok(html.includes('width="600" height="600"'), 'Canvas 2x dimensions missing');
});

test('E2E [F11-T1-03]: Globe clamps size between minimum 160 and maximum 600', () => {
  const minClamped = render(Globe({ size: 50 }));
  assert.ok(minClamped.includes('width="320" height="320"'), 'Min size clamp error on canvas');

  const maxClamped = render(Globe({ size: 1200 }));
  assert.ok(maxClamped.includes('width="1200" height="1200"'), 'Max size clamp error on canvas');
});

test('E2E [F11-T1-04]: Globe serializes custom config object to data-globe-config attribute', () => {
  const cfg = { devicePixelRatio: 2, dark: 1, baseColor: [1, 1, 1] };
  const html = render(Globe({ config: cfg }));
  assert.ok(html.includes('data-globe-config='), 'data-globe-config attribute missing');
  assert.ok(html.includes('&quot;dark&quot;:1'), 'Config JSON serialization error');
});

test('E2E [F11-T1-05]: Globe container preserves dynamic Tailwind classes', () => {
  const html = render(Globe({ className: 'mx-auto rounded-full overflow-hidden' }));
  assert.ok(html.includes('mx-auto rounded-full overflow-hidden'));
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F11-T2-01]: Globe handles non-numeric size gracefully with default fallback', () => {
  const html = render(Globe({ size: 'invalid-size' }));
  assert.ok(html.includes('width="720" height="720"'));
});

test('E2E [F11-T2-02]: Globe handles null config without injecting empty data-globe-config attribute', () => {
  const html = render(Globe({ config: null }));
  assert.ok(!html.includes('data-globe-config='));
});

test('E2E [F11-T2-03]: Globe supports custom ARIA role and attributes on container', () => {
  const html = render(Globe({ attrs: { role: 'img', 'aria-label': 'Interactive 3D Earth' } }));
  assert.ok(html.includes('role="img"'));
  assert.ok(html.includes('aria-label="Interactive 3D Earth"'));
});

test('E2E [F11-T2-04]: Globe dimensions handle string numbers cleanly', () => {
  const html = render(Globe({ size: '400' }));
  assert.ok(html.includes('width="800" height="800"'));
});

test('E2E [F11-T2-05]: Globe custom ID forwards to container element', () => {
  const html = render(Globe({ attrs: { id: 'network-globe' } }));
  assert.ok(html.includes('id="network-globe"'));
});
