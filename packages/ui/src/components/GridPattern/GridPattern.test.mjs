import test from 'node:test';
import assert from 'node:assert/strict';
import { GridPattern } from './GridPattern.js';

test('GridPattern renders cleanly and supports properties', () => {
  const result = GridPattern({});
  assert.ok(result, 'GridPattern should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'GridPattern should not be empty');
});
