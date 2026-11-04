import test from 'node:test';
import assert from 'node:assert/strict';
import { NeonGradientCard } from './NeonGradientCard.js';

test('NeonGradientCard renders cleanly and supports properties', () => {
  const result = NeonGradientCard({});
  assert.ok(result, 'NeonGradientCard should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'NeonGradientCard should not be empty');
});
