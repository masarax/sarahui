# Project: SarahUI Benchmark Audit, Refactoring & Verification

## Architecture
- **Framework-neutral tagged HTML templates**: `packages/ui/src/templates.js` exports pure JavaScript template functions (`html`, `raw`, `render`, `attributes`) producing accessible native HTML markup strings.
- **Zero runtime dependencies**: Pure CSS custom properties and lightweight vanilla JavaScript progressive enhancement (`packages/ui/src/index.js`, `enhanceUI()`).
- **Dynamic Tailwind CSS integration**: `@sarahui/tailwind-preset` (`packages/ui/src/tailwind-preset.js`) provides utility mapping for colors, animations, borders, and shadows without overriding dynamic utility classes.
- **Registry-based distribution**: Component registry architecture supporting `npx sarahui add <component>` distribution.
- **Adobe Spectrum Design Data benchmark**: Structured 3-layer validation, component-level design tokens, semantic interaction states, and WCAG / `prefers-reduced-motion` compliance.
- **Modular packages/ui Architecture**: Refactor `packages/ui/` into modular professional structure:
  - `packages/ui/src/components/` (individual/modular component directories):
    - Each component in `src/components/<ComponentName>/`:
      - `index.js` (component export)
      - `<ComponentName>.js` (template function & progressive enhancement)
      - `<ComponentName>.d.ts` (TypeScript interface & prop types)
      - `styles.css` (scoped CSS, keyframes, token bindings)
      - `<ComponentName>.test.mjs` (unit / DOM / attribute test)
      - `README.md` (props, accessibility, tokens, and usage examples)
    - `src/components/index.js` aggregates and re-exports all components.
  - `packages/ui/src/styles/` (styles.css, tokens.css, fonts.css, sarahui.css)
  - `packages/ui/src/tokens/` (theme-tokens.js, theme-tokens.d.ts, tokens.css)
  - `packages/ui/src/utilities/` (html, raw, render, attributes helpers, DOM enhancers)
  - Entry points `packages/ui/src/index.js` and `packages/ui/src/templates.js` maintain backward-compatible barrel re-exports ensuring zero breakage of `import { ... } from 'sarahui'`.
- **Component Status**: 99 components ("Meteors" through "Collapsible") are already populated in `packages/ui/src/components/<ComponentName>/` with full 6-file suites and passing unit tests. Milestone 2 exclusively focuses on creating the remaining 21 audited components (Getting Started through Glare Hover) and building `packages/ui/src/components/index.js` to re-export all 120 components.




---

## State Overview (RESUMED - Active)

### DONE
1. **Phase 0 (Survey & Benchmark Extraction)**: Complete survey across codebase, Adobe Spectrum Design Data benchmark, and test infrastructure.
2. **E2E Testing Track**: `TEST_INFRA.md` published; all 5 E2E suites authored; 274/274 tests passing (100% green).
3. **Milestone 1 (Benchmark Audit & Token Taxonomy Expansion)**: PASSED GATE UNANIMOUSLY. `docs/audit-benchmark.md`, `AUDIT_REPORT.md`, 319 tokens in `tokens/sarah.tokens.json`, token compiler, modernized `tailwind-preset.js`, typings, and packaging verified.
4. **Milestone 2 (Component Refactoring & Modular Architecture)**: PASSED GATE UNANIMOUSLY.
   - All 120 components in `packages/ui/src/components/<ComponentName>/` with full 6-file suites (720 files verified).
   - Modular `utilities/`, `styles/`, and `tokens/` directories populated.
   - Master aggregator `packages/ui/src/components/index.js` re-exporting all 120 components.
   - 100% backward-compatible barrel re-exports in `packages/ui/src/index.js` and `packages/ui/src/templates.js`.
   - All 10 source defects resolved. All 183 component tests, 161 repository tests, and 274/274 E2E tests passing cleanly.

### IN-PROGRESS
- **Milestone 3 (Registry Decoupling, Docs & Agent Rules Alignment)**:
  - Codifying native component registry schemas in `apps/docs/registry-data.mjs` and eliminating external dependencies.
  - Updating `apps/docs/catalog.mjs`, `recipes.mjs`, `usage-data.mjs` to reflect all audited items and modular paths.
  - Populating `.agents/rules/` with architecture, token conventions, Tailwind guidelines, and accessibility standards.
  - Updating root and package `README.md` to document all 120 components, token architecture, and CLI usage.

### NEXT
1. Milestone 3 Gate Verification (Reviewers, Challengers, Auditor).
2. Milestone 4: Automated Verification Suite & Package Quality Gate (token validator, registry integrity checker, style guard linter).
3. Milestone 5: Final Milestone (100% E2E Pass & Adversarial Hardening) -> Post-Victory Audit.


---

## Feature Inventory

| # | Feature | Description | Milestone | Status | Source |
|---|---------|-------------|-----------|--------|--------|
| 1 | Benchmark Audit Document | Complete audit document comparing Getting Started through Glare Hover against Adobe Spectrum Design Data | M1 | DONE | Survey (Spec Miner 2) |
| 2 | Component Token Taxonomy | Scoped component tokens in `tokens/sarah.tokens.json` for all 21 audited components matching Spectrum taxonomy | M1 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 3 | Token Compiler Expansion | `scripts/build-tokens.mjs` generates CSS variables and TypeScript definitions for component tokens | M1 | DONE | Survey (Explorer 1) |
| 4 | Tailwind Preset Modernization | `packages/ui/src/tailwind-preset.js` extended with all tokens, animations, and keyframes; eliminates utility overrides | M1 | DONE | Survey (Explorer 1) |
| 5 | Getting Started: Introduction | `#overview` in `apps/docs/site.mjs`: accessible semantic structure, theme variables, zero broken styles | M2 | DONE | Survey (Explorer 3) |
| 6 | Getting Started: Installation | `#start` in `apps/docs/start.mjs`: setup instructions, package manager commands, event table | M2 | DONE | Survey (Explorer 3) |
| 7 | Getting Started: Foundations | `#foundations` in `apps/docs/site.mjs`: colors, typography, spacing, shape, motion with token bindings | M2 | DONE | Survey (Explorer 3) |
| 8 | Getting Started: Patterns | `#patterns` in `apps/docs/site.mjs`: project workspace, interactive table, accessible form | M2 | DONE | Survey (Explorer 3) |
| 9 | Marquee Component | Continuous scroll; pause on hover/focus; reduced-motion freeze; `aria-hidden` duplicate tracks; token bindings | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 10 | Terminal Component | Accessible terminal window, `aria-live="polite"`, semantic status dot tokens, typing delay reduced-motion bypass | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 11 | HeroVideoDialog Component | Accessible dialog trigger with `aria-haspopup="dialog"`, modal focus trap, Esc to close, local fallback thumbnail | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 12 | BentoGrid & BentoCard | Remove duplicate CTA links; dynamic Tailwind `col-span-*` compatibility; token-bound surface/border colors | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 13 | AnimatedList Component | `role="log"`, `aria-live="polite"`, semantic tone token bindings, stagger disabled on reduced motion | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 14 | Dock Component | Accessible navigation `role="toolbar"`, roving `tabindex`, arrow key navigation, token-bound dimensions | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 15 | Globe Component | Accessible 2D canvas representation, `role="img"`, `aria-label`, auto-rotation toggle for reduced motion | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 16 | TweetCard Component | Decouple from external promo links/handles; semantic article markup; token-bound surface and verified badge | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 17 | OrbitingCircles Component | Forward `delay` parameter; balanced static layout under `prefers-reduced-motion`; pause on hover | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 18 | AvatarCircles Component | Descriptive `alt` and counter `aria-label`; token-bound dimensions; keyboard focusable links | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 19 | IconCloud Component | Valid SimpleIcons CDN URL (`[slug]/[color]`) or local SVG fallback; pause control with `aria-pressed` | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 20 | Lens Component | Accessible loupe region, `role="region"`, `aria-label`, keyboard focusable container | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 21 | Pointer Component | Scoped pointer glyph with `aria-hidden="true"`; accessible badge; token-bound colors | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 22 | SmoothCursor Component | Scoped component activation without global `* { cursor: none }` lock; touch fallback | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 23 | ProgressiveBlur Component | Multi-layer Gaussian blur with backdrop-filter; `aria-hidden="true"` presentation layers | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 24 | DottedMap Component | Accessible summary for screen readers; token-bound dot and radar beacon colors; local asset fallbacks | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 25 | AnimatedBeam Component | Decorative SVG with `aria-hidden="true"`; token-bound gradient stops; static line under reduced motion | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 26 | BorderBeam Component | Remove `customClass.includes('red')` string sniffing; dynamic CSS variables (`--color-from`, `--color-to`) | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 27 | ShineBorder Component | Fix position:absolute container collapse and variable mismatch (`--duration`, `--border-width`) | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 28 | MagicCard Component | Remove hardcoded gradient colors and hex borders; bind to `var(--s-bg-surface)` and `var(--s-border-default)` | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 29 | GlareHover Component | Remove static `.s-glare-hover.rounded-xl` pixel overrides; preserve dynamic Tailwind utility classes | M2 | DONE | Survey (Explorer 1, Spec Miner 2) |
| 30 | Component Registry Decoupling | Codify native registry schemas in `apps/docs/registry-data.mjs`, eliminate `read_ui/magicui` dependencies | M3 | PLANNED | Survey (Explorer 1, Explorer 3) |
| 31 | Documentation & Demos Parity | Modernize `apps/docs/catalog.mjs`, `recipes.mjs`, `usage-data.mjs`; remove foreign links | M3 | PLANNED | Survey (Explorer 3) |
| 32 | Agent Rules Creation | Populate `.agents/rules/` with architecture, token conventions, Tailwind guidelines, accessibility rules | M3 | PLANNED | Survey (Explorer 3) |
| 33 | README Modernization | Update root and package `README.md` to reflect 120 components, new tokens, and CLI usage | M3 | PLANNED | Survey (Explorer 3) |
| 34 | Automated Token Validator | Automated schema and consistency check for tokens (`scripts/validate-tokens.mjs` / `tests/tokens.test.mjs`) | M4 | PLANNED | Survey (Explorer 3) |
| 35 | Automated Registry Validator | Automated registry integrity test ensuring all components have valid schema and exports | M4 | PLANNED | Survey (Explorer 3) |
| 36 | Linter & Style Guard Script | Add `npm run lint` and style guard script ensuring zero hardcoded color workarounds in components | M4 | PLANNED | Survey (Explorer 3) |
| 37 | Package Build Test Fix | Fix `scripts/check-package.mjs` ambient TypeScript type isolation (`--skipLibCheck`) | M4 | PLANNED | Survey (Explorer 1) |
| 38 | E2E Testing Suite (Tiers 1-4) | Comprehensive opaque-box test suite for all audited features and requirements | M5 (Phase 1) | DONE (Authored) | E2E Testing Track |
| 39 | Adversarial Coverage Hardening | White-box stress testing, corner cases, and mutation verification (Tier 5) | M5 (Phase 2) | PLANNED | Project Pattern |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Benchmark Audit & Token Taxonomy Expansion | Items #1, #2, #3, #4. Audit report, `tokens/sarah.tokens.json` component tokens, compiler updates, and Tailwind preset modernization | none | DONE (Gate Iteration 2 Passed) |
| M2 | Component Refactoring & Dynamic Styling Alignment | Items #5 through #29. Refactor templates, styles.css, interaction logic for Getting Started through Glare Hover into modular `src/components/<ComponentName>/` structure (21 remaining components; 99 already complete). Build `src/components/index.js` aggregating all 120 components. Maintain backward-compatible barrel re-exports in `src/index.js` and `src/templates.js`. | M1 | DONE (Gate Iteration 1 Passed) |
| M3 | Registry Decoupling, Docs & Agent Rules Alignment | Items #30, #31, #32, #33. Codify native registry; update `apps/docs/` demos and recipes; author `.agents/rules/`; update root and package `README.md` | M2 | READY |
| M4 | Automated Verification Suite & Package Quality Gate | Items #34, #35, #36, #37. Add token schema validator, registry validator, `npm run lint`, fix `test:package`, ensure all repository scripts pass | M3 | PLANNED |
| M5 | Final Milestone: 100% E2E Pass & Adversarial Hardening | Items #38, #39. Execute full E2E test suite (Tiers 1-4) until 100% pass, followed by Tier 5 adversarial hardening | M4, TEST_READY | PLANNED |


