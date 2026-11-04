# Adobe Spectrum Benchmark & Design Token Architecture

## 1. Adobe Spectrum Design Data Benchmark Hierarchy
SarahUI's design token system is strictly modeled after the **Adobe Spectrum Design Data** (`adobe/spectrum-design-data`) multi-tiered architecture. Tokens are separated into three distinct layers of abstraction:

```
┌────────────────────────────────────────────────────────┐
│  Tier 1: Global Primitives                             │
│  Raw values: hex palettes, base pixel/ms dimensions    │
│  (neutral/0-1000, indigo/50-950, spacing/16, etc.)     │
└───────────────────────────┬────────────────────────────┘
                            │ Aliased by
┌───────────────────────────▼────────────────────────────┐
│  Tier 2: Semantic Design Tokens                        │
│  Functional intent: surface, text, border, status      │
│  (--s-bg-surface, --s-text-primary, --s-border-default)│
└───────────────────────────┬────────────────────────────┘
                            │ Scoped by
┌───────────────────────────▼────────────────────────────┐
│  Tier 3: Component-Level Tokens                        │
│  Component-scoped bindings: marquee, terminal, dock    │
│  (--s-marquee-duration, --s-terminal-bg, --s-dock-size)│
└────────────────────────────────────────────────────────┘
```

### 1.1 Invariant Rules of Consumption
1. **Never Consume Primitives Directly**: Templates and component stylesheets must NEVER reference Tier 1 primitives directly (`--s-primitive-*` or raw hex codes).
2. **Bind Components to Scoped or Semantic Tokens**: Components must consume their dedicated Tier 3 component tokens (`--s-<component>-<property>`) with fallbacks to Tier 2 semantic tokens (`--s-bg-surface`, `--s-border-default`, `--s-text-primary`).

---

## 2. Token Registry & 319 Canonical Entries
The authoritative token source is `tokens/sarah.tokens.json`. The total token entry count is validated by `scripts/token-utils.mjs:countTokens(spec)` to equal **319 entries**:

| Group | Count | Description |
|---|---|---|
| **Primitives** | 88 | Neutrals (0–1000), Blue (50–950), Indigo (50–950), Violet (50–950), Emerald (50–950), Amber (50–950), Red (50–950), Alpha overlays/shadows |
| **Layout** | 26 | Spacing scale (0–96px), Radii (`none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`), Border widths (`none`, `default`, `strong`, `focus`) |
| **Typography** | 18 | Font families (`sans`, `mono`, `display`), Font sizes (`xs`–`6xl`), Line heights (`tight`, `snug`, `normal`, `relaxed`, `loose`) |
| **Motion** | 7 | Durations (`fast`: 150ms, `normal`: 250ms, `slow`: 400ms, `slower`: 700ms), Easing curves (`linear`, `standard`, `decelerate`) |
| **Layers** | 5 | Z-index scale (`base`: 0, `card`: 10, `dropdown`: 50, `sticky`: 100, `modal`: 1000) |
| **Grid** | 4 | Columns (12), Gutters (`sm`: 16px, `md`: 24px, `lg`: 32px) |
| **Colors (Light)** | 66 | Semantic roles for light mode: surfaces, text, borders, actions, status indicators |
| **Colors (Dark)** | 66 | Semantic roles for dark mode: identical role keys to light mode with independent values |
| **Component Tokens** | 39 | Scoped tokens for base controls and modern animated components |
| **TOTAL** | **319** | Exact count compiled into `sarah.css`, `tokens.css`, and `sarah.resolved.json` |

---

## 3. CSS Variable Mapping (`--s-*`)
Tokens compile to CSS custom properties using the canonical rule:
```javascript
export const cssName = name => '--s-' + name.replaceAll('/', '-');
```

- Semantic roles: `bg/surface` → `--s-bg-surface`, `text/primary` → `--s-text-primary`, `border/default` → `--s-border-default`
- Primitives: `primitive/neutral/950` → `--s-primitive-neutral-950`, `primitive/indigo/600` → `--s-primitive-indigo-600`
- Layout/Motion: `spacing/16` → `--s-spacing-16`, `radius/xl` → `--s-radius-xl`, `duration/slow` → `--s-duration-slow`
- Component tokens: `marquee/duration` → `--s-marquee-duration`, `dock/size` → `--s-dock-size`

---

## 4. Component Token Taxonomy & Adobe Spectrum Flat Name Model
Component tokens conform to Adobe Spectrum's canonical flat-name taxonomy:
`{component}/{property}` or `{component}/{structure}-{property}`

### 4.1 Audited Component Token Bindings
All 21 modern components from Getting Started through Glare Hover are codified in `tokens/sarah.tokens.json`:

```json
{
  "componentTokens": {
    "button/radius": "radius/md",
    "button/gap": "spacing/8",
    "button/height": "size/control/md",
    "input/radius": "radius/md",
    "input/height": "size/control/md",
    "card/radius": "radius/2xl",
    "card/padding": "spacing/24",
    "dialog/radius": "radius/2xl",
    "dialog/padding": "spacing/32",
    "badge/radius": "radius/full",
    "focus/width": "border-width/focus",
    "focus/offset": "spacing/4",
    "marquee/duration": "duration/slow",
    "marquee/gap": "spacing/16",
    "terminal/radius": "radius/xl",
    "terminal/padding": "spacing/16",
    "terminal/bg": "bg/surface",
    "terminal/border": "border/default",
    "hero-video/radius": "radius/xl",
    "hero-video/halo-size": "size/control/lg",
    "bento/radius": "radius/xl",
    "bento/gap": "spacing/16",
    "bento/padding": "spacing/24",
    "animated-list/radius": "radius/lg",
    "animated-list/gap": "spacing/12",
    "dock/radius": "radius/full",
    "dock/size": "size/control/md",
    "dock/gap": "spacing/8",
    "dock/padding": "spacing/12",
    "globe/radius": "radius/full",
    "tweet-card/radius": "radius/xl",
    "tweet-card/padding": "spacing/16",
    "orbit/icon-size": "size/icon/lg",
    "orbit/path-border": "border-width/default",
    "avatar-circles/size": "size/avatar/md",
    "avatar-circles/overlap": "spacing/8",
    "icon-cloud/size": "size/content/max",
    "lens/radius": "radius/full",
    "lens/loupe-border": "border-width/focus",
    "pointer/badge-radius": "radius/md",
    "smooth-cursor/size": "size/icon/lg",
    "progressive-blur/height": "spacing/48",
    "dotted-map/dot-size": "size/icon/sm",
    "animated-beam/stroke-width": "border-width/focus",
    "animated-beam/color-from": "brand/indigo",
    "animated-beam/color-to": "brand/violet",
    "border-beam/width": "border-width/default",
    "border-beam/color-from": "brand/indigo",
    "border-beam/color-to": "brand/violet",
    "shine-border/width": "border-width/default",
    "shine-border/radius": "radius/xl",
    "magic-card/radius": "radius/xl",
    "magic-card/gradient-size": "size/content/max",
    "glare-hover/radius": "radius/xl"
  }
}
```

---

## 5. Theme Symmetries & Contrast Rules
1. **Light/Dark Role Symmetry**:
   - `colors.light` and `colors.dark` must define the exact same set of role keys. Unmatched keys fail token validation (`validateTokens`).
2. **WCAG 2.1 AA Contrast Verification**:
   - Every text-on-surface combination must achieve `>= 4.5:1` contrast ratio (`text/primary`, `text/secondary`, `text/muted`, `text/brand`, `text/link` against `bg/surface`, `bg/canvas`, and `bg/subtle`).
   - Every action text must achieve `>= 4.5:1` contrast (`action/on-primary` against `action/primary` and `action/primary-hover`).
   - Every status text must achieve `>= 4.5:1` contrast against its corresponding status background (`status/success-text` against `status/success-bg`, etc.).
   - Interactive borders and focus indicators must achieve `>= 3:1` contrast against adjacent surfaces (`border/focus` and `border/strong` against `bg/surface`).
3. **Dark Mode Surface Elevation**:
   - Dark mode surfaces must never collapse to pure pitch black (`#000000`). Cards, panels, and modals must use `--s-bg-surface` (`#121215`) to maintain visual depth and elevation hierarchy against the canvas (`#09090B`).
