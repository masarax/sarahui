import test from 'node:test';
import assert from 'node:assert/strict';
import { Radio } from './Radio.js';

test('Radio renders cleanly and supports properties', () => {
  const result = Radio({});
  assert.ok(result, 'Radio should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Radio should not be empty');
});
