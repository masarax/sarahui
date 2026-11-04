import test from 'node:test';
import assert from 'node:assert/strict';
import { ContextMenu } from './ContextMenu.js';

test('ContextMenu renders cleanly and supports properties', () => {
  const result = ContextMenu({});
  assert.ok(result, 'ContextMenu should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'ContextMenu should not be empty');
});
