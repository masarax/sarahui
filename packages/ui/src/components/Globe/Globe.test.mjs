import test from 'node:test';
import assert from 'node:assert/strict';
import { Globe } from './Globe.js';

test('Globe Pillar 1: renders container with canvas and glow overlay', () => {
  const html = String(Globe());
  assert.ok(html.includes('class="s-globe-container'), 'container class missing');
  assert.ok(html.includes('<canvas class="s-globe-canvas" data-s-globe'), 'canvas element missing');
  assert.ok(html.includes('class="s-globe-glow"'), 'glow element missing');
});

test('Globe Pillar 2: scales internal canvas 2x and binds dimensions', () => {
  const html = String(Globe({ size: 300, className: 'mx-auto' }));
  assert.ok(html.includes('width:300px;height:300px;'), 'container dimensions missing');
  assert.ok(html.includes('width="600" height="600"'), 'canvas 2x Retina resolution missing');
  assert.ok(html.includes('mx-auto'), 'dynamic class missing');
});

test('Globe Pillar 3: forwards custom accessibility attributes and role', () => {
  const html = String(Globe({ attrs: { role: 'img', 'aria-label': 'Interactive Globe Visualization' } }));
  assert.ok(html.includes('role="img"'), 'role missing');
  assert.ok(html.includes('aria-label="Interactive Globe Visualization"'), 'aria-label missing');
});

test('Globe Pillar 4: clamps size boundaries (160 to 600) and serializes config', () => {
  const minClamped = String(Globe({ size: 50 }));
  assert.ok(minClamped.includes('width:160px;height:160px;'), 'size must clamp to min 160');

  const maxClamped = String(Globe({ size: 1200 }));
  assert.ok(maxClamped.includes('width:600px;height:600px;'), 'size must clamp to max 600');

  const withConfig = String(Globe({ config: { dark: 1, scale: 1.2 } }));
  assert.ok(withConfig.includes('data-globe-config='), 'data-globe-config missing');
});
