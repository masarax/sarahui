import test from 'node:test';
import assert from 'node:assert/strict';
import { ProgressiveBlur } from './ProgressiveBlur.js';

test('ProgressiveBlur Pillar 1: renders progressive blur container and layers', () => {
  const html = String(ProgressiveBlur());
  assert.ok(html.includes('s-progressive-blur'), 'base class missing');
  assert.ok(html.includes('class="s-progressive-blur-layer"'), 'blur layer elements missing');
});

test('ProgressiveBlur Pillar 2: binds height/width CSS variables and wraps children', () => {
  const html = String(ProgressiveBlur({
    height: '40%',
    children: '<div>Underlying Card</div>'
  }));
  assert.ok(html.includes('class="s-progressive-blur-wrap"'), 'children wrapper missing');
  assert.ok(html.includes('--blur-height:40%;'), '--blur-height variable missing');
  assert.ok(html.includes('Underlying Card'), 'children content missing');
});

test('ProgressiveBlur Pillar 3: marks blur regions with aria-hidden="true"', () => {
  const html = String(ProgressiveBlur());
  assert.ok(html.includes('aria-hidden="true"'), 'blur layer must have aria-hidden');
});

test('ProgressiveBlur Pillar 4: handles horizontal orientation and position="both"', () => {
  const horiz = String(ProgressiveBlur({ position: 'left', height: 120 }));
  assert.ok(horiz.includes('s-progressive-blur--left'), 'left modifier missing');
  assert.ok(horiz.includes('--blur-width:120px;'), '--blur-width variable missing');

  const both = String(ProgressiveBlur({ position: 'both' }));
  assert.ok(both.includes('s-progressive-blur--top') && both.includes('s-progressive-blur--bottom'), 'both top and bottom blur regions missing');
});
