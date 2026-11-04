<p align="center">
  <strong>sarahUI</strong><br>
  Thoughtful by design.<br>
  <sub>An original design system and component engineering library by MASARA X</sub>
</p>

<p align="center">
  <a href="https://github.com/masarax/sarahui/actions/workflows/ci.yml"><img src="https://github.com/masarax/sarahui/actions/workflows/ci.yml/badge.svg" alt="Quality checks"></a>
  <a href="https://www.npmjs.com/package/sarahui"><img src="https://img.shields.io/npm/v/sarahui?color=5B3DF5" alt="npm version"></a>
  <img src="https://img.shields.io/badge/tokens-319%20Spectrum-178BFF" alt="319 Design Tokens">
  <img src="https://img.shields.io/badge/components-120%20modular-A020FF" alt="120 Components">
  <img src="https://img.shields.io/badge/runtime-0%20dependencies-success" alt="0 Runtime Dependencies">
  <a href="#accessibility"><img src="https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-emerald" alt="WCAG 2.1 AA"></a>
</p>

sarahUI is a foundation-first UI library and component system crafted with an original blue, indigo, and violet identity. Built with zero runtime dependencies, pure CSS custom properties, and progressive enhancement, sarahUI provides 120 production-grade components, 319 design tokens benchmarked against Adobe Spectrum Design Data, and seamless Tailwind CSS integration.

![sarahUI documentation in light mode](docs/previews/overview-light.png)

<p align="center">
  <a href="docs/previews/overview-dark.png">Dark theme</a> · 
  <a href="docs/previews/overview-mobile.png">Mobile</a> · 
  <a href="docs/previews/components-light.png">Components</a> · 
  <a href="docs/previews/foundations-light.png">Foundations</a> · 
  <a href="docs/previews/patterns-light.png">Workspace pattern</a> · 
  <a href="docs/previews/getting-started-light.png">Installation guide</a>
</p>

---

## Highlights

- **120 modular components:** Every component lives in its own dedicated `packages/ui/src/components/<ComponentName>/` directory with a full 6-file suite: template function, TypeScript definitions (`.d.ts`), scoped stylesheet, unit tests, README, and export barrel.
- **319 design tokens:** 85 primitive colors, 48 semantic roles per theme, layout, spacing, shape, motion, elevation, and 54 scoped component tokens adhering to Adobe Spectrum Design Data flat name object taxonomy.
- **Modernized Tailwind preset:** Drop-in `@sarahui/tailwind-preset` (`sarahui/tailwind-preset`) mapping all tokens, border radii, shadows, animations, and keyframes directly into Tailwind CSS v3 and v4 without overriding dynamic utility classes.
- **CLI component distribution:** Add components individually to your codebase using `npx sarahui add <component>` or install the complete package with `npm install sarahui`.
- **Zero runtime dependencies:** Pure CSS custom properties, native browser Web APIs, Canvas 2D/WebGL math, and lightweight vanilla ES module progressive enhancement (`enhanceUI()`).
- **WCAG 2.1 AA & reduced motion:** 4.5:1 text and 3:1 graphical contrast compliance verified by automated test suites; full `prefers-reduced-motion` bypass across all continuous animations.
- **Self-hosted typography:** Inter Variable, Poppins, Roboto Mono, Noto Sans Bengali (বাংলা), and Noto Sans Arabic (العربية) bundled with zero external font requests.

---

## Quick Start

### Option A: Component CLI (Recommended)

Add individual components directly into your application repository:

```sh
# Add an individual component
npx sarahui add marquee

# Or add multiple components
npx sarahui add terminal bento-grid magic-card dock
```

Package managers:
```sh
pnpm dlx sarahui add marquee
bunx --bun sarahui add marquee
```

### Option B: Full Package Install

Install the complete unscoped library via npm:

```sh
npm install sarahui
# or
pnpm add sarahui
# or
bun add sarahui
```

Mount and enhance your first component in vanilla JavaScript:

```js
import 'sarahui/css';
import { Button, Card, render, enhanceUI } from 'sarahui';

// Target an element with class "s-ui"
const root = document.querySelector('#app');
root.innerHTML = render(
  Card({
    title: 'A place for your next idea',
    description: '120 modular components built for the modern web.',
    footer: Button({ label: 'Explore components', icon: 'plus' })
  })
);

// Attach progressive enhancement (returns cleanup function)
const cleanup = enhanceUI(root);
```

---

## Tailwind CSS Integration

sarahUI includes a first-class Tailwind preset that automatically maps all tokens, border radii, shadows, spacing, and animations into your utility classes.

### 1. Configure Preset

In your `tailwind.config.js` or `tailwind.config.ts`:

```js
import sarahuiPreset from 'sarahui/tailwind-preset';

export default {
  presets: [sarahuiPreset],
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './node_modules/sarahui/src/**/*.{js,css}'
  ],
};
```

CommonJS (`tailwind.config.cjs`):
```js
module.exports = {
  presets: [require('sarahui/tailwind-preset')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
};
```

### 2. Use Dynamic Token Utilities

You can style elements using both standard Tailwind utilities and SarahUI token utilities:

```html
<div class="bg-sarah-surface border border-sarah-border rounded-sarah-xl p-s-24 shadow-s-raised">
  <h2 class="text-sarah-primary text-xl font-semibold">Token-driven card</h2>
  <p class="text-sarah-secondary mt-s-8">Seamlessly styled with dynamic Tailwind tokens.</p>
  <button type="button" class="s-button s-button--primary s-button--md mt-s-16">
    <span>Action</span>
  </button>
</div>
```

---

## Framework Integration

sarahUI exports native HTML template functions that return escaped markup. Use the CSS classes and components with any frontend framework.

### React / Next.js

```jsx
import 'sarahui/css';
import { useEffect, useRef } from 'react';
import { enhanceUI } from 'sarahui';

export function Showcase() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      return enhanceUI(containerRef.current);
    }
  }, []);

  return (
    <main ref={containerRef} className="s-ui min-h-screen p-8 bg-sarah-canvas">
      <div className="s-marquee" data-direction="left" data-speed="30">
        <div className="s-marquee-track">
          <span className="px-4 text-sarah-primary">120 Components</span>
          <span className="px-4 text-sarah-brand">Zero Dependencies</span>
          <span className="px-4 text-sarah-secondary">Adobe Spectrum Benchmarked</span>
        </div>
      </div>
    </main>
  );
}
```

### Vue 3 / Nuxt

```vue
<script setup>
import 'sarahui/css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { enhanceUI } from 'sarahui';

const root = ref(null);
let cleanup = () => {};

onMounted(() => {
  if (root.value) cleanup = enhanceUI(root.value);
});
onBeforeUnmount(() => cleanup());
</script>

<template>
  <main ref="root" class="s-ui">
    <div class="s-bento-grid">
      <!-- BentoGrid cells -->
    </div>
  </main>
</template>
```

### Laravel with Vite

Import `sarahui/css` and `enhanceUI` in your `resources/js/app.js`:

```js
import 'sarahui/css';
import { enhanceUI } from 'sarahui';

document.addEventListener('DOMContentLoaded', () => {
  enhanceUI(document);
});
```

In your Blade template:
```html
@vite(['resources/js/app.js'])
<main class="s-ui">
  <button type="button" class="s-button s-button--primary s-button--md">
    <span>Deploy Application</span>
  </button>
</main>
```

---

## Component Inventory (120 Components)

All 120 components are structured in `packages/ui/src/components/<ComponentName>/` with full 6-file suites and passing unit tests.

| Category | Count | Components |
|---|---|---|
| **Components** | 16 | `Marquee`, `Terminal`, `HeroVideoDialog`, `BentoGrid`, `AnimatedList`, `Dock`, `Globe`, `TweetCard`, `OrbitingCircles`, `AvatarCircles`, `IconCloud`, `Lens`, `Pointer`, `SmoothCursor`, `ProgressiveBlur`, `DottedMap` |
| **Special Effects** | 9 | `AnimatedBeam`, `BorderBeam`, `ShineBorder`, `MagicCard`, `GlareHover`, `Meteors`, `Confetti`, `Particles`, `AnimatedThemeToggler` |
| **Animations** | 1 | `BlurFade` |
| **Text Animations** | 18 | `TextAnimate`, `TypingAnimation`, `LineShadowText`, `AuroraText`, `VideoText`, `NumberTicker`, `AnimatedShinyText`, `AnimatedGradientText`, `TextReveal`, `DiaTextReveal`, `HyperText`, `WordRotate`, `ScrollBasedVelocity`, `SparklesText`, `MorphingText`, `SpinningText`, `Highlighter`, `Text3DFlip` |
| **Device Mocks** | 3 | `Safari`, `Iphone`, `Android` |
| **Buttons** | 3 | `RainbowButton`, `ShimmerButton`, `RippleButton` |
| **Backgrounds** | 12 | `FlickeringGrid`, `AnimatedGridPattern`, `RetroGrid`, `Ripple`, `DotPattern`, `GridPattern`, `HexagonPattern`, `StripedPattern`, `InteractiveGridPattern`, `LightRays`, `NoiseTexture`, `Floating3DParticles` |
| **Community** | 16 | `ShinyButton`, `FileTree`, `CodeComparison`, `ScrollProgress`, `NeonGradientCard`, `ComicText`, `KineticText`, `CoolMode`, `PixelImage`, `PulsatingButton`, `WarpBackground`, `InteractiveHoverButton`, `AnimatedCircularProgressBar`, `Backlight`, `GlyphMatrix`, `AnimatedSubscribeButton` |
| **Forms & Inputs** | 7 | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider` |
| **Navigation** | 6 | `Tabs`, `Breadcrumb`, `Pagination`, `NavItem`, `Menu`, `CommandPalette` |
| **Feedback & Overlays** | 9 | `Alert`, `Dialog`, `Tooltip`, `Toast`, `Drawer`, `Popover`, `Sheet`, `ContextMenu`, `HoverCard` |
| **Layout & Display** | 20 | `Icon`, `Button`, `IconButton`, `ButtonGroup`, `Badge`, `Chip`, `Avatar`, `Card`, `DataTable`, `Accordion`, `Progress`, `Skeleton`, `EmptyState`, `Separator`, `Spinner`, `Toggle`, `ToggleGroup`, `Kbd`, `AspectRatio`, `Collapsible` |

---

## Design Token Architecture

sarahUI implements a formal 3-tier token architecture validated against the **Adobe Spectrum Design Data** benchmark:

```
tokens/sarah.tokens.json (319 tokens)
├── 1. Primitives (85)          # Raw hex colors across 8 color scales (neutral, blue, indigo, violet, etc.)
├── 2. Semantic Roles (48/mode) # Contextual roles (canvas, surface, action-primary, status-success, etc.)
└── 3. Component Tokens (54)    # Flat name object taxonomy (marquee/duration, terminal/bg, bento/radius, etc.)
```

### Spectrum Flat Name Object Taxonomy

Each component token adheres to Adobe Spectrum's canonical serialization:
```json
{
  "property": "border-radius",
  "component": "magic-card",
  "structure": "surface",
  "intent": "neutral",
  "state": "idle",
  "colorScheme": "any",
  "scale": "desktop"
}
```

Generated variables are emitted into `packages/ui/src/tokens.css` and `tokens/generated/sarah.css`:
```css
:root {
  --s-marquee-duration: var(--s-duration-slow);
  --s-marquee-gap: var(--s-spacing-16);
  --s-terminal-radius: var(--s-radius-xl);
  --s-terminal-bg: var(--s-bg-surface);
  --s-terminal-border: var(--s-border-default);
  --s-bento-radius: var(--s-radius-xl);
  --s-dock-radius: var(--s-radius-full);
}
```

### Theming API

```js
import { setTheme } from 'sarahui';

// Synchronize theme across document and dispatch CustomEvent 'sarah:themechange'
setTheme('dark'); // 'light' | 'dark' | 'system'
```

---

## Accessibility & Standards Conformance

sarahUI is engineered for strict accessibility conformance:
- **WCAG 2.1 AA / 2.2**: Text contrast is verified at >= 4.5:1 across light and dark themes; UI boundaries and focus rings maintain >= 3:1 contrast against adjacent surfaces.
- **WAI-ARIA APG**: Every component includes explicit WAI-ARIA roles (`role="region"`, `role="log"`, `role="toolbar"`, `role="dialog"`), accessible names, and live regions (`aria-live="polite"`).
- **Reduced Motion Compliance**: Continuous animations (`Marquee`, `OrbitingCircles`, `AnimatedBeam`, `BorderBeam`, `ShineBorder`, `Terminal`) automatically collapse to 0ms durations or static balanced layouts when `prefers-reduced-motion: reduce` is active.
- **Roving Tabindex & Keyboard Navigation**: Complex composite widgets (`Dock`, `Tabs`, `CommandPalette`) implement full arrow key navigation and focus trapping.

---

## Repository & Development

Requirements: **Node.js 22+**. Zero package dependencies required to build or serve the core documentation.

```sh
# Clone repository
git clone https://github.com/masarax/sarahui.git
cd sarahui

# Start documentation dev server (http://localhost:4173)
npm run dev

# Recompile design tokens from tokens/sarah.tokens.json
npm run tokens

# Execute unit, DOM, and token test suites
npm test

# Build static documentation and verify full distribution
npm run check
```

### Automated Test Suites

```sh
npm test                 # Run all 161 test suites (components, tokens, presets, security)
npm run test:browser     # Run Playwright browser verification
npm run test:package     # Verify fresh npm tarball installation and typings
npm run test:deploy      # Verify deployment bundle safeguards
```

---

## Directory Structure

```
sarahui/
├── packages/ui/
│   ├── src/
│   │   ├── components/         # 120 modular component directories (6-file suites)
│   │   │   ├── Marquee/        # index.js, Marquee.js, Marquee.d.ts, styles.css, etc.
│   │   │   ├── Terminal/
│   │   │   └── index.js        # Aggregator re-exporting all 120 components
│   │   ├── styles/             # Modular stylesheets (styles.css, tokens.css, fonts.css)
│   │   ├── tokens/             # theme-tokens.js, theme-tokens.d.ts, tokens.css
│   │   ├── utilities/          # html, raw, render, attributes, DOM enhancers
│   │   ├── tailwind-preset.js  # Modernized Tailwind CSS preset
│   │   ├── index.js            # Top-level backwards-compatible barrel export
│   │   └── templates.js        # HTML template tagged functions barrel export
│   └── package.json            # Unscoped 'sarahui' npm package configuration
├── tokens/
│   ├── sarah.tokens.json       # 319 design tokens & Adobe Spectrum metadata
│   └── generated/              # Compiled CSS, TypeScript, and JSON token outputs
├── apps/docs/                  # Interactive documentation application
├── scripts/                    # Token compiler, build, server, and validation tooling
├── tests/                      # Automated unit, DOM, and adversarial test suites
└── docs/                       # Technical specs, audit benchmarks, and guides
```

---

## License & Credits

- Library code is licensed under the [MIT License](LICENSE).
- Brand identity, design language, and visual assets are copyright **MASARA X**.
- Bundled self-hosted variable fonts retain their respective SIL Open Font Licenses (see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)).
