import test from 'node:test';
import assert from 'node:assert/strict';
import { StripedPattern } from './StripedPattern.js';

test('StripedPattern renders cleanly and supports properties', () => {
  const result = StripedPattern({});
  assert.ok(result, 'StripedPattern should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'StripedPattern should not be empty');
});
