# Releasing sarahUI

The package name is **sarahui**. Consumers install it with:

~~~sh
npm install sarahui
~~~

The root project stays private. Only `packages/ui` is packed and published.
Its MIT license, fonts and their OFL notices, CSS, JavaScript, TypeScript
declarations, and token data are included.

## Before publishing

Run the same checks that CI runs:

~~~sh
npm ci --ignore-scripts
npm run check
npm run typecheck
npm run test:package
npx playwright install chromium
npm run test:browser
~~~

`npm run test:package` writes the tested tarball, its SHA-512 integrity, and a
manifest to `artifacts/npm/`.

## Publish manually

Update the version in `packages/ui/package.json`, then run:

~~~sh
npm run publish:verified
~~~

The script publishes the exact tested tarball with provenance, verifies its
registry integrity, and installs it into an empty project without the
publishing token. Set `NODE_AUTH_TOKEN` to a granular npm token with package
write access and permission to bypass the interactive 2FA prompt:

~~~sh
NODE_AUTH_TOKEN=your-token npm run publish:verified
~~~

The script stops when the version already exists with different contents.
Increase the version instead of replacing an immutable release. It also stops
when the same version is already published with identical contents, so a retry
is safe.

No GitHub Actions workflow publishes automatically. Releases stay explicit and
manual.
