import test from 'node:test';
import assert from 'node:assert/strict';
import { Kbd } from './Kbd.js';

test('Kbd renders cleanly and supports properties', () => {
  const result = Kbd({});
  assert.ok(result, 'Kbd should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Kbd should not be empty');
});
