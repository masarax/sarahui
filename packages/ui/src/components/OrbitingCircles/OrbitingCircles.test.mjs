import test from 'node:test';
import assert from 'node:assert/strict';
import { OrbitingCircles } from './OrbitingCircles.js';

test('OrbitingCircles Pillar 1: renders circular orbit path and orbit items', () => {
  const html = String(OrbitingCircles());
  assert.ok(html.includes('class="s-orbiting-circles'), 'base class missing');
  assert.ok(html.includes('s-orbit-circle-path'), 'orbit path SVG missing');
  assert.ok(html.includes('class="s-orbit-item'), 'orbit items missing');
});

test('OrbitingCircles Pillar 2: calculates angular spacing and binds CSS variables', () => {
  const html = String(OrbitingCircles({ radius: 200, duration: 15, iconSize: 40 }));
  assert.ok(html.includes('--radius:200;'), '--radius variable missing');
  assert.ok(html.includes('--duration:15;'), '--duration variable missing');
  assert.ok(html.includes('--icon-size:40px;'), '--icon-size variable missing');
});

test('OrbitingCircles Pillar 3: forwards delay parameter to inline styles', () => {
  const html = String(OrbitingCircles({ delay: 5 }));
  const hasDelay = html.includes('--delay:5') || html.includes('animation-delay: 5s') || html.includes('-5s');
  assert.ok(hasDelay, 'delay parameter must be bound into styles');
});

test('OrbitingCircles Pillar 4: handles reverse modifier and path suppression', () => {
  const reverseHtml = String(OrbitingCircles({ reverse: true }));
  assert.ok(reverseHtml.includes('s-orbit-reverse'), 'reverse class missing');

  const noPathHtml = String(OrbitingCircles({ path: false }));
  assert.ok(!noPathHtml.includes('s-orbit-circle-path'), 'path SVG should be omitted when path: false');
});
