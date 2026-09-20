/**
 * SarahUI Tailwind CSS Preset
 * Seamlessly integrates SarahUI design tokens, animations, and keyframes with Tailwind CSS v3 and v4.
 * 
 * Usage in tailwind.config.js / tailwind.config.ts:
 * ```js
 * import sarahuiPreset from "sarahui/tailwind-preset";
 * 
 * export default {
 *   presets: [sarahuiPreset],
 *   content: ["./src/**\/*.{html,js,ts,jsx,tsx}"],
 * };
 * ```
 */

export default {
  theme: {
    extend: {
      colors: {
        sarah: {
          brand: 'var(--s-brand-indigo, #5B3DF5)',
          'brand-hover': 'var(--s-brand-indigo-hover, #4A2DE0)',
          'brand-surface': 'var(--s-brand-indigo-surface, #F3F0FF)',
          blue: 'var(--s-brand-blue, #178BFF)',
          cyan: 'var(--s-brand-cyan, #00E5FF)',
          purple: 'var(--s-brand-purple, #A020FF)',
          pink: 'var(--s-brand-pink, #FF3366)',
          amber: 'var(--s-brand-amber, #FF9900)',
          surface: 'var(--s-bg-surface, #FFFFFF)',
          subtle: 'var(--s-bg-subtle, #F8F9FB)',
          muted: 'var(--s-bg-muted, #F1F3F7)',
          border: 'var(--s-border-default, rgba(0, 0, 0, 0.08))',
          'border-strong': 'var(--s-border-strong, rgba(0, 0, 0, 0.16))',
          'text-primary': 'var(--s-text-primary, #111827)',
          'text-secondary': 'var(--s-text-secondary, #4B5563)',
          'text-muted': 'var(--s-text-muted, #6B7280)',
        },
      },
      borderRadius: {
        's-xs': 'var(--s-radius-xs, 4px)',
        's-sm': 'var(--s-radius-sm, 6px)',
        's-md': 'var(--s-radius-md, 10px)',
        's-lg': 'var(--s-radius-lg, 16px)',
        's-xl': 'var(--s-radius-xl, 24px)',
        's-pill': 'var(--s-radius-pill, 9999px)',
      },
      boxShadow: {
        's-subtle': 'var(--s-shadow-subtle, 0 1px 2px rgba(0, 0, 0, 0.04))',
        's-card': 'none',
        's-glass': 'none',
      },
      animation: {
        marquee: 'marquee var(--duration, 20s) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration, 20s) linear infinite',
        orbit: 'orbit calc(var(--duration, 20) * 1s) linear infinite',
        shine: 'shine var(--duration, 14s) infinite linear',
        'border-beam': 's-border-beam var(--duration, 8s) infinite linear',
        'line-shadow': 'line-shadow 15s linear infinite',
        meteor: 'meteor 5s linear infinite',
        'pulse-ripple': 'pulse-ripple var(--duration, 2s) cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'shiny-text': 'shiny-text 8s infinite',
        'shimmer-slide': 'shimmer-slide var(--speed, 3s) ease-in-out infinite alternate',
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
        aurora: 'aurora 8s ease-in-out infinite alternate',
        'blur-fade-in': 's-blur-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap, 1rem)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap, 1rem)))' },
        },
        orbit: {
          '0%': {
            transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))',
          },
          '100%': {
            transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))',
          },
        },
        shine: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          to: { backgroundPosition: '0% 0%' },
        },
        's-border-beam': {
          to: { offsetDistance: '100%' },
        },
        'line-shadow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% -100%' },
        },
        meteor: {
          '0%': { transform: 'rotate(var(--angle, 215deg)) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'rotate(var(--angle, 215deg)) translateX(-500px)', opacity: '0' },
        },
        'pulse-ripple': {
          '0%': { boxShadow: '0 0 0 0 var(--pulse-color, #5B3DF5)' },
          '100%': { boxShadow: '0 0 0 var(--distance, 20px) transparent' },
        },
        'shiny-text': {
          '0%, 90%, 100%': { backgroundPosition: 'calc(-100% - var(--shiny-width, 100px)) 0' },
          '30%, 60%': { backgroundPosition: 'calc(100% + var(--shiny-width, 100px)) 0' },
        },
        'shimmer-slide': {
          to: { transform: 'translate(calc(100cqw - 100%), 0)' },
        },
        rainbow: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '200%' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%', transform: 'rotate(-5deg) scale(0.9)' },
          '25%': { backgroundPosition: '50% 100%', transform: 'rotate(5deg) scale(1.1)' },
          '50%': { backgroundPosition: '100% 50%', transform: 'rotate(-3deg) scale(0.95)' },
          '75%': { backgroundPosition: '50% 0%', transform: 'rotate(3deg) scale(1.05)' },
          '100%': { backgroundPosition: '0% 50%', transform: 'rotate(-5deg) scale(0.9)' },
        },
        's-blur-fade-in': {
          '0%': { opacity: '0', filter: 'blur(8px)', transform: 'translateY(8px)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'translateY(0)' },
        },
      },
    },
  },
};

