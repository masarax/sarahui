import test from 'node:test';
import assert from 'node:assert/strict';
import { FlickeringGrid } from './FlickeringGrid.js';

test('FlickeringGrid renders cleanly and supports properties', () => {
  const result = FlickeringGrid({});
  assert.ok(result, 'FlickeringGrid should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'FlickeringGrid should not be empty');
});
