import assert from 'node:assert/strict';

// npm install reads the package index, which can lag behind the version endpoint.
export async function waitForPublicVersion(version, integrity, {
  request = fetch,
  pause = ms => new Promise(resolve => setTimeout(resolve, ms)),
  attempts = 12,
} = {}) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const response = await request('https://registry.npmjs.org/sarahui', {
      headers: {Accept: 'application/vnd.npm.install-v1+json', 'Cache-Control': 'no-cache'},
      signal: AbortSignal.timeout(15000),
    });
    if (response.ok) {
      const metadata = await response.json();
      const published = metadata.versions?.[version];
      if (published) {
        assert.equal(published.dist?.integrity, integrity, 'The public package index must match the verified tarball.');
        return published;
      }
    } else if (response.status !== 404 && response.status < 500) {
      throw new Error('Public package index lookup failed: HTTP ' + response.status);
    }
    if (attempt + 1 < attempts) await pause(5000);
  }
  throw new Error('sarahui@' + version + ' is not visible in the public package index yet. Retry the quality workflow; no version change is needed.');
}
