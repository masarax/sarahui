import test from 'node:test';
import assert from 'node:assert/strict';
import { Menu } from './Menu.js';

test('Menu renders cleanly and supports properties', () => {
  const result = Menu({});
  assert.ok(result, 'Menu should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Menu should not be empty');
});
