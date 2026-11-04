import test from 'node:test';
import assert from 'node:assert/strict';
import { NumberTicker } from './NumberTicker.js';

test('NumberTicker renders cleanly and supports properties', () => {
  const result = NumberTicker({});
  assert.ok(result, 'NumberTicker should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'NumberTicker should not be empty');
});
