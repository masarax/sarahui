# Accessibility and verification

Native browser controls, semantic markup, and automated checks support accessible composition. They do not constitute an accessibility certification.

## Foundation checks

- Primary, secondary, muted, brand, and link text on surface/canvas/subtle: at least 4.5:1.
- Primary and danger action labels across states: at least 4.5:1.
- Status text on its corresponding background: at least 4.5:1.
- Focus and strong borders on surfaces: at least 3:1.

Decorative boundaries, disabled controls, customer overrides, and arbitrary compositions are not covered by those assertions.

## Keyboard behavior

| Widget | Behavior |
| --- | --- |
| Native controls | Platform keys and semantics |
| Tabs | Left/right arrows, Home/End, one tab stop; RTL aware |
| Dialog | Native modal focus containment, Escape, focus restoration |
| Menu | Up/down, Home/End, Escape; disabled options skipped |
| Command search | Type to filter, arrows, Enter, Escape |
| Accordion | Native details/summary |
| Tooltip | Hover/focus; Escape dismissal |
| Pagination / table | Named controls and current/sort state |

Interaction guidance: [tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), [modal dialogs](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [menu buttons](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).

## Adaptation and tests

Components include visible focus, reduced motion, forced colors, full labels, helper/error association, and logical spacing. Compact core controls enlarge for coarse pointers. Scrollable tables retain table semantics.

Bengali and Arabic fonts are included; the documentation interface is English. Check RTL in the consuming application's full layout.

`tests/browser.mjs` verifies local fonts, IDs, ARIA references, search, filters, tabs, switches, range values, sorting/selection, menu keys, tooltips, code disclosure, modal validation/focus, data interactions, theme persistence, reduced motion, forced colors, mobile navigation, and overflow at 320/390/768/1024px.

The workflow stores screenshots, failure captures, and JSON results. Its current run determines the verification status.

Consuming products should also be tested with screen readers, text zoom, touch input, platform-specific controls, and representative long or translated content. Backend behavior is outside this library.
