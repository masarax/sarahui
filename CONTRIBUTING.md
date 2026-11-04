# Contributing to sarahUI

Thanks for your interest in improving sarahUI. This guide covers the local workflow, code conventions, and the pull-request checklist.

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Local setup

```sh
git clone https://github.com/masarax/sarahui.git
cd sarahui
npm install
npm run build
```

`npm run dev` builds the documentation site and serves it on the local port printed by the script.

## Project layout

- `packages/ui/src/templates.js` contains the shared component implementations.
- `packages/ui/src/components/<Name>/` contains the per-component entry point, types, tests, and README.
- `tokens/sarah.tokens.json` is the source of truth for design tokens. Never edit generated files directly.
- `apps/docs/` contains the documentation application.
- `tests/` contains unit, DOM, registry, and security suites.

## Making changes

1. Create a focused branch.
2. Edit source files, not generated files. Generated outputs are:
   - `packages/ui/src/tokens.css`
   - `packages/ui/src/theme-tokens.js`
   - `packages/ui/src/theme-tokens.d.ts`
   - `packages/ui/src/templates.d.ts`
   - `packages/ui/src/styles/*` and `packages/ui/src/tokens/*` mirrors
   - `tokens/generated/*`
   - `packages/ui/tokens/*`
   Run `npm run build` to regenerate them.
3. Add or update tests for behavior changes.
4. Run the full check:

```sh
npm run check
npm run typecheck
```

The package check (`npm run test:package`) packs the tarball and installs it in a temporary project. Run it when you change `package.json`, exports, CSS entry points, or type declarations.

Browser checks require a build and Chromium:

```sh
npm run build
npx playwright install chromium
npm run test:browser
```

## Conventions

- Keep zero runtime dependencies.
- Escape all user-provided content. Use `escapeText`, `safeHref`, and `attributes()`; never interpolate raw props into markup.
- Prefer native HTML elements and WAI-ARIA Authoring Practices patterns.
- Respect `prefers-reduced-motion`.
- Bind visual values to design tokens instead of hard-coded colors.
- Keep public API changes backward compatible, or document the migration.

## Pull-request checklist

- [ ] `npm run check` passes
- [ ] `npm run typecheck` passes
- [ ] Generated files are committed after `npm run build`
- [ ] New behavior has tests
- [ ] Accessibility and reduced-motion behavior is covered
- [ ] README or docs updated when the public API changes
- [ ] No local paths, credentials, or private URLs added

## Reporting bugs

Open a GitHub issue with:

- A minimal reproduction
- Expected and actual behavior
- Browser and Node.js versions
- The sarahUI version

## License

By contributing, you agree that your contributions are licensed under the MIT License.
