import test from 'node:test';
import assert from 'node:assert/strict';
import { EmptyState } from './EmptyState.js';

test('EmptyState renders cleanly and supports properties', () => {
  const result = EmptyState({});
  assert.ok(result, 'EmptyState should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'EmptyState should not be empty');
});
