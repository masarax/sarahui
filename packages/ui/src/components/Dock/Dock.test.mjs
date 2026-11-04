import test from 'node:test';
import assert from 'node:assert/strict';
import { Dock } from './Dock.js';

test('Dock Pillar 1: renders navigation landmark with default tool items and separators', () => {
  const html = String(Dock());
  assert.ok(html.includes('<nav'), 'must be semantic nav element');
  assert.ok(html.includes('class="s-dock'), 'base class missing');
  assert.ok(html.includes('data-s-dock'), 'data-s-dock hook missing');
  assert.ok(html.includes('s-dock-separator'), 'separator missing');
});

test('Dock Pillar 2: configures size, magnification, distance, and direction', () => {
  const html = String(Dock({
    direction: 'vertical',
    iconSize: 48,
    iconMagnification: 72,
    iconDistance: 160,
    className: 'fixed bottom-4'
  }));
  assert.ok(html.includes('s-dock--vertical'), 'vertical modifier missing');
  assert.ok(html.includes('data-size="48"'), 'data-size missing');
  assert.ok(html.includes('data-magnification="72"'), 'data-magnification missing');
  assert.ok(html.includes('data-distance="160"'), 'data-distance missing');
  assert.ok(html.includes('fixed bottom-4'), 'custom classes missing');
});

test('Dock Pillar 3: provides accessible navigation label and hides separators', () => {
  const html = String(Dock());
  assert.ok(html.includes('aria-label="Quick tools"'), 'aria-label missing');
  assert.ok(html.includes('class="s-dock-separator" aria-hidden="true"'), 'separator must have aria-hidden');
  assert.ok(html.includes('title="Home" aria-label="Home"'), 'accessible item names missing');
});

test('Dock Pillar 4: handles custom item lists, background colors, and arbitrary children', () => {
  const customItems = [
    { icon: 'settings', label: 'Settings', bg: 'var(--s-bg-surface)' }
  ];
  const html = String(Dock({ items: customItems }));
  assert.ok(html.includes('aria-label="Settings"'), 'custom label missing');
  assert.ok(html.includes('style="background:var(--s-bg-surface);"'), 'bg style missing');
});
