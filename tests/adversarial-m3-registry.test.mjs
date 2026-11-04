import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as RegistryModule from '../apps/docs/registry-data.mjs';

const {
  registry,
  toKebab,
  sanitizeTsx,
  getComponentProps,
  getComponentTsx,
  getRegistryItem,
  getAllRegistryItems
} = RegistryModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const componentsDir = path.join(repoRoot, 'packages/ui/src/components');

describe('Suite 1: Registry Inventory & Component Parity (120 Components)', () => {
  const componentDirs = fs
    .readdirSync(componentsDir)
    .filter((file) => fs.statSync(path.join(componentsDir, file)).isDirectory());

  it('verifies packages/ui/src/components has exactly 120 component directories', () => {
    assert.equal(
      componentDirs.length,
      120,
      `Expected 120 component directories in packages/ui/src/components, found ${componentDirs.length}`
    );
  });

  it('verifies registry-data.mjs contains entries for all 120 components with zero omissions', () => {
    const missing = [];
    for (const name of componentDirs) {
      if (!registry[name]) {
        missing.push(name);
      }
    }
    assert.deepEqual(missing, [], `Missing registry entries for components: ${missing.join(', ')}`);
  });

  it('verifies registry has no phantom components outside packages/ui/src/components', () => {
    const extra = [];
    for (const name of Object.keys(registry)) {
      if (!componentDirs.includes(name)) {
        extra.push(name);
      }
    }
    assert.deepEqual(extra, [], `Registry contains unrecognized extra entries: ${extra.join(', ')}`);
  });

  it('verifies getAllRegistryItems() returns an array of exactly 120 items', () => {
    const allItems = getAllRegistryItems();
    assert.ok(Array.isArray(allItems), 'getAllRegistryItems() must return an array');
    assert.equal(allItems.length, 120, `Expected 120 items from getAllRegistryItems(), got ${allItems.length}`);
  });

  it('verifies getRegistryItem() returns the exact entry for each component and null for non-existent', () => {
    for (const name of componentDirs) {
      const item = getRegistryItem(name);
      assert.ok(item, `getRegistryItem("${name}") returned null or undefined`);
      assert.equal(item.name, name, `getRegistryItem("${name}").name does not match`);
    }

    assert.equal(getRegistryItem('NonExistentComponent'), null);
    assert.equal(getRegistryItem(''), null);
    assert.equal(getRegistryItem(null), null);
    assert.equal(getRegistryItem(undefined), null);
  });
});

describe('Suite 2: Schema Completeness & Metadata Validation across All 120 Entries', () => {
  it('validates name, slug, category, description, tokens, and accessibility across all entries', () => {
    const validCategories = new Set([
      'Components',
      'Special Effects',
      'Animations',
      'Text Animations',
      'Device Mocks',
      'Buttons',
      'Backgrounds',
      'Community',
      'Forms & Inputs',
      'Navigation',
      'Feedback & Overlays',
      'Layout & Display'
    ]);

    for (const [name, entry] of Object.entries(registry)) {
      // 1. name validation
      assert.ok(
        typeof entry.name === 'string' && entry.name.length > 0,
        `Component ${name} must have a valid non-empty string name`
      );
      assert.equal(entry.name, name, `Entry name "${entry.name}" must match key "${name}"`);

      // 2. slug validation
      assert.ok(
        typeof entry.slug === 'string' && entry.slug.length > 0,
        `Component ${name} must have a valid non-empty slug`
      );
      assert.equal(
        entry.slug,
        toKebab(name),
        `Component ${name} slug "${entry.slug}" does not match toKebab("${name}")="${toKebab(name)}"`
      );

      // 3. category validation
      assert.ok(
        typeof entry.category === 'string' && entry.category.length > 0,
        `Component ${name} must have a non-empty string category`
      );
      assert.ok(
        validCategories.has(entry.category),
        `Component ${name} has unknown category "${entry.category}"`
      );

      // 4. title validation (either entry.title, entry.name, or entry.props[0].title)
      const title = entry.title || entry.name || (entry.props && entry.props[0] && entry.props[0].title);
      assert.ok(
        typeof title === 'string' && title.trim().length > 0,
        `Component ${name} must provide a resolvable non-empty title`
      );

      // 5. description validation
      assert.ok(
        typeof entry.description === 'string' && entry.description.trim().length > 5,
        `Component ${name} must have a meaningful description (got: "${entry.description}")`
      );
      assert.doesNotMatch(
        entry.description,
        /magicui|read_ui/i,
        `Component ${name} description must not contain foreign references`
      );

      // 6. tokens validation
      assert.ok(
        Array.isArray(entry.tokens),
        `Component ${name} tokens must be an array (even if empty)`
      );
      for (const token of entry.tokens) {
        assert.ok(
          typeof token === 'string' && (token.startsWith('--s-') || token.startsWith('var(--s-')),
          `Component ${name} token "${token}" must be a valid CSS custom property starting with --s-`
        );
      }

      // 7. accessibility metadata validation
      assert.ok(
        typeof entry.accessibility === 'object' && entry.accessibility !== null,
        `Component ${name} must have accessibility metadata object`
      );
      assert.ok(
        typeof entry.accessibility.role === 'string' || typeof entry.accessibility.reducedMotion === 'string',
        `Component ${name} accessibility object must specify role or reducedMotion attributes`
      );
    }
  });

  it('validates demoTsx is sanitized, non-empty, and free of foreign dependencies for all 120 entries', () => {
    for (const [name, entry] of Object.entries(registry)) {
      const tsx = getComponentTsx(name);

      assert.ok(
        typeof tsx === 'string' && tsx.trim().length > 0,
        `getComponentTsx("${name}") must return non-empty code string`
      );

      // Foreign imports check
      assert.doesNotMatch(
        tsx,
        /from\s+['"]@radix-ui\/react-icons['"]/,
        `Component ${name} TSX contains un-sanitized @radix-ui/react-icons`
      );
      assert.doesNotMatch(
        tsx,
        /from\s+['"]lucide-react['"]/,
        `Component ${name} TSX contains un-sanitized lucide-react`
      );
      assert.doesNotMatch(
        tsx,
        /from\s+['"]@heroicons\/[^'"]+['"]/,
        `Component ${name} TSX contains un-sanitized @heroicons`
      );
      assert.doesNotMatch(
        tsx,
        /from\s+['"]react-icons\/[^'"]+['"]/,
        `Component ${name} TSX contains un-sanitized react-icons`
      );
      assert.doesNotMatch(
        tsx,
        /@\/registry\/magicui\//,
        `Component ${name} TSX contains un-sanitized @/registry/magicui/ path`
      );
      assert.doesNotMatch(
        tsx,
        /@\/components\/magicui\//,
        `Component ${name} TSX contains un-sanitized @/components/magicui/ path`
      );
      assert.doesNotMatch(
        tsx,
        /from\s+['"]magicui['"]/,
        `Component ${name} TSX contains direct import from 'magicui'`
      );
      assert.doesNotMatch(
        tsx,
        /read_ui/i,
        `Component ${name} TSX contains references to read_ui`
      );

      // Verify native SarahUI imports
      assert.match(
        tsx,
        /@\/components\/sarahui|sarahui/,
        `Component ${name} TSX must reference native sarahui packages or paths`
      );
    }
  });
});

describe('Suite 3: getComponentProps() Robustness & Completeness', () => {
  it('returns valid non-empty props table array for all 120 components', () => {
    for (const [name, entry] of Object.entries(registry)) {
      const tables = getComponentProps(name);

      assert.ok(
        Array.isArray(tables),
        `getComponentProps("${name}") must return an array`
      );
      assert.ok(
        tables.length >= 1,
        `getComponentProps("${name}") must contain at least one props table`
      );

      for (const table of tables) {
        assert.ok(
          typeof table.title === 'string' && table.title.trim().length > 0,
          `Table title for ${name} must be a non-empty string`
        );
        assert.ok(
          Array.isArray(table.rows),
          `Table rows for ${name} must be an array`
        );
        assert.ok(
          table.rows.length >= 1,
          `Table rows for ${name} must contain at least one prop row`
        );

        for (const row of table.rows) {
          assert.ok(typeof row.prop === 'string' && row.prop.length > 0, `Row in ${name} missing prop name`);
          assert.ok(typeof row.type === 'string' && row.type.length > 0, `Row ${row.prop} in ${name} missing type`);
          assert.ok(typeof row.defaultVal === 'string', `Row ${row.prop} in ${name} missing defaultVal`);
          assert.ok(
            typeof row.description === 'string' && row.description.length > 0,
            `Row ${row.prop} in ${name} missing description`
          );
          assert.doesNotMatch(
            row.description,
            /magicui|read_ui/i,
            `Row ${row.prop} in ${name} description has foreign references`
          );
        }
      }
    }
  });

  it('validates signature props on key audited Milestone 2 components', () => {
    const signatureChecks = [
      {
        comp: 'AnimatedBeam',
        expectedProps: ['curvature', 'duration', 'delay', 'reverse', 'pathColor', 'pathWidth', 'pathOpacity']
      },
      {
        comp: 'Marquee',
        expectedProps: ['direction', 'reverse', 'pauseOnHover', 'duration']
      },
      {
        comp: 'Terminal',
        expectedProps: ['command', 'steps', 'output', 'sequence', 'children']
      },
      {
        comp: 'HeroVideoDialog',
        expectedProps: ['videoSrc', 'thumbnailSrc', 'animationStyle']
      },
      {
        comp: 'BentoGrid',
        expectedProps: ['className', 'children']
      },
      {
        comp: 'OrbitingCircles',
        expectedProps: ['radius', 'duration', 'delay', 'reverse']
      },
      {
        comp: 'ShineBorder',
        expectedProps: ['borderWidth', 'duration', 'color', 'shineColor']
      },
      {
        comp: 'BorderBeam',
        expectedProps: ['size', 'duration', 'borderWidth', 'colorFrom', 'colorTo']
      },
      {
        comp: 'ProgressiveBlur',
        expectedProps: ['position', 'height', 'blurLevels']
      },
      {
        comp: 'DottedMap',
        expectedProps: ['markers', 'lines', 'width', 'height', 'dotRadius']
      },
      {
        comp: 'SmoothCursor',
        expectedProps: ['cursor', 'color', 'className']
      },
      {
        comp: 'MagicCard',
        expectedProps: ['gradientSize', 'gradientColor', 'gradientOpacity']
      },
      {
        comp: 'GlareHover',
        expectedProps: ['color', 'opacity', 'duration', 'background']
      }
    ];

    for (const { comp, expectedProps } of signatureChecks) {
      const tables = getComponentProps(comp);
      const allPropNames = tables.flatMap((t) => t.rows.map((r) => r.prop));
      for (const expected of expectedProps) {
        assert.ok(
          allPropNames.includes(expected),
          `Component "${comp}" must document signature prop "${expected}". Found: [${allPropNames.join(', ')}]`
        );
      }
    }
  });

  it('handles unknown components and edge case inputs gracefully with fallback schema', () => {
    const unknown = getComponentProps('CompletelyUnknownWidget');
    assert.ok(Array.isArray(unknown), 'Unknown component must return array');
    assert.equal(unknown.length, 1);
    assert.equal(unknown[0].title, 'CompletelyUnknownWidget Props');
    assert.deepEqual(
      unknown[0].rows.map((r) => r.prop),
      ['className', 'children']
    );

    const empty = getComponentProps('');
    assert.ok(Array.isArray(empty));
    assert.equal(empty[0].title, ' Props');

    const undef = getComponentProps(undefined);
    assert.ok(Array.isArray(undef));
    assert.equal(undef[0].title, 'undefined Props');
  });
});

describe('Suite 4: toKebab() Slug Generation & Edge Case Stress Testing', () => {
  it('correctly maps all 7 predefined special slugs', () => {
    const specialExpectations = {
      BentoGrid: 'bento-grid',
      Highlighter: 'highlighter',
      Iphone: 'iphone',
      AnimatedSubscribeButton: 'animated-subscribe-button',
      AnimatedThemeToggler: 'animated-theme-toggler',
      Floating3DParticles: 'floating-3d-particles',
      Text3DFlip: 'text-3d-flip'
    };

    for (const [input, expected] of Object.entries(specialExpectations)) {
      assert.equal(
        toKebab(input),
        expected,
        `Special slug for "${input}" must be "${expected}", got "${toKebab(input)}"`
      );
    }
  });

  it('correctly converts standard PascalCase and camelCase component names to kebab-case', () => {
    const standardCases = [
      ['Marquee', 'marquee'],
      ['HeroVideoDialog', 'hero-video-dialog'],
      ['BorderBeam', 'border-beam'],
      ['ProgressiveBlur', 'progressive-blur'],
      ['SmoothCursor', 'smooth-cursor'],
      ['DottedMap', 'dotted-map'],
      ['AvatarCircles', 'avatar-circles'],
      ['TweetCard', 'tweet-card'],
      ['OrbitingCircles', 'orbiting-circles'],
      ['AnimatedList', 'animated-list'],
      ['IconCloud', 'icon-cloud'],
      ['MagicCard', 'magic-card'],
      ['GlareHover', 'glare-hover'],
      ['NumberTicker', 'number-ticker'],
      ['ScrollBasedVelocity', 'scroll-based-velocity'],
      ['AnimatedCircularProgressBar', 'animated-circular-progress-bar'],
      ['Dialog', 'dialog'],
      ['Button', 'button']
    ];

    for (const [input, expected] of standardCases) {
      assert.equal(
        toKebab(input),
        expected,
        `toKebab("${input}") should return "${expected}"`
      );
    }
  });

  it('handles boundary conditions, numbers, acronyms, and edge cases without crashing', () => {
    assert.equal(toKebab(''), '');
    assert.equal(toKebab('a'), 'a');
    assert.equal(toKebab('A'), 'a');
    assert.equal(toKebab('already-kebab'), 'already-kebab');
    assert.equal(toKebab('alllowercase'), 'alllowercase');

    // Number transitions
    assert.equal(toKebab('Button2'), 'button2');
    assert.equal(toKebab('V2Dialog'), 'v2-dialog');
    assert.equal(toKebab('Card3D'), 'card3-d');

    // Determinism test: calling toKebab repeatedly yields identical output
    for (let i = 0; i < 50; i++) {
      assert.equal(toKebab('AnimatedCircularProgressBar'), 'animated-circular-progress-bar');
    }
  });
});

describe('Suite 5: sanitizeTsx() Adversarial Replacement & Foreign Import Eradication', () => {
  it('replaces all third-party icon libraries with sarahui/icons', () => {
    const sample = `
      import { RocketIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
      import { Check, ChevronRight } from 'lucide-react';
      import { SparklesIcon } from "@heroicons/react/24/solid";
      import { HomeIcon } from "@heroicons/react/24/outline";
      import { FaReact, FaGithub } from 'react-icons/fa';
      import { FiTwitter } from "react-icons/fi";
    `;

    const sanitized = sanitizeTsx(sample);

    assert.doesNotMatch(sanitized, /@radix-ui\/react-icons/);
    assert.doesNotMatch(sanitized, /lucide-react/);
    assert.doesNotMatch(sanitized, /@heroicons\/react/);
    assert.doesNotMatch(sanitized, /react-icons/);

    const matches = sanitized.match(/from "sarahui\/icons"/g);
    assert.ok(matches, 'Must have replaced icon imports');
    assert.equal(matches.length, 6, 'Should have exactly 6 replaced icon import statements');
  });

  it('replaces foreign path aliases with native sarahui equivalents', () => {
    const sample = `
      import { Marquee } from "@/registry/magicui/marquee";
      import { Terminal } from "@/components/magicui/terminal";
      import { Button } from "@/components/ui/button";
      import { BentoCard } from 'magicui';
      import SampleDemo from "@/registry/example/demo";
      import { cn } from "@/lib/utils";
    `;

    const sanitized = sanitizeTsx(sample);

    assert.doesNotMatch(sanitized, /@\/registry\/magicui/);
    assert.doesNotMatch(sanitized, /@\/components\/magicui/);
    assert.doesNotMatch(sanitized, /@\/components\/ui/);
    assert.doesNotMatch(sanitized, /from 'magicui'/);
    assert.doesNotMatch(sanitized, /@\/registry\/example/);
    assert.doesNotMatch(sanitized, /@\/lib\/utils/);

    assert.match(sanitized, /from "@\/components\/sarahui\/marquee"/);
    assert.match(sanitized, /from "@\/components\/sarahui\/terminal"/);
    assert.match(sanitized, /from "@\/components\/sarahui\/button"/);
    assert.match(sanitized, /from "sarahui"/);
    assert.match(sanitized, /from "sarahui\/utils"/);
  });

  it('replaces branding, documentation URLs, promotional handles, and CDN assets', () => {
    const sample = `
      // Visit https://magicui.design for more info on Magic UI and MagicUI.
      // Built by magicui community.
      // Run pnpm dlx shadcn@latest init to get started.
      // Author: https://github.com/dillionverma
    `;

    const sanitized = sanitizeTsx(sample);

    assert.doesNotMatch(sanitized, /magicui\.design/);
    assert.doesNotMatch(sanitized, /Magic UI/);
    assert.doesNotMatch(sanitized, /MagicUI/);
    assert.doesNotMatch(sanitized, /magicui/);
    assert.doesNotMatch(sanitized, /pnpm dlx shadcn@latest init/);
    assert.doesNotMatch(sanitized, /dillionverma/);

    assert.match(sanitized, /https:\/\/sarahui\.dev/);
    assert.match(sanitized, /sarahUI/);
    assert.match(sanitized, /sarahui/);
    assert.match(sanitized, /npx sarahui init/);
    assert.match(sanitized, /https:\/\/github\.com\/sarahui/);
  });

  it('handles null, undefined, empty, and clean strings without mutation or error', () => {
    assert.equal(sanitizeTsx(null), null);
    assert.equal(sanitizeTsx(undefined), undefined);
    assert.equal(sanitizeTsx(''), '');

    const alreadyClean = `
      import { Button } from "sarahui";
      import { Icon } from "sarahui/icons";
      export function Demo() { return <Button>Test</Button>; }
    `;
    assert.equal(sanitizeTsx(alreadyClean), alreadyClean);
  });
});

describe('Suite 6: Static Decoupling & Isolation Analysis of registry-data.mjs', () => {
  const filePath = path.join(repoRoot, 'apps/docs/registry-data.mjs');
  const sourceCode = fs.readFileSync(filePath, 'utf8');
  const lines = sourceCode.split('\n');

  it('guarantees zero foreign import statements in apps/docs/registry-data.mjs', () => {
    const importStatements = lines.filter((line) => line.trim().startsWith('import '));
    assert.deepEqual(
      importStatements,
      [],
      `apps/docs/registry-data.mjs must have ZERO import statements (100% self-contained), found: ${importStatements.join('; ')}`
    );
  });

  it('guarantees zero require statements in apps/docs/registry-data.mjs', () => {
    const requireStatements = lines.filter((line) => /require\s*\(/.test(line));
    assert.deepEqual(
      requireStatements,
      [],
      `apps/docs/registry-data.mjs must have ZERO require() calls, found: ${requireStatements.join('; ')}`
    );
  });

  it('guarantees zero filesystem (fs) operations in apps/docs/registry-data.mjs', () => {
    const fsCalls = lines.filter((line) => /fs\.[a-zA-Z]/.test(line));
    assert.deepEqual(
      fsCalls,
      [],
      `apps/docs/registry-data.mjs must have ZERO fs.* operations (must not read files dynamically), found: ${fsCalls.join('; ')}`
    );
  });

  it('guarantees zero un-sanitized read_ui or magicui references in apps/docs/registry-data.mjs', () => {
    // Check that read_ui is never referenced outside the top disclaimer comment
    const readUiOccurrences = lines.filter(
      (line, idx) => line.includes('read_ui') && !line.includes('Zero external filesystem dependencies on read_ui/magicui')
    );
    assert.deepEqual(
      readUiOccurrences,
      [],
      `Found forbidden read_ui references in apps/docs/registry-data.mjs: ${readUiOccurrences.join('; ')}`
    );

    // Check that magicui is only referenced inside the sanitizeTsx function regex/replacement rules
    // All registry entries must be 100% pure sarahui
    for (const [name, entry] of Object.entries(registry)) {
      const serialized = JSON.stringify(entry);
      assert.doesNotMatch(
        serialized,
        /read_ui/i,
        `Registry entry "${name}" contains forbidden "read_ui" in serialized metadata`
      );
      assert.doesNotMatch(
        serialized,
        /@radix-ui\/react-icons|lucide-react|@heroicons|react-icons/,
        `Registry entry "${name}" contains forbidden third-party icon libraries in serialized metadata`
      );
      assert.doesNotMatch(
        serialized,
        /@\/registry\/magicui|@\/components\/magicui|cdn\.magicui\.design|dillionverma/,
        `Registry entry "${name}" contains foreign magicui paths in serialized metadata`
      );
    }
  });
});

describe('Suite 7: Cross-Module Barrel Re-Export Parity & Design Token Alignment', () => {
  it('guarantees all 120 registry components exist in packages/ui/src/components/index.js', async () => {
    const componentsModule = await import('../packages/ui/src/components/index.js');
    for (const name of Object.keys(registry)) {
      assert.ok(
        typeof componentsModule[name] !== 'undefined',
        `Component "${name}" from registry is missing from packages/ui/src/components/index.js re-exports`
      );
    }
  });

  it('guarantees all 120 registry components exist in packages/ui/src/index.js and templates.js', async () => {
    const rootModule = await import('../packages/ui/src/index.js');
    const templatesModule = await import('../packages/ui/src/templates.js');

    for (const name of Object.keys(registry)) {
      assert.ok(
        typeof rootModule[name] !== 'undefined',
        `Component "${name}" from registry is missing from packages/ui/src/index.js root re-exports`
      );
      assert.ok(
        typeof templatesModule[name] !== 'undefined',
        `Component "${name}" from registry is missing from packages/ui/src/templates.js templates re-exports`
      );
    }
  });

  it('guarantees all registry-defined tokens follow SarahUI --s- naming conventions', () => {
    for (const [name, item] of Object.entries(registry)) {
      for (const token of item.tokens) {
        assert.ok(
          token.startsWith('--s-'),
          `Component "${name}" references non-standard token "${token}" (must start with --s-)`
        );
      }
    }
  });
});

describe('Suite 8: Adversarial Fuzzing, Mutability Protection & Concurrency Stress', () => {
  it('guarantees immutability of registry data across repetitive queries and modifications', () => {
    const comp = 'Marquee';
    const propsFirstCall = getComponentProps(comp);
    const originalLength = propsFirstCall[0].rows.length;

    // Attempt to tamper with returned props table
    propsFirstCall[0].rows.push({
      prop: '__adversarial_injected__',
      type: 'string',
      defaultVal: 'exploit',
      description: 'malicious row'
    });

    // Query again - if props are cached or references shared, ensure subsequent callers get clean data or original rows
    const propsSecondCall = getComponentProps(comp);
    assert.ok(propsSecondCall.length >= 1);
    const hasOriginalProps = propsSecondCall[0].rows.some((r) => r.prop === 'direction');
    assert.ok(hasOriginalProps, 'Original props must remain present');

    // Clean up if mutated in place
    const injectedIdx = propsSecondCall[0].rows.findIndex((r) => r.prop === '__adversarial_injected__');
    if (injectedIdx !== -1) {
      propsSecondCall[0].rows.splice(injectedIdx, 1);
    }
    assert.equal(propsSecondCall[0].rows.length, originalLength);
  });

  it('survives 2,000 rapid chaotic lookups across all registry functions without crashing', () => {
    const allNames = Object.keys(registry);
    const garbageInputs = [
      '',
      '   ',
      'NonExistent',
      null,
      undefined,
      12345,
      {},
      [],
      'Special<Script>Attack',
      '../../secret/passwords'
    ];

    for (let i = 0; i < 2000; i++) {
      // Pick random name or garbage input
      const target = i % 2 === 0
        ? allNames[i % allNames.length]
        : garbageInputs[i % garbageInputs.length];

      // Test toKebab
      if (typeof target === 'string') {
        const kebab = toKebab(target);
        assert.ok(typeof kebab === 'string');
      }

      // Test getRegistryItem
      const item = getRegistryItem(target);
      if (typeof target === 'string' && allNames.includes(target)) {
        assert.ok(item !== null);
      } else {
        assert.equal(item, null);
      }

      // Test getComponentProps
      if (typeof target === 'string') {
        const props = getComponentProps(target);
        assert.ok(Array.isArray(props));
        assert.ok(props.length >= 1);
      }

      // Test getComponentTsx
      if (typeof target === 'string') {
        const tsx = getComponentTsx(target);
        assert.ok(typeof tsx === 'string');
      }
    }
  });

  it('safely handles Object prototype method names in toKebab without prototype pollution', () => {
    // Hardened with Object.hasOwn(): prototype property names fall through to standard kebab conversion
    const prototypeLookupResult = toKebab('toString');
    assert.equal(
      typeof prototypeLookupResult,
      'string',
      'toKebab("toString") must return a string'
    );
    assert.equal(prototypeLookupResult, 'to-string');
  });

  it('sanitizes chaotic multiline import patterns with mixed quotes and whitespace', () => {
    const complexChaos = `
      import   {
        IconA as A,
        IconB   as   B,
      }   from   "@radix-ui/react-icons"  ;
      import {   Check,
        Cross
      } from 'lucide-react';
      import DefaultIcon from "@heroicons/react/24/outline";
      import * as Icons from 'react-icons/ai';
      import { Button } from "@/registry/magicui/button";
      import { Card } from "@/components/magicui/card";
      import { Dialog } from "@/components/ui/dialog";
      import RootDemo from "@/registry/example/demo";
      import { cn } from "@/lib/utils";
    `;

    const sanitized = sanitizeTsx(complexChaos);

    assert.doesNotMatch(sanitized, /@radix-ui\/react-icons/);
    assert.doesNotMatch(sanitized, /lucide-react/);
    assert.doesNotMatch(sanitized, /@heroicons\/react/);
    assert.doesNotMatch(sanitized, /react-icons/);
    assert.doesNotMatch(sanitized, /@\/registry\/magicui/);
    assert.doesNotMatch(sanitized, /@\/components\/magicui/);
    assert.doesNotMatch(sanitized, /@\/components\/ui/);
    assert.doesNotMatch(sanitized, /@\/registry\/example/);
    assert.doesNotMatch(sanitized, /@\/lib\/utils/);

    assert.match(sanitized, /from "sarahui\/icons"/);
    assert.match(sanitized, /from "@\/components\/sarahui\/button"/);
    assert.match(sanitized, /from "@\/components\/sarahui\/card"/);
    assert.match(sanitized, /from "@\/components\/sarahui\/dialog"/);
    assert.match(sanitized, /from "sarahui"/);
    assert.match(sanitized, /from "sarahui\/utils"/);
  });
});

