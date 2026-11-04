import test from 'node:test';
import assert from 'node:assert/strict';
import { HeroVideoDialog } from './HeroVideoDialog.js';

test('HeroVideoDialog Pillar 1: renders thumbnail trigger and native dialog element', () => {
  const html = String(HeroVideoDialog());
  assert.ok(html.includes('class="s-hero-video-wrap'), 'wrapper class missing');
  assert.ok(html.includes('class="s-hero-video-thumbnail"'), 'thumbnail button missing');
  assert.ok(html.includes('<dialog'), 'HTML5 dialog element missing');
  assert.ok(html.includes('<iframe'), 'iframe player missing');
});

test('HeroVideoDialog Pillar 2: preserves dynamic classes and animation modifiers', () => {
  const html = String(HeroVideoDialog({
    className: 'max-w-4xl mx-auto',
    animationStyle: 'fade'
  }));
  assert.ok(html.includes('max-w-4xl mx-auto'), 'dynamic class missing');
  assert.ok(html.includes('s-video-anim--fade'), 'animation modifier missing');
});

test('HeroVideoDialog Pillar 3: enforces accessible trigger, close, and dialog attributes', () => {
  const html = String(HeroVideoDialog({ thumbnailAlt: 'Product Tour Video' }));
  assert.ok(html.includes('aria-label="Play video"'), 'trigger aria-label missing');
  assert.ok(html.includes('aria-label="Close video"'), 'close button aria-label missing');
  assert.ok(html.includes('alt="Product Tour Video"'), 'alt text missing');
  assert.ok(html.includes('title="Video player"'), 'iframe title missing');
  assert.ok(html.includes('data-s-dialog-close'), 'close trigger attribute missing');
});

test('HeroVideoDialog Pillar 4: sanitizes protocols and produces unique IDs', () => {
  const safe = String(HeroVideoDialog({ videoSrc: 'javascript:alert(1)', thumbnailSrc: 'javascript:alert(2)' }));
  assert.ok(!safe.includes('javascript:'), 'unsafe javascript: protocol must be blocked');

  const first = String(HeroVideoDialog());
  const second = String(HeroVideoDialog());
  const id1 = first.match(/data-s-video-open="([^"]+)"/)?.[1];
  const id2 = second.match(/data-s-video-open="([^"]+)"/)?.[1];
  assert.notEqual(id1, id2, 'distinct instances must generate unique IDs');
});
