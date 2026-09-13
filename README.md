<p align="center"><strong>sarahUI</strong><br>Thoughtful by design.<br><sub>An original design system by MASARA X</sub></p>

[![Quality checks](https://github.com/masarax/sarahui/actions/workflows/ci.yml/badge.svg)](https://github.com/masarax/sarahui/actions/workflows/ci.yml)

sarahUI is a foundation-first UI system with an original blue, indigo, and violet identity. It includes reusable native HTML templates, CSS components, an ES-module interaction layer, and an interactive documentation application.

![sarahUI documentation in light mode](docs/previews/overview-light.png)

[Dark theme](docs/previews/overview-dark.png) · [Mobile](docs/previews/overview-mobile.png) · [Components](docs/previews/components-light.png) · [Foundations](docs/previews/foundations-light.png) · [Workspace pattern](docs/previews/patterns-light.png)

- **277 token entries:** 85 primitive colors, 48 semantic roles in each theme, layout, typography, motion, layers, grid, and component aliases.
- **32 component families**, with keyboard interactions and explicit states.
- **Light, dark, and system preferences**, with inherited CSS custom properties.
- **15 text styles**, self-hosted fonts, Bengali and Arabic support.
- **Zero runtime dependencies.** Use the CSS in any framework, or compose HTML templates directly.
- Working project workspace and settings examples, token explorer, command search, and copyable component markup.

## Start locally

Requires Node.js 22 or newer. No package install is required to build or serve the project.

~~~sh
git clone https://github.com/masarax/sarahui.git
cd sarahui
npm run dev
~~~

Open **http://localhost:4173**. The command builds and serves the documentation. Run it again after source changes; the server does not watch files.

~~~sh
npm run tokens       # validate and regenerate design variables
npm run build        # build static documentation and distributable files
npm test             # foundation, contrast, and template tests
npm run check        # build and run the unit tests
~~~

Browser verification:

~~~sh
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium
npm run test:browser
~~~

GitHub Actions runs both verification layers and provides downloadable **sarahui-documentation** and **sarahui-browser-results** artifacts. The documentation artifact is a complete static site. A public deployment is not configured.

## Use the components

After building, copy `dist/ui/` and `dist/assets/` into your application, preserving the relative structure.

~~~html
<link rel="stylesheet" href="./ui/fonts.css">
<link rel="stylesheet" href="./ui/tokens.css">
<link rel="stylesheet" href="./ui/styles.css">
<main class="s-ui" id="app"></main>
~~~

~~~js
import { Button, html, render, enhanceUI } from './ui/index.js';

document.querySelector('#app').innerHTML = render(html`
  <section aria-label="Project actions">
    ${Button({ label: 'Create project', icon: 'plus' })}
  </section>
`);
const dispose = enhanceUI(document);
// Call dispose() when your application unmounts.
~~~

Interpolated text is escaped. Use `html` to compose trusted markup; keep untrusted content in interpolated values. The library does not fetch data or implement backend services. Connect component events to application state.

This version is distributed through the repository. **It has not been published to npm.** The package includes TypeScript declarations.

## Component inventory

| Category | Families |
| --- | --- |
| Actions | Button, IconButton, ButtonGroup |
| Forms | Input, Textarea, Select, Checkbox, Radio, Switch, Slider |
| Display | Icon, Badge, Chip, Avatar, Card, DataTable, Separator |
| Navigation | Tabs, Breadcrumb, Pagination, NavItem, Accordion, Menu, CommandPalette |
| Feedback | Alert, Dialog, Tooltip, Progress, Skeleton, EmptyState, Spinner, Toast |

## Foundation architecture

Edit **`tokens/sarah.tokens.json`**, then run `npm run tokens`.

1. Primitive colors hold explicit values.
2. Semantic roles give values a purpose in each theme.
3. Component aliases connect shape, spacing, and sizing to the shared foundation.
4. Component styles consume the generated variables.

Generated outputs are checked in. CI verifies reproducibility.

~~~js
import { setTheme } from './ui/index.js';
setTheme('dark'); // 'light', 'dark', or 'system'
~~~

## Guides

- [Foundation specification](docs/foundations.md)
- [Component API and events](docs/components.md)
- [React and Laravel integration](docs/integration.md)
- [Accessibility and verification](docs/accessibility.md)
- [Recorded verification and previews](docs/verification.md)
- [Third-party font notices](THIRD_PARTY_NOTICES.md)

| Path | Purpose |
| --- | --- |
| `tokens/` | Source and generated CSS, JSON, TypeScript theme exports |
| `packages/ui/src/` | Templates, interactions, CSS, and types |
| `packages/ui/assets/fonts/` | Self-hosted fonts and OFL notices |
| `apps/docs/` | Interactive documentation and examples |
| `scripts/` | Token generation, build, and local server |
| `tests/` | Foundation, template, and browser verification |
| `dist/` | Generated documentation, excluded from Git |

Project identity and original branding belong to **MASARA X**. Bundled fonts retain their respective SIL Open Font Licenses.
