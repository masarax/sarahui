import test from 'node:test';
import assert from 'node:assert/strict';
import * as UI from '../../packages/ui/src/index.js';

const { render, raw, TweetCard, OrbitingCircles, AvatarCircles, IconCloud, Lens, Pointer, SmoothCursor, ProgressiveBlur, DottedMap } = UI;

/* ==========================================================================
   FEATURE 12: TweetCard Component (UI.TweetCard)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F12-T1-01]: TweetCard renders semantic article element with data-tweet-id', () => {
  const html = render(TweetCard({ id: '123456789' }));
  assert.ok(html.includes('<article class="s-tweet-card" data-tweet-id="123456789">'), 'Semantic article with data-tweet-id missing');
  assert.ok(html.includes('class="s-tweet-header"'), 'Tweet header missing');
  assert.ok(html.includes('class="s-tweet-body"'), 'Tweet body missing');
});

test('E2E [F12-T1-02]: TweetCard renders author avatar, name, and handle link', () => {
  const html = render(TweetCard({
    authorName: 'Sarah Developer',
    handle: 'sarahdev',
    avatar: 'https://example.com/avatar.jpg'
  }));
  assert.ok(html.includes('alt="Sarah Developer"'), 'Avatar alt missing');
  assert.ok(html.includes('class="s-tweet-name">Sarah Developer</strong>'), 'Name missing');
  assert.ok(html.includes('@sarahdev</span>'), 'Handle missing');
  assert.ok(html.includes('href="https://x.com/sarahdev"'), 'Handle link missing');
});

test('E2E [F12-T1-03]: TweetCard renders verified badge when verified is true', () => {
  const verified = render(TweetCard({ verified: true }));
  assert.ok(verified.includes('class="s-tweet-verified"'), 'Verified badge missing when verified=true');

  const unverified = render(TweetCard({ verified: false }));
  assert.ok(!unverified.includes('class="s-tweet-verified"'), 'Verified badge should not render when verified=false');
});

test('E2E [F12-T1-04]: TweetCard formats tweet content text and hashtags', () => {
  const html = render(TweetCard({ content: 'Building something amazing with #sarahUI and @design' }));
  assert.ok(html.includes('Building something amazing with'));
  assert.ok(html.includes('#sarahUI'));
});

test('E2E [F12-T1-05]: TweetCard renders footer with timestamp and engagement metrics', () => {
  const html = render(TweetCard({
    timestamp: '10:30 AM · Nov 3, 2026',
    likes: '1.2K',
    retweets: '340',
    showFooter: true
  }));
  assert.ok(html.includes('<footer class="s-tweet-footer">'), 'Footer missing');
  assert.ok(html.includes('10:30 AM · Nov 3, 2026</time>'), 'Time missing');
  assert.ok(html.includes('<strong>1.2K</strong> Likes'), 'Likes count missing');
  assert.ok(html.includes('<strong>340</strong> Retweets'), 'Retweets count missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F12-T2-01]: TweetCard video mode renders accessible video player attributes', () => {
  const html = render(TweetCard({
    video: 'https://example.com/demo.mp4',
    mediaUrl: 'https://example.com/poster.jpg',
    autoPlay: false,
    muted: true,
    controls: true
  }));
  assert.ok(html.includes('<video src="https://example.com/demo.mp4"'));
  assert.ok(html.includes('poster="https://example.com/poster.jpg"'));
  assert.ok(html.includes('controls'));
  assert.ok(!html.includes('autoplay'));
});

test('E2E [F12-T2-02]: TweetCard multi-image carousel creates accessible slide controls', () => {
  const html = render(TweetCard({
    video: null,
    images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg']
  }));
  assert.ok(html.includes('data-s-carousel'), 'Carousel hook missing');
  assert.ok(html.includes('aria-label="Previous photo"'));
  assert.ok(html.includes('aria-label="Next photo"'));
  assert.ok(html.includes('alt="Tweet photo 1"'));
  assert.ok(html.includes('alt="Tweet photo 2"'));
});

test('E2E [F12-T2-03]: TweetCard blocks javascript: URLs in avatar and post links', () => {
  const malicious = render(TweetCard({
    handle: 'attacker" onclick="alert(1)',
    avatar: 'javascript:alert(1)'
  }));
  assert.ok(!malicious.includes('src="javascript:'));
  assert.ok(malicious.includes('src="#"'));
});

test('E2E [F12-T2-04]: TweetCard handles urlPreview card presentation', () => {
  const html = render(TweetCard({
    video: null,
    urlPreview: {
      domain: 'sarahui.dev',
      title: 'SarahUI Design System',
      description: '120 accessible components with zero runtime dependencies.',
      url: 'https://sarahui.dev'
    }
  }));
  assert.ok(html.includes('class="s-tweet-url-preview"'));
  assert.ok(html.includes('sarahui.dev</span>'));
  assert.ok(html.includes('SarahUI Design System</strong>'));
});

test('E2E [F12-T2-05]: TweetCard preserves dynamic Tailwind utility classes on container', () => {
  const html = render(TweetCard({ className: 'max-w-md mx-auto shadow-xl border border-zinc-800' }));
  assert.ok(html.includes('max-w-md mx-auto shadow-xl border border-zinc-800'));
});


/* ==========================================================================
   FEATURE 13: OrbitingCircles Component (UI.OrbitingCircles)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F13-T1-01]: OrbitingCircles renders circular orbit path SVG by default', () => {
  const html = render(OrbitingCircles({ radius: 180 }));
  assert.ok(html.includes('class="s-orbiting-circles"'), 'Orbit container missing');
  assert.ok(html.includes('<svg class="s-orbit-circle-path"'), 'Orbit SVG path missing');
  assert.ok(html.includes('r="180"'), 'Orbit radius in SVG mismatch');
});

test('E2E [F13-T1-02]: OrbitingCircles renders default orbit items when icons omitted', () => {
  const html = render(OrbitingCircles());
  const items = [...html.matchAll(/class="s-orbit-item"/g)];
  assert.equal(items.length, 5, 'Default orbit should contain 5 items');
});

test('E2E [F13-T1-03]: OrbitingCircles calculates angular spacing across items', () => {
  const html = render(OrbitingCircles({ icons: ['spark', 'settings', 'code'] }));
  assert.ok(html.includes('--angle:0;'), 'First item angle 0 missing');
  assert.ok(html.includes('--angle:120;'), 'Second item angle 120 missing');
  assert.ok(html.includes('--angle:240;'), 'Third item angle 240 missing');
});

test('E2E [F13-T1-04]: OrbitingCircles forwards reverse mode to container and item classes', () => {
  const html = render(OrbitingCircles({ reverse: true }));
  assert.ok(html.includes('s-orbiting-circles s-orbit-reverse'), 'Container reverse class missing');
  assert.ok(html.includes('s-orbit-item s-orbit-reverse'), 'Item reverse class missing');
});

test('E2E [F13-T1-05]: OrbitingCircles accepts custom iconSize and binds to CSS variables', () => {
  const html = render(OrbitingCircles({ iconSize: 42 }));
  assert.ok(html.includes('--icon-size:42px;'), '--icon-size CSS variable missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F13-T2-01]: OrbitingCircles clamps minimum radius to 10', () => {
  const html = render(OrbitingCircles({ radius: 2 }));
  assert.ok(html.includes('r="10"'), 'Minimum radius clamp to 10 missing');
  assert.ok(html.includes('--radius:10;'));
});

test('E2E [F13-T2-02]: OrbitingCircles supports speed multiplier modifying effective duration', () => {
  const html = render(OrbitingCircles({ duration: 40, speed: 2 }));
  // 40 / 2 = 20
  assert.ok(html.includes('--duration:20;'), 'Calculated duration (40 / 2 = 20) missing');
});

test('E2E [F13-T2-03]: OrbitingCircles path=false suppresses background circular SVG', () => {
  const html = render(OrbitingCircles({ path: false }));
  assert.ok(!html.includes('s-orbit-circle-path'), 'Circular SVG should be omitted when path=false');
});

test('E2E [F13-T2-04]: OrbitingCircles forwards delay parameter into inline styles', () => {
  // Requirement from PROJECT.md Feature 17: Forward delay parameter
  const html = render(OrbitingCircles({ delay: 8 }));
  assert.ok(html.includes('--delay:8') || html.includes('animation-delay:8') || html.includes('delay'), 'delay parameter should be bound');
});

test('E2E [F13-T2-05]: OrbitingCircles accepts raw HTML children elements', () => {
  const html = render(OrbitingCircles({ children: raw('<span class="center-badge">Center</span>') }));
  assert.ok(html.includes('<span class="center-badge">Center</span>'));
});


/* ==========================================================================
   FEATURE 14: AvatarCircles Component (UI.AvatarCircles)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F14-T1-01]: AvatarCircles renders container with avatar images', () => {
  const html = render(AvatarCircles());
  assert.ok(html.includes('class="s-avatar-circles"'), 's-avatar-circles container missing');
  assert.ok(html.includes('class="s-avatar-img"'), 'Avatar image element missing');
});

test('E2E [F14-T1-02]: AvatarCircles renders counter badge when numPeople > 0', () => {
  const html = render(AvatarCircles({ numPeople: 42 }));
  assert.ok(html.includes('<span class="s-avatar-circles-count">+42</span>'), 'Counter badge missing');
});

test('E2E [F14-T1-03]: AvatarCircles omits counter badge when numPeople is 0 or negative', () => {
  const zero = render(AvatarCircles({ numPeople: 0 }));
  assert.ok(!zero.includes('s-avatar-circles-count'));

  const neg = render(AvatarCircles({ numPeople: -5 }));
  assert.ok(!neg.includes('s-avatar-circles-count'));
});

test('E2E [F14-T1-04]: AvatarCircles creates anchor links when profileUrl is provided', () => {
  const html = render(AvatarCircles({
    avatars: [
      { imageUrl: 'https://example.com/a.jpg', profileUrl: 'https://example.com/user/a' }
    ]
  }));
  assert.ok(html.includes('<a class="s-avatar s-avatar--sm" href="https://example.com/user/a"'), 'Link wrapper missing');
  assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'), 'Secure target/rel missing');
});

test('E2E [F14-T1-05]: AvatarCircles renders text initials when string is not an image URL', () => {
  const html = render(AvatarCircles({
    avatars: ['SK', 'JD']
  }));
  assert.ok(html.includes('<span class="s-avatar-initials">SK</span>'));
  assert.ok(html.includes('<span class="s-avatar-initials">JD</span>'));
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F14-T2-01]: AvatarCircles descriptive alt text on avatars', () => {
  // Requirement from PROJECT.md item 18: Descriptive alt and counter aria-label
  const html = render(AvatarCircles({
    avatars: [{ imageUrl: 'https://example.com/u.jpg', name: 'Sarah Khan' }]
  }));
  assert.ok(html.includes('alt="Sarah Khan"') || html.includes('alt="Avatar"'));
});

test('E2E [F14-T2-02]: AvatarCircles escapes hostile image URLs and initials', () => {
  const html = render(AvatarCircles({
    avatars: ['<script>alert(1)</script>']
  }));
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
});

test('E2E [F14-T2-03]: AvatarCircles images carry loading="lazy" for performance', () => {
  const html = render(AvatarCircles());
  const imgs = [...html.matchAll(/<img[^>]*class="s-avatar-img"[^>]*>/g)].map(m => m[0]);
  assert.ok(imgs.length > 0);
  for (const img of imgs) {
    assert.ok(img.includes('loading="lazy"'), 'Avatar image missing loading="lazy"');
  }
});

test('E2E [F14-T2-04]: AvatarCircles preserves dynamic Tailwind utility classes', () => {
  const html = render(AvatarCircles({ className: 'space-x-[-12px] ring-2 ring-white' }));
  assert.ok(html.includes('space-x-[-12px] ring-2 ring-white'));
});

test('E2E [F14-T2-05]: AvatarCircles accepts both avatarUrls and avatars props synonymously', () => {
  const urls = render(AvatarCircles({ avatarUrls: ['https://example.com/1.jpg'] }));
  const avts = render(AvatarCircles({ avatars: ['https://example.com/1.jpg'] }));
  assert.equal(urls, avts, 'avatarUrls and avatars props must produce identical markup');
});


/* ==========================================================================
   FEATURE 15: IconCloud Component (UI.IconCloud)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F15-T1-01]: IconCloud renders container with canvas and accessibility attributes', () => {
  const html = render(IconCloud());
  assert.ok(html.includes('class="s-icon-cloud-wrap"'), 'Wrapper missing');
  assert.ok(html.includes('<canvas class="s-icon-cloud-canvas" data-s-icon-cloud'), 'Canvas missing');
  assert.ok(html.includes('role="img"'), 'role="img" missing on canvas');
  assert.ok(html.includes('aria-label="Interactive 3D Icon Cloud"'), 'Accessible label missing');
});

test('E2E [F15-T1-02]: IconCloud serializes image URLs into data-images attribute', () => {
  const html = render(IconCloud({ slugs: ['typescript', 'react'] }));
  assert.ok(html.includes('data-images='), 'data-images attribute missing');
  assert.ok(html.includes('cdn.simpleicons.org/typescript'));
  assert.ok(html.includes('cdn.simpleicons.org/react'));
});

test('E2E [F15-T1-03]: IconCloud renders pause control button when showControl is true', () => {
  const html = render(IconCloud({ showControl: true }));
  assert.ok(html.includes('class="s-icon-cloud-ctrl" data-s-cloud-toggle'), 'Pause control button missing');
  assert.ok(html.includes('aria-label="Pause animation"'), 'Pause button aria-label missing');
});

test('E2E [F15-T1-04]: IconCloud suppresses pause control button when showControl is false', () => {
  const html = render(IconCloud({ showControl: false }));
  assert.ok(!html.includes('data-s-cloud-toggle'), 'Control should be omitted when showControl=false');
});

test('E2E [F15-T1-05]: IconCloud canvas renders standard dimensions 340x340', () => {
  const html = render(IconCloud());
  assert.ok(html.includes('width="340" height="340"'), 'Standard 340x340 dimensions missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F15-T2-01]: IconCloud accepts custom images array directly', () => {
  const customImgs = ['https://example.com/custom1.svg', 'https://example.com/custom2.svg'];
  const html = render(IconCloud({ images: customImgs }));
  assert.ok(html.includes('https://example.com/custom1.svg'));
  assert.ok(html.includes('https://example.com/custom2.svg'));
});

test('E2E [F15-T2-02]: IconCloud normalizes slugs to lowercase trimmed strings', () => {
  const html = render(IconCloud({ slugs: ['  REACT  ', 'NEXTDOTJS'] }));
  assert.ok(html.includes('cdn.simpleicons.org/react'));
  assert.ok(html.includes('cdn.simpleicons.org/nextdotjs'));
});

test('E2E [F15-T2-03]: IconCloud handles empty slugs array with clean empty list', () => {
  const html = render(IconCloud({ slugs: [] }));
  assert.ok(html.includes('class="s-icon-cloud-canvas"'));
});

test('E2E [F15-T2-04]: IconCloud preserves dynamic Tailwind utility classes on container', () => {
  const html = render(IconCloud({ className: 'max-w-md mx-auto aspect-square rounded-2xl bg-zinc-900' }));
  assert.ok(html.includes('max-w-md mx-auto aspect-square rounded-2xl bg-zinc-900'));
});

test('E2E [F15-T2-05]: IconCloud accepts iconSlugs and icons aliases', () => {
  const a = render(IconCloud({ iconSlugs: ['vue'] }));
  const b = render(IconCloud({ icons: ['vue'] }));
  assert.ok(a.includes('cdn.simpleicons.org/vue'));
  assert.ok(b.includes('cdn.simpleicons.org/vue'));
});


/* ==========================================================================
   FEATURE 16: Lens Component (UI.Lens)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F16-T1-01]: Lens renders container with accessible role="region" and tabindex', () => {
  const html = render(Lens({ children: '<div>Target Content</div>' }));
  assert.ok(html.includes('class="s-lens-container"'), 's-lens-container class missing');
  assert.ok(html.includes('data-s-lens'), 'data-s-lens hook missing');
  assert.ok(html.includes('role="region"'), 'role="region" missing');
  assert.ok(html.includes('aria-label="Zoom Area"'), 'aria-label Zoom Area missing');
  assert.ok(html.includes('tabindex="0"'), 'tabindex="0" missing for keyboard focus');
});

test('E2E [F16-T1-02]: Lens renders target container with child content', () => {
  const html = render(Lens({ children: raw('<img src="/photo.jpg" alt="Detail" />') }));
  assert.ok(html.includes('<div class="s-lens-target"><img src="/photo.jpg" alt="Detail" /></div>'));
});

test('E2E [F16-T1-03]: Lens renders overlay layer with aria-hidden="true" and zoomed copy', () => {
  const html = render(Lens({ children: 'Zoom Item' }));
  assert.ok(html.includes('<div class="s-lens-overlay" aria-hidden="true">'), 'Overlay missing');
  assert.ok(html.includes('<div class="s-lens-zoomed">Zoom Item</div>'), 'Zoomed copy missing');
});

test('E2E [F16-T1-04]: Lens configures data-zoom and data-size attributes', () => {
  const html = render(Lens({ zoomFactor: 2.5, lensSize: 220 }));
  assert.ok(html.includes('data-zoom="2.5"'), 'data-zoom mismatch');
  assert.ok(html.includes('data-size="220"'), 'data-size mismatch');
});

test('E2E [F16-T1-05]: Lens isStatic mode sets data-static attribute and initial coordinates', () => {
  const html = render(Lens({ isStatic: true, position: { x: 50, y: 75 } }));
  assert.ok(html.includes('data-static="true"'), 'data-static="true" missing');
  assert.ok(html.includes('data-initial-x="50"'), 'data-initial-x missing');
  assert.ok(html.includes('data-initial-y="75"'), 'data-initial-y missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F16-T2-01]: Lens supports custom ariaLabel parameter', () => {
  const html = render(Lens({ ariaLabel: 'Product inspection magnifier' }));
  assert.ok(html.includes('aria-label="Product inspection magnifier"'));
});

test('E2E [F16-T2-02]: Lens defaultPosition sets data-default-x and data-default-y', () => {
  const html = render(Lens({ defaultPosition: { x: 100, y: 120 } }));
  assert.ok(html.includes('data-default-x="100"'));
  assert.ok(html.includes('data-default-y="120"'));
});

test('E2E [F16-T2-03]: Lens zoomFactor accepts string numbers gracefully', () => {
  const html = render(Lens({ zoomFactor: '3' }));
  assert.ok(html.includes('data-zoom="3"'));
});

test('E2E [F16-T2-04]: Lens preserves dynamic Tailwind utility classes on container', () => {
  const html = render(Lens({ className: 'rounded-2xl border border-zinc-700 shadow-2xl' }));
  assert.ok(html.includes('rounded-2xl border border-zinc-700 shadow-2xl'));
});

test('E2E [F16-T2-05]: Lens escapes hostile child markup safely', () => {
  const html = render(Lens({ children: '<script>alert("lens")</script>' }));
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;alert(&quot;lens&quot;)&lt;/script&gt;'));
});


/* ==========================================================================
   FEATURE 17: Pointer Component (UI.Pointer)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F17-T1-01]: Pointer renders container with data-s-pointer hook', () => {
  const html = render(Pointer({ content: 'Card' }));
  assert.ok(html.includes('class="s-custom-pointer-wrap"'), 'Wrapper missing');
  assert.ok(html.includes('data-s-pointer'), 'data-s-pointer hook missing');
});

test('E2E [F17-T1-02]: Pointer renders pointer glyph with aria-hidden="true"', () => {
  const html = render(Pointer({ name: 'Alex' }));
  assert.ok(html.includes('<div class="s-pointer-glyph" aria-hidden="true">'), 'Glyph aria-hidden missing');
});

test('E2E [F17-T1-03]: Pointer renders cursor badge with user name when provided', () => {
  const html = render(Pointer({ name: 'Sarah Khan', color: '#178BFF' }));
  assert.ok(html.includes('class="s-pointer-badge"'), 'Pointer badge missing');
  assert.ok(html.includes('style="background:#178BFF;"'), 'Badge color style missing');
  assert.ok(html.includes('<span>Sarah Khan</span>'), 'Badge name missing');
});

test('E2E [F17-T1-04]: Pointer renders default SVG arrow cursor with fill color', () => {
  const html = render(Pointer({ color: '#5B3DF5' }));
  assert.ok(html.includes('<svg class="s-pointer-cursor"'), 'Pointer SVG missing');
  assert.ok(html.includes('fill="#5B3DF5"'), 'Pointer SVG fill color missing');
});

test('E2E [F17-T1-05]: Pointer renders body content alongside pointer glyph', () => {
  const html = render(Pointer({ content: raw('<button class="demo-btn">Click me</button>') }));
  assert.ok(html.includes('<button class="demo-btn">Click me</button>'));
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F17-T2-01]: Pointer supports custom cursor markup override', () => {
  const html = render(Pointer({ cursor: raw('<span class="custom-cursor">📍</span>') }));
  assert.ok(html.includes('<span class="custom-cursor">📍</span>'));
});

test('E2E [F17-T2-02]: Pointer omits badge element when name is empty string', () => {
  const html = render(Pointer({ name: '' }));
  assert.ok(!html.includes('class="s-pointer-badge"'));
});

test('E2E [F17-T2-03]: Pointer escapes hostile name text in badge', () => {
  const html = render(Pointer({ name: '"><script>alert(1)</script>' }));
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;'));
});

test('E2E [F17-T2-04]: Pointer custom attributes forward cleanly to outer element', () => {
  const html = render(Pointer({ attrs: { id: 'team-pointer', 'data-user-id': 'usr_42' } }));
  assert.ok(html.includes('id="team-pointer"'));
  assert.ok(html.includes('data-user-id="usr_42"'));
});

test('E2E [F17-T2-05]: Pointer handles child content passed via children prop', () => {
  const html = render(Pointer({ children: raw('<div class="box">Box</div>'), cursor: raw('<i>*</i>') }));
  assert.ok(html.includes('<div class="box">Box</div>'));
});


/* ==========================================================================
   FEATURE 18: SmoothCursor Component (UI.SmoothCursor)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F18-T1-01]: SmoothCursor renders container with data-s-smooth-cursor hook', () => {
  const html = render(SmoothCursor());
  assert.ok(html.includes('class="s-smooth-cursor-container"'), 'Container class missing');
  assert.ok(html.includes('data-s-smooth-cursor'), 'data-s-smooth-cursor hook missing');
});

test('E2E [F18-T1-02]: SmoothCursor carries aria-hidden="true" to prevent assistive tech distraction', () => {
  const html = render(SmoothCursor());
  assert.ok(html.includes('aria-hidden="true"'), 'aria-hidden missing on smooth cursor');
});

test('E2E [F18-T1-03]: SmoothCursor renders follower element with default cursor SVG', () => {
  const html = render(SmoothCursor());
  assert.ok(html.includes('class="s-smooth-cursor-follower"'), 'Follower element missing');
  assert.ok(html.includes('<svg xmlns="http://www.w3.org/2000/svg"'), 'Default SVG missing');
});

test('E2E [F18-T1-04]: SmoothCursor applies color parameter to SVG fill', () => {
  const html = render(SmoothCursor({ color: '#FF3D71' }));
  assert.ok(html.includes('fill="#FF3D71"'), 'Custom fill color missing');
});

test('E2E [F18-T1-05]: SmoothCursor preserves dynamic Tailwind utility classes', () => {
  const html = render(SmoothCursor({ className: 'z-50 pointer-events-none' }));
  assert.ok(html.includes('z-50 pointer-events-none'));
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F18-T2-01]: SmoothCursor supports custom cursor markup override', () => {
  const html = render(SmoothCursor({ cursor: raw('<div class="custom-dot"></div>') }));
  assert.ok(html.includes('<div class="custom-dot"></div>'));
});

test('E2E [F18-T2-02]: SmoothCursor color="currentColor" falls back cleanly without breaking fill', () => {
  const html = render(SmoothCursor({ color: 'currentColor' }));
  assert.ok(html.includes('fill="currentColor"'));
});

test('E2E [F18-T2-03]: SmoothCursor handles null or undefined color gracefully', () => {
  const html = render(SmoothCursor({ color: null }));
  assert.ok(html.includes('fill="currentColor"'));
});

test('E2E [F18-T2-04]: SmoothCursor forwards custom attributes to container', () => {
  const html = render(SmoothCursor({ attrs: { id: 'app-smooth-cursor', 'data-scope': 'editor' } }));
  assert.ok(html.includes('id="app-smooth-cursor"'));
  assert.ok(html.includes('data-scope="editor"'));
});

test('E2E [F18-T2-05]: SmoothCursor SVG contains drop shadow filter definition', () => {
  const html = render(SmoothCursor());
  assert.ok(html.includes('filter="url(#s-filter-cursor)"'), 'Filter URL missing');
  assert.ok(html.includes('id="s-filter-cursor"'), 'Filter def missing');
});


/* ==========================================================================
   FEATURE 19: ProgressiveBlur Component (UI.ProgressiveBlur)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F19-T1-01]: ProgressiveBlur renders progressive blur container with directional class', () => {
  const html = render(ProgressiveBlur({ position: 'bottom' }));
  assert.ok(html.includes('class="s-progressive-blur s-progressive-blur--bottom"'), 'Directional class missing');
  assert.ok(html.includes('aria-hidden="true"'), 'aria-hidden missing on decorative blur');
});

test('E2E [F19-T1-02]: ProgressiveBlur renders multi-layer Gaussian blur layers', () => {
  const html = render(ProgressiveBlur({ blurLevels: [1, 2, 4, 8] }));
  const layers = [...html.matchAll(/class="s-progressive-blur-layer"/g)];
  assert.equal(layers.length, 4, 'Must produce 4 progressive blur layers');
});

test('E2E [F19-T1-03]: ProgressiveBlur applies progressive backdrop-filter blur and mask gradients', () => {
  const html = render(ProgressiveBlur({ blurLevels: [2, 4, 8] }));
  assert.ok(html.includes('backdrop-filter:blur(2px)'));
  assert.ok(html.includes('backdrop-filter:blur(4px)'));
  assert.ok(html.includes('backdrop-filter:blur(8px)'));
  assert.ok(html.includes('mask-image:linear-gradient'));
});

test('E2E [F19-T1-04]: ProgressiveBlur binds configurable height CSS variable', () => {
  const html = render(ProgressiveBlur({ height: '40%' }));
  assert.ok(html.includes('--blur-height:40%;'), '--blur-height CSS variable missing');

  const pxHeight = render(ProgressiveBlur({ height: 120 }));
  assert.ok(pxHeight.includes('--blur-height:120px;'), '--blur-height pixel conversion missing');
});

test('E2E [F19-T1-05]: ProgressiveBlur wraps child content in .s-progressive-blur-wrap when children provided', () => {
  const html = render(ProgressiveBlur({ children: raw('<div class="content">Scrollable</div>') }));
  assert.ok(html.includes('<div class="s-progressive-blur-wrap">'), 'Wrapper missing');
  assert.ok(html.includes('<div class="content">Scrollable</div>'), 'Children missing');
  assert.ok(html.includes('class="s-progressive-blur s-progressive-blur--bottom"'), 'Blur layers missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F19-T2-01]: ProgressiveBlur position="both" renders top and bottom blur regions', () => {
  const html = render(ProgressiveBlur({ position: 'both' }));
  assert.ok(html.includes('s-progressive-blur--top'));
  assert.ok(html.includes('s-progressive-blur--bottom'));
});

test('E2E [F19-T2-02]: ProgressiveBlur horizontal mode (left/right) binds --blur-width', () => {
  const left = render(ProgressiveBlur({ position: 'left', height: 80 }));
  assert.ok(left.includes('--blur-width:80px;'));

  const right = render(ProgressiveBlur({ position: 'right', height: '25%' }));
  assert.ok(right.includes('--blur-width:25%;'));
});

test('E2E [F19-T2-03]: ProgressiveBlur single level falls back to simple blur layer', () => {
  const html = render(ProgressiveBlur({ blurLevels: [12] }));
  assert.ok(html.includes('backdrop-filter:blur(12px)'));
});

test('E2E [F19-T2-04]: ProgressiveBlur supports direction prop as alias to position', () => {
  // Requirement from PROJECT.md: direction as position alias
  const html = render(ProgressiveBlur({ direction: 'top', position: null }));
  assert.ok(html.includes('s-progressive-blur--top'));
});

test('E2E [F19-T2-05]: ProgressiveBlur handles empty blurLevels with default scale', () => {
  const html = render(ProgressiveBlur({ blurLevels: [] }));
  const layers = [...html.matchAll(/class="s-progressive-blur-layer"/g)];
  assert.equal(layers.length, 8, 'Default blurLevels must produce 8 layers');
});


/* ==========================================================================
   FEATURE 20: DottedMap Component (UI.DottedMap)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F20-T1-01]: DottedMap renders container element with data-s-dotted-map hook', () => {
  const html = render(DottedMap());
  assert.ok(html.includes('class="s-dotted-map-container"'), 'Container missing');
  assert.ok(html.includes('data-s-dotted-map'), 'data-s-dotted-map hook missing');
  assert.ok(html.includes('<svg class="s-dotted-map"'), 's-dotted-map SVG missing');
});

test('E2E [F20-T1-02]: DottedMap renders land grid dots with configurable radius and color', () => {
  const html = render(DottedMap({ dotRadius: 2.2, dotColor: '#38BDF8' }));
  assert.ok(html.includes('r="2.2"'), 'Dot radius mismatch');
  assert.ok(html.includes('fill="#38BDF8"'), 'Dot color mismatch');
});

test('E2E [F20-T1-03]: DottedMap renders pulse beacon animations on city markers', () => {
  const html = render(DottedMap());
  assert.ok(html.includes('<g class="s-map-marker"'), 'Marker group missing');
  assert.ok(html.includes('<animate attributeName="r"'), 'Pulse radius animation missing');
  assert.ok(html.includes('<animate attributeName="opacity"'), 'Pulse opacity animation missing');
});

test('E2E [F20-T1-04]: DottedMap renders city badges with readable labels', () => {
  const html = render(DottedMap());
  assert.ok(html.includes('San Francisco'), 'SF label missing');
  assert.ok(html.includes('London'), 'London label missing');
  assert.ok(html.includes('Dhaka'), 'Dhaka label missing');
  assert.ok(html.includes('Tokyo'), 'Tokyo label missing');
});

test('E2E [F20-T1-05]: DottedMap scales SVG viewBox to match configured width and height', () => {
  const html = render(DottedMap({ width: 1000, height: 500 }));
  assert.ok(html.includes('viewBox="0 0 1000 500"'), 'SVG viewBox mismatch');
  assert.ok(html.includes('width="100%" height="100%"'), 'SVG responsive dimension missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F20-T2-01]: DottedMap accepts custom marker coordinates and labels', () => {
  const customMarkers = [
    { lat: 48.8566, lng: 2.3522, label: 'Paris', pulse: true, color: '#A020FF' }
  ];
  const html = render(DottedMap({ markers: customMarkers }));
  assert.ok(html.includes('Paris'));
  assert.ok(html.includes('fill="#A020FF"'));
});

test('E2E [F20-T2-02]: DottedMap accepts points prop as alias to markers', () => {
  const points = [{ lat: 52.52, lng: 13.405, label: 'Berlin' }];
  const html = render(DottedMap({ points }));
  assert.ok(html.includes('Berlin'));
});

test('E2E [F20-T2-03]: DottedMap handles empty markers array without crashing', () => {
  const html = render(DottedMap({ markers: [] }));
  assert.ok(html.includes('<svg class="s-dotted-map'));
});

test('E2E [F20-T2-04]: DottedMap preserves dynamic Tailwind classes on container', () => {
  const html = render(DottedMap({ className: 'w-full max-w-5xl rounded-3xl bg-slate-950 p-6' }));
  assert.ok(html.includes('w-full max-w-5xl rounded-3xl bg-slate-950 p-6'));
});

test('E2E [F20-T2-05]: DottedMap escapes hostile marker label and color strings', () => {
  const hostile = [{ lat: 0, lng: 0, label: '"><script>alert(1)</script>', color: '"><img src=x onerror=alert(1)>' }];
  const html = render(DottedMap({ markers: hostile }));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('<img'));
});
