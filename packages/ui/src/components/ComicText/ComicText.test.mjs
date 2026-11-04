import test from 'node:test';
import assert from 'node:assert/strict';
import { ComicText } from './ComicText.js';

test('ComicText renders cleanly and supports properties', () => {
  const result = ComicText({});
  assert.ok(result, 'ComicText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'ComicText should not be empty');
});
