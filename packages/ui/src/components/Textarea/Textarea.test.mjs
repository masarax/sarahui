import test from 'node:test';
import assert from 'node:assert/strict';
import { Textarea } from './Textarea.js';

test('Textarea renders cleanly and supports properties', () => {
  const result = Textarea({});
  assert.ok(result, 'Textarea should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Textarea should not be empty');
});
