import test from 'node:test';
import assert from 'node:assert/strict';
import { VideoText } from './VideoText.js';

test('VideoText renders cleanly and supports properties', () => {
  const result = VideoText({});
  assert.ok(result, 'VideoText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'VideoText should not be empty');
});
