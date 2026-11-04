# Accessibility (a11y) & WAI-ARIA Standards

## 1. Regulatory Benchmark & Conformance Target
All SarahUI components must achieve strict **WCAG 2.1 Level AA** conformance and comply with the **W3C WAI-ARIA Authoring Practices Guide (APG)**. Accessibility is a first-class engineering requirement, not an afterthought.

---

## 2. Semantic HTML Elements First
Always prioritize native HTML5 semantic tags over generic `<div>` or `<span>` elements with synthetic ARIA roles:

| Component Type | Preferred Semantic Element | Fallback Pattern |
|---|---|---|
| **Buttons & Triggers** | `<button type="button">` | `role="button" tabindex="0"` + Enter/Space listeners |
| **Hyperlinks / Navigation** | `<a href="...">` | `role="link" tabindex="0"` |
| **Dialogs & Modals** | `<dialog>` | `role="dialog" aria-modal="true"` + focus trap |
| **Cards & Articles** | `<article>` or `<section>` | `role="region" aria-labelledby="..."` |
| **Navigation Bars** | `<nav>` | `role="navigation"` |
| **Code & Terminals** | `<pre><code>` | `role="region" aria-label="Terminal"` |
| **Form Inputs** | `<input>`, `<select>`, `<textarea>` | Native elements with explicit `<label>` or `aria-label` |

---

## 3. Keyboard Navigation & APG Roving Tabindex
Interactive composite components (e.g., `Dock`, `Tabs`, `CommandPalette`, `ContextMenu`, `Menu`) must implement the standard WAI-ARIA APG Roving Tabindex pattern:

### 3.1 Roving Tabindex Contract
1. **Container Role**: Container declares composite role (`role="toolbar"` for `Dock`, `role="tablist"` for `Tabs`).
2. **Tab Sequence**: Exactly ONE item in the composite widget has `tabindex="0"` (the currently active or focused item). All other items have `tabindex="-1"`.
3. **Arrow Key Navigation**:
   - `ArrowRight` / `ArrowDown`: Moves focus to next item (wraps to start).
   - `ArrowLeft` / `ArrowUp`: Moves focus to previous item (wraps to end).
   - `Home`: Moves focus immediately to first item.
   - `End`: Moves focus immediately to last item.
4. **Dynamic Updates**: When focus moves, the previous item receives `tabindex="-1"` and the newly focused item receives `tabindex="0"`.

---

## 4. Screen Reader Live Regions & Announcement Hygiene
Dynamic, streaming, or time-sensitive content must notify assistive technologies without interrupting user focus:

### 4.1 Polite Stream Announcements (`role="log"`, `aria-live="polite"`)
- **Terminal**: The command and log output container must carry `role="region" aria-label="Terminal"`, and dynamic output rows must have `role="log" aria-live="polite" aria-atomic="false"`.
- **AnimatedList**: The feed stream must declare `role="log" aria-live="polite" aria-atomic="false"`, allowing newly prepended or appended items to be read politely.
- **Toast**: Toast notification regions must declare `role="status" aria-live="polite" aria-relevant="additions"`.

### 4.2 Assertive Alerts (`role="alert"`, `aria-live="assertive"`)
- Severe validation errors and mission-critical system failures must declare `role="alert"` to prompt immediate announcement.

---

## 5. Decorative vs. Semantic Content (`aria-hidden="true"`)
Assistive technology must not be cluttered with redundant or purely decorative visual noise:

1. **Duplicate Animation Tracks**:
   - In continuous ticker components like `Marquee`, cloned track nodes created for seamless looping MUST carry `aria-hidden="true"`.
   - Only the single primary track should be read by screen readers.
2. **Visual FX & Lighting Elements**:
   - Spotlights (`MagicCard`), laser beams (`AnimatedBeam`, `BorderBeam`), shine sweep masks (`ShineBorder`), specular sheens (`GlareHover`), cursor glyphs (`Pointer`), and background blur layers (`ProgressiveBlur`) must be explicitly tagged with `aria-hidden="true"`.
3. **Graphical Canvas Representations**:
   - Dynamic 3D or 2D canvas elements (e.g., `Globe`, `IconCloud`) must declare `role="img" aria-label="<Descriptive summary>"`.
   - Complex data representations (e.g., `DottedMap`) must provide an accessible, screen-reader-only data summary (`<table class="s-sr-only">` or `<ul class="s-sr-only">`).

---

## 6. Strict `prefers-reduced-motion` Compliance
Under WCAG 2.2.2 (Pause, Stop, Hide) and 2.3.3 (Animation from Interactions), users who enable reduced motion settings must receive a calm, static experience without vestibular disruption:

### 6.1 Global Duration Collapse
In `tokens.css`, all motion duration tokens collapse to `0ms`:
```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --s-duration-fast: 0ms;
    --s-duration-normal: 0ms;
    --s-duration-slow: 0ms;
    --s-duration-slower: 0ms;
  }
}
```

### 6.2 Component-Specific Motion Overrides
Every animated component must declare explicit overrides in its scoped stylesheet or `styles.css`:

| Component | Default Behavior | Reduced Motion Behavior |
|---|---|---|
| **Marquee** | Infinite ticker scroll | `animation-play-state: paused !important;` (static track) |
| **OrbitingCircles** | Continuous 360° orbital rotation | Rotation halted; nodes positioned in static radial distribution |
| **Terminal** | Character-by-character typing delay | Typing delay bypassed; all text rendered immediately (0ms) |
| **AnimatedList** | Staggered entrance animation | Stagger disabled; items rendered statically in place |
| **Globe / IconCloud** | Continuous spherical rotation | Auto-rotation frozen; static projection rendered |
| **BorderBeam / ShineBorder** | Continuous perimeter beam / shine sweep | `animation: none !important;` subtle static border accent |
| **AnimatedBeam** | Traveling SVG gradient pulse | Pulse halted; static solid connection line rendered |
| **GlareHover** | Specular sheen sweep on hover | Sheen sweep disabled |
| **Dock** | Proximity scale magnification | Scale transform disabled (`transform: none !important;`) |
