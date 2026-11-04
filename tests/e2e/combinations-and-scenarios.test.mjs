/**
 * SarahUI E2E Test Suite - Combinations & Real-World Scenarios (Tier 3 & Tier 4)
 *
 * Tier 3: Pairwise Combinations
 *   - Combination 1: BentoGrid + Marquee
 *   - Combination 2: MagicCard + Terminal
 *   - Combination 3: Lens + OrbitingCircles
 *   - Combination 4: Dock + AvatarCircles
 *   - Combination 5: HeroVideoDialog + AnimatedBeam
 *   - Combination 6: GlareHover + ShineBorder
 *
 * Tier 4: Real-World Application Workflows
 *   - Scenario A: Developer Marketing Landing Page
 *   - Scenario B: Design Engineer Interactive Studio
 *   - Scenario C: Global Analytics & Operations Dashboard
 *   - Scenario D: Interactive Documentation Onboarding & Workspace
 *
 * Requirements: TEST_INFRA.md § Tier 3 & Tier 4, AUDIT_REPORT.md, PROJECT.md
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import * as UI from '../../packages/ui/src/templates.js';
import { buildSite } from '../../apps/docs/site.mjs';

const S = (markup) => String(markup);
const render = (val) => UI.render(val);

describe('Tier 3: Pairwise Component Combinations', () => {
  // Combination 1: BentoGrid + Marquee
  test('Combination 1: BentoGrid cleanly embeds Marquee inside BentoCard', () => {
    const marqueeHtml = UI.Marquee({
      children: 'React Vue Svelte Solid Next.js',
      pauseOnHover: true
    });

    const card = UI.BentoCard({
      name: 'Framework Integrations',
      className: 'col-span-2',
      background: marqueeHtml,
      Icon: 'layers',
      description: 'Works with any modern web framework out of the box.',
      href: '#integrations',
      cta: 'Explore ecosystem'
    });

    const grid = S(UI.BentoGrid({
      children: card,
      className: 'grid-cols-3'
    }));

    // Grid container
    assert.match(grid, /class="[^"]*s-bento-grid[^"]*grid-cols-3[^"]*"/);
    // Card container
    assert.match(grid, /class="[^"]*s-bento-card[^"]*col-span-2[^"]*"/);
    // Embedded marquee
    assert.match(grid, /class="[^"]*s-marquee[^"]*"/);
    assert.match(grid, /data-s-marquee/);
    assert.match(grid, /s-marquee--pause/);
    assert.match(grid, /React/);
    assert.match(grid, /Next\.js/);
  });

  // Combination 2: MagicCard + Terminal
  test('Combination 2: MagicCard cleanly wraps interactive Terminal', () => {
    const terminalHtml = UI.Terminal({
      command: 'pnpm dlx sarahui@latest add magic-card',
      steps: ['Fetching component schema...', 'Validating dependencies...', 'Installed MagicCard.'],
      output: 'Component ready for use.'
    });

    const card = S(UI.MagicCard({
      mode: 'spotlight',
      gradientColor: '#6366f1',
      children: terminalHtml,
      className: 'shadow-2xl'
    }));

    // MagicCard container & layers
    assert.match(card, /class="s-magic-card shadow-2xl"/);
    assert.match(card, /data-s-magic-card\b/);
    assert.match(card, /<div class="s-magic-card-spotlight" aria-hidden="true"><\/div>/);

    // Embedded Terminal
    assert.match(card, /class="s-terminal"/);
    assert.match(card, /data-s-terminal/);
    assert.match(card, /pnpm dlx sarahui@latest add magic-card/);
    assert.match(card, /Installed MagicCard\./);
  });

  // Combination 3: Lens + OrbitingCircles
  test('Combination 3: Lens loupe magnifier encapsulates OrbitingCircles', () => {
    const orbitHtml = UI.OrbitingCircles({
      icons: ['react', 'nextjs', 'tailwind'],
      radius: 120,
      duration: 15
    });

    const lens = S(UI.Lens({
      zoomFactor: 2.0,
      lensSize: 180,
      children: orbitHtml,
      className: 'orbit-lens-preview'
    }));

    // Lens structure
    assert.match(lens, /class="[^"]*s-lens[^"]*orbit-lens-preview[^"]*"/);
    assert.match(lens, /role="region"/);
    assert.match(lens, /aria-label="(?:Magnifier view|Zoom Area)"/);

    // Embedded OrbitingCircles
    assert.match(lens, /class="s-orbiting-circles\b/);
    assert.match(lens, /class="s-orbit-circle-path"/);
  });

  // Combination 4: Dock + AvatarCircles
  test('Combination 4: Dock toolbar integrates AvatarCircles group item', () => {
    const avatars = UI.AvatarCircles({
      avatarUrls: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64'
      ],
      numPeople: 42
    });

    const dock = S(UI.Dock({
      direction: 'bottom',
      children: UI.raw(`
        <button type="button" class="s-dock-icon" title="Home" aria-label="Home"></button>
        <button type="button" class="s-dock-icon" title="Search" aria-label="Search"></button>
        <div class="s-dock-avatar-group">${render(avatars)}</div>
      `)
    }));

    // Dock container & accessibility
    assert.match(dock, /aria-label="Quick tools"/);
    assert.match(dock, /class="[^"]*s-dock[^"]*"/);

    // Embedded AvatarCircles
    assert.match(dock, /class="s-avatar-circles"/);
    assert.match(dock, /\+42/);
  });

  // Combination 5: HeroVideoDialog + AnimatedBeam
  test('Combination 5: HeroVideoDialog integrates alongside AnimatedBeam', () => {
    const heroDialog = UI.HeroVideoDialog({
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280',
      triggerLabel: 'Watch Launch Keynote'
    });

    const beam = UI.AnimatedBeam({
      startX: 0,
      startY: 50,
      endX: 300,
      endY: 50,
      gradientStartColor: '#38bdf8',
      gradientStopColor: '#818cf8'
    });

    const compoundSection = S(UI.raw(`
      <div class="hero-beam-wrapper relative">
        ${render(heroDialog)}
        ${render(beam)}
      </div>
    `));

    // Hero dialog thumbnail & modal structure
    assert.match(compoundSection, /class="s-hero-video-wrap"/);
    assert.match(compoundSection, /class="s-hero-video-thumbnail"/);
    assert.match(compoundSection, /class="s-dialog s-video-modal/);
    assert.match(compoundSection, /iframe/);

    // Animated beam decorative layer
    assert.match(compoundSection, /<svg class="s-animated-beam" aria-hidden="true"/);
    assert.match(compoundSection, /stop-color="#38bdf8"/);
    assert.match(compoundSection, /stop-color="#818cf8"/);
  });

  // Combination 6: GlareHover + ShineBorder
  test('Combination 6: GlareHover specular sheen nested within ShineBorder laser mask', () => {
    const innerCard = UI.GlareHover({
      angle: -45,
      duration: 500,
      children: UI.raw('<h4 class="font-bold">Dual Effect Accent</h4><p>High visual impact</p>')
    });

    const combo = S(UI.ShineBorder({
      borderWidth: 2,
      duration: 10,
      color: '#8b5cf6',
      children: innerCard
    }));

    // ShineBorder container
    assert.match(combo, /class="s-shine-border"/);
    assert.match(combo, /class="s-shine-border-inner"/);

    // GlareHover inner container
    assert.match(combo, /class="s-glare-hover\b/);
    assert.match(combo, /<div class="s-glare-hover-glare" aria-hidden="true"><\/div>/);
    assert.match(combo, /Dual Effect Accent/);
  });
});

describe('Tier 4: Real-World Scenarios', () => {
  // Scenario A: Developer Marketing Landing Page
  test('Scenario A: Developer Marketing Landing Page complete assembly', () => {
    // 1. Navigation with Dock
    const navDock = UI.Dock({
      items: [
        { icon: 'home', label: 'Home', href: '#home' },
        { icon: 'layers', label: 'Components', href: '#components' },
        { icon: 'spark', label: 'Features', href: '#features' },
        { icon: 'code', label: 'Docs', href: '#docs' }
      ]
    });

    // 2. Hero with HeroVideoDialog & ShimmerButton
    const heroVideo = UI.HeroVideoDialog({
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      triggerLabel: 'Product Tour'
    });
    const ctaButton = UI.ShimmerButton({ label: 'Get Started Free', icon: 'spark' });

    // 3. Bento Grid Showcase
    const bento1 = UI.BentoCard({
      name: 'High Performance',
      description: 'Zero runtime dependencies and native CSS transitions.',
      Icon: 'lightning',
      href: '#perf',
      cta: 'View benchmarks'
    });
    const bento2 = UI.BentoCard({
      name: 'Global Scale',
      description: 'Built for enterprise multi-region deployments.',
      Icon: 'globe',
      background: UI.Globe({ size: 150 }),
      href: '#scale',
      cta: 'Explore architecture'
    });
    const bentoGrid = UI.BentoGrid({
      children: UI.raw(render(bento1) + render(bento2))
    });

    // 4. Social Proof Section
    const tweet = UI.TweetCard({
      author: 'Sarah Jenkins',
      handle: 'sarahdesign',
      content: 'SarahUI has completely transformed how our engineering team crafts accessible design systems.',
      likes: 1240,
      retweets: 312
    });
    const avatars = UI.AvatarCircles({
      avatarUrls: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64'
      ],
      numPeople: 2500
    });

    // Assemble Page
    const page = S(UI.raw(`
      <header role="banner" class="landing-header">
        ${render(navDock)}
      </header>
      <main id="main-content" class="landing-main">
        <section id="hero" class="landing-hero" aria-labelledby="hero-heading">
          <h1 id="hero-heading" class="text-5xl font-black">Design at the Speed of Light</h1>
          <p class="hero-subtitle">120 accessible components built with pure CSS variables.</p>
          <div class="hero-actions">${render(ctaButton)}</div>
          <div class="hero-media">${render(heroVideo)}</div>
        </section>
        <section id="features" class="landing-features" aria-labelledby="features-heading">
          <h2 id="features-heading" class="text-3xl font-bold">Engineered for Elegance</h2>
          ${render(bentoGrid)}
        </section>
        <section id="testimonials" class="landing-social" aria-labelledby="social-heading">
          <h2 id="social-heading" class="sr-only">Social Proof</h2>
          ${render(tweet)}
          ${render(avatars)}
        </section>
      </main>
      <footer role="contentinfo" class="landing-footer">
        <p>&copy; 2026 MASARA X. SarahUI.</p>
      </footer>
    `));

    // Semantic HTML landmarks
    assert.match(page, /<header role="banner"/);
    assert.match(page, /<main id="main-content"/);
    assert.match(page, /<footer role="contentinfo"/);
    assert.match(page, /<section id="hero"/);
    assert.match(page, /<section id="features"/);

    // Component signatures
    assert.match(page, /class="s-dock\b/);
    assert.match(page, /class="s-hero-video-wrap"/);
    assert.match(page, /s-shimmer-button/);
    assert.match(page, /s-bento-grid/);
    assert.match(page, /s-bento-card/);
    assert.match(page, /s-globe-canvas/);
    assert.match(page, /class="s-tweet-card"/);
    assert.match(page, /class="s-avatar-circles"/);
    assert.match(page, /\+2500/);
  });

  // Scenario B: Design Engineer Interactive Studio
  test('Scenario B: Design Engineer Interactive Studio multi-layer canvas', () => {
    // 1. Lens inspection viewport
    const sampleGraphic = UI.raw('<div class="studio-artwork w-96 h-96 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-2xl"></div>');
    const lensWorkspace = UI.Lens({
      children: sampleGraphic,
      zoomFactor: 2.5,
      lensSize: 200
    });

    // 2. Cursor follower & Pointer
    const pointer = UI.Pointer({ name: 'Alex (Lead Designer)' });
    const smoothCursor = UI.SmoothCursor();

    // 3. Connective Animated Beams
    const connectionBeam = UI.AnimatedBeam({
      startX: 50,
      startY: 50,
      endX: 350,
      endY: 250,
      curvature: 50,
      gradientStartColor: '#a855f7',
      gradientStopColor: '#06b6d4'
    });

    const studioCanvas = S(UI.raw(`
      <div class="studio-viewport relative overflow-hidden" data-theme="dark">
        ${render(pointer)}
        ${render(smoothCursor)}
        <div class="canvas-grid relative">
          ${render(lensWorkspace)}
          ${render(connectionBeam)}
        </div>
      </div>
    `));

    // Lens accessibility & inspection
    assert.match(studioCanvas, /role="region"/);
    assert.match(studioCanvas, /aria-label="(?:Magnifier view|Zoom Area)"/);

    // Pointer badge & cursor
    assert.match(studioCanvas, /class="s-pointer-badge"/);
    assert.match(studioCanvas, /Alex \(Lead Designer\)/);
    assert.match(studioCanvas, /class="s-smooth-cursor-container"/);

    // Animated beam connection
    assert.match(studioCanvas, /<path class="s-beam-path"/);
    assert.match(studioCanvas, /stop-color="#a855f7"/);
    assert.match(studioCanvas, /stop-color="#06b6d4"/);
  });

  // Scenario C: Global Analytics & Operations Dashboard
  test('Scenario C: Global Analytics & Operations Dashboard live metrics and telemetry', () => {
    // 1. DottedMap global telemetry
    const map = UI.DottedMap({
      markers: [
        { lat: 37.7749, lng: -122.4194, label: 'US-West', pulse: true },
        { lat: 51.5074, lng: -0.1278, label: 'EU-Central', pulse: true },
        { lat: 35.6762, lng: 139.6503, label: 'AP-East', pulse: true }
      ]
    });

    // 2. Security audit log
    const auditLog = UI.AnimatedList({
      items: [
        { title: 'DDoS mitigation engaged', time: '1m ago', tone: 'warning' },
        { title: 'Global SSL certificate renewed', time: '5m ago', tone: 'success' },
        { title: 'New edge node deployed: ap-southeast-1', time: '12m ago', tone: 'info' }
      ]
    });

    // 3. Live metric counters
    const tpsCounter = UI.NumberTicker({ value: 14250, startValue: 10000 });
    const latencyCounter = UI.NumberTicker({ value: 18.4, decimals: 1 });

    // 4. Mesh orbiting circles
    const meshOrbit = UI.OrbitingCircles({
      icons: ['database', 'server', 'cloud'],
      radius: 80,
      duration: 10
    });

    // 5. Wrap in MagicCard
    const dashboardCard = S(UI.MagicCard({
      children: UI.raw(`
        <div class="dashboard-header flex justify-between">
          <h3 class="text-xl font-bold">Telemetry Operations Center</h3>
          <div class="metrics flex gap-4">
            <div class="tps">Throughput: ${render(tpsCounter)} req/s</div>
            <div class="lat">Latency: ${render(latencyCounter)} ms</div>
          </div>
        </div>
        <div class="dashboard-body grid grid-cols-2 gap-6 mt-4">
          <div class="map-pane">${render(map)}</div>
          <div class="log-pane">${render(auditLog)}</div>
        </div>
        <div class="dependency-mesh mt-6">${render(meshOrbit)}</div>
      `),
      className: 'dashboard-magic-card'
    }));

    // Dashboard container
    assert.match(dashboardCard, /class="s-magic-card dashboard-magic-card"/);
    assert.match(dashboardCard, /Telemetry Operations Center/);

    // NumberTicker tabular numbers
    assert.match(dashboardCard, /class="s-number-ticker"/);
    assert.match(dashboardCard, /data-s-number-ticker="14250"/);

    // Live audit log items
    assert.match(dashboardCard, /class="s-animated-list"/);
    assert.match(dashboardCard, /data-s-animated-list/);

    // DottedMap & mesh orbit
    assert.match(dashboardCard, /class="s-dotted-map-container"/);
    assert.match(dashboardCard, /class="s-orbiting-circles\b/);
  });

  // Scenario D: Interactive Documentation Onboarding & Workspace
  test('Scenario D: Documentation overview and start page generation integrity', () => {
    // Generate full site from site.mjs
    const siteHtml = buildSite();
    assert.ok(typeof siteHtml === 'string' && siteHtml.length > 5000, 'Site must generate non-empty HTML string');

    // Verify Overview section
    assert.ok(siteHtml.includes('data-view="overview"'), 'Must contain overview section');
    assert.match(siteHtml, /Thoughtful/i);

    // Verify Start view section
    assert.ok(siteHtml.includes('data-view="start"'), 'Must contain start section');
    assert.ok(siteHtml.includes('data-copy-page="true"'), 'Must contain copy page action');

    // Verify Foundations and Patterns sections
    assert.ok(siteHtml.includes('data-view="foundations"'), 'Must contain foundations section');
    assert.ok(siteHtml.includes('data-view="patterns"'), 'Must contain patterns section');
  });
});
