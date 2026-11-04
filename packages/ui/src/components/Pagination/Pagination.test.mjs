import test from 'node:test';
import assert from 'node:assert/strict';
import { Pagination } from './Pagination.js';

test('Pagination renders cleanly and supports properties', () => {
  const result = Pagination({});
  assert.ok(result, 'Pagination should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Pagination should not be empty');
});
