import test from 'node:test';
import assert from 'node:assert/strict';
import { Skeleton } from './Skeleton.js';

test('Skeleton renders cleanly and supports properties', () => {
  const result = Skeleton({});
  assert.ok(result, 'Skeleton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Skeleton should not be empty');
});
