# Verification record

sarahUI **0.1.0** was verified on **13 September 2026** at source commit [7e2bf41b](https://github.com/masarax/sarahui/commit/7e2bf41b9e99516ef4b76fa9d8e43e5a22ac1d4d).

The [recorded GitHub Actions run](https://github.com/masarax/sarahui/actions/runs/34768734157) passed all quality and npm publication checks. The public package is available as [sarahui on npm](https://www.npmjs.com/package/sarahui/v/0.1.0), with GitHub Actions provenance.

| Check | Result |
| --- | --- |
| Tokens, contrast, templates, documentation recipes and registry regression tests | 71 passed |
| Browser behavior, installation guide and responsive composition | 18 passed |
| cPanel configuration and transfer safeguards | 5 passed |
| Fresh tarball installation, ESM, CSS, token exports and six bundled fonts | Passed |
| Strict TypeScript consumer compilation | Passed |
| Published tarball matches the verified SHA-512 integrity | Passed |
| Fresh installation from npm without the publishing token | Passed |
| Browser console/page errors | 0 |
| Generated tokens match checked-in output | Passed |
| Static documentation build | Passed |

The original publication succeeded in [run 34768393303](https://github.com/masarax/sarahui/actions/runs/34768393303), but its immediate install check encountered a temporary registry `404`. The recorded successful run above verified the same immutable tarball after adding bounded registry-propagation handling. A separate fresh project also passed the exact unversioned command `npm install sarahui`.

cPanel deployment is configured and deliberately **skipped** because its FTP secrets have not been added. No live FTP transfer is claimed. Follow the [deployment guide](deployment.md) when the account is ready.

## Coverage

Browser verification covers the complete 32-family catalog; fonts and ARIA references; command search; component filters; tab, menu, and modal keyboard behavior; tooltip dismissal; npm examples, API properties and HTML disclosure; installation and framework tabs; setup deep links; native form values; table sorting and mixed selection; project creation; workspace pagination; settings validation; theme persistence; reduced motion; forced colors; and mobile navigation.

All five documentation views fit **320, 390, 768, and 1024px** viewports without document-level horizontal overflow. Palettes and data tables remain deliberately scrollable within their own regions.

The browser runner uses Playwright 1.62.1 with Chromium on GitHub's Ubuntu runner and Node.js 24. It records individual results in [browser-results.json](verification/browser-results.json).

## Preview gallery

These are unedited screenshots from the recorded browser run. Desktop captures are 1440 × 1024; the mobile capture is 390 × 844. The runner disables animations for repeatable captures.

| View | Preview |
| --- | --- |
| Overview, light | [Open screenshot](previews/overview-light.png) |
| Overview, dark | [Open screenshot](previews/overview-dark.png) |
| Overview, mobile | [Open screenshot](previews/overview-mobile.png) |
| Components | [Open screenshot](previews/components-light.png) |
| Foundations | [Open screenshot](previews/foundations-light.png) |
| Workspace pattern | [Open screenshot](previews/patterns-light.png) |
| Installation guide | [Open screenshot](previews/getting-started-light.png) |

## Reproduce

~~~sh
npm ci --ignore-scripts
npm run check
npm run test:package
npm run test:deploy
npx playwright install chromium
npm run test:browser
~~~

The workflow uploads a complete static documentation build, browser evidence and the exact tested npm archive. The checked-in gallery remains available after temporary Actions artifacts expire.

This record covers Chromium automation, visual review, TypeScript compilation and package installation. Firefox, Safari, screen readers and full-product accessibility audits were not part of this run. See the [accessibility guide](accessibility.md) for integration checks.
