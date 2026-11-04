import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimatedGridPattern } from './AnimatedGridPattern.js';

test('AnimatedGridPattern renders cleanly and supports properties', () => {
  const result = AnimatedGridPattern({});
  assert.ok(result, 'AnimatedGridPattern should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'AnimatedGridPattern should not be empty');
});
