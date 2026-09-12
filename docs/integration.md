# Integration examples

The core is native HTML/CSS/ES modules. These are integration recipes, not separately packaged framework adapters.

## React

Copy `dist/ui/` and `dist/assets/` into matching directories in your asset workflow. Preserve or adapt font paths for your bundler.

~~~jsx
import { useEffect, useRef } from 'react';
import { enhanceUI } from './ui/index.js';
import './ui/fonts.css';
import './ui/tokens.css';
import './ui/styles.css';

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

Copy the built directories to `public/ui/` and `public/assets/`.

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

Templates run in Node. Serialize with `render()`, include the three stylesheets, and call `enhanceUI()` after the DOM exists.

The documentation's View code panels supply rendered markup. Dialog and CommandPalette triggers refer to separate dialog markup; include both in your application.

## Static documentation

`npm run build` emits a standalone `dist/` folder with relative assets and hash routing. It can be served from a subdirectory without application-route rewrites.

The example workspace uses local sample data. Creating projects, changing settings, sorting, filtering, and pagination do not contact a backend. Only the theme persists across reloads.
