import test from 'node:test';
import assert from 'node:assert/strict';
import { MagicCard } from './MagicCard.js';

test('MagicCard Pillar 1: renders container with data-s-magic-card="true" and decorative layers', () => {
  const html = String(MagicCard({ children: 'Card Content' }));
  assert.ok(html.includes('class="s-magic-card'), 'base class missing');
  assert.match(html, /data-s-magic-card="true"/, 'data-s-magic-card="true" attribute missing');
  assert.ok(html.includes('class="s-magic-card-bg'), 'bg layer missing');
  assert.ok(html.includes('class="s-magic-card-spotlight'), 'spotlight layer missing');
  assert.ok(html.includes('s-magic-card-bg') && html.includes('aria-hidden="true"'), 'decorative layers must be aria-hidden');
  assert.ok(html.includes('class="s-magic-card-content') && html.includes('Card Content'), 'content wrapper missing');
});

test('MagicCard Pillar 2: forwards gradient and glow parameters to CSS custom properties', () => {
  const html = String(MagicCard({
    gradientSize: 300,
    gradientColor: '#f59e0b',
    gradientOpacity: 0.6,
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    glowSize: 400,
    glowBlur: 50,
    style: 'min-height: 200px;'
  }));
  assert.match(html, /--gradient-size:300px/, '--gradient-size missing');
  assert.match(html, /--magic-color:#f59e0b/, '--magic-color missing');
  assert.match(html, /--gradient-opacity:0.6/, '--gradient-opacity missing');
  assert.match(html, /--gradient-from:#8b5cf6/, '--gradient-from missing');
  assert.match(html, /--gradient-to:#ec4899/, '--gradient-to missing');
  assert.match(html, /--glow-size:400px/, '--glow-size missing');
  assert.match(html, /--glow-blur:50px/, '--glow-blur missing');
  assert.ok(html.includes('min-height: 200px;'), 'custom user style missing');
});

test('MagicCard Pillar 3: forwards accessible role and label attributes', () => {
  const html = String(MagicCard({ attrs: { role: 'article', 'aria-label': 'Featured Feature' } }));
  assert.ok(html.includes('role="article"'), 'role="article" missing');
  assert.ok(html.includes('aria-label="Featured Feature"'), 'aria-label missing');
});

test('MagicCard Pillar 4: handles mode="orb" and boundary zero numeric values', () => {
  const orb = String(MagicCard({ mode: 'orb' }));
  assert.ok(orb.includes('class="s-magic-card-orb'), 'orb layer missing');
  assert.ok(!orb.includes('s-magic-card-spotlight'), 'spotlight should not be present in orb mode');

  const zero = String(MagicCard({ gradientSize: 0, gradientOpacity: 0 }));
  assert.match(zero, /--gradient-size:0px/, 'zero gradient size missing');
  assert.match(zero, /--gradient-opacity:0/, 'zero opacity missing');
});
