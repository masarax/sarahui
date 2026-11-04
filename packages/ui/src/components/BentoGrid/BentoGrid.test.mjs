import test from 'node:test';
import assert from 'node:assert/strict';
import { BentoGrid, BentoCard } from './BentoGrid.js';

test('BentoGrid Pillar 1: renders container with default 3-column layout', () => {
  const html = String(BentoGrid({ children: BentoCard({ title: 'Feature' }) }));
  assert.ok(html.includes('class="s-bento-grid'), 'grid class missing');
  assert.ok(html.includes('<article class="s-bento-card group'), 'bento card article missing');
});

test('BentoGrid Pillar 2: binds --bento-cols CSS variable and preserves user dynamic classes', () => {
  const html = String(BentoGrid({ columns: 4, className: 'gap-8 p-6' }));
  assert.ok(html.includes('--bento-cols:4;'), '--bento-cols variable must be present');
  assert.ok(html.includes('gap-8 p-6'), 'dynamic Tailwind classes must propagate');
});

test('BentoCard Pillar 2 & 3: maps spans, semantic article landmark, and safe links', () => {
  const card = String(BentoCard({
    title: 'Analytics Dashboard',
    description: 'Real-time telemetry and insights',
    colSpan: 2,
    rowSpan: 1,
    href: 'https://example.com/analytics',
    cta: 'View Dashboard'
  }));
  assert.ok(card.includes('<article'), 'must be semantic article');
  assert.ok(card.includes('s-bento-card--col-2'), 'colSpan class missing');
  assert.ok(card.includes('s-bento-card--row-1'), 'rowSpan class missing');
  assert.ok(card.includes('<h3>Analytics Dashboard</h3>'), 'heading missing');
  assert.ok(card.includes('href="https://example.com/analytics"'), 'href missing');
});

test('BentoCard Pillar 4: blocks malicious CTA links and handles empty CTA', () => {
  const safe = String(BentoCard({ href: 'javascript:alert(1)' }));
  assert.ok(!safe.includes('href="javascript:'), 'unsafe javascript: protocol must be blocked');

  const noCta = String(BentoCard({ cta: '' }));
  assert.ok(!noCta.includes('s-bento-btn'), 'empty CTA should not render dead anchor tags');
});
