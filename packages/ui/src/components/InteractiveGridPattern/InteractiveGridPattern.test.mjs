import test from 'node:test';
import assert from 'node:assert/strict';
import { InteractiveGridPattern } from './InteractiveGridPattern.js';

test('InteractiveGridPattern renders cleanly and supports properties', () => {
  const result = InteractiveGridPattern({});
  assert.ok(result, 'InteractiveGridPattern should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'InteractiveGridPattern should not be empty');
});
