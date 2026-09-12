# Foundation specification

The source of truth is `tokens/sarah.tokens.json`. Generated files must not be edited directly.

| Layer | Entries | Purpose |
| --- | ---: | --- |
| Primitive colors | 85 | Neutral, blue, indigo, violet, emerald, amber, red, alpha |
| Semantic colors | 96 | 48 matching roles in each theme |
| Layout | 35 | Spacing, shape, controls, icons, avatars, content, stroke widths |
| Typography | 31 | Families, sizes, line heights, weights |
| Motion | 7 | Durations and easing |
| Layers | 6 | Base, raised, sticky, overlay, toast, tooltip |
| Grid | 5 | Columns, gutter, breakpoint references |
| Component aliases | 12 | Component shape, spacing, sizing, focus |
| **Total** | **277** | Text and elevation recipes are additional |

There are 15 text-style recipes and three elevation recipes. Dark mode uses explicit semantic aliases.

## Brand and typography

Blue **#178BFF**, indigo **#5B3DF5**, violet **#A020FF**. Wordmark: **sarahUI**, by **MASARA X**. Principle: **Thoughtful by design.**

Poppins supplies headings; Inter supplies interface text; Roboto Mono supplies code. Noto Sans Bengali and Noto Sans Arabic cover locale examples. Fonts are self-hosted with `font-display: swap`; no font CDN is contacted at runtime.

Type scale: 12, 13, 14, 16, 18, 20, 24, 32, 40, 48, 64 pixels. Each recipe specifies line-height and tracking. Large specimens adapt in documentation at narrow viewports; exported recipes remain unchanged.

## Layout, shape, motion

Spacing: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 pixels.

Controls: 40, 48, 56 pixels. Core compact targets enlarge for coarse pointers. Radius: 0, 4, 8, 12, 16, 20, 24, 32, 9999 pixels.

Grid references: 12 columns, 24px gutters, 1200px maximum width, and 640/900/1200px breakpoints. CSS variables cannot substitute into media-query conditions; keep media-query values aligned when customizing breakpoints.

Motion: 120ms feedback, 180ms state transitions, 280ms entrances. Reduced motion disables animations and transitions without removing status information.

Elevation: subtle (2px offset / 4px blur), raised (8px / 24px), overlay (24px / 64px). Layer tokens define stacking order.

## Naming and validation

`text/primary` becomes `--s-text-primary`. Primitive variables include a `primitive/` prefix. Stroke widths use `border-width/` to avoid collision with semantic border colors.

The builder rejects malformed colors, unresolved aliases, mismatched theme roles, duplicate CSS names, unsafe values, invalid numbers, and unsupported units before generating output. Re-run contrast tests after customization.

~~~css
.my-workspace {
  --s-card-radius: var(--s-radius-lg);
  --s-card-padding: var(--s-spacing-32);
}
~~~

~~~html
<section class="s-ui" data-theme="dark">...</section>
~~~
