import fs from 'fs';

// Read current catalog.mjs
let catalogCode = fs.readFileSync('./apps/docs/catalog.mjs', 'utf8');

const demoReplacements = {
  AnimatedList: `  AnimatedList: () => html\`
    <div style="position:relative;display:flex;height:420px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding:16px;">
      <div class="s-animated-list" data-s-animated-list data-delay="1600" data-items='\${JSON.stringify([
        \`<figure class="s-anim-list-card"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#00C9A7;font-size:16px;">💸</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>Payment received</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">15m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah UI Studio</p></div></figure>\`,
        \`<figure class="s-anim-list-card"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#FFB800;font-size:16px;">👤</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>User signed up</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">10m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah UI Studio</p></div></figure>\`,
        \`<figure class="s-anim-list-card"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#FF3D71;font-size:16px;">💬</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>New message</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">5m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah UI Studio</p></div></figure>\`,
        \`<figure class="s-anim-list-card"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#1E86FF;font-size:16px;">🗞️</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>New event</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">2m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah UI Studio</p></div></figure>\`
      ])}'>
        <div class="s-animated-list-item"><figure class="s-anim-list-card"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#00C9A7;font-size:16px;">💸</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>Payment received</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">15m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah UI Studio</p></div></figure></div>
        <div class="s-animated-list-item"><figure class="s-anim-list-card"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#FFB800;font-size:16px;">👤</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>User signed up</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">10m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah UI Studio</p></div></figure></div>
        <div class="s-animated-list-item"><figure class="s-anim-list-card"><div style="display:flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background-color:#FF3D71;font-size:16px;">💬</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:13px;font-weight:600;color:var(--s-text-primary);"><span>New message</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:11.5px;font-weight:400;color:var(--s-text-muted);">5m ago</span></figcaption><p style="font-size:12px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah UI Studio</p></div></figure></div>
      </div>
      <div style="position:absolute;inset-x:0;bottom:0;height:90px;background:linear-gradient(to top, var(--s-bg-canvas), transparent);pointer-events:none;"></div>
    </div>
  \`,`,

  Dock: `  Dock: () => html\`
    <div class="s-dock-wrapper" style="min-height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;width:100%;overflow:hidden;">
      <span class="s-hero-bg-text">Dock</span>
      <nav class="s-dock" data-s-dock aria-label="Dock Navigation" style="margin-top:16px;">
        <a href="#components/Dock" class="s-dock-icon" title="Home" aria-label="Home"><svg class="s-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></a>
        <a href="#components/Dock" class="s-dock-icon" title="Blog" aria-label="Blog"><svg class="s-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></a>
        <div class="s-dock-separator" aria-hidden="true"></div>
        <a href="https://github.com" target="_blank" rel="noreferrer" class="s-dock-icon" title="GitHub" aria-label="GitHub"><svg class="s-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" class="s-dock-icon" title="LinkedIn" aria-label="LinkedIn"><svg class="s-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
        <a href="https://x.com" target="_blank" rel="noreferrer" class="s-dock-icon" title="X" aria-label="X"><svg class="s-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></a>
        <a href="mailto:hello@example.com" class="s-dock-icon" title="Send Email" aria-label="Send Email"><svg class="s-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>
      </nav>
    </div>
  \`,`,

  Globe: `  Globe: () => html\`
    <div style="position:relative;display:flex;height:460px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;background:var(--s-bg-canvas);border:1px solid var(--s-border-default);">
      <span class="s-hero-bg-text" style="position:absolute;top:28px;">Globe</span>
      <div class="s-globe-container" style="position:absolute;top:85px;width:340px;height:340px;">
        <canvas class="s-globe-canvas" data-s-globe width="680" height="680" style="width:100%;height:100%;cursor:grab;"></canvas>
        <div class="s-globe-glow"></div>
      </div>
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 120%, rgba(91,61,245,0.22), transparent 70%);pointer-events:none;"></div>
    </div>
  \`,`,

  OrbitingCircles: `  OrbitingCircles: () => html\`
    <div style="position:relative;display:flex;height:460px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;background:var(--s-bg-canvas);border:1px solid var(--s-border-default);">
      <div style="z-index:20;width:56px;height:56px;border-radius:50%;background:var(--s-bg-surface);border:2px solid var(--s-border-default);display:grid;place-items:center;box-shadow:none;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <svg class="s-orbit-circle-path" viewBox="0 0 460 460" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">
        <circle cx="50%" cy="50%" r="80" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="4 4" />
      </svg>
      <div class="s-orbit-item" style="--radius:80;--duration:20;--angle:0;--icon-size:38px;" title="WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </div>
      <div class="s-orbit-item" style="--radius:80;--duration:20;--angle:180;--icon-size:38px;" title="Notion">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4v16h16V4H4zm14 14H6V6h12v12z"/></svg>
      </div>
      <svg class="s-orbit-circle-path" viewBox="0 0 460 460" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">
        <circle cx="50%" cy="50%" r="160" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="4 4" />
      </svg>
      <div class="s-orbit-item s-orbit-reverse" style="--radius:160;--duration:25;--angle:0;--icon-size:42px;" title="Google Drive">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4285F4" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <div class="s-orbit-item s-orbit-reverse" style="--radius:160;--duration:25;--angle:180;--icon-size:42px;" title="OpenAI">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 8v8M8 12h8"/></svg>
      </div>
    </div>
  \`,`,

  Pointer: `  Pointer: () => html\`
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:16px;width:100%;">
      <div class="s-pointer-container s-custom-pointer-wrap" data-s-pointer style="min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
        <h4 style="font-size:14px;font-weight:600;margin:0;">Animated Pointer</h4>
        <p style="font-size:12px;color:var(--s-text-muted);margin:4px 0 0;">Pulsing heart cursor</p>
        <div class="s-pointer-glyph" style="pointer-events:none;">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#EC4899" style="animation:s-pulse 1.2s infinite;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>
      <div class="s-pointer-container s-custom-pointer-wrap" data-s-pointer style="min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
        <h4 style="font-size:14px;font-weight:600;margin:0;">Colored Pointer</h4>
        <p style="font-size:12px;color:var(--s-text-muted);margin:4px 0 0;">Blue vector arrow</p>
        <div class="s-pointer-glyph" style="pointer-events:none;">
          <svg width="24" height="24" viewBox="0 0 16 16" fill="#3B82F6" style="transform:rotate(-70deg);"><path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/></svg>
        </div>
      </div>
      <div class="s-pointer-container s-custom-pointer-wrap" data-s-pointer style="min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
        <h4 style="font-size:14px;font-weight:600;margin:0;">Custom Shape</h4>
        <p style="font-size:12px;color:var(--s-text-muted);margin:4px 0 0;">Target concentric dot</p>
        <div class="s-pointer-glyph" style="pointer-events:none;">
          <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#8B5CF6"/><circle cx="12" cy="12" r="4" fill="#ffffff"/></svg>
        </div>
      </div>
      <div class="s-pointer-container s-custom-pointer-wrap" data-s-pointer style="min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
        <h4 style="font-size:14px;font-weight:600;margin:0;">Emoji Pointer</h4>
        <p style="font-size:12px;color:var(--s-text-muted);margin:4px 0 0;">Pointing emoji</p>
        <div class="s-pointer-glyph" style="font-size:24px;pointer-events:none;">👆</div>
      </div>
    </div>
  \`,`,

  SmoothCursor: `  SmoothCursor: () => html\`
    <div style="position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 20px;text-align:center;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
      <div class="s-smooth-cursor-container" data-s-smooth-cursor aria-hidden="true">
        <div class="s-smooth-cursor-follower">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 50 54" fill="none">
            <path d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z" fill="var(--s-text-primary, #0f172a)"/>
            <path d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z" stroke="var(--s-bg-canvas, #ffffff)" stroke-width="2.2"/>
          </svg>
        </div>
      </div>
      <h4 style="font-size:16px;font-weight:600;margin:0;">Move your mouse around</h4>
      <p style="font-size:13px;color:var(--s-text-muted);margin:6px 0 0;">Smooth spring interpolation with dynamic velocity tilt rotation.</p>
    </div>
  \`,`,

  MagicCard: `  MagicCard: () => html\`
    <div class="s-magic-card" data-s-magic-card style="width:100%;max-width:360px;margin:0 auto;border-radius:16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);overflow:hidden;box-shadow:none;">
      <div style="padding:20px;border-bottom:1px solid var(--s-border-default);">
        <h3 style="font-size:18px;font-weight:600;margin:0;">Login</h3>
        <p style="font-size:13px;color:var(--s-text-muted);margin:4px 0 0;">Enter your credentials to access your account</p>
      </div>
      <div style="padding:20px;display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:6px;">Email</label>
          <input type="email" class="s-input" placeholder="name@example.com" style="width:100%;" />
        </div>
        <div>
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:6px;">Password</label>
          <input type="password" class="s-input" placeholder="••••••••" style="width:100%;" />
        </div>
      </div>
      <div style="padding:16px 20px;border-top:1px solid var(--s-border-default);">
        <button type="button" class="s-button s-button--primary" style="width:100%;">Sign In</button>
      </div>
    </div>
  \`,`,

  GlareHover: `  GlareHover: () => html\`
    <div class="s-glare-hover" style="width:340px;border-radius:16px;overflow:hidden;background:var(--s-bg-surface);border:1px solid var(--s-border-default);box-shadow:none;">
      <div style="padding:24px;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <h3 style="font-size:20px;font-weight:700;margin:0;">Pro Plan</h3>
          <span class="s-badge s-badge--primary">Popular</span>
        </div>
        <p style="font-size:13px;color:var(--s-text-muted);margin:6px 0 16px;">For teams that need more power & flexibility.</p>
        <div style="display:flex;align-items:baseline;gap:4px;margin-bottom:20px;">
          <span style="font-size:36px;font-weight:800;letter-spacing:-0.03em;">$49</span>
          <span style="font-size:13px;color:var(--s-text-muted);">/mo</span>
        </div>
        <ul style="list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;font-size:13.5px;">
          <li style="display:flex;align-items:center;gap:8px;">✔ Unlimited projects</li>
          <li style="display:flex;align-items:center;gap:8px;">✔ Real-time team collaboration</li>
          <li style="display:flex;align-items:center;gap:8px;">✔ Advanced telemetry & analytics</li>
        </ul>
        <button type="button" class="s-button s-button--primary" style="width:100%;">Get started</button>
      </div>
    </div>
  \`,`,

  Meteors: `  Meteors: () => html\`
    <div style="position:relative;display:flex;height:380px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;background:var(--s-bg-canvas);border:1px solid var(--s-border-default);">
      \${U.Meteors({number:24})}
      <span class="s-hero-bg-text">Meteors</span>
    </div>
  \`,`,

  Particles: `  Particles: () => html\`
    <div style="position:relative;display:flex;height:380px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;background:var(--s-bg-canvas);border:1px solid var(--s-border-default);">
      <span class="s-hero-bg-text" style="z-index:10;">Particles</span>
      <canvas class="s-particles-canvas" data-s-particles data-quantity="80" style="position:absolute;inset:0;width:100%;height:100%;"></canvas>
    </div>
  \`,`,

  RetroGrid: `  RetroGrid: () => html\`
    <div style="position:relative;display:flex;height:380px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;background:var(--s-bg-canvas);border:1px solid var(--s-border-default);">
      <span class="s-hero-bg-text" style="z-index:10;background:linear-gradient(180deg,#ffd319 0%,#ff2975 50%,#8c1eff 100%);-webkit-background-clip:text;color:transparent;">Retro Grid</span>
      \${U.RetroGrid()}
    </div>
  \`,`,

  Ripple: `  Ripple: () => html\`
    <div style="position:relative;display:flex;height:380px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;background:var(--s-bg-canvas);border:1px solid var(--s-border-default);">
      <span class="s-hero-bg-text" style="z-index:10;">Ripple</span>
      \${U.Ripple()}
    </div>
  \`,`,

  VideoText: `  VideoText: () => html\`
    <div style="position:relative;display:flex;height:240px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;background:var(--s-bg-canvas);border:1px solid var(--s-border-default);">
      \${U.VideoText({text:'OCEAN',src:'https://cdn.magicui.design/ocean-small.webm'})}
    </div>
  \`,`,

  WarpBackground: `  WarpBackground: () => html\`
    <div class="s-warp-background">
      <div class="s-warp-grid-container">
        <div class="s-warp-grid-top"></div>
        <div class="s-warp-grid-bottom"></div>
      </div>
      <div class="s-card" style="position:relative;z-index:10;max-width:340px;padding:24px;border-radius:16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);box-shadow:none;">
        <h3 style="font-size:18px;font-weight:700;margin:0 0 8px;">Congratulations on Your Promotion!</h3>
        <p style="font-size:13px;color:var(--s-text-muted);margin:0;line-height:1.5;">Your hard work and dedication have paid off. We're thrilled to see you take this next step in your career.</p>
      </div>
    </div>
  \`,`,

  Floating3DParticles: `  Floating3DParticles: () => html\`
    <div style="position:relative;display:flex;height:420px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;background:var(--s-bg-canvas);border:1px solid var(--s-border-default);">
      <canvas class="s-floating-particles-canvas" data-s-floating-particles style="position:absolute;inset:0;width:100%;height:100%;"></canvas>
      <div style="position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;gap:12px;padding:24px;text-align:center;max-width:440px;">
        <h2 style="font-size:32px;font-weight:800;letter-spacing:-0.03em;margin:0;">Build something magical</h2>
        <p style="font-size:14px;color:var(--s-text-muted);margin:0;line-height:1.5;">A pseudo-3D particle background that stays behind your content with continuous rotation and buoyant drift.</p>
        <button type="button" class="s-button s-button--primary" style="margin-top:8px;">Get Started →</button>
      </div>
    </div>
  \`,`,

  InteractiveHoverButton: `  InteractiveHoverButton: () => html\`
    <div style="display:flex;align-items:center;justify-content:center;padding:40px;">
      <button type="button" class="s-interactive-hover-button">
        <span class="s-ihb-dot"></span>
        <span class="s-ihb-text">Get Started</span>
        <span class="s-ihb-arrow">→</span>
      </button>
    </div>
  \`,`,
};

for (const [key, val] of Object.entries(demoReplacements)) {
  const searchKey = '  ' + key + ':';
  const startIdx = catalogCode.indexOf(searchKey);
  if (startIdx !== -1) {
    // find matching end of function, i.e. next demo key or closing of demos object
    const nextCommaIdx = catalogCode.indexOf('\n  ', startIdx + searchKey.length);
    if (nextCommaIdx !== -1) {
      catalogCode = catalogCode.slice(0, startIdx) + val + catalogCode.slice(nextCommaIdx);
      console.log('Replaced demo for:', key);
    }
  } else {
    console.log('Key not found:', key);
  }
}

fs.writeFileSync('./apps/docs/catalog.mjs', catalogCode, 'utf8');
console.log('Finished updating catalog.mjs');

