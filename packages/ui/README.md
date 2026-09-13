# sarahUI

**Thoughtful by design.** An original UI library by MASARA X.

32 native component families, 277 foundation tokens, 15 typography recipes,
light/dark themes, keyboard interactions and self-hosted fonts. Zero runtime dependencies.

## Install

~~~sh
npm install sarahui
~~~

The package is unscoped: its name is **sarahui**.

## Use with a bundler

~~~js
import 'sarahui/css';
import { Button, Card, html, render, enhanceUI } from 'sarahui';

document.querySelector('#app').innerHTML = render(html`
  <main class="s-ui">
    ${Card({
      title: 'A place for your next idea',
      children: Button({ label: 'Create project', icon: 'plus' })
    })}
  </main>
`);
const cleanup = enhanceUI(document);
// Call cleanup() when the application unmounts.
~~~

Create an element with `id="app"` before running the example.
`sarahui/css` loads fonts, variables and component styles in the correct order.
Vite and other CSS-aware bundlers resolve the included font files.
Alternatively import `sarahui/fonts.css`, `sarahui/tokens.css` and `sarahui/styles.css` individually.

## React, Vue and Laravel

Use the CSS classes with your framework's native markup and state.
These exports are HTML template functions; they are not React JSX components.

~~~jsx
import 'sarahui/css';

export function CreateButton({ onCreate }) {
  return <div className="s-ui">
    <button type="button" onClick={onCreate}
      className="s-button s-button--primary s-button--md">
      Create project
    </button>
  </div>;
}
~~~

For Laravel with Vite, import `sarahui/css` and `enhanceUI` in
`resources/js/app.js`, call `enhanceUI(document)` and include your Vite
entry through `@vite`. Use normal Blade form validation and CSRF protection.

## Themes and tokens

~~~js
import { setTheme } from 'sarahui';
import { sarahTokens } from 'sarahui/tokens';

setTheme('dark'); // light | dark | system
console.log(sarahTokens.light['text/primary']);
~~~

~~~css
.my-workspace {
  --s-card-radius: var(--s-radius-lg);
  --s-button-radius: var(--s-radius-md);
}
~~~

Theme any subtree with `data-theme="dark"`. The complete source token JSON is
exported as `sarahui/tokens.json`; resolved theme values are available from
`sarahui/resolved-tokens.json`.

## Components

Button, IconButton, ButtonGroup, Input, Textarea, Select, Checkbox, Radio,
Switch, Slider, Icon, Badge, Chip, Avatar, Card, DataTable, Separator, Tabs,
Breadcrumb, Pagination, NavItem, Accordion, Menu, CommandPalette, Alert,
Dialog, Tooltip, Progress, Skeleton, EmptyState, Spinner and Toast.

Template interpolation is escaped. Use `html` to compose trusted markup;
keep user content in interpolated text or supported attributes.
Importing the JavaScript is safe during server rendering. Call browser
helpers only after the DOM exists, and provide stable IDs across rendered fragments.

## Guides

- [Getting started and live documentation source](https://github.com/masarax/sarahui)
- [Component properties and events](https://github.com/masarax/sarahui/blob/main/docs/components.md)
- [Integration examples](https://github.com/masarax/sarahui/blob/main/docs/integration.md)
- [Foundations](https://github.com/masarax/sarahui/blob/main/docs/foundations.md)
- [Accessibility](https://github.com/masarax/sarahui/blob/main/docs/accessibility.md)

Modern browsers with native `<dialog>` support are required for modal behavior.
TypeScript declarations are included. Node.js 22+ supports server-side usage.

MIT licensed. Bundled fonts retain their SIL Open Font Licenses.
The sarahUI name and identity remain associated with MASARA X.
