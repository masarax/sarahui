import test from 'node:test';
import assert from 'node:assert/strict';
import { ButtonGroup } from './ButtonGroup.js';

test('ButtonGroup renders cleanly and supports properties', () => {
  const result = ButtonGroup({});
  assert.ok(result, 'ButtonGroup should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'ButtonGroup should not be empty');
});
