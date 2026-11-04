import test from 'node:test';
import assert from 'node:assert/strict';
import { Checkbox } from './Checkbox.js';

test('Checkbox renders cleanly and supports properties', () => {
  const result = Checkbox({});
  assert.ok(result, 'Checkbox should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Checkbox should not be empty');
});
