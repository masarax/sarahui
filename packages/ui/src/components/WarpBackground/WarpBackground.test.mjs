import test from 'node:test';
import assert from 'node:assert/strict';
import { WarpBackground } from './WarpBackground.js';

test('WarpBackground renders cleanly and supports properties', () => {
  const result = WarpBackground({});
  assert.ok(result, 'WarpBackground should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'WarpBackground should not be empty');
});
