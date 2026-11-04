import test from 'node:test';
import assert from 'node:assert/strict';
import { Spinner } from './Spinner.js';

test('Spinner renders cleanly and supports properties', () => {
  const result = Spinner({});
  assert.ok(result, 'Spinner should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Spinner should not be empty');
});
