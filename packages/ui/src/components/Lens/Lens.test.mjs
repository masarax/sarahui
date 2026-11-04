import test from 'node:test';
import assert from 'node:assert/strict';
import { Lens } from './Lens.js';

test('Lens Pillar 1: renders container, target, overlay, and loupe elements', () => {
  const html = String(Lens({ children: '<div>Target Content</div>' }));
  assert.ok(html.includes('class="s-lens-container'), 'container class missing');
  assert.ok(html.includes('data-s-lens'), 'data-s-lens hook missing');
  assert.ok(html.includes('class="s-lens-target"'), 'target layer missing');
  assert.ok(html.includes('class="s-lens-overlay"'), 'overlay layer missing');
  assert.ok(html.includes('class="s-lens-loupe"'), 'loupe element missing');
});

test('Lens Pillar 2: computes CSS variables and preserves custom classes', () => {
  const html = String(Lens({
    zoomFactor: 2.5,
    lensSize: 200,
    className: 'rounded-xl overflow-hidden'
  }));
  assert.ok(html.includes('--lens-size: 200px;'), '--lens-size variable missing');
  assert.ok(html.includes('--lens-radius: 100px;'), '--lens-radius variable missing');
  assert.ok(html.includes('--lens-zoom: 2.5;'), '--lens-zoom variable missing');
  assert.ok(html.includes('rounded-xl overflow-hidden'), 'custom classes missing');
});

test('Lens Pillar 3: declares role="region", tabindex="0", and hides decorative layers', () => {
  const html = String(Lens({ ariaLabel: 'Product Magnifier' }));
  assert.ok(html.includes('role="region"'), 'role="region" missing');
  assert.ok(html.includes('aria-label="Product Magnifier"'), 'aria-label missing');
  assert.ok(html.includes('tabindex="0"'), 'tabindex="0" missing');
  assert.ok(html.includes('class="s-lens-overlay" aria-hidden="true"'), 'overlay must be aria-hidden');
  assert.ok(html.includes('class="s-lens-loupe" aria-hidden="true"'), 'loupe must be aria-hidden');
});

test('Lens Pillar 4: handles isStatic mode and defaultPosition coordinates', () => {
  const staticLens = String(Lens({ isStatic: true, position: { x: 50, y: 50 } }));
  assert.ok(staticLens.includes('data-static="true"'), 'data-static missing');
  assert.ok(staticLens.includes('--lens-x: 50px;'), '--lens-x variable missing');
  assert.ok(staticLens.includes('--lens-y: 50px;'), '--lens-y variable missing');
});
