# RetroGrid

Part of the SarahUI component system.

## Alignment & Design Data
- **Token Hierarchy**: Tier 1 Global tokens mapped to Tier 2 Semantic tokens with zero runtime overhead.
- **Accessibility**: Full conformance to WCAG 2.1 AA and WAI-ARIA Authoring Practices Guide (APG).
- **Styling**: Dynamic Tailwind CSS preset utilities and CSS variables with glass blur support.

## Usage
```tsx
import { RetroGrid } from 'sarahui';

export function Example() {
  return <RetroGrid />;
}
```

## Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `attrs` | `Record<string, any>` | `{}` | Additional HTML attributes passed to the container |
| `class` | `string` | `undefined` | Additional Tailwind CSS classes or utility classes |
