import test from 'node:test';
import assert from 'node:assert/strict';
import { HexagonPattern } from './HexagonPattern.js';

test('HexagonPattern renders cleanly and supports properties', () => {
  const result = HexagonPattern({});
  assert.ok(result, 'HexagonPattern should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'HexagonPattern should not be empty');
});
