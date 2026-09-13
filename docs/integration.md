# Integration examples

Install with `npm install sarahui`. The core is native HTML/CSS/ES modules with TypeScript declarations. These are integration recipes; the exported templates return HTML markup, not framework-specific JSX components.

## React

Import the complete stylesheet through your CSS-aware bundler. The package includes the referenced font files.

~~~jsx
import { useEffect, useRef } from 'react';
import { enhanceUI } from 'sarahui';
import 'sarahui/css';

export function ProjectActions({ onCreate }) {
  const root = useRef(null);
  useEffect(() => enhanceUI(root.current), []);
  return (
    <main ref={root} className="s-ui">
      <button type="button"
        className="s-button s-button--primary s-button--md"
        onClick={onCreate}>Create project</button>
    </main>
  );
}
~~~

Use framework state for controlled inputs. Choose one controller for each widget; do not use framework state and library DOM behavior to control the same state.

## Laravel / Blade

For Laravel with Vite, import `sarahui/css` and `enhanceUI` from `sarahui` in `resources/js/app.js`, call `enhanceUI(document)`, and include the entry with `@vite(['resources/js/app.js'])`.

For a manual setup without Vite, build the repository and copy `dist/ui/` to `public/ui/` and `dist/assets/` to `public/assets/`, then use the following Blade example.

~~~blade
<link rel="stylesheet" href="{{ asset('ui/fonts.css') }}">
<link rel="stylesheet" href="{{ asset('ui/tokens.css') }}">
<link rel="stylesheet" href="{{ asset('ui/styles.css') }}">
<main class="s-ui">
  <form action="{{ route('projects.store') }}" method="post">
    @csrf
    <div class="s-field">
      <label for="project-name" class="s-label">Project name</label>
      <input id="project-name" name="name" class="s-input"
        value="{{ old('name') }}" required minlength="2" maxlength="60">
    </div>
    <button type="submit" class="s-button s-button--primary s-button--md">
      Create project
    </button>
  </form>
</main>
<script type="module">
  import { enhanceUI } from '/ui/index.js';
  enhanceUI(document);
</script>
~~~

Define your own routes, controllers, validation, authorization, and persistence. Retain Blade's escaped interpolation. Associate server-side errors with `aria-invalid`/`aria-describedby` and visible messages.

## Plain HTML and server rendering

Templates run in Node. Import them from `sarahui/templates`, serialize with `render()`, include the stylesheet, and call `enhanceUI()` after the DOM exists.

Every View code panel supplies a complete npm recipe, component properties, interaction guidance and rendered HTML. The Dialog and CommandPalette npm examples include both the trigger and dialog.

## Static documentation

`npm run build` emits a standalone `dist/` folder with relative assets and hash routing. It can be served from a subdirectory without application-route rewrites.

The example workspace uses local sample data. Creating projects, changing settings, sorting, filtering, and pagination do not contact a backend. Only the theme persists across reloads.

The cPanel FTP workflow and required secrets are documented in [Deployment](deployment.md).
