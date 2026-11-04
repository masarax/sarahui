# SarahUI E2E Test Infrastructure Specification (TEST_INFRA.md)

## 1. Overview & Test Architecture
This document defines the comprehensive, opaque-box, requirement-driven end-to-end (E2E) testing infrastructure for SarahUI. The suite validates all audited items from "Getting Started" through "Glare Hover", along with token architecture, component registry, dynamic Tailwind CSS utilities, and WCAG 2.1 AA / accessibility standards.

### Core Principles
- **Opaque-Box Requirement-Driven**: Tests assert strictly against external requirements and interface contracts defined in `ORIGINAL_REQUEST.md` and `PROJECT.md`, without coupling to internal implementation quirks.
- **Native Test Runner**: Built on Node.js native test runner (`node --test`) with ECMAScript Modules (ESM) and strict assertions (`node:assert/strict`).
- **Zero Runtime Overhead & Determinism**: All tests execute reliably in milliseconds without requiring flaky external network dependencies.
- **Independence & Progressive Testability**: Each test suite manages its own state and independently asserts behavior against clear specifications.

---

## 2. Audited Feature Inventory

The test suite covers all 25 audited items from Getting Started through Glare Hover, plus 4 cross-cutting foundational systems:

| # | Feature Key | Category | Interface Contract / Scope |
|---|-------------|----------|----------------------------|
| 1 | `getting-started-intro` | Documentation | Semantic structure, theme variables, zero broken styles, `#overview` |
| 2 | `getting-started-install` | Documentation | Setup instructions, package manager commands (pnpm/npm/yarn/bun), `#start` |
| 3 | `getting-started-foundations` | Documentation | Color palettes, typography scale, spacing units, motion tokens, `#foundations` |
| 4 | `getting-started-patterns` | Documentation | Studio workspace, data tables, accessible filter/settings forms, `#patterns` |
| 5 | `marquee` | Core Component | Continuous scroll, reverse, pause-on-hover, reduced-motion, aria-hidden duplicate tracks |
| 6 | `terminal` | Core Component | Terminal window, `aria-live="polite"`, semantic status dots, reduced-motion typing delay |
| 7 | `hero-video-dialog` | Core Component | Accessible trigger, `aria-haspopup="dialog"`, modal focus trap, Esc key handler, thumbnail fallback |
| 8 | `bento-grid-card` | Core Component | Responsive `col-span-*` Tailwind classes, token-bound surface/border, no duplicate CTA links |
| 9 | `animated-list` | Core Component | `role="log"`, `aria-live="polite"`, semantic tone token bindings, reduced-motion bypass |
| 10 | `dock` | Core Component | `role="toolbar"`, roving tabindex, keyboard arrow navigation, token-bound dimensions |
| 11 | `globe` | Core Component | 2D/3D canvas markup, `role="img"`, `aria-label`, auto-rotation reduced-motion toggle |
| 12 | `tweet-card` | Visual Component | Decoupled from foreign handles/links, semantic article markup, token surface/badges |
| 13 | `orbiting-circles` | Visual Component | Forwarded delay parameter, balanced static layout under reduced-motion, pause-on-hover |
| 14 | `avatar-circles` | Visual Component | Descriptive `alt` attributes, counter `aria-label`, token dimensions, keyboard focusable links |
| 15 | `icon-cloud` | Visual Component | Valid SimpleIcons CDN fallback, interactive pause control with `aria-pressed` |
| 16 | `lens` | Visual Component | Accessible loupe region, `role="region"`, `aria-label`, keyboard focusable container |
| 17 | `pointer` | Visual Component | Scoped pointer glyph with `aria-hidden="true"`, accessible badge, token colors |
| 18 | `smooth-cursor` | Visual Component | Scoped cursor activation (no global `* { cursor: none }`), touch screen fallback |
| 19 | `progressive-blur` | Visual Component | Multi-layer Gaussian blur backdrop-filter, `aria-hidden="true"` presentation layers |
| 20 | `dotted-map` | Visual Component | Accessible screen reader summary, token-bound dot and radar beacon colors |
| 21 | `animated-beam` | FX Component | Decorative SVG with `aria-hidden="true"`, token gradient stops, static reduced-motion line |
| 22 | `border-beam` | FX Component | Dynamic CSS variables (`--color-from`, `--color-to`), no brittle string sniffing |
| 23 | `shine-border` | FX Component | Position relative container preservation, duration & border-width variable bindings |
| 24 | `magic-card` | FX Component | Clean token binding (`--s-bg-surface`, `--s-border-default`), no hardcoded hex styles |
| 25 | `glare-hover` | FX Component | Dynamic Tailwind utility class preservation, no static `.rounded-xl` pixel overrides |
| 26 | `tokens-compiler` | System | 3-layer Adobe Spectrum taxonomy, `--s-` variable generation, TypeScript declarations |
| 27 | `tailwind-preset` | System | Modern preset mapping colors, animations, borders without overriding user utilities |
| 28 | `component-registry`| System | Clean registry metadata (`apps/docs/registry-data.mjs`), zero foreign paths |
| 29 | `wcag-accessibility`| System | WCAG 2.1 AA contrast ratios, `prefers-reduced-motion`, keyboard focus indicators |

---

## 3. Four-Tier Test Suite Design

The E2E test suite implements a rigorous 4-tier testing hierarchy:

### Tier 1: Feature Coverage (>=5 tests per feature)
Verifies the nominal functional contracts and happy paths:
- Function invocation with standard properties
- Output markup containing required semantic tags and CSS classes
- Attribute rendering (`id`, `class`, `style`, ARIA roles)
- Token binding hooks and CSS custom properties
- Child content composition and text escaping

### Tier 2: Boundary & Corner Cases (>=5 tests per feature where applicable)
Stresses the system under extreme or non-standard inputs:
- Zero / negative / extreme numeric parameters (e.g. `duration: 0`, `size: 99999`)
- Empty string, null, and undefined options
- Empty arrays and missing child elements
- Malformed inputs, hostile HTML characters, and script injection payloads
- Layout constraints (e.g. missing containers, ultra-narrow boundaries)

### Tier 3: Cross-Feature Combinations (Pairwise Interactions)
Validates that disparate components integrate seamlessly without style conflicts:
- BentoGrid hosting Marquee, TweetCard, and Terminal cards
- MagicCard wrapped inside GlareHover with ShineBorder accent
- Dock containing AvatarCircles and interactive Icon triggers
- Lens magnifying an OrbitingCircles and DottedMap visualization
- HeroVideoDialog combined with AnimatedBeam directional paths
- ProgressiveBlur overlaid on dynamic Tailwind layouts
- Dynamic Tailwind utility classes preserved across nested components

### Tier 4: Real-World Application Scenarios (End-to-End Workflows)
Exercises full multi-component production views:
- **Scenario A: Developer Marketing Landing Page**: HeroVideoDialog modal, Marquee logos, BentoGrid feature matrix, Terminal quickstart, TweetCard social proof.
- **Scenario B: Design Engineer Interactive Studio**: Foundations token viewer, Dock tool palette, Lens asset inspector, GlareHover card gallery.
- **Scenario C: Global Analytics & Operations Dashboard**: DottedMap telemetry, AnimatedBeam connection routes, AnimatedList live event log, Globe status.
- **Scenario D: Onboarding & Interactive Workspace**: Start guide, package manager commands, interactive workspace table, accessible settings form with validation.

---

## 4. Test Suite File Structure

The test files reside in `tests/e2e/`:

```
tests/e2e/
├── getting-started.test.mjs           # Features 1-4 (Tiers 1 & 2)
├── components-core.test.mjs           # Features 5-11 (Tiers 1 & 2: Marquee, Terminal, HeroVideoDialog, BentoGrid/Card, AnimatedList, Dock, Globe)
├── components-visual.test.mjs         # Features 12-20 (Tiers 1 & 2: TweetCard, OrbitingCircles, AvatarCircles, IconCloud, Lens, Pointer, SmoothCursor, ProgressiveBlur, DottedMap)
├── components-fx.test.mjs             # Features 21-25 (Tiers 1 & 2: AnimatedBeam, BorderBeam, ShineBorder, MagicCard, GlareHover)
├── system-integration.test.mjs        # Features 26-29 (Tiers 1 & 2: Tokens, Tailwind Preset, Registry, WCAG/A11y/Reduced Motion)
└── combinations-and-scenarios.test.mjs# Tiers 3 & 4 (Pairwise Cross-Feature Combinations & Real-World Application Scenarios)
```

---

## 5. Test Execution & Verification

### Command to Execute
```bash
node --test tests/e2e/*.test.mjs
```

### Expected Output & Gate
- All tests pass with exit code `0`.
- Zero silent bypasses or empty test facades.
- All implementation defects identified are escalated with file, line, and contract mismatch.
