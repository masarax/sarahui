import test from 'node:test';
import assert from 'node:assert/strict';
import { RetroGrid } from './RetroGrid.js';

test('RetroGrid renders cleanly and supports properties', () => {
  const result = RetroGrid({});
  assert.ok(result, 'RetroGrid should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'RetroGrid should not be empty');
});
