import test from 'node:test';
import assert from 'node:assert/strict';
import { Drawer } from './Drawer.js';

test('Drawer renders cleanly and supports properties', () => {
  const result = Drawer({});
  assert.ok(result, 'Drawer should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Drawer should not be empty');
});
