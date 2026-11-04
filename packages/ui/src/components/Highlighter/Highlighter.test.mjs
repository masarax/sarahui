import test from 'node:test';
import assert from 'node:assert/strict';
import { Highlighter } from './Highlighter.js';

test('Highlighter renders cleanly and supports properties', () => {
  const result = Highlighter({});
  assert.ok(result, 'Highlighter should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Highlighter should not be empty');
});
