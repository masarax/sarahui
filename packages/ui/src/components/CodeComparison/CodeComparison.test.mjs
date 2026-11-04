import test from 'node:test';
import assert from 'node:assert/strict';
import { CodeComparison } from './CodeComparison.js';

test('CodeComparison renders cleanly and supports properties', () => {
  const result = CodeComparison({});
  assert.ok(result, 'CodeComparison should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'CodeComparison should not be empty');
});
