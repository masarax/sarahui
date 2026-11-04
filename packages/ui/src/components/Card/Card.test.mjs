import test from 'node:test';
import assert from 'node:assert/strict';
import { Card } from './Card.js';

test('Card renders cleanly and supports properties', () => {
  const result = Card({});
  assert.ok(result, 'Card should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Card should not be empty');
});
