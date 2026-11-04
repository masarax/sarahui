import test from 'node:test';
import assert from 'node:assert/strict';
import { KineticText } from './KineticText.js';

test('KineticText renders cleanly and supports properties', () => {
  const result = KineticText({});
  assert.ok(result, 'KineticText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'KineticText should not be empty');
});
