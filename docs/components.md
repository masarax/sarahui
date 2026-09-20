# Components and behavior

Install with `npm install sarahui`. Import templates from `sarahui/templates`,
or templates and behavior helpers from `sarahui`. Import `sarahui/css` once.
Importing the JavaScript module does not access the DOM.

Components return branded `Markup`. `render()` serializes it. Ordinary strings and arrays are escaped; `html` composes trusted markup and escaped values. Do not put user content into literal markup or script, CSS, tag-name, or event-handler contexts.

## Public properties

| Family | Properties |
| --- | --- |
| Icon | `name`, `size`, `label`; decorative unless labeled |
| Button | `label`, `variant`, `size`, `icon`, `trailing`, `disabled`, `loading`, `attrs`, `className` |
| IconButton | `icon`, `label`, `variant`, `size`, `disabled`, `attrs` |
| ButtonGroup | `label`, `children` |
| Input | `id`, `label`, `helper`, `error`, `icon`, `type`, `attrs` |
| Textarea | `id`, `label`, `helper`, `error`, `value`, `attrs` |
| Select | `id`, `label`, `options`, `value`, `helper`, `attrs` |
| Checkbox / Radio / Switch | `id`, `label`, `description`, `checked`, `disabled`, `attrs` |
| Slider | `id`, `label`, `value`, `min`, `max`, `step`, `attrs` |
| Badge | `label`, `tone`, `dot` |
| Chip | `label`, `removable`, `selected` |
| Avatar | `name`, `initials`, `size`, `tone`, `status` |
| Card | `title`, `description`, `children`, `footer`, `className` |
| Alert | `title`, `description`, `tone`, `live` |
| Tabs | `id`, `label`, `items`, `active`, `variant` |
| Breadcrumb | `items`, `label`; final item is current |
| Pagination | `pages`, `current`, `label`; 1–20 numbered pages |
| NavItem | `label`, `href`, `icon`, `active`, `badge` |
| DataTable | `id`, `caption`, `columns`, `rows`, `selectable` |
| Accordion | `items`: `title`, `content`, `open` |
| Dialog | `id`, `title`, `description`, `children`, `footer` |
| Tooltip | `id`, `label`, `text`, `icon` |
| Progress | `value` (0–100), `label`, `showLabel` |
| Skeleton | `lines` (1–10), `label` |
| EmptyState | `title`, `description`, `action`, `icon` |
| Separator | Optional `label` |
| Spinner | `label`, `decorative` |
| Toast | `title`, `description`, `tone`; use `toast()` to announce |
| Menu | `id`, `label`, `items`: `label`, `icon`, `value`, `danger`, `disabled` |
| CommandPalette | `id`, `title`, `items`: `label`, `href`, `icon`, `keywords` |
| Toggle | `label`, `icon`, `pressed`, `size`, `attrs` |
| ToggleGroup | `label`, `items`: `label`, `icon`, `pressed`, `size`, `type`, `attrs` |
| Kbd | `keys`, `label`, `size`, `attrs` |
| AspectRatio | `ratio`, `children`, `attrs` |
| BentoGrid | `children`, `columns`, `attrs` |
| Drawer | `id`, `title`, `description`, `children`, `position`, `attrs` |
| Popover | `id`, `trigger`, `content`, `attrs` |
| Marquee | `children`, `direction`, `reverse`, `pauseOnHover`, `speed`, `attrs` |
| BorderBeam | `size`, `duration`, `colorFrom`, `colorTo`, `attrs` |
| AnimatedShinyText | `text`, `shimmerWidth`, `attrs` |
| NumberTicker | `value`, `direction`, `delay`, `decimalPlaces`, `attrs` |
| Ripple | `mainCircleSize`, `numCircles`, `attrs` |
| RetroGrid | `angle`, `attrs` |
| ShineBorder | `children`, `borderWidth`, `duration`, `color`, `attrs` |
| Meteors | `number`, `attrs` |
| Particles | `quantity`, `staticity`, `ease`, `color`, `attrs` |
| Confetti | `label`, `icon`, `attrs` |
| MagicCard | `children`, `gradientColor`, `attrs` |
| TypingAnimation | `text`, `duration`, `delay`, `attrs` |
| WordRotate | `words`, `duration`, `attrs` |
| BlurFade | `children`, `delay`, `duration`, `yOffset`, `blur`, `attrs` |
| ShimmerButton | `label`, `icon`, `trailing`, `attrs` |
| RainbowButton | `label`, `icon`, `trailing`, `attrs` |
| Dock | `items`: `icon`, `label`, `attrs` |
| AvatarCircles | `numPeople`, `avatars`, `attrs` |
| AnimatedBeam | `duration`, `delay`, `attrs` |
| Terminal | `children`, `command`, `output`, `attrs` |
| OrbitingCircles | `children`, `radius`, `duration`, `delay`, `reverse`, `attrs` |
| Globe | `size`, `attrs` |
| AnimatedList | `items`, `attrs` |
| InteractiveHoverButton | `label`, `icon`, `attrs` |
| PulsatingButton | `label`, `pulseColor`, `attrs` |
| SparklesText | `text`, `sparklesCount`, `attrs` |
| TextReveal | `text`, `attrs` |
| GridPattern | `width`, `height`, `x`, `y`, `squares`, `attrs` |
| DotPattern | `width`, `height`, `cr`, `attrs` |
| AnimatedGridPattern | `width`, `height`, `numSquares`, `maxOpacity`, `attrs` |
| FlickeringGrid | `squareSize`, `gridGap`, `flickerChance`, `color`, `maxOpacity`, `attrs` |
| WarpBackground | `children`, `beams`, `attrs` |
| NeonGradientCard | `children`, `neonColors`, `borderRadius`, `borderSize`, `attrs` |
| CoolMode | `children`, `particle`, `attrs` |
| ScrollProgress | `height`, `color`, `attrs` |
| ProgressiveBlur | `direction`, `blurAmount`, `attrs` |
| HyperText | `text`, `duration`, `attrs` |
| MorphingText | `texts`, `attrs` |
| AnimatedGradientText | `text`, `attrs` |
| LineShadowText | `text`, `shadowColor`, `attrs` |
| AuroraText | `text`, `attrs` |
| Sheet | `id`, `title`, `description`, `position`, `children`, `footer`, `attrs` |
| ContextMenu | `id`, `items`: `label`, `icon`, `value`, `danger`, `trigger`, `attrs` |
| HoverCard | `trigger`, `content`, `attrs` |
| Collapsible | `title`, `content`, `open`, `attrs` |
| Android | `children`, `src`, `width`, `height`, `className`, `attrs` |
| Iphone | `children`, `src`, `width`, `height`, `className`, `attrs` |
| Safari | `url`, `children`, `width`, `height`, `className`, `attrs` |
| GlareHover | `children`, `className`, `attrs` |
| Backlight | `children`, `color`, `blur`, `spread`, `className`, `attrs` |
| Floating3DParticles | `count`, `fov`, `depthRange`, `color`, `className`, `attrs` |
| LightRays | `count`, `color`, `intensity`, `speed`, `className`, `attrs` |
| AnimatedThemeToggler | `className`, `attrs` |
| ComicText | `text`, `fontSize`, `className`, `attrs` |
| KineticText | `text`, `velocity`, `className`, `attrs` |
| DiaTextReveal | `text`, `className`, `attrs` |
| SpinningText | `text`, `radius`, `duration`, `className`, `attrs` |
| Text3DFlip | `frontText`, `backText`, `duration`, `className`, `attrs` |
| TextAnimate | `text`, `animation`, `delay`, `className`, `attrs` |
| VideoText | `text`, `videoSrc`, `fontSize`, `className`, `attrs` |
| Highlighter | `children`, `color`, `strokeWidth`, `className`, `attrs` |
| ScrollBasedVelocity | `text`, `defaultVelocity`, `className`, `attrs` |
| AnimatedSubscribeButton | `initialText`, `subscribedText`, `className`, `attrs` |
| ShinyButton | `label`, `icon`, `trailing`, `className`, `attrs` |
| RippleButton | `label`, `icon`, `trailing`, `className`, `attrs` |
| CodeComparison | `beforeCode`, `afterCode`, `beforeTitle`, `afterTitle`, `language`, `className`, `attrs` |
| FileTree | `tree`, `initialExpanded`, `className`, `attrs` |
| HeroVideoDialog | `videoSrc`, `thumbnailSrc`, `thumbnailAlt`, `previewGraphic`, `className`, `attrs` |
| IconCloud | `icons`, `size`, `className`, `attrs` |
| Lens | `children`, `zoom`, `lensSize`, `className`, `attrs` |
| PixelImage | `src`, `alt`, `pixelSize`, `width`, `height`, `className`, `attrs` |
| GlyphMatrix | `characters`, `speed`, `color`, `fontSize`, `className`, `attrs` |
| DottedMap | `points`, `className`, `attrs` |
| Pointer | `label`, `color`, `className`, `attrs` |
| SmoothCursor | `color`, `size`, `className`, `attrs` |
| TweetCard | `avatar`, `name`, `handle`, `content`, `date`, `likes`, `retweets`, `verified`, `className`, `attrs` |
| AnimatedCircularProgressBar | `value`, `max`, `min`, `gaugePrimaryColor`, `gaugeSecondaryColor`, `className`, `attrs` |
| HexagonPattern | `size`, `strokeWidth`, `color`, `className`, `attrs` |
| StripedPattern | `width`, `height`, `angle`, `color`, `className`, `attrs` |
| InteractiveGridPattern | `width`, `height`, `squares`, `className`, `attrs` |
| NoiseTexture | `opacity`, `patternSize`, `className`, `attrs` |

Sizes: `sm`, `md`, `lg`. Button variants: `primary`, `secondary`, `outline`, `ghost`, `danger`. Feedback tones: `success`, `warning`, `danger`, `info`; Badge also supports `brand` and `neutral`.

`attrs` allows native form attributes and `data-*`/`aria-*`. It rejects inline handlers and styles. `href` rejects unsafe protocols. Component-owned attributes override conflicting passed attributes.

Provide stable explicit IDs for SSR, hydration, multiple independently rendered fragments, or multiple bundles. The fallback counter guarantees uniqueness only within one module rendering lifetime.

## Enhancement and events

~~~js
const cleanup = enhanceUI(document);
// Call cleanup() before unmounting.
~~~

Installation is idempotent per root. Use one installation root for each subtree, without overlapping nested roots. Delegated behavior supports subsequently inserted components. Mixed table selection initialization runs during installation; initialize externally controlled selections after rendering as needed.

| Event | Origin | Detail |
| --- | --- | --- |
| `sarah:themechange` | Theme root | `preference`, resolved `theme` |
| `sarah:tabchange` | Tabs | `index`, `id` |
| `sarah:selectionchange` | Table | `selected` row IDs, `count` |
| `sarah:sortchange` | Table | `key`, `direction` |
| `sarah:pagechange` | Pagination | `page`, `pages` |
| `sarah:chipremove` | Chip parent | `label` |
| `sarah:menuaction` | Menu | `value` |
| `sarah:command` | Search dialog | `href`, `label` |

Events bubble through `CustomEvent.detail`. Tables sort their current DOM rows. For remote data or multiple pages, update application data on sort events; the workspace demonstrates sorting before pagination. Supply `row.id` for stable selection. Plain strings/numbers supply sortable values; custom markup cells can set `data-sort`.

Pagination emits a selection change; it does not fetch or hide records itself.

## Dialogs, commands, themes, toasts

~~~js
const content = html`
  ${Button({ label: 'Create', attrs: { 'data-s-dialog-open': 'project' } })}
  ${Dialog({ id: 'project', title: 'Create a project', children:
    Input({ id: 'name', label: 'Project name', attrs: { 'data-s-autofocus': true } })
  })}
`;
~~~

`openDialog(dialog, trigger)` uses native `showModal()` and focuses the preferred control. `closeDialog(dialog)` closes it. Escape/backdrop dismissal restore the trigger if it is still visible.

CommandPalette filters, selects with arrows/Enter, and handles hash navigation. Set your own shortcut to open it; the documentation uses Ctrl/Command + K. Handle `sarah:command` for non-hash router destinations.

Tooltips contain supplementary, noninteractive text. Essential instructions and clickable controls belong in the main interface.

~~~js
const dismiss = toast('Your changes are ready.', {
  title: 'Saved successfully', tone: 'success', duration: 6000
});
setTheme('system');
~~~

Toasts use polite announcements, keep existing focus, and pause dismissal while hovered or focused. Duration 0 keeps a toast visible until dismissed. Theme preference persists by default; `{persist:false}` makes it transient. `{root:element}` sets a nested theme; system-preference listening belongs to the document theme root.
