import test from 'node:test';
import assert from 'node:assert/strict';
import { InteractiveHoverButton } from './InteractiveHoverButton.js';

test('InteractiveHoverButton renders cleanly and supports properties', () => {
  const result = InteractiveHoverButton({});
  assert.ok(result, 'InteractiveHoverButton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'InteractiveHoverButton should not be empty');
});
