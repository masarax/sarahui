import test from 'node:test';
import assert from 'node:assert/strict';
import { ShineBorder } from './ShineBorder.js';
import { raw } from '../../utilities/raw.js';

test('ShineBorder Pillar 1: renders outer container and inner content wrapper', () => {
  const html = String(ShineBorder({ children: 'Content' }));
  assert.ok(html.includes('class="s-shine-border"'), 'outer container class missing');
  assert.ok(html.includes('<div class="s-shine-border-inner">Content</div>'), 'inner content wrapper missing');
});

test('ShineBorder Pillar 2: applies border-width, duration, and shine-color to inline styles', () => {
  const html = String(ShineBorder({
    borderWidth: 2,
    duration: 10,
    color: '#3b82f6',
    children: 'Shining Card'
  }));
  assert.match(html, /border-width:2px;/, 'border-width style missing');
  assert.match(html, /--shine-duration:10s;/, '--shine-duration style missing');
  assert.match(html, /--shine-color:#3b82f6;/, '--shine-color style missing');
});

test('ShineBorder Pillar 3: renders interactive children cleanly without escaping', () => {
  const html = String(ShineBorder({ children: raw('<button type="button">Action</button>') }));
  assert.ok(html.includes('<button type="button">Action</button>'), 'interactive children must render unescaped');
});

test('ShineBorder Pillar 4: supports multi-stop color arrays and shineColor alias', () => {
  const multi = String(ShineBorder({ color: ['#ff0080', '#7928ca', '#0070f3'] }));
  assert.match(multi, /--shine-color:#ff0080,#7928ca,#0070f3;/, 'multi-stop color array missing');

  const alias = String(ShineBorder({ shineColor: '#10b981' }));
  assert.match(alias, /--shine-color:#10b981;/, 'shineColor alias prop missing');
});
