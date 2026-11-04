import test from 'node:test';
import assert from 'node:assert/strict';
import { Pointer } from './Pointer.js';
import { raw } from '../../utilities/raw.js';

test('Pointer Pillar 1: renders container and pointer glyph', () => {
  const html = String(Pointer({ name: 'Alex' }));
  assert.ok(html.includes('class="s-custom-pointer-wrap"'), 'wrapper class missing');
  assert.ok(html.includes('data-s-pointer'), 'data-s-pointer hook missing');
  assert.ok(html.includes('class="s-pointer-glyph"'), 'pointer glyph missing');
});

test('Pointer Pillar 2: applies custom colors and renders user badge', () => {
  const html = String(Pointer({ name: 'Sarah', color: '#10b981' }));
  assert.ok(html.includes('fill="#10b981"'), 'fill color missing');
  assert.ok(html.includes('background:#10b981;'), 'badge background missing');
  assert.ok(html.includes('<span>Sarah</span>'), 'badge text missing');
});

test('Pointer Pillar 3: marks pointer glyph with aria-hidden="true"', () => {
  const html = String(Pointer({ name: 'Cursor User' }));
  assert.ok(html.includes('class="s-pointer-glyph" aria-hidden="true"'), 'glyph must be aria-hidden');
});

test('Pointer Pillar 4: supports custom cursor override and omits badge when name empty', () => {
  const noName = String(Pointer({ name: '' }));
  assert.ok(!noName.includes('s-pointer-badge'), 'badge must be omitted when name empty');

  const customCursor = String(Pointer({ cursor: raw('<div class="custom-cursor">●</div>') }));
  assert.ok(customCursor.includes('class="custom-cursor"'), 'custom cursor override missing');
});
