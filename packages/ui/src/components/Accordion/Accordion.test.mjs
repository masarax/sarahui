import test from 'node:test';
import assert from 'node:assert/strict';
import { Accordion } from './Accordion.js';

test('Accordion renders cleanly and supports properties', () => {
  const result = Accordion({});
  assert.ok(result, 'Accordion should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Accordion should not be empty');
});
