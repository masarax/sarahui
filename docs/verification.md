# Verification record

sarahUI 0.1 was verified on **13 September 2026** at source commit [0522dd38](https://github.com/masarax/sarahui/commit/0522dd38c8e02842a52d9301a47bc2252122486f).

The [recorded GitHub Actions run](https://github.com/masarax/sarahui/actions/runs/34741540785) passed the build, generated-token reproducibility check, **66 unit tests**, and **17 Chromium browser scenarios**.

| Check | Result |
| --- | --- |
| Token validation, alias resolution, contrast, and templates | 66 passed |
| Browser behavior and responsive composition | 17 passed |
| Browser console/page errors | 0 |
| Generated tokens match checked-in output | Passed |
| Static documentation build | Passed |

## Coverage

Browser verification covers the complete 32-family catalog; fonts and ARIA references; command search; component filters; tab, menu, and modal keyboard behavior; tooltip dismissal; copyable code disclosure; native form values; table sorting and mixed selection; project creation; workspace pagination; settings validation; theme persistence; reduced motion; forced colors; and mobile navigation.

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

## Reproduce

~~~sh
npm run check
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium
npm run test:browser
~~~

The workflow uploads a complete static documentation build and browser evidence. The checked-in gallery remains available after temporary Actions artifacts expire.

This record covers Chromium automation and visual review. Firefox, Safari, screen readers, TypeScript compilation, and full-product accessibility audits were not part of this run. See the [accessibility guide](accessibility.md) for integration checks.
