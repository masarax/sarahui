# SarahUI Architecture & Component Standards

## 1. Modular Directory Structure
All SarahUI components and packages adhere to a modular architecture in `packages/ui/src/`. Monolithic files are prohibited; each domain is cleanly separated:

```
packages/ui/
├── src/
│   ├── components/                 # 120 modular component directories
│   │   ├── <ComponentName>/        # Dedicated 6-file suite per component
│   │   │   ├── index.js            # Single component export
│   │   │   ├── <ComponentName>.js  # Template generator & progressive enhancement
│   │   │   ├── <ComponentName>.d.ts# TypeScript props interface & typings
│   │   │   ├── styles.css          # Scoped CSS, keyframes, token bindings
│   │   │   ├── <ComponentName>.test.mjs # Unit, DOM, and attribute tests
│   │   │   └── README.md           # API reference, accessibility, tokens, examples
│   │   └── index.js                # Master aggregator exporting all 120 components
│   ├── styles/                     # Central styling assets
│   │   ├── styles.css              # Aggregated component stylesheets
│   │   ├── tokens.css              # Compiled CSS variables (--s-*)
│   │   ├── fonts.css               # Typography and font declarations
│   │   └── sarahui.css             # Unified bundle import
│   ├── tokens/                     # Theme tokens & bindings
│   │   ├── theme-tokens.js         # JavaScript token dictionary
│   │   ├── theme-tokens.d.ts       # TypeScript token definitions
│   │   └── tokens.css              # Synchronized tokens stylesheet
│   └── utilities/                  # Framework-neutral utility engine
│       ├── html.js                 # Tagged template literal function
│       ├── raw.js                  # Safe markup wrapper (Markup instance)
│       ├── render.js               # Markup renderer & composition helper
│       ├── attributes.js           # HTML attribute serializer & XSS sanitizer
│       ├── enhancers.js            # Vanilla DOM progressive enhancement logic
│       └── index.js                # Utilities barrel re-export
├── package.json                    # Package metadata, exports map, and engines
└── README.md                       # High-level package documentation
```

---

## 2. Mandatory 6-File Component Suite
Every component in `packages/ui/src/components/<ComponentName>/` MUST provide all six files. Omission of any file is a violation of package integrity:

### 2.1 `index.js`
Must export the component template function:
```javascript
export { ComponentName } from './ComponentName.js';
```

### 2.2 `<ComponentName>.js`
Must implement the framework-neutral template generator and DOM registration hook:
```javascript
import * as UI from '../../templates.js';

export function ComponentName(props = {}) {
  if (typeof UI.ComponentName === 'function') {
    return UI.ComponentName(props);
  }
  // Local fallback template markup
  return `<div class="s-component-name" data-s-component-name="">${props.children || ''}</div>`;
}
```

### 2.3 `<ComponentName>.d.ts`
Must define the TypeScript props interface and export declaration:
```typescript
export interface ComponentNameProps {
  children?: any;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function ComponentName(props?: ComponentNameProps): any;
```

### 2.4 `styles.css`
Must contain component-scoped CSS rules, token bindings, layout positioning, and `@media (prefers-reduced-motion: reduce)` rules:
```css
/* Scoped styles for ComponentName */
.s-component-name {
  box-sizing: border-box;
  background: var(--s-bg-surface);
  color: var(--s-text-primary);
  border-radius: var(--s-component-radius, var(--s-radius-md));
}

@media (prefers-reduced-motion: reduce) {
  .s-component-name {
    animation: none !important;
    transition: none !important;
  }
}
```

### 2.5 `<ComponentName>.test.mjs`
Must implement automated Node.js test runner suites covering the 4 Core Invariant Pillars:
- **Pillar 1 (Rendering)**: Valid default markup generation, base classes, and `data-s-*` progressive enhancement hooks.
- **Pillar 2 (Dynamic Classes & Attributes)**: Correct propagation of custom Tailwind utility classes (`className`/`class`), arbitrary HTML attributes (`attrs`), and inline CSS variables.
- **Pillar 3 (Accessibility & Semantics)**: Accurate WAI-ARIA roles, attributes (`aria-hidden`, `aria-live`, `aria-label`), and semantic HTML tags.
- **Pillar 4 (Boundary & Parameter Clamping)**: Safe handling of edge cases (empty props `{}`, missing arguments `()`, null/undefined inputs, and numerical range clamping).

### 2.6 `README.md`
Must document component purpose, anatomy, complete props table, design token bindings, WAI-ARIA accessibility contracts, and realistic usage examples.

---

## 3. Master Aggregator & Barrel Re-Export Guarantees
To maintain 100% backward compatibility and prevent broken consumer builds, strict re-export contracts are enforced:

1. **Master Aggregator (`packages/ui/src/components/index.js`)**:
   Must re-export all 120 modular component directories (`export * from './ComponentName/index.js';`).
2. **Root Module Barrel (`packages/ui/src/index.js`)**:
   Must re-export all template functions from `./templates.js`, progressive enhancement lifecycle helpers (`enhanceUI`, `openDialog`, `closeDialog`, `setTheme`, `toast`, `copyText`), and theme token exports.
   `import { Marquee, Button, setTheme } from 'sarahui';` must always resolve cleanly.
3. **Template Engine Barrel (`packages/ui/src/templates.js`)**:
   Must re-export all core markup utilities (`html`, `raw`, `render`, `attributes`, `escapeText`) and backwards-compatible component template functions.

---

## 4. Framework-Neutral Tagged HTML Engine & Security
1. **Zero Runtime Dependencies**: The core package relies solely on native JavaScript ES modules, CSS custom properties, and native Web APIs (`requestAnimationFrame`, `IntersectionObserver`, `ResizeObserver`, `<dialog>`). No React, Vue, Svelte, or external client runtime is required.
2. **XSS Neutralization**:
   - All interpolated string values in `html` tagged templates are automatically escaped via `escapeText()`.
   - Raw markup must be explicitly wrapped in `raw()` and produce a verified `Markup` instance. Untrusted objects masquerading as markup are rejected.
3. **Attribute Sanitization (`attributes()`)**:
   - Filters keys against a strict allowlist or approved `data-*` and `aria-*` patterns.
   - URL attributes (`href`, `src`) are strictly sanitized via `safeHref()` to neutralize `javascript:`, `vbscript:`, or data URI pseudo-protocol execution.

---

## 5. Progressive Enhancement Lifecycle (`enhanceUI()`)
1. **Server-Safe Rendering**: All components render synchronously to deterministic HTML strings. No `window`, `document`, or DOM API may be referenced during template evaluation.
2. **Client Hydration**: Client interactivity is initialized by invoking `enhanceUI(root)` on the mounted DOM tree:
   - Detects components via explicit `[data-s-<component>]` data attributes.
   - Uses `WeakMap` and `WeakSet` to track initialized instances and prevent duplicate event listener bindings.
   - Emits standardized custom events (`sarah:themechange`, `sarah:tabchange`, `sarah:dialogopen`) with bubbling enabled.
   - Cleans up event listeners using `AbortController` signals during node teardown.
