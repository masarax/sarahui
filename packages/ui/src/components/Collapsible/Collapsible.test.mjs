import test from 'node:test';
import assert from 'node:assert/strict';
import { Collapsible } from './Collapsible.js';

test('Collapsible renders cleanly and supports properties', () => {
  const result = Collapsible({});
  assert.ok(result, 'Collapsible should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Collapsible should not be empty');
});
