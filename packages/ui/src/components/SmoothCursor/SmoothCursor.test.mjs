import test from 'node:test';
import assert from 'node:assert/strict';
import { SmoothCursor } from './SmoothCursor.js';
import { raw } from '../../utilities/raw.js';

test('SmoothCursor Pillar 1: renders container and follower element with default cursor SVG', () => {
  const html = String(SmoothCursor());
  assert.ok(html.includes('class="s-smooth-cursor-container"'), 'container class missing');
  assert.ok(html.includes('data-s-smooth-cursor'), 'data-s-smooth-cursor hook missing');
  assert.ok(html.includes('class="s-smooth-cursor-follower"'), 'follower element missing');
  assert.ok(html.includes('<svg'), 'cursor SVG missing');
});

test('SmoothCursor Pillar 2: applies color parameter and preserves custom classes', () => {
  const html = String(SmoothCursor({ color: '#5B3DF5', className: 'pointer-events-none' }));
  assert.ok(html.includes('fill="#5B3DF5"'), 'custom fill color missing');
  assert.ok(html.includes('pointer-events-none'), 'dynamic classes missing');
});

test('SmoothCursor Pillar 3: marks container with aria-hidden="true"', () => {
  const html = String(SmoothCursor());
  assert.ok(html.includes('aria-hidden="true"'), 'container must have aria-hidden="true"');
});

test('SmoothCursor Pillar 4: supports custom cursor markup and handles currentColor', () => {
  const current = String(SmoothCursor({ color: 'currentColor' }));
  assert.ok(current.includes('fill="currentColor"'), 'currentColor fallback missing');

  const custom = String(SmoothCursor({ cursor: raw('<span class="custom-dot"></span>') }));
  assert.ok(custom.includes('custom-dot'), 'custom cursor markup missing');
});
