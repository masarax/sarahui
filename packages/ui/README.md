# sarahui

**Thoughtful by design.** An original UI library and component engineering system by MASARA X.

120 modular components, 319 design tokens benchmarked against Adobe Spectrum Design Data, 15 typography recipes, light/dark themes, keyboard interactions, self-hosted fonts, and zero runtime dependencies.

[![npm version](https://img.shields.io/npm/v/sarahui?color=5B3DF5)](https://www.npmjs.com/package/sarahui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tokens: 319](https://img.shields.io/badge/tokens-319%20Spectrum-178BFF)](https://github.com/masarax/sarahui)
[![Components: 120](https://img.shields.io/badge/components-120%20modular-A020FF)](https://github.com/masarax/sarahui)

---

## Installation

```sh
npm install sarahui
# or
pnpm add sarahui
# or
bun add sarahui
```

The package is unscoped: its canonical name is **`sarahui`**.

You can also use the SarahUI CLI to add components directly:
```sh
npx sarahui add marquee
npx sarahui add terminal
```

---

## Usage

### 1. Import Styles

Import `sarahui/css` once at your application's entry point. This includes bundled fonts, design tokens, and component styles in the correct cascade order:

```js
import 'sarahui/css';
```

Alternatively, import individual stylesheets:
```js
import 'sarahui/fonts.css';
import 'sarahui/tokens.css';
import 'sarahui/styles.css';
```

### 2. Compose Components

Components are framework-neutral JavaScript template functions that return escaped markup. Compose them using `html` and serialize with `render()`:

```js
import 'sarahui/css';
import { Card, Button, html, render, enhanceUI } from 'sarahui';

document.querySelector('#app').innerHTML = render(html`
  <main class="s-ui">
    ${Card({
      title: 'Welcome to sarahUI',
      description: '120 modular components with zero runtime dependencies.',
      children: Button({ label: 'Get started', icon: 'plus' })
    })}
  </main>
`);

// Attach interactive behavior (returns unmount cleanup function)
const cleanup = enhanceUI(document);
```

### 3. Modular vs Barrel Imports

SarahUI supports both root barrel imports and individual modular component imports:

```js
// Barrel import (tree-shaken by modern bundlers)
import { Marquee, Terminal, BentoGrid } from 'sarahui';

// Modular direct imports
import { Marquee } from 'sarahui/components/Marquee';
import { Terminal } from 'sarahui/components/Terminal';
```

---

## Tailwind CSS Integration

sarahUI exports a dedicated Tailwind preset that maps design tokens, custom colors, border radii, shadows, spacing, and animations into Tailwind CSS v3 and v4:

```js
// tailwind.config.js / tailwind.config.ts
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

---

## React, Vue, and Laravel Integration

Use sarahUI's CSS classes with your framework's native state management, or mount components directly.

### React / Next.js

```jsx
import 'sarahui/css';
import { useEffect, useRef } from 'react';
import { enhanceUI } from 'sarahui';

export function ActionCard({ title, onAction }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      return enhanceUI(containerRef.current);
    }
  }, []);

  return (
    <div ref={containerRef} className="s-ui">
      <div className="s-card bg-sarah-surface border border-sarah-border rounded-sarah-xl p-s-24">
        <h3 className="text-sarah-primary font-semibold text-lg">{title}</h3>
        <button
          type="button"
          onClick={onAction}
          className="s-button s-button--primary s-button--md mt-s-16"
        >
          <span>Confirm Action</span>
        </button>
      </div>
    </div>
  );
}
```

### Laravel with Vite

Import `sarahui/css` and `enhanceUI` in `resources/js/app.js`:

```js
import 'sarahui/css';
import { enhanceUI } from 'sarahui';

enhanceUI(document);
```

Include `@vite(['resources/js/app.js'])` in your Blade layout and use `.s-ui` controls with standard CSRF protection and Blade validation.

---

## Theming & Design Tokens

sarahUI includes 319 design tokens benchmarked against Adobe Spectrum Design Data:

```js
import { setTheme } from 'sarahui';
import { sarahTokens } from 'sarahui/tokens';

// Switch theme dynamically: 'light', 'dark', or 'system'
setTheme('dark');

console.log(sarahTokens.light['text/primary']); // Primitive token reference
```

### Scoped CSS Overrides

```css
.my-custom-section {
  --s-card-radius: var(--s-radius-lg);
  --s-button-radius: var(--s-radius-md);
  --s-marquee-duration: 25s;
}
```

Theme any subtree by setting `data-theme="dark"` or `data-theme="light"`.

Source tokens are exported as `sarahui/tokens.json`, and resolved values are available from `sarahui/resolved-tokens.json`.

---

## Available Components (120)

`sarahui` includes 120 production-grade components across 12 families:

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

## Accessibility & Reduced Motion

- **WCAG 2.1 AA**: Built-in 4.5:1 text and 3:1 graphical contrast checks.
- **WAI-ARIA APG**: Accessible names, roving `tabindex`, keyboard event listeners, and live regions.
- **prefers-reduced-motion**: Automatic motion bypass (0ms transitions / static radial layouts) across all animated components.

---

## Documentation & Guides

- [Online Documentation & Component Catalog](https://github.com/masarax/sarahui)
- [Component Specifications & Events](https://github.com/masarax/sarahui/blob/main/docs/components.md)
- [Design Token Architecture](https://github.com/masarax/sarahui/blob/main/docs/foundations.md)
- [Framework Integration Guide](https://github.com/masarax/sarahui/blob/main/docs/integration.md)
- [Accessibility Benchmarks](https://github.com/masarax/sarahui/blob/main/docs/accessibility.md)

---

## License

MIT © [MASARA X](https://github.com/masarax). Bundled fonts retain their SIL Open Font Licenses.
