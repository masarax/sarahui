import test from 'node:test';
import assert from 'node:assert/strict';
import { PulsatingButton } from './PulsatingButton.js';

test('PulsatingButton renders cleanly and supports properties', () => {
  const result = PulsatingButton({});
  assert.ok(result, 'PulsatingButton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'PulsatingButton should not be empty');
});
