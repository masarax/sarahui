/**
 * SarahUI E2E Test Suite - Components FX (Tier 1 & Tier 2)
 * Features 21-25:
 *   - Feature 21: AnimatedBeam
 *   - Feature 22: BorderBeam
 *   - Feature 23: ShineBorder
 *   - Feature 24: MagicCard
 *   - Feature 25: GlareHover
 *
 * Requirements: PROJECT.md § Feature Inventory (Items 25-29) & AUDIT_REPORT.md § 4.18-4.21, 5
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import * as UI from '../../packages/ui/src/templates.js';

const S = (markup) => String(markup);

describe('Feature 21: AnimatedBeam (Tiers 1 & 2)', () => {
  // Tier 1: Happy path
  test('renders SVG element with class s-animated-beam and aria-hidden="true"', () => {
    const html = S(UI.AnimatedBeam());
    assert.match(html, /<svg\b[^>]*\bclass="[^"]*s-animated-beam[^"]*"/);
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /fill="none"/);
  });

  test('generates linearGradient with unique ID and color stops', () => {
    const html = S(UI.AnimatedBeam({
      gradientStartColor: '#10b981',
      gradientStopColor: '#3b82f6'
    }));
    assert.match(html, /<linearGradient id="(?:s-)?beam-[^"]+"/);
    assert.match(html, /stop-color="#10b981"/);
    assert.match(html, /stop-color="#3b82f6"/);
  });

  test('computes straight line path when curvature is 0', () => {
    const html = S(UI.AnimatedBeam({
      startX: 50,
      startY: 100,
      endX: 400,
      endY: 100,
      curvature: 0
    }));
    assert.match(html, /d="M 50 100 L 400 100"/);
  });

  test('computes quadratic bezier curve when curvature is non-zero', () => {
    const html = S(UI.AnimatedBeam({
      startX: 10,
      startY: 50,
      endX: 210,
      endY: 50,
      curvature: 30
    }));
    // midX = (10 + 210) / 2 = 110; controlY = 50 - 30 = 20
    assert.match(html, /d="M 10 50 Q 110 20 210 50"/);
  });

  test('renders background track path and animated beam path', () => {
    const html = S(UI.AnimatedBeam({
      pathColor: '#e2e8f0',
      pathWidth: 3,
      pathOpacity: 0.4
    }));
    assert.match(html, /<path class="s-beam-path-bg"[^>]*stroke="#e2e8f0"[^>]*stroke-width="3"[^>]*stroke-opacity="0.4"/);
    assert.match(html, /<path class="s-beam-path"[^>]*stroke="url\(#(?:s-)?beam-[^)]+\)"[^>]*stroke-width="3.5"/);
  });

  test('applies reverse animation class when reverse is true', () => {
    const html = S(UI.AnimatedBeam({ reverse: true }));
    assert.match(html, /class="s-beam-path s-beam-path--reverse"/);
  });

  test('respects custom explicit path "d" attribute', () => {
    const customD = 'M 0 0 C 100 0, 100 100, 200 100';
    const html = S(UI.AnimatedBeam({ d: customD }));
    assert.match(html, /d="M 0 0 C 100 0, 100 100, 200 100"/);
  });

  test('forwards duration and delay to CSS custom properties', () => {
    const html = S(UI.AnimatedBeam({ duration: 5, delay: 1.5 }));
    assert.match(html, /--beam-duration:5s/);
    assert.match(html, /--beam-delay:1.5s/);
  });

  // Tier 2: Boundary & Edge conditions
  test('handles negative curvature (downward arc)', () => {
    const html = S(UI.AnimatedBeam({
      startX: 0,
      startY: 100,
      endX: 200,
      endY: 100,
      curvature: -40
    }));
    // controlY = 100 - (-40) = 140
    assert.match(html, /d="M 0 100 Q 100 140 200 100"/);
  });

  test('handles zero start and end coordinates', () => {
    const html = S(UI.AnimatedBeam({ startX: 0, startY: 0, endX: 0, endY: 0, curvature: 0 }));
    assert.match(html, /d="M 0 0 L 0 0"/);
  });

  test('handles custom className and attributes cleanly', () => {
    const html = S(UI.AnimatedBeam({
      className: 'custom-beam pointer-events-none',
      attrs: { id: 'beam-connection-1', 'data-testid': 'animated-beam' }
    }));
    assert.match(html, /class="s-animated-beam custom-beam pointer-events-none"/);
    assert.match(html, /id="beam-connection-1"/);
    assert.match(html, /data-testid="animated-beam"/);
  });
});

describe('Feature 22: BorderBeam (Tiers 1 & 2)', () => {
  // Tier 1: Happy path
  test('renders border beam container with aria-hidden="true" and glow element', () => {
    const html = S(UI.BorderBeam());
    assert.match(html, /<div\b[^>]*\bclass="[^"]*s-border-beam[^"]*"/);
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /<div class="s-border-beam-glow"/);
  });

  test('sets CSS variables for size, duration, delay, and border width', () => {
    const html = S(UI.BorderBeam({
      size: 80,
      duration: 10,
      delay: 2,
      borderWidth: 2
    }));
    assert.match(html, /--border-beam-width:2px/);
    assert.match(html, /width:80px/);
    assert.match(html, /height:80px/);
    assert.match(html, /--duration:10s/);
    assert.match(html, /--delay:2s/);
  });

  test('sets colorFrom and colorTo in CSS and background gradient', () => {
    const html = S(UI.BorderBeam({
      colorFrom: '#6366f1',
      colorTo: '#ec4899'
    }));
    assert.match(html, /--color-from:#6366f1/);
    assert.match(html, /--color-to:#ec4899/);
    assert.match(html, /linear-gradient\(to left, #6366f1, #ec4899, transparent\)/);
  });

  test('supports reverse animation modifier', () => {
    const html = S(UI.BorderBeam({ reverse: true }));
    assert.match(html, /class="s-border-beam s-border-beam--reverse"/);
  });

  test('supports initialOffset percentage', () => {
    const html = S(UI.BorderBeam({ initialOffset: 25 }));
    assert.match(html, /--initial-offset:25%/);
  });

  // Tier 2: Boundary & Edge conditions
  test('handles zero initialOffset, delay, and boundary sizes', () => {
    const html = S(UI.BorderBeam({ initialOffset: 0, delay: 0, size: 200, borderWidth: 4 }));
    assert.match(html, /--initial-offset:0%/);
    assert.match(html, /width:200px/);
    assert.match(html, /--border-beam-width:4px/);
  });

  test('preserves user custom classes and custom style', () => {
    const html = S(UI.BorderBeam({
      className: 'beam-glow-card',
      style: 'opacity: 0.9;'
    }));
    assert.match(html, /class="s-border-beam beam-glow-card"/);
    assert.match(html, /opacity: 0.9/);
  });

  test('does not sniff unrelated class names like "structured" to override custom colors', () => {
    // Audit Requirement (AUDIT_REPORT.md § 4.18 & PROJECT.md Item 26):
    // Class string sniffing should not hijack explicit colorFrom/colorTo.
    const html = S(UI.BorderBeam({
      colorFrom: '#123456',
      colorTo: '#abcdef',
      className: 'structured-layout'
    }));
    assert.match(html, /--color-from:#123456/);
    assert.match(html, /--color-to:#abcdef/);
  });
});

describe('Feature 23: ShineBorder (Tiers 1 & 2)', () => {
  // Tier 1: Happy path
  test('renders shine border outer container and inner content wrapper', () => {
    const html = S(UI.ShineBorder({ children: 'Shining content' }));
    assert.match(html, /<div\b[^>]*\bclass="s-shine-border"[^>]*>/);
    assert.match(html, /<div class="s-shine-border-inner">Shining content<\/div>/);
  });

  test('applies custom border width, duration, and shine color to inline styles', () => {
    const html = S(UI.ShineBorder({
      borderWidth: 2,
      duration: 8,
      color: '#3b82f6',
      children: 'Card with shine'
    }));
    assert.match(html, /border-width:2px;/);
    assert.match(html, /--shine-duration:8s;/);
    assert.match(html, /--shine-color:#3b82f6;/);
  });

  test('supports array of colors for multi-stop shine gradient', () => {
    const html = S(UI.ShineBorder({
      color: ['#ff0080', '#7928ca', '#0070f3'],
      children: 'Rainbow shine'
    }));
    assert.match(html, /--shine-color:#ff0080,#7928ca,#0070f3;/);
  });

  test('supports shineColor alias prop', () => {
    const html = S(UI.ShineBorder({
      shineColor: '#10b981',
      children: 'Green shine'
    }));
    assert.match(html, /--shine-color:#10b981;/);
  });

  // Tier 2: Boundary & Edge conditions
  test('renders interactive children markup cleanly without escaping', () => {
    const buttonHtml = UI.Button({ label: 'Click Me' });
    const html = S(UI.ShineBorder({ children: buttonHtml }));
    assert.match(html, /<button type="button"[^>]*class="s-button/);
    assert.match(html, /Click Me/);
  });

  test('handles empty children gracefully', () => {
    const html = S(UI.ShineBorder());
    assert.match(html, /<div class="s-shine-border-inner"><\/div>/);
  });

  test('forwards additional attrs and custom class names', () => {
    const html = S(UI.ShineBorder({
      attrs: { 'data-testid': 'shine-card', id: 'my-shine' },
      children: 'Content'
    }));
    assert.match(html, /data-testid="shine-card"/);
    assert.match(html, /id="my-shine"/);
  });
});

describe('Feature 24: MagicCard (Tiers 1 & 2)', () => {
  // Tier 1: Happy path
  test('renders magic card container with data attributes and aria-hidden decorative layers', () => {
    const html = S(UI.MagicCard({ children: 'Card Content' }));
    assert.match(html, /<div\b[^>]*\bclass="s-magic-card"/);
    assert.match(html, /data-s-magic-card="true"/);
    assert.match(html, /<div class="s-magic-card-bg" aria-hidden="true"><\/div>/);
    assert.match(html, /<div class="s-magic-card-spotlight" aria-hidden="true"><\/div>/);
    assert.match(html, /<div class="s-magic-card-content">Card Content<\/div>/);
  });

  test('renders orb layer when mode is set to "orb"', () => {
    const html = S(UI.MagicCard({ mode: 'orb', children: 'Orb Mode Card' }));
    assert.match(html, /data-mode="orb"/);
    assert.match(html, /<div class="s-magic-card-orb" aria-hidden="true"><\/div>/);
    assert.doesNotMatch(html, /s-magic-card-spotlight/);
  });

  test('forwards gradient and glow configuration to CSS variables', () => {
    const html = S(UI.MagicCard({
      gradientSize: 300,
      gradientColor: '#f59e0b',
      gradientOpacity: 0.6,
      gradientFrom: '#8b5cf6',
      gradientTo: '#ec4899',
      glowSize: 400,
      glowBlur: 50,
      children: 'Glow details'
    }));
    assert.match(html, /--gradient-size:300px/);
    assert.match(html, /--magic-color:#f59e0b/);
    assert.match(html, /--gradient-opacity:0.6/);
    assert.match(html, /--gradient-from:#8b5cf6/);
    assert.match(html, /--gradient-to:#ec4899/);
    assert.match(html, /--glow-size:400px/);
    assert.match(html, /--glow-blur:50px/);
  });

  test('preserves user custom classes and custom inline style', () => {
    const html = S(UI.MagicCard({
      className: 'border border-slate-700 rounded-2xl',
      style: 'min-height: 200px',
      children: 'Styled card'
    }));
    assert.match(html, /class="s-magic-card border border-slate-700 rounded-2xl"/);
    assert.match(html, /min-height: 200px/);
  });

  // Tier 2: Boundary & Edge conditions
  test('handles zero values and edge numeric parameters', () => {
    const html = S(UI.MagicCard({
      gradientSize: 0,
      gradientOpacity: 0,
      glowAngle: 0,
      glowOpacity: 0,
      children: 'Zero settings'
    }));
    assert.match(html, /--gradient-size:0px/);
    assert.match(html, /--gradient-opacity:0/);
    assert.match(html, /--glow-angle:0deg/);
    assert.match(html, /--glow-opacity:0/);
  });

  test('renders nested component hierarchy safely', () => {
    const inner = UI.raw('<h3 class="font-bold">Title</h3><p>Description text</p>');
    const html = S(UI.MagicCard({ children: inner }));
    assert.match(html, /<h3 class="font-bold">Title<\/h3>/);
    assert.match(html, /<p>Description text<\/p>/);
  });

  test('forwards arbitrary data and accessibility attributes', () => {
    const html = S(UI.MagicCard({
      attrs: {
        'role': 'article',
        'aria-label': 'Featured Feature',
        'data-feature': 'magic-card-demo'
      },
      children: 'Feature card'
    }));
    assert.match(html, /role="article"/);
    assert.match(html, /aria-label="Featured Feature"/);
    assert.match(html, /data-feature="magic-card-demo"/);
  });
});

describe('Feature 25: GlareHover (Tiers 1 & 2)', () => {
  // Tier 1: Happy path
  test('renders glare hover container, surface, and aria-hidden glare overlay', () => {
    const html = S(UI.GlareHover({ children: 'Hover Me' }));
    assert.match(html, /<div\b[^>]*\bclass="s-glare-hover\b/);
    assert.match(html, /<div class="s-glare-hover-surface">Hover Me<\/div>/);
    assert.match(html, /<div class="s-glare-hover-glare" aria-hidden="true"><\/div>/);
  });

  test('computes CSS variables for angle, duration, size, color, and opacity', () => {
    const html = S(UI.GlareHover({
      angle: -30,
      duration: 800,
      size: 300,
      color: '#60a5fa',
      opacity: 0.5,
      children: 'Custom Glare'
    }));
    assert.match(html, /--gh-angle:-30deg;/);
    assert.match(html, /--gh-duration:800ms;/);
    assert.match(html, /--gh-size:300%;/);
    assert.match(html, /--gh-color:#60a5fa;/);
    assert.match(html, /--gh-opacity:0.5;/);
  });

  test('applies playOnce modifier class when playOnce is true', () => {
    const html = S(UI.GlareHover({ playOnce: true, children: 'Once' }));
    assert.match(html, /class="s-glare-hover s-glare-hover--once\b/);
  });

  test('supports explicit width, height, and background', () => {
    const html = S(UI.GlareHover({
      width: 320,
      height: 240,
      background: 'rgba(255, 255, 255, 0.05)',
      children: 'Dimensions'
    }));
    assert.match(html, /width:320px;/);
    assert.match(html, /height:240px;/);
    assert.match(html, /background:rgba\(255, 255, 255, 0\.05\);/);
  });

  // Tier 2: Boundary & Edge conditions
  test('supports string width and height with percentage or rem', () => {
    const html = S(UI.GlareHover({
      width: '100%',
      height: '18rem',
      children: 'Responsive Glare'
    }));
    assert.match(html, /width:100%;/);
    assert.match(html, /height:18rem;/);
  });

  test('preserves dynamic Tailwind utility classes on container', () => {
    // Benchmark requirement: Dynamic Tailwind preservation without static rounded-xl overrides
    const html = S(UI.GlareHover({
      className: 'rounded-3xl shadow-xl transition-all duration-300',
      children: 'Dynamic Rounded'
    }));
    assert.match(html, /rounded-3xl/);
    assert.match(html, /shadow-xl/);
    assert.match(html, /transition-all/);
  });

  test('handles zero angle and boundary opacity values (0 and 1)', () => {
    const htmlZero = S(UI.GlareHover({ angle: 0, opacity: 0, children: 'Zero' }));
    assert.match(htmlZero, /--gh-angle:0deg;/);
    assert.match(htmlZero, /--gh-opacity:0;/);

    const htmlFull = S(UI.GlareHover({ angle: 180, opacity: 1, children: 'Full' }));
    assert.match(htmlFull, /--gh-angle:180deg;/);
    assert.match(htmlFull, /--gh-opacity:1;/);
  });

  test('forwards additional attrs cleanly', () => {
    const html = S(UI.GlareHover({
      attrs: { id: 'glare-card-1', 'data-accent': 'glare' },
      children: 'Card'
    }));
    assert.match(html, /id="glare-card-1"/);
    assert.match(html, /data-accent="glare"/);
  });
});
