import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimatedList } from './AnimatedList.js';

test('AnimatedList Pillar 1: renders container and initial list item', () => {
  const html = String(AnimatedList());
  assert.ok(html.includes('class="s-animated-list'), 'base class missing');
  assert.ok(html.includes('data-s-animated-list'), 'data-s-animated-list hook missing');
  assert.ok(html.includes('class="s-animated-list-item"'), 'initial item wrapper missing');
});

test('AnimatedList Pillar 2: binds delay and preserves dynamic classes and attrs', () => {
  const html = String(AnimatedList({
    delay: 2500,
    className: 'max-h-96 overflow-hidden',
    attrs: { 'data-testid': 'notification-stream' }
  }));
  assert.ok(html.includes('data-delay="2500"'), 'data-delay attribute missing');
  assert.ok(html.includes('max-h-96 overflow-hidden'), 'dynamic classes missing');
  assert.ok(html.includes('data-testid="notification-stream"'), 'custom attrs missing');
});

test('AnimatedList Pillar 3: supports accessible figures and ARIA attributes', () => {
  const html = String(AnimatedList({ attrs: { role: 'log', 'aria-live': 'polite' } }));
  assert.ok(html.includes('role="log"'), 'role="log" missing');
  assert.ok(html.includes('aria-live="polite"'), 'aria-live missing');
});

test('AnimatedList Pillar 4: serializes custom items into data-items JSON attribute', () => {
  const custom = ['<div>Notification A</div>', '<div>Notification B</div>'];
  const html = String(AnimatedList({ items: custom }));
  assert.ok(html.includes('data-items='), 'data-items missing');
  assert.ok(html.includes('Notification A'), 'serialized content missing');
});
