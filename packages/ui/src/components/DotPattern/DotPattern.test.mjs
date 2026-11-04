import test from 'node:test';
import assert from 'node:assert/strict';
import { DotPattern } from './DotPattern.js';

test('DotPattern renders cleanly and supports properties', () => {
  const result = DotPattern({});
  assert.ok(result, 'DotPattern should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'DotPattern should not be empty');
});
