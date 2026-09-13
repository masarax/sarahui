import test from 'node:test';
import assert from 'node:assert/strict';
import {waitForPublicVersion} from '../scripts/registry.mjs';

const published = {dist: {integrity: 'sha512-tested'}};
test('Public install waits for the package index after a version is published', async () => {
  const responses = [
    new Response('', {status: 404}),
    Response.json({versions: {}}),
    Response.json({versions: {'0.1.0': published}}),
  ];
  let pauses = 0;
  const result = await waitForPublicVersion('0.1.0', 'sha512-tested', {
    request: async (url, options) => {
      assert.equal(url, 'https://registry.npmjs.org/sarahui');
      assert.equal(options.headers.Accept, 'application/vnd.npm.install-v1+json');
      return responses.shift();
    },
    pause: async () => { pauses++; },
  });
  assert.deepEqual(result, published);
  assert.equal(pauses, 2);
});

test('Public install rejects a different tarball without waiting', async () => {
  await assert.rejects(waitForPublicVersion('0.1.0', 'sha512-different', {
    request: async () => Response.json({versions: {'0.1.0': published}}),
    pause: async () => assert.fail('Integrity failures must not be retried'),
  }), /must match the verified tarball/);
});

test('Registry propagation has a retry limit and does not hide permission failures', async () => {
  let requests = 0;
  await assert.rejects(waitForPublicVersion('0.1.0', 'sha512-tested', {
    request: async () => { requests++; return new Response('', {status: 404}); },
    pause: async () => {},
    attempts: 2,
  }), /not visible/);
  assert.equal(requests, 2);
  await assert.rejects(waitForPublicVersion('0.1.0', 'sha512-tested', {
    request: async () => new Response('', {status: 403}),
    pause: async () => assert.fail('Permission failures must not be retried'),
  }), /HTTP 403/);
});
