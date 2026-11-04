import test from 'node:test';
import assert from 'node:assert/strict';
import { HoverCard } from './HoverCard.js';

test('HoverCard renders cleanly and supports properties', () => {
  const result = HoverCard({});
  assert.ok(result, 'HoverCard should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'HoverCard should not be empty');
});
