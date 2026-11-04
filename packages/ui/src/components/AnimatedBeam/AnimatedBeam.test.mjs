import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimatedBeam } from './AnimatedBeam.js';

test('AnimatedBeam Pillar 1: renders SVG element with linearGradient and paths', () => {
  const html = String(AnimatedBeam());
  assert.ok(html.includes('<svg class="s-animated-beam"'), 'svg element missing');
  assert.ok(html.includes('<linearGradient'), 'linearGradient definition missing');
  assert.ok(html.includes('class="s-beam-path-bg"'), 'background path missing');
  assert.ok(html.includes('class="s-beam-path"'), 'animated path missing');
});

test('AnimatedBeam Pillar 2: binds duration and delay to CSS custom properties', () => {
  const html = String(AnimatedBeam({ duration: 5, delay: 1.5, className: 'beam-pointer-none' }));
  assert.match(html, /--beam-duration:5s/, '--beam-duration variable missing');
  assert.match(html, /--beam-delay:1.5s/, '--beam-delay variable missing');
  assert.ok(html.includes('beam-pointer-none'), 'dynamic classes missing');
});

test('AnimatedBeam Pillar 3: marks decorative SVG with aria-hidden="true"', () => {
  const html = String(AnimatedBeam());
  assert.ok(html.includes('aria-hidden="true"'), 'SVG must be aria-hidden');
});

test('AnimatedBeam Pillar 4: handles straight lines, quadratic curves, and reverse mode', () => {
  const straight = String(AnimatedBeam({ startX: 0, startY: 0, endX: 100, endY: 0, curvature: 0 }));
  assert.ok(straight.includes('d="M 0 0 L 100 0"'), 'straight line formula missing');

  const curved = String(AnimatedBeam({ startX: 0, startY: 100, endX: 200, endY: 100, curvature: 50 }));
  assert.ok(curved.includes('Q 100 50 200 100'), 'quadratic bezier formula missing');

  const rev = String(AnimatedBeam({ reverse: true }));
  assert.ok(rev.includes('s-beam-path--reverse'), 'reverse modifier missing');
});
