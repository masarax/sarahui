import test from 'node:test';
import assert from 'node:assert/strict';
import { GlareHover } from './GlareHover.js';

test('GlareHover Pillar 1: renders container, surface, and aria-hidden glare overlay', () => {
  const html = String(GlareHover({ children: 'Hover Card' }));
  assert.ok(html.includes('class="s-glare-hover'), 'base class missing');
  assert.ok(html.includes('class="s-glare-hover-surface'), 'surface element missing');
  assert.ok(html.includes('class="s-glare-hover-glare'), 'glare layer missing');
  assert.ok(html.includes('aria-hidden="true"'), 'glare layer must be aria-hidden');
});

test('GlareHover Pillar 2: computes CSS variables for angle, duration, size, color, and opacity', () => {
  const html = String(GlareHover({
    angle: -30,
    duration: 800,
    size: 300,
    color: '#60a5fa',
    opacity: 0.5,
    width: 320,
    height: 240
  }));
  assert.match(html, /--gh-angle:-30deg;/, '--gh-angle missing');
  assert.match(html, /--gh-duration:800ms;/, '--gh-duration missing');
  assert.match(html, /--gh-size:300%;/, '--gh-size missing');
  assert.match(html, /--gh-color:#60a5fa;/, '--gh-color missing');
  assert.match(html, /--gh-opacity:0.5;/, '--gh-opacity missing');
  assert.match(html, /width:320px;/, 'width missing');
  assert.match(html, /height:240px;/, 'height missing');
});

test('GlareHover Pillar 3: forwards accessibility attributes cleanly', () => {
  const html = String(GlareHover({ attrs: { id: 'glare-panel', role: 'region', 'aria-label': 'Interactive Card' } }));
  assert.ok(html.includes('id="glare-panel"'), 'id missing');
  assert.ok(html.includes('role="region"'), 'role missing');
  assert.ok(html.includes('aria-label="Interactive Card"'), 'aria-label missing');
});

test('GlareHover Pillar 4: handles playOnce, percentage dimensions, and zero angle/opacity', () => {
  const once = String(GlareHover({ playOnce: true }));
  assert.ok(once.includes('s-glare-hover--once'), 'playOnce class missing');

  const responsive = String(GlareHover({ width: '100%', height: '18rem' }));
  assert.match(responsive, /width:100%;/, 'percentage width missing');
  assert.match(responsive, /height:18rem;/, 'rem height missing');

  const zero = String(GlareHover({ angle: 0, opacity: 0 }));
  assert.match(zero, /--gh-angle:0deg;/, 'zero angle missing');
  assert.match(zero, /--gh-opacity:0;/, 'zero opacity missing');
});
