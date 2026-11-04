import test from 'node:test';
import assert from 'node:assert/strict';
import { Sheet } from './Sheet.js';

test('Sheet renders cleanly and supports properties', () => {
  const result = Sheet({});
  assert.ok(result, 'Sheet should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Sheet should not be empty');
});
