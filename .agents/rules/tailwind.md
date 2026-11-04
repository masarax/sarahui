# Tailwind CSS Preset Integration & Dynamic Utility Guidelines

## 1. Preset Integration & Consumer Configuration
SarahUI provides official Tailwind CSS presets for seamless integration with Tailwind CSS v3 and v4 projects via `packages/ui/src/tailwind-preset.js`:

### 1.1 `tailwind.config.js` Setup
```javascript
import sarahuiPreset from 'sarahui/tailwind-preset';

export default {
  presets: [sarahuiPreset],
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './node_modules/sarahui/**/*.{js,html}'
  ]
};
```

### 1.2 Non-Destructive Extension Guarantee
The preset extends the default Tailwind theme using `theme.extend` rather than overwriting core utilities. Default Tailwind colors, spacing, and animations remain fully available while providing first-class access to SarahUI tokens and effects.

---

## 2. Dynamic Utility Guidelines
All SarahUI components are built to seamlessly accept and compose dynamic Tailwind CSS utility classes without styling collisions:

### 2.1 The Open-Styling Rule
- Every component template accepts `className`, `class`, and `attrs.class`.
- Custom classes are appended to the base component class string:
  ```javascript
  const combinedClass = ['s-marquee', 'group', className || customClass || ''].filter(Boolean).join(' ');
  ```
- Props must never restrict or hardcode visual properties that the caller may wish to override with Tailwind utilities (e.g. `p-4`, `w-full`, `max-w-md`, `col-span-2`, `rounded-3xl`).

### 2.2 Strict Prohibition of Brittle Specificity Overrides
Stylesheets in `packages/ui/` must NEVER create compound selectors that override dynamic Tailwind classes:
- ❌ **Forbidden Anti-Pattern**:
  ```css
  /* DO NOT DO THIS: overrides dynamic utility classes with static pixel values */
  .s-glare-hover.rounded-xl { border-radius: 16px; }
  .s-bento-card.col-span-1 { grid-column: span 1 / span 1; }
  ```
- ✅ **Required Pattern**:
  ```css
  /* Allow standard utility classes to cascade naturally */
  .s-glare-hover {
    border-radius: var(--s-glare-hover-radius, var(--s-radius-xl));
  }
  ```

---

## 3. Glass Blur & Glassmorphism Guidelines
SarahUI provides high-fidelity glassmorphic backdrop styling for cards, dialogs, floating headers, and docks:

### 3.1 Standard Glassmorphic Recipe
All glassmorphic surfaces must adhere to the standard multi-property formula:
```css
.s-glass-surface {
  background: color-mix(in srgb, var(--s-bg-surface) 75%, transparent);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--s-border-default);
  box-shadow: var(--s-shadow-glass, 0 8px 32px 0 rgba(0, 0, 0, 0.12));
}
```

### 3.2 Preset Utility Classes
The preset exports pre-configured utilities:
- `backdrop-blur-glass`: `blur(16px) saturate(180%)`
- `backdrop-blur-glass-sm`: `blur(8px) saturate(150%)`
- `backdrop-blur-glass-lg`: `blur(24px) saturate(200%)`
- `shadow-s-glass`: Ambient depth with 1px inner specular highlight border

---

## 4. Keyframe Animation Conventions
SarahUI integrates smooth, GPU-accelerated CSS keyframe animations. All animations must adhere to these standards:

### 4.1 Preset-Defined Animations
The following animations are officially registered in `tailwind-preset.js`:
- `animate-marquee`: Linear horizontal ticker (`marquee var(--duration, 20s) infinite linear`)
- `animate-marquee-vertical`: Linear vertical ticker
- `animate-orbit`: Circular orbital path transform using CSS trigonometry (`calc(var(--angle) * 1deg)`)
- `animate-shine`: Sweeping specular gradient sheen
- `animate-border-beam`: Perimeter beam using CSS `offset-path: rect(...)`
- `animate-beam`: SVG path laser beam pulse
- `animate-glare`: 3D specular highlight sweep
- `animate-terminal-blink`: Step cursor blink for command lines
- `animate-ripple`: Concentric radar wave expansion
- `animate-meteor`: High-velocity diagonal shooting star at 215°
- `animate-shiny-text`: Subtly illuminated text gradient sweep
- `animate-aurora`: Flowing organic background ambient light
- `animate-blur-fade-in`: Progressive de-blurring entrance filter

### 4.2 Dynamic CSS Variable Binding
Never hardcode timing, angles, or dimensions inside keyframe rules. Always parameterize animations via CSS custom properties:
```css
/* Good: Parameterized via custom properties with safe fallbacks */
animation: s-border-beam var(--duration, 8s) infinite linear;
offset-distance: var(--offset, 0%);
```

---

## 5. Absolute Prohibition of Hardcoded Hex Colors & Class Sniffing
To ensure 100% theme fidelity and dynamic user customization:

1. **Zero Hardcoded Hex Codes**:
   - ❌ Never write `#ffffff`, `#09090b`, `#22c55e`, `#ef4444`, `#5B3DF5`, or raw RGB literals in component templates or CSS.
   - ✅ Always use design token variables (`var(--s-bg-surface)`, `var(--s-border-default)`, `var(--s-brand-indigo)`, `var(--s-status-success-text)`).
2. **Elimination of Class-String Sniffing**:
   - ❌ **Forbidden Anti-Pattern**:
     ```javascript
     // DO NOT DO THIS: Brittle class sniffing breaks on unrelated utilities
     if (customClass.includes('red')) bgGradient = '...#ef4444...';
     ```
   - ✅ **Required Pattern**:
     Pass dynamic values directly via CSS custom properties:
     ```javascript
     const inlineStyle = [
       colorFrom ? `--color-from:${colorFrom}` : '',
       colorTo ? `--color-to:${colorTo}` : ''
     ].filter(Boolean).join(';');
     ```
