# SarahUI Benchmark Audit: Getting Started Through Glare Hover
**Benchmark Standard**: Adobe Spectrum Design Data (`adobe/spectrum-design-data`)  
**Auditor**: SarahUI Architecture & Quality Engineering (Milestone 1)  
**Date**: 2026-11-03  
**Status**: Authoritative Reference Document  
**Scope**: Getting Started (Introduction, Installation, Foundations, Patterns) and 21 Modern Components (Marquee, Terminal, Hero Video Dialog, Bento Grid, Animated List, Dock, Globe, Tweet Card, Orbiting Circles, Avatar Circles, Icon Cloud, Lens, Pointer, Smooth Cursor, Progressive Blur, Dotted Map, Animated Beam, Border Beam, Shine Border, Magic Card, Glare Hover).

---

## 1. Executive Summary & Audit Mandate

This audit establishes the authoritative technical benchmark for SarahUI by evaluating its implementation against **Adobe Spectrum Design Data** (`adobe/spectrum-design-data`). Adobe Spectrum Design Data is the canonical data repository for Adobe Spectrum and Spectrum 2, representing the industry standard for multi-platform design systems, multi-tiered token taxonomies, cross-reference semantic integrity, and strict WCAG 2.1 AA accessibility.

### 1.1 Architectural Preservation Invariant
All audit findings, remediation strategies, and token taxonomy expansions must strictly preserve SarahUI's core architectural foundation:
1. **Framework-Neutral Tagged HTML Templates**: `packages/ui/src/templates.js` exports pure ES module template functions (`html`, `raw`, `render`, `attributes`) producing clean, accessible native HTML markup strings.
2. **Zero Runtime Dependencies**: The core package relies solely on standard CSS custom properties (`tokens.css`), pure CSS keyframe animations, and lightweight vanilla JavaScript progressive enhancement (`packages/ui/src/index.js`, `enhanceUI()`).
3. **Dynamic Tailwind CSS Integration**: `@sarahui/tailwind-preset` (`packages/ui/src/tailwind-preset.js`) provides utility mapping for colors, animations, borders, and shadows without overriding dynamic utility classes.
4. **Registry Metadata**: Component registry data powers the documentation catalog and per-component entry points. No CLI binary is shipped.

---

## 2. Adobe Spectrum Design Data Benchmark Reference Architecture

Adobe Spectrum Design Data structures design systems according to three formal validation layers and canonical data serialization models:

### 2.1 Three-Layer Validation Framework
1. **Layer 1: Structural Validation**:
   - JSON Schemas (`token.schema.json`, `field.schema.json`, `component.schema.json`) define syntax, primitive data types, and required metadata.
2. **Layer 2: Semantic Cross-Reference Rules (`rules/rules.yaml`)**:
   - Strict catalog of semantic validation rules (`SPEC-001` through `SPEC-018+`).
   - `SPEC-018` (`component-name-exists`): Enforces that every token targeting a component binds to an existing, declared component schema.
   - Enforces bidirectional integrity between token namespaces and component anatomy.
3. **Layer 3: Conformance Fixtures (`conformance/`)**:
   - Golden test suites verifying platform compilation across CSS custom properties, iOS/Swift, Android/Kotlin, and Web Components.

### 2.2 Token Taxonomy: Flat Name Object Serialization
Spectrum abandoned nested JSON maps in favor of a canonical flat name object:
```json
{
  "name": {
    "component": "button",
    "structure": "control",
    "property": "background-color",
    "intent": "primary",
    "state": "hover",
    "colorScheme": "dark",
    "scale": "desktop"
  },
  "value": "var(--s-action-primary-hover)"
}
```

#### Taxonomy Fields
- **`property`**: The visual attribute being styled (`background-color`, `border-color`, `border-radius`, `font-size`, `line-height`, `box-shadow`, `duration`, `timing-function`, `spacing`, `offset`).
- **`component`**: Standard kebab-case component name (`button`, `dialog`, `marquee`, `dock`, `magic-card`).
- **`structure` / `object` / `anatomyPart`**: Structural sub-element of the component anatomy (`track`, `control`, `halo`, `glow`, `surface`, `badge`, `counter`, `vignette`, `thumbnail`, `close-button`).
- **`intent` / `variant`**: Semantic tier or visual hierarchy (`primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `warning`, `info`, `neutral`, `brand`).
- **`state`**: Lifecycle and interaction state (`idle`/`default`, `hover`, `active`/`down`, `focus`, `focus-visible`, `disabled`, `busy`/`loading`, `selected`, `dragged`).
- **`colorScheme`**: Mode dimension (`light`, `dark`, `wireframe`, `any`).
- **`scale`**: Density dimension (`desktop`/`medium`, `mobile`/`large`, `touch`).

### 2.3 Component Specification Model
Every component declared in Spectrum formalizes:
- **`anatomy`**: Explicit naming of every DOM layer and container.
- **`states`**: All valid interactive and rendering states.
- **`accessibility`**: Required WAI-ARIA roles, ARIA attributes, live regions, focus trapping rules, and keyboard interaction maps.
- **`motion`**: Keyframe bindings with mandatory `prefers-reduced-motion` fallbacks.

---

## 3. Full Scope Audit: Getting Started Sections

### 3.1 Introduction (`apps/docs/site.mjs: overview()`)
- **Location**: Rendered by `overview()` in `apps/docs/site.mjs:22-53` responding to `#overview`.
- **Implementation**: Renders hero headline, release announcement banner, quick-install command, token swatches, system stats, and core philosophy.
- **Benchmark Evaluation**:
  - Semantic structure uses native `<section>` and `<div>` elements.
  - Stats display hardcodes `277` tokens across several locations (`apps/docs/site.mjs:43`, `meta description`, `catalog.mjs:6886`).
  - Lacks structured WAI-ARIA breadcrumbs or explicit region landmark labeling.
- **Remediation**:
  - Bind stat badges and descriptions dynamically to compiled token count.
  - Add `role="region" aria-label="System Overview"` to section container.

### 3.2 Installation (`apps/docs/start.mjs: startPage()`)
- **Location**: Rendered by `startPage()` in `apps/docs/start.mjs:96-272` responding to `#start`.
- **Implementation**: Step-by-step setup guide with package manager tabs (pnpm, npm, yarn, bun), CSS import instructions, framework configuration guides, and custom token override tables.
- **Benchmark Evaluation**:
  - Keyboard interaction for package manager tabs is present via `sarah:tabchange`.
  - Framework integration code examples lack explicit import paths for native component registry retrieval.
- **Remediation**:
  - Document per-component entry points (`sarahui/components/<Name>`) in installation workflows.

### 3.3 Foundations (`apps/docs/site.mjs: foundations()`)
- **Location**: Rendered by `foundations()` in `apps/docs/site.mjs:54-74` responding to `#foundations`.
- **Implementation**: Displays interactive swatches for 85 primitive colors, 48 semantic roles per theme, 15 typography text styles, spacing scale (0-96px), shape radii, elevation shadows, and motion durations.
- **Benchmark Evaluation**:
  - Highly compliant 3:1 graphical and 4.5:1 text contrast checks automated via `tests/foundations.test.mjs`.
  - Foundations are strong, but component-tier design tokens are completely absent from foundation documentation.
- **Remediation**:
  - Document component token taxonomy alongside primitive and semantic tiers.

### 3.4 Patterns (`apps/docs/site.mjs: patterns()`)
- **Location**: Rendered by `patterns()` in `apps/docs/site.mjs:270-349` responding to `#patterns`.
- **Implementation**: Live working workspace demonstrating interactive project cards, sortable/filterable data tables, multi-select rows, pagination, and account settings forms.
- **Benchmark Evaluation**:
  - Compliant with ARIA live announcements for sorting and selection.
  - Project cards currently rely on ad-hoc utility classes rather than standard component tokens.

---

## 4. Full Scope Audit: 21 Audited Components

### 4.1 Marquee
- **Files**: `packages/ui/src/templates.js:336`, `packages/ui/src/styles.css:157`, `apps/docs/catalog.mjs:225`, `registry-data.mjs:324`.
- **Anatomy**: `.s-marquee` (outer wrapper), `.s-marquee-track` (scrolling flex container), child track clones.
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Uses hardcoded fallback `--duration: 40s;` and `--gap: 1rem;` without token bindings in `sarah.tokens.json`.
  2. *Accessibility*: Duplicate track clones lack `aria-hidden="true"`, causing screen readers to read repeated content.
  3. *Reduced Motion*: Continuous scroll animation fails to pause under `@media (prefers-reduced-motion: reduce)`, violating WCAG 2.2.2.
- **Remediation**:
  - Add tokens: `marquee/duration` (`motion/duration/slow`), `marquee/gap` (`layout/spacing/16`).
  - Mark duplicate track nodes with `aria-hidden="true"`.
  - Enforce `animation-play-state: paused !important;` under `prefers-reduced-motion: reduce`.

### 4.2 Terminal
- **Files**: `packages/ui/src/templates.js:678`, `packages/ui/src/styles.css:417`, `packages/ui/src/index.js:146`, `registry-data.mjs:424`.
- **Anatomy**: `.s-terminal` (window frame), `.s-terminal-header` (controls), `.s-terminal-dot` (status dots), `.s-terminal-body` (code stream).
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Window status dots and text status colors use hardcoded hex (`.s-terminal-span--success { color: #22c55e; }`, `styles.css:426`). Missing tokens for terminal background, radius, padding.
  2. *Accessibility*: Sequential command execution lacks `aria-live="polite"` on output container, concealing dynamic step progress from assistive technology.
  3. *Reduced Motion*: Typing delays should be bypassed instantly when `prefers-reduced-motion` is active.
- **Remediation**:
  - Add tokens: `terminal/radius` (`radius/xl`), `terminal/padding` (`spacing/16`), `terminal/bg` (`bg/surface`), `terminal/border` (`border/default`).
  - Bind status spans to `var(--s-status-success-text)` and `var(--s-status-info-text)`.
  - Add `role="region" aria-label="Terminal"` and `aria-live="polite"` to step container.

### 4.3 HeroVideoDialog
- **Files**: `packages/ui/src/templates.js:1104`, `packages/ui/src/styles.css:887`, `packages/ui/src/index.js:31`, `registry-data.mjs:476`.
- **Anatomy**: `.s-hero-video-wrap` (container), `.s-hero-video-btn` (thumbnail trigger), `.s-hero-video-dialog` (`<dialog>` modal), `iframe`/`video`.
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Missing tokens for trigger halo size and modal corner radius.
  2. *Accessibility*: Trigger button has static `aria-label="Play video"` without title context. Thumbnail image lacks local asset fallback when external Unsplash CDN fails.
  3. *Focus Management*: Dialog close must return focus to trigger thumbnail button.
- **Remediation**:
  - Add tokens: `hero-video/radius` (`radius/xl`), `hero-video/halo-size` (`size/control/lg`).
  - Provide contextual label `aria-label="Play video: ${thumbnailAlt || 'Showcase'}"`.
  - Implement focus return on modal dismissal.

### 4.4 BentoGrid & BentoCard
- **Files**: `packages/ui/src/templates.js:297, 303`, `packages/ui/src/styles.css:205-278`, `registry-data.mjs:71`.
- **Anatomy**: `.s-bento-grid` (CSS grid container), `.s-bento-card` (`<article>` cell), `.s-bento-card-bg` (media background), `.s-bento-card-content`, `.s-bento-card-cta`.
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Hardcoded dark/light theme background colors in CSS (`[data-theme="dark"] .s-bento-card { background: #09090b; }`, `styles.css:214`).
  2. *Accessibility*: Template renders duplicate CTA elements (`.s-bento-card-cta-mobile` and `.s-bento-card-cta-desktop`) without `aria-hidden="true"`, creating duplicate focus targets for keyboard and screen reader users.
  3. *Dynamic Tailwind*: Overly specific column utility classes in `styles.css` conflict with dynamic Tailwind `col-span-*` classes.
- **Remediation**:
  - Add tokens: `bento/radius` (`radius/xl`), `bento/gap` (`spacing/16`), `bento/padding` (`spacing/24`).
  - Replace hardcoded hex with `var(--s-bg-surface)` and `var(--s-border-default)`.
  - Consolidate CTA into a single responsive anchor.

### 4.5 AnimatedList
- **Files**: `packages/ui/src/templates.js:781`, `packages/ui/src/styles.css:502`, `packages/ui/src/index.js:315`, `registry-data.mjs:76`.
- **Anatomy**: `.s-animated-list` (feed container), `.s-animated-list-item` (staggered entries).
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Default items hardcode hex colors (`#00C9A7`, `#FFB800`, `#FF3D71`, `#1E86FF`).
  2. *Accessibility*: Container lacks `role="feed"` or `role="log"` and `aria-live="polite"`.
  3. *Reduced Motion*: Staggered entry animation must render all items statically when reduced motion is preferred.
- **Remediation**:
  - Add tokens: `animated-list/radius` (`radius/lg`), `animated-list/gap` (`spacing/12`).
  - Add `role="log" aria-live="polite"` to container.
  - Disable staggered entrance transitions under `prefers-reduced-motion: reduce`.

### 4.6 Dock
- **Files**: `packages/ui/src/templates.js:523`, `packages/ui/src/styles.css:329`, `packages/ui/src/index.js:485`, `registry-data.mjs:372`.
- **Anatomy**: `.s-dock` (`<nav>` toolbar), `.s-dock-icon` (interactive action icons).
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Dimensions rely on raw numbers rather than token bindings.
  2. *Accessibility*: Lacks WAI-ARIA toolbar pattern (`role="toolbar"`, roving `tabindex="0|-1"`, Arrow Left/Right/Up/Down keyboard navigation).
  3. *Reduced Motion*: Hover magnification should be disabled under `prefers-reduced-motion`.
- **Remediation**:
  - Add tokens: `dock/radius` (`radius/full`), `dock/size` (`size/control/md`), `dock/gap` (`spacing/8`), `dock/padding` (`spacing/12`).
  - Implement APG toolbar keyboard navigation.

### 4.7 Globe
- **Files**: `packages/ui/src/templates.js:775`, `packages/ui/src/styles.css:495`, `packages/ui/src/index.js:566`, `registry-data.mjs:386`.
- **Anatomy**: `.s-globe-container` (wrapper), `<canvas>` (2D projection).
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Canvas colors are hardcoded inside JS rather than bound to `--s-brand-indigo` and `--s-primitive-*`.
  2. *Accessibility*: Canvas lacks descriptive `role="img" aria-label="Interactive rotating globe"`.
  3. *Reduced Motion*: Auto-rotation must freeze when reduced motion is requested.
- **Remediation**:
  - Add token: `globe/radius` (`radius/full`).
  - Add `role="img"` and descriptive label to canvas element.
  - Halt continuous rotation under `prefers-reduced-motion`.

### 4.8 TweetCard
- **Files**: `packages/ui/src/templates.js:1731`, `packages/ui/src/styles.css:1435`, `registry-data.mjs:518`.
- **Anatomy**: `.s-tweet-card` (`<article>`), `.s-tweet-header`, `.s-tweet-media`, `.s-tweet-actions`.
- **Benchmark Gaps**:
  1. *Third-Party Domain Leak*: Lines 1620–1720 hardcode `KNOWN_TWEETS` containing promotional links to `magicuikit.com` and personal handle `@dillionverma`.
  2. *Token Taxonomy*: Verified badge hardcodes Twitter blue `#1D9BF0`.
- **Remediation**:
  - Add tokens: `tweet-card/radius` (`radius/xl`), `tweet-card/padding` (`spacing/16`).
  - Purge external promotional links; replace with self-hosted SarahUI product release announcements.
  - Bind verified badge to `var(--s-brand-blue)`.

### 4.9 OrbitingCircles
- **Files**: `packages/ui/src/templates.js:712`, `packages/ui/src/styles.css:442`, `registry-data.mjs:442`.
- **Anatomy**: `.s-orbiting-circles` (stage), `<svg>` (orbital guide paths), `.s-orbit-item` (orbiting nodes).
- **Benchmark Gaps**:
  1. *Dropped Parameter*: `delay` prop is accepted in template signature but dropped in output inline style string, preventing staggered phasing.
  2. *WCAG Non-Compliance*: Continuous orbital rotation spins indefinitely under `prefers-reduced-motion: reduce`.
- **Remediation**:
  - Add tokens: `orbit/icon-size` (`size/icon/lg`), `orbit/path-border` (`border-width/default`).
  - Forward `--delay:${delay}s` in rendered style attribute.
  - Freeze animation and arrange items in static balanced radial layout under `prefers-reduced-motion`.

### 4.10 AvatarCircles
- **Files**: `packages/ui/src/templates.js:569`, `packages/ui/src/styles.css:368`, `registry-data.mjs:348`.
- **Anatomy**: `.s-avatar-circles` (stack), `.s-avatar-img` (overlapping avatars), `.s-avatar-count` (overflow counter badge).
- **Benchmark Gaps**:
  1. *Accessibility*: Overflow counter badge (`+N`) has `user-select:none` but lacks screen reader description `aria-label="${numPeople} additional contributors"`.
  2. *Token Taxonomy*: Avatar sizes hardcoded in pixels.
- **Remediation**:
  - Add tokens: `avatar-circles/size` (`size/avatar/md`), `avatar-circles/overlap` (`spacing/8`).
  - Add `role="group" aria-label="Contributors"` and descriptive counter label.

### 4.11 IconCloud
- **Files**: `packages/ui/src/templates.js:1150`, `packages/ui/src/styles.css:922`, `packages/ui/src/index.js:985`, `registry-data.mjs:488`.
- **Anatomy**: `.s-icon-cloud-wrap` (stage), `<canvas>` (3D spherical tag cloud), pause toggle button.
- **Benchmark Gaps**:
  1. *Malformed CDN URL*: Line 1173 constructs `https://cdn.simpleicons.org/${s}/${s}`. SimpleIcons format is `[slug]/[color]`. Supplying the slug as color triggers parse errors for non-hex names.
  2. *Accessibility*: Pause button lacks dynamic `aria-pressed="false|true"`.
- **Remediation**:
  - Add token: `icon-cloud/size` (`size/content/max`).
  - Fix CDN URL to `https://cdn.simpleicons.org/${s}` with offline SVG fallback.
  - Add `aria-pressed` toggle state and `role="img"` to canvas.

### 4.12 Lens
- **Files**: `packages/ui/src/templates.js:1191`, `packages/ui/src/styles.css:946`, `packages/ui/src/index.js:1120`, `registry-data.mjs:500`.
- **Anatomy**: `.s-lens-container` (viewport), `.s-lens-loupe` (circular magnifier), `.s-lens-overlay`.
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Lens border and radius use static CSS properties.
  2. *Accessibility*: Magnifier container must support keyboard navigation and carry `role="region" aria-label="Magnifier view"`.
- **Remediation**:
  - Add tokens: `lens/radius` (`radius/full`), `lens/loupe-border` (`border-width/focus`).
  - Ensure loupe overlay has `aria-hidden="true"`.

### 4.13 Pointer
- **Files**: `packages/ui/src/templates.js:1593`, `packages/ui/src/styles.css:1350`, `packages/ui/src/index.js:1194`, `registry-data.mjs:508`.
- **Anatomy**: `.s-custom-pointer-wrap` (tracker), `<svg>` (cursor arrow glyph), `.s-pointer-badge` (user badge).
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Color defaults to hardcoded `#5B3DF5` rather than brand token.
  2. *Accessibility*: Cursor SVG must carry `aria-hidden="true"`.
- **Remediation**:
  - Add token: `pointer/badge-radius` (`radius/md`).
  - Bind default color to `var(--s-brand-indigo)`. Mark SVG glyph with `aria-hidden="true"`.

### 4.14 SmoothCursor
- **Files**: `packages/ui/src/templates.js:1601`, `packages/ui/src/styles.css:1380`, `packages/ui/src/index.js:1218`, `registry-data.mjs:25`.
- **Anatomy**: `.s-smooth-cursor-container` (spring mouse follower), `.s-smooth-cursor-dot`.
- **Benchmark Gaps**:
  1. *Global Lock Defect*: `index.js:1240` injects `* { cursor: none !important; }` across the entire document, destroying native cursor visibility on unrelated controls.
  2. *Self-Disabling Bug*: `isTargetActive()` explicitly restricts initialization to catalog view.
- **Remediation**:
  - Add token: `smooth-cursor/size` (`size/icon/lg`).
  - Scope `cursor: none` strictly to container boundaries; restore native cursor on leave or touch devices.

### 4.15 ProgressiveBlur
- **Files**: `packages/ui/src/templates.js:854`, `packages/ui/src/styles.css:590`, `registry-data.mjs:31`.
- **Anatomy**: `.s-progressive-blur-wrap` (container), stacked backdrop blur layers with graduated mask gradients.
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Layer heights use static pixel dimensions.
  2. *Accessibility*: Decorative blur layers must carry `aria-hidden="true"`.
- **Remediation**:
  - Add token: `progressive-blur/height` (`spacing/48`).
  - Mark all blur gradient layers with `aria-hidden="true"`.

### 4.16 DottedMap
- **Files**: `packages/ui/src/templates.js:1279`, `packages/ui/src/styles.css:1000`, `registry-data.mjs:38`.
- **Anatomy**: `.s-dotted-map-container` (stage), `<svg>` (continent dot grid), `.s-map-marker` (pulsing pin).
- **Benchmark Gaps**:
  1. *External Domain Leak*: Flag images loaded from `https://flagcdn.com/`. Marker colors hardcoded to `#FF6900`.
  2. *Screen Reader Concealment*: Entire container marked `aria-hidden="true"`, concealing all geographic location data from screen readers.
- **Remediation**:
  - Add token: `dotted-map/dot-size` (`size/icon/sm`).
  - Bind markers to `var(--s-brand-indigo)`. Provide accessible visually-hidden summary table of marked coordinates.

### 4.17 AnimatedBeam
- **Files**: `packages/ui/src/templates.js:622`, `packages/ui/src/styles.css:390`, `packages/ui/src/index.js:2076`, `registry-data.mjs:50`.
- **Anatomy**: `<svg class="s-animated-beam">` (SVG stage), path definition, `<linearGradient>` with moving gradient stops.
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Default gradient stops hardcode `#ffaa40` and `#9c40ff`.
  2. *Reduced Motion*: Gradient beam movement continues indefinitely under reduced motion.
- **Remediation**:
  - Add tokens: `animated-beam/stroke-width` (`border-width/focus`), `animated-beam/color-from` (`brand/indigo`), `animated-beam/color-to` (`brand/violet`).
  - Render static connection line under `prefers-reduced-motion: reduce`.

### 4.18 BorderBeam
- **Files**: `packages/ui/src/templates.js:358`, `packages/ui/src/styles.css:175`, `registry-data.mjs:332`.
- **Anatomy**: `.s-border-beam` (outer border track), inner beam glow element with `offset-path: rect(...)`.
- **Benchmark Gaps**:
  1. *Critical Anti-Pattern*: `templates.js:369-377` sniffs class strings:
     `if (customClass.includes('red')) bgGradient = '...#ef4444...'`. Passing any utility containing `"red"` (e.g. `"text-red-500"`) unintentionally alters the beam gradient.
  2. *Token Taxonomy*: Missing tokens for border beam width and gradient bounds.
- **Remediation**:
  - Add tokens: `border-beam/width` (`border-width/default`), `border-beam/color-from` (`brand/indigo`), `border-beam/color-to` (`brand/violet`).
  - Eliminate string-sniffing. Accept dynamic CSS custom properties `--color-from` and `--color-to`.

### 4.19 ShineBorder
- **Files**: `packages/ui/src/templates.js:425`, `packages/ui/src/styles.css:282`, `registry-data.mjs:358`.
- **Anatomy**: `.s-shine-border` (container), `.s-shine-border-inner` (content wrapper), laser sweep mask.
- **Benchmark Gaps**:
  1. *Container Collapse*: `styles.css:282` defines `.s-shine-border { position: absolute; inset: 0; pointer-events: none; }`, removing it from document flow and disabling user clicks on children.
  2. *Variable Mismatch*: Template emits `--shine-duration:${duration}s`, while CSS queries `var(--duration, 14s)`.
  3. *Border Width Mismatch*: Template sets `border-width:${borderWidth}px;`, while CSS queries `padding: var(--border-width, 1.5px)`.
- **Remediation**:
  - Add tokens: `shine-border/width` (`border-width/default`), `shine-border/radius` (`radius/xl`).
  - Fix layout to `position: relative` with absolute pseudo-element shine overlay. Synchronize variable names.

### 4.20 MagicCard
- **Files**: `packages/ui/src/templates.js:446`, `packages/ui/src/styles.css:295`, `packages/ui/src/index.js:1787`, `registry-data.mjs:364`.
- **Anatomy**: `.s-magic-card` (container), `.s-magic-card-bg` (surface), `.s-magic-card-spotlight` (mouse follower spotlight layer).
- **Benchmark Gaps**:
  1. *Token Taxonomy*: Background stylesheet hardcodes `#09090b` and `#ffffff` (`styles.css:301-305`), breaking custom theme palette inheritance.
  2. *Accessibility*: Decorative spotlight layers must carry `aria-hidden="true"`.
- **Remediation**:
  - Add tokens: `magic-card/radius` (`radius/xl`), `magic-card/gradient-size` (`size/content/max`).
  - Bind background to `var(--s-bg-surface)` and border to `var(--s-border-default)`.

### 4.21 GlareHover
- **Files**: `packages/ui/src/templates.js:957`, `packages/ui/src/styles.css:694`, `registry-data.mjs:530`.
- **Anatomy**: `.s-glare-hover` (container), `.s-glare-hover-surface` (content), `.s-glare-hover-glare` (specular sheen).
- **Benchmark Gaps**:
  1. *Hardcoded Pixel Overrides*: `styles.css:702-708` overrides Tailwind classes with hardcoded pixel values (`.s-glare-hover.rounded-xl { border-radius: 16px; }`).
  2. *Reduced Motion*: Glare sheen flash transition should be bypassed when reduced motion is preferred.
- **Remediation**:
  - Add token: `glare-hover/radius` (`radius/xl`).
  - Remove brittle utility overrides in CSS. Bind radius to `var(--s-radius-xl)`.

---

## 5. Component Semantic & Accessibility Attribute Matrix

This matrix establishes the definitive specification for each audited item:

| # | Component | Primary Tag | WAI-ARIA Role | Required ARIA Attributes | Interactive States | Reduced Motion Behavior | Design Token Bindings |
|---|---|---|---|---|---|---|---|
| **0** | **Getting Started (Docs & Foundations)** | `<main>`, `<section>`, `<nav>` | `main`, `region`, `navigation` | `aria-label`, `aria-labelledby`, `aria-describedby` | `focus-visible`, `hover`, `active` | Instant transitions (0ms) | `--s-bg-canvas`, `--s-bg-surface`, `--s-text-primary`, `--s-border-default` |
| **1** | **Marquee** | `<div>` / `<section>` | `region` (if titled) or generic | `role="region"`, `aria-label`, `aria-hidden="true"` on duplicate clones | `hover`, `focus-within` (pause track) | `animation-play-state: paused` | `--s-marquee-duration`, `--s-marquee-gap` |
| **2** | **Terminal** | `<div>` with `<pre><code>` | `region` / `log` | `role="region"`, `aria-label="Terminal"`, `aria-live="polite"` on output | `idle`, `typing`, `completed` | Display all steps immediately (0ms delay) | `--s-terminal-radius`, `--s-terminal-padding`, `--s-terminal-bg`, `--s-terminal-border` |
| **3** | **HeroVideoDialog** | Trigger: `<button>`; Modal: `<dialog>` | Trigger: `button`; Modal: `dialog` | Trigger: `aria-haspopup="dialog"`, contextual `aria-label`; Modal: `aria-modal="true"` | `hover`, `focus-visible`, `open`, `closing` | Instant scale/opacity transitions (0ms) | `--s-hero-video-radius`, `--s-hero-video-halo-size`, `--s-action-primary` |
| **4** | **BentoGrid & BentoCard** | Grid: `<div>`; Card: `<article>` | Grid: `generic`; Card: `article` | Single responsive CTA anchor; `aria-labelledby="card-title"` | `hover`, `focus-within` | Transform/scale disabled on hover | `--s-bento-radius`, `--s-bento-gap`, `--s-bento-padding`, `--s-bg-surface` |
| **5** | **AnimatedList** | `<div>` | `feed` or `log` | `role="log"`, `aria-live="polite"`, `aria-atomic="false"` | `item-enter`, `idle` | Render all items statically without stagger | `--s-animated-list-radius`, `--s-animated-list-gap`, `--s-bg-surface` |
| **6** | **Dock** | `<nav>` | `toolbar` | `role="toolbar"`, `aria-label="Quick tools"`, roving `tabindex="0|-1"` | `hover`, `focus-visible`, `active` | Disable hover magnification scale | `--s-dock-radius`, `--s-dock-size`, `--s-dock-gap`, `--s-dock-padding` |
| **7** | **Globe** | `<div>` with `<canvas>` | Canvas: `img` | Canvas: `role="img"`, `aria-label="Interactive 3D rotating globe"` | `idle`, `dragging`, `focused` | Disable auto-rotation; display static projection | `--s-globe-radius`, `--s-brand-indigo`, `--s-bg-surface` |
| **8** | **TweetCard** | `<article>` | `article` | `aria-labelledby="tweet-author"`, verified badge `role="img" aria-label="Verified"` | `hover`, `focus-visible` (links/actions) | Carousel duration 0ms | `--s-tweet-card-radius`, `--s-tweet-card-padding`, `--s-bg-surface` |
| **9** | **OrbitingCircles** | `<div>` | `presentation` or `region` | Decorative: `aria-hidden="true"`; Interactive: `role="region" aria-label="Orbiting items"` | `hover`, `focus-within` (pause rotation) | `animation: none` — static balanced radial layout | `--s-orbit-icon-size`, `--s-orbit-path-border`, `--s-border-default` |
| **10** | **AvatarCircles** | `<div>` | `group` | `role="group"`, `aria-label="Contributors"`, descriptive counter `aria-label` | `hover`, `focus-visible` on linked avatars | Scale transform 0ms on hover | `--s-avatar-circles-size`, `--s-avatar-circles-overlap`, `--s-border-default` |
| **11** | **IconCloud** | `<div>` with `<canvas>` | Canvas: `img`; Button: `button` | Canvas: `role="img" aria-label="3D tag cloud"`; Button: `aria-pressed="false|true"` | `idle`, `hover`, `active`, `dragged` | Pause auto-rotation; static spherical distribution | `--s-icon-cloud-size`, `--s-bg-surface`, `--s-text-primary` |
| **12** | **Lens** | `<div>` | `region` | `role="region"`, `aria-label="Magnifier view"`, `tabindex="0"`, loupe `aria-hidden="true"` | `idle`, `hover`, `focused` | Zoom overlay displayed without spring latency | `--s-lens-radius`, `--s-lens-loupe-border`, `--s-border-focus` |
| **13** | **Pointer** | `<div>` | Container: generic; Glyph: `presentation` | Decorative cursor: `aria-hidden="true"`; Badge text: accessible in DOM | `idle`, `tracking` | Instant cursor tracking without spring smoothing | `--s-pointer-badge-radius`, `--s-brand-indigo`, `--s-text-inverse` |
| **14** | **SmoothCursor** | `<div>` | `presentation` | Entire custom cursor: `aria-hidden="true"`; scoped to container | `idle`, `moving`, `touch-fallback` | System cursor visible, custom follower disabled | `--s-smooth-cursor-size`, `--s-brand-indigo`, `--s-shadow-subtle` |
| **15** | **ProgressiveBlur** | `<div>` | `presentation` | `aria-hidden="true"` on all backdrop-filter blur mask layers | `idle` | Layers retain blur without transition delays | `--s-progressive-blur-height`, `--s-bg-canvas` |
| **16** | **DottedMap** | `<div>` with `<svg>` | SVG: `img` or container: `region` | `role="region" aria-label="Distribution map"`, accessible summary list | `marker-pulse`, `hover` on markers | Stop radar ring pulse; static marker pins | `--s-dotted-map-dot-size`, `--s-brand-indigo`, `--s-border-default` |
| **17** | **AnimatedBeam** | `<svg>` | `presentation` | `aria-hidden="true"` (decorative SVG pulse connection) | `animating` | Freeze beam gradient motion; render static line | `--s-animated-beam-stroke-width`, `--s-animated-beam-color-from`, `--s-animated-beam-color-to` |
| **18** | **BorderBeam** | `<div>` | `presentation` | `aria-hidden="true"` (decorative moving perimeter glow) | `animating` | Freeze glow travel; subtle static border accent | `--s-border-beam-width`, `--s-border-beam-color-from`, `--s-border-beam-color-to` |
| **19** | **ShineBorder** | `<div>` | `presentation` for shine mask | Shine mask: `aria-hidden="true"`; content wrapper fully accessible | `animating` | `animation: none` — static perimeter highlight | `--s-shine-border-width`, `--s-shine-border-radius`, `--s-brand-indigo` |
| **20** | **MagicCard** | `<div>` | `article` or generic container | Spotlight and radial orb layers: `aria-hidden="true"` | `idle`, `hover` (spotlight tracking) | Spotlight remains centered without motion lag | `--s-magic-card-radius`, `--s-magic-card-gradient-size`, `--s-bg-surface` |
| **21** | **GlareHover** | `<div>` | `presentation` for glare layer | Glare sheen layer: `aria-hidden="true"`; content accessible | `idle`, `hover` (glare sheen sweep) | Sheen sweep disabled under reduced motion | `--s-glare-hover-radius`, `--s-border-default`, `--s-bg-surface` |

---

## 6. Gap Analysis & Remediation Roadmap

### 6.1 Token Taxonomy Expansion (Milestone 1)
- **Problem**: Prior to this audit, `tokens/sarah.tokens.json` defined only 12 component tokens for 6 base components (`button`, `input`, `card`, `dialog`, `badge`, `focus`). All 21 modern animated components lacked token entries, forcing stylesheets to hardcode raw hex values and pixel dimensions.
- **Remediation**:
  - Expand `componentTokens` in `tokens/sarah.tokens.json` to define scoped tokens for all 21 audited components.
  - Implement Adobe Spectrum flat name serialization (`property`, `component`, `structure`, `intent`, `state`, `colorScheme`, `scale`).
  - Update `scripts/build-tokens.mjs` to compile all component tokens into `--s-<component>-<property>` CSS custom properties in `tokens/generated/sarah.css` and `packages/ui/src/tokens.css`.

### 6.2 Component Refactoring & Styling Alignment (Milestone 2)
- **Problem**: Brittle class string sniffing (`customClass.includes('red')` in `BorderBeam`), static theme overrides (`[data-theme="dark"] .s-bento-card`), and broken layout rules (`position: absolute` in `ShineBorder`).
- **Remediation**:
  - Replace class sniffing with CSS custom property pass-through (`--color-from`, `--color-to`).
  - Replace static hex values with semantic variables (`var(--s-bg-surface)`, `var(--s-border-default)`).
  - Fix container collapsing in `ShineBorder` and restore user event bubbling.
  - Add `prefers-reduced-motion: reduce` overrides across all continuous animations.

### 6.3 Registry Decoupling, Docs & Rules (Milestone 3)
- **Problem**: `apps/docs/registry-data.mjs` references local disk paths in `read_ui/magicui`. Foreign handles and external promo links leak into documentation. `.agents/rules/` is completely empty.
- **Remediation**:
  - Decouple registry from `read_ui/` by embedding native TypeScript component schemas and props directly.
  - Purge third-party URLs and promo handles from `TweetCard`, `HeroVideoDialog`, and `IconCloud`.
  - Author structured agent rule files in `.agents/rules/` (`sarahui-architecture.md`, `design-tokens-spectrum.md`, `component-authoring.md`, `verification-standards.md`).
  - Update `README.md` and package documentation to reflect 120 components.

### 6.4 Automated Verification Suite (Milestone 4)
- **Problem**: Missing `npm run lint` script. Package verification (`npm run test:package`) fails due to ambient type leakage in `check-package.mjs`. Lack of automated token schema and registry validation tests.
- **Remediation**:
  - Add zero-dependency linter script (`scripts/lint.mjs`) and wire into `npm run lint`.
  - Add token schema test (`tests/token-schema.test.mjs`) and registry integrity test (`tests/component-registry.test.mjs`).
  - Fix `check-package.mjs` with `--skipLibCheck` and `--types ""`.

---

## 7. Verification & Conformance Protocol

To independently verify alignment with this benchmark:
1. **Design Token Compilation**:
   ```bash
   npm run tokens
   ```
   Must compile all component tokens to `--s-*` variables in `packages/ui/src/tokens.css` and pass `validateTokens()`.
2. **Automated Unit & Integration Tests**:
   ```bash
   npm test
   ```
   Must execute and pass 100% of the test suite.
3. **Repository Quality Gate**:
   ```bash
   npm run check
   ```
   Must compile the documentation site and pass all verification scripts.
