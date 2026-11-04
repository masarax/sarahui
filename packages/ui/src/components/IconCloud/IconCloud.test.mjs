import test from 'node:test';
import assert from 'node:assert/strict';
import { IconCloud } from './IconCloud.js';

test('IconCloud Pillar 1: renders wrapper and canvas with dimensions', () => {
  const html = String(IconCloud());
  assert.ok(html.includes('class="s-icon-cloud-wrap'), 'wrapper class missing');
  assert.ok(html.includes('class="s-icon-cloud-canvas" data-s-icon-cloud'), 'canvas element missing');
  assert.ok(html.includes('width="340" height="340"'), 'canvas dimensions missing');
});

test('IconCloud Pillar 2: preserves dynamic classes and serializes icon URLs', () => {
  const html = String(IconCloud({
    slugs: ['react', 'nextdotjs'],
    className: 'max-w-xs'
  }));
  assert.ok(html.includes('max-w-xs'), 'dynamic class missing');
  assert.ok(html.includes('data-images='), 'data-images attribute missing');
  assert.ok(html.includes('cdn.simpleicons.org/react'), 'serialized react slug missing');
});

test('IconCloud Pillar 3: declares role="img" and accessible pause control', () => {
  const html = String(IconCloud());
  assert.ok(html.includes('role="img"'), 'role="img" missing');
  assert.ok(html.includes('aria-label="Interactive 3D Icon Cloud"'), 'canvas aria-label missing');
  assert.ok(html.includes('aria-label="Pause animation"'), 'pause control aria-label missing');
});

test('IconCloud Pillar 4: allows suppressing pause control and handles direct image URLs', () => {
  const noCtrl = String(IconCloud({ showControl: false }));
  assert.ok(!noCtrl.includes('s-icon-cloud-ctrl'), 'control button should be suppressed');

  const directImages = ['/icon1.svg', '/icon2.svg'];
  const direct = String(IconCloud({ images: directImages }));
  assert.ok(direct.includes('/icon1.svg'), 'direct image URL missing');
});
