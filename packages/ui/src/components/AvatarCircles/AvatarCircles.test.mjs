import test from 'node:test';
import assert from 'node:assert/strict';
import { AvatarCircles } from './AvatarCircles.js';

test('AvatarCircles Pillar 1: renders avatar group container and default images', () => {
  const html = String(AvatarCircles());
  assert.ok(html.includes('class="s-avatar-circles'), 'base class missing');
  assert.ok(html.includes('class="s-avatar-img"'), 'avatar images missing');
});

test('AvatarCircles Pillar 2: preserves dynamic Tailwind classes and handles custom avatars', () => {
  const custom = ['https://example.com/a.jpg', 'https://example.com/b.jpg'];
  const html = String(AvatarCircles({ avatarUrls: custom, className: 'space-x-reverse' }));
  assert.ok(html.includes('space-x-reverse'), 'dynamic class missing');
  assert.ok(html.includes('src="https://example.com/a.jpg"'), 'custom avatar missing');
});

test('AvatarCircles Pillar 3: sets descriptive alt and loading="lazy" on images', () => {
  const html = String(AvatarCircles());
  assert.ok(html.includes('alt="Avatar"'), 'alt text missing');
  assert.ok(html.includes('loading="lazy"'), 'lazy loading attribute missing');
});

test('AvatarCircles Pillar 4: renders counter badge only when numPeople > 0', () => {
  const withCount = String(AvatarCircles({ numPeople: 99 }));
  assert.ok(withCount.includes('class="s-avatar-circles-count">+99</span>'), 'counter badge missing');

  const zeroCount = String(AvatarCircles({ numPeople: 0 }));
  assert.ok(!zeroCount.includes('s-avatar-circles-count'), 'counter badge should be omitted when count is 0');
});
