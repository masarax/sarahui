import test from 'node:test';
import assert from 'node:assert/strict';
import { Marquee } from './Marquee.js';
import { raw } from '../../utilities/raw.js';

test('Marquee Pillar 1: renders cleanly with default track repeats', () => {
  const html = String(Marquee({ children: 'Item' }));
  assert.ok(html.includes('class="s-marquee group"'), 'base class missing');
  assert.ok(html.includes('data-s-marquee'), 'data-s-marquee hook missing');
  const tracks = [...html.matchAll(/<div class="s-marquee-track"/g)];
  assert.equal(tracks.length, 4, 'default repeat count must produce 4 track divs');
});

test('Marquee Pillar 2: preserves dynamic classes, inline styles, and CSS variables', () => {
  const html = String(Marquee({
    duration: 15,
    gap: '2rem',
    className: 'custom-marquee-class',
    attrs: { id: 'marquee-section' }
  }));
  assert.ok(html.includes('custom-marquee-class'), 'custom className must propagate');
  assert.ok(html.includes('id="marquee-section"'), 'attrs must propagate');
  assert.ok(html.includes('--duration:15s;'), '--duration variable must be present');
  assert.ok(html.includes('--gap:2rem;'), '--gap variable must be present');
});

test('Marquee Pillar 3: marks duplicate tracks with aria-hidden="true"', () => {
  const html = String(Marquee({ children: raw('<span>Content</span>') }));
  const hiddenTracks = [...html.matchAll(/class="s-marquee-track"[^>]*aria-hidden="true"/g)];
  assert.equal(hiddenTracks.length, 3, 'duplicate tracks must be hidden from screen readers');
  assert.ok(html.includes('<div class="s-marquee-track"><span>Content</span></div>'), 'primary track must not be aria-hidden');
});

test('Marquee Pillar 4: handles direction, speed, and repeat clamping bounds', () => {
  const vert = String(Marquee({ vertical: true, reverse: true, pauseOnHover: true }));
  assert.ok(vert.includes('s-marquee--vertical'), 'vertical modifier missing');
  assert.ok(vert.includes('s-marquee--reverse'), 'reverse modifier missing');
  assert.ok(vert.includes('s-marquee--pause'), 'pause modifier missing');

  const clampedMin = String(Marquee({ repeat: 1 }));
  const minTracks = [...clampedMin.matchAll(/<div class="s-marquee-track"/g)];
  assert.equal(minTracks.length, 2, 'repeat must clamp to minimum 2');

  const clampedMax = String(Marquee({ repeat: 20 }));
  const maxTracks = [...clampedMax.matchAll(/<div class="s-marquee-track"/g)];
  assert.equal(maxTracks.length, 8, 'repeat must clamp to maximum 8');

  const numGap = String(Marquee({ gap: 32 }));
  assert.ok(numGap.includes('--gap:32px;'), 'numeric gap must convert to px');
});
