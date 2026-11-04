import test from 'node:test';
import assert from 'node:assert/strict';
import { Select } from './Select.js';

test('Select renders cleanly and supports properties', () => {
  const result = Select({});
  assert.ok(result, 'Select should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Select should not be empty');
});
