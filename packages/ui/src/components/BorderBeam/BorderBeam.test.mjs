import test from 'node:test';
import assert from 'node:assert/strict';
import { BorderBeam } from './BorderBeam.js';

test('BorderBeam Pillar 1: renders border beam container and glow element', () => {
  const html = String(BorderBeam());
  assert.ok(html.includes('class="s-border-beam'), 'base class missing');
  assert.ok(html.includes('class="s-border-beam-glow'), 'glow element missing');
});

test('BorderBeam Pillar 2: binds CSS variables for dimensions, duration, delay, and border width', () => {
  const html = String(BorderBeam({
    size: 100,
    duration: 8,
    delay: 2,
    borderWidth: 2,
    className: 'custom-beam',
    style: 'opacity: 0.8;'
  }));
  assert.match(html, /--border-beam-width:2px/, '--border-beam-width missing');
  assert.match(html, /width:100px/, 'width dimension missing');
  assert.match(html, /height:100px/, 'height dimension missing');
  assert.match(html, /--duration:8s/, '--duration variable missing');
  assert.match(html, /--delay:2s/, '--delay variable missing');
  assert.ok(html.includes('custom-beam'), 'custom class missing');
  assert.ok(html.includes('opacity: 0.8'), 'custom inline style missing');
});

test('BorderBeam Pillar 3: marks container with aria-hidden="true"', () => {
  const html = String(BorderBeam());
  assert.ok(html.includes('aria-hidden="true"'), 'container must be aria-hidden');
});

test('BorderBeam Pillar 4: binds custom colorFrom/colorTo and eliminates string class sniffing', () => {
  const html = String(BorderBeam({
    colorFrom: '#6366f1',
    colorTo: '#ec4899',
    className: 'structured-card'
  }));
  assert.match(html, /--color-from:#6366f1/, '--color-from missing');
  assert.match(html, /--color-to:#ec4899/, '--color-to missing');
  assert.ok(!html.includes('#ef4444'), 'must not sniff unrelated class names like structured');
});
