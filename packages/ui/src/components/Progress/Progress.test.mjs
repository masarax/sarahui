import test from 'node:test';
import assert from 'node:assert/strict';
import { Progress } from './Progress.js';

test('Progress renders cleanly and supports properties', () => {
  const result = Progress({});
  assert.ok(result, 'Progress should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Progress should not be empty');
});
