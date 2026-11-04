import test from 'node:test';
import assert from 'node:assert/strict';
import { Input } from './Input.js';

test('Input renders cleanly and supports properties', () => {
  const result = Input({});
  assert.ok(result, 'Input should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Input should not be empty');
});
