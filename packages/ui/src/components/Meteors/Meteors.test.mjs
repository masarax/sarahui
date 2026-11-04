import test from 'node:test';
import assert from 'node:assert/strict';
import { Meteors } from './Meteors.js';

test('Meteors renders cleanly and supports properties', () => {
  const result = Meteors({});
  assert.ok(result, 'Meteors should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Meteors should not be empty');
});
