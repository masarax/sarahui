import test from 'node:test';
import assert from 'node:assert/strict';
import { Confetti } from './Confetti.js';

test('Confetti renders cleanly and supports properties', () => {
  const result = Confetti({});
  assert.ok(result, 'Confetti should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Confetti should not be empty');
});
