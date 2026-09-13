# npm publishing and cPanel hosting

## Publish the unscoped npm library

The package name is **sarahui**. Consumers install it with:

~~~sh
npm install sarahui
~~~

The root project stays private. Only `packages/ui` is packed and published.
Its MIT license, fonts and their OFL notices, CSS, JavaScript, TypeScript
declarations, and token data are included.

The **sarahUI quality** workflow runs on main, pull requests and manual dispatch.
After all checks pass on main, it calls **Publish sarahui to npm**:

1. Build and verify the foundation and components.
2. Pack the library and install that tarball into a fresh project.
3. Check ESM exports, bundled font paths and strict TypeScript consumption.
4. Run the browser and deployment tests.
5. Publish that exact tarball with provenance using `NPM_TOKEN`.
6. Verify its registry integrity and install `sarahui@<version>` from npm.

Publishing never runs for pull requests. The token is available only to the
publish step, not to the build or browser tests.

Store `NPM_TOKEN` under **Repository → Settings → Secrets and variables →
Actions → Repository secrets**. For token-based unattended publishing, npm
requires a granular token with package write access and permission to bypass
the interactive 2FA prompt. It must permit creating the unscoped `sarahui`
package for the first publication. See [npm's CI/CD token guidance](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow/).

For a new release, update `packages/ui/package.json`'s version and push to main.
The workflow skips an identical already-published tarball. It rejects different
contents at an existing version; increase the version instead. To retry after
correcting a secret, run **sarahUI quality → Run workflow → main**.

## Configure cPanel later

The deployment workflow is already defined in
`.github/workflows/deploy-cpanel.yml`. It reports **deployment skipped** until
all four required secrets exist. No connection is attempted while setup is
incomplete.

Create a dedicated FTP account in cPanel for the documentation's document
root. Then add these **GitHub repository secrets**:

| Secret | Value |
| --- | --- |
| `CPANEL_FTP_HOST` | FTP hostname supplied by your host, without `ftp://` or a path |
| `CPANEL_FTP_USERNAME` | Full FTP login, often `name@yourdomain.com` |
| `CPANEL_FTP_PASSWORD` | The FTP account password |
| `CPANEL_FTP_PATH` | Destination as seen after FTP login, including its leading slash if absolute |

The FTP path is relative to the FTP account's filesystem view:

| FTP account directory | Typical target path |
| --- | --- |
| Account already points to the documentation document root | `/` |
| Account starts above `public_html` and docs belong in its `sarahui` folder | `/public_html/sarahui/` |

Use the actual directory shown by your FTP client. A subdomain may have a
document root outside `public_html`; use the location configured in cPanel.

Optional **repository variables**:

| Variable | Default | Purpose |
| --- | --- | --- |
| `CPANEL_FTP_PROTOCOL` | `ftps` | Explicit FTP over TLS; set `ftp` only if your host requires plain FTP |
| `CPANEL_FTP_PORT` | `21` | Port provided by your host |

FTPS verifies the server certificate and encrypts both login and file transfer.
There is no silent fallback to plain FTP. SFTP and implicit FTPS are different
protocols and are not supported by this workflow.

Once configured, run **Deploy documentation to cPanel → Run workflow → main**.
Future successful main quality runs also deploy. A successful npm publication
is independent of the website deployment.

## What is uploaded

The workflow builds `dist/` on the runner. cPanel needs a static document root;
it does not need Node.js, npm, a database, or a continuously running process.

Uploads include `index.html`, scripts, CSS, token downloads, fonts, the logo and
Apache `.htaccess` settings. Asset references are relative and navigation uses
hashes, so the documentation works at a domain root or inside a subdirectory.

Only files from the build are uploaded. Symlinks and unexpected hidden files
are rejected. Transfers use a temporary filename before replacement, and
`index.html` is transferred last. The script never performs a remote directory
cleanup; existing unrelated files remain. Files with the same build names in
the configured destination are replaced.

To inspect the build without connecting:

~~~sh
npm run build
python3 scripts/deploy-cpanel.py --dry-run
~~~

You can also download **sarahui-documentation** from a successful Actions run
and upload its contents manually, including `.htaccess`.
