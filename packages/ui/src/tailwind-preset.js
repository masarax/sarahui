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

const baseRadii = {
  's-none': 'var(--s-radius-none, 0px)',
  's-xs': 'var(--s-radius-xs, 4px)',
  's-sm': 'var(--s-radius-sm, 8px)',
  's-md': 'var(--s-radius-md, 12px)',
  's-lg': 'var(--s-radius-lg, 16px)',
  's-xl': 'var(--s-radius-xl, 20px)',
  's-2xl': 'var(--s-radius-2xl, 24px)',
  's-3xl': 'var(--s-radius-3xl, 32px)',
  's-full': 'var(--s-radius-full, 9999px)',
  's-pill': 'var(--s-radius-full, 9999px)',
};

const borderRadius = Object.create(baseRadii, {
  'sarah-none': { value: 'var(--s-radius-none, 0px)', enumerable: true, writable: true, configurable: true },
  'sarah-xs': { value: 'var(--s-radius-xs, 4px)', enumerable: true, writable: true, configurable: true },
  'sarah-sm': { value: 'var(--s-radius-sm, 8px)', enumerable: true, writable: true, configurable: true },
  'sarah-md': { value: 'var(--s-radius-md, 12px)', enumerable: true, writable: true, configurable: true },
  'sarah-lg': { value: 'var(--s-radius-lg, 16px)', enumerable: true, writable: true, configurable: true },
  'sarah-xl': { value: 'var(--s-radius-xl, 20px)', enumerable: true, writable: true, configurable: true },
  'sarah-2xl': { value: 'var(--s-radius-2xl, 24px)', enumerable: true, writable: true, configurable: true },
  'sarah-3xl': { value: 'var(--s-radius-3xl, 32px)', enumerable: true, writable: true, configurable: true },
  'sarah-full': { value: 'var(--s-radius-full, 9999px)', enumerable: true, writable: true, configurable: true },
  'sarah-pill': { value: 'var(--s-radius-full, 9999px)', enumerable: true, writable: true, configurable: true },
});

const preset = {
  theme: {
    extend: {
      colors: {
        sarah: {
          canvas: 'var(--s-bg-canvas, #09090B)',
          surface: 'var(--s-bg-surface, #FFFFFF)',
          subtle: 'var(--s-bg-subtle, #F8F9FB)',
          muted: 'var(--s-bg-subtle, #F8F9FB)',
          border: 'var(--s-border-default, rgba(0, 0, 0, 0.08))',
          'border-strong': 'var(--s-border-strong, rgba(0, 0, 0, 0.16))',
          'border-focus': 'var(--s-border-focus, #5B3DF5)',
          brand: 'var(--s-brand-indigo, #5B3DF5)',
          'brand-hover': 'var(--s-action-primary-hover, #4A2DE0)',
          'brand-surface': 'var(--s-bg-brand, #F3F0FF)',
          'brand-indigo': 'var(--s-brand-indigo, #5B3DF5)',
          'brand-violet': 'var(--s-brand-violet, #A020FF)',
          'brand-blue': 'var(--s-brand-blue, #178BFF)',
          'brand-cyan': 'var(--s-brand-blue, #178BFF)',
          'brand-pink': 'var(--s-brand-violet, #A020FF)',
          'brand-rose': 'var(--s-status-danger-bg, #450A0A)',
          'brand-amber': 'var(--s-status-warning-bg, #451A03)',
          'brand-emerald': 'var(--s-status-success-bg, #052E16)',
          blue: 'var(--s-brand-blue, #178BFF)',
          cyan: 'var(--s-brand-blue, #178BFF)',
          purple: 'var(--s-brand-violet, #A020FF)',
          pink: 'var(--s-brand-violet, #A020FF)',
          amber: 'var(--s-status-warning-bg, #451A03)',
          emerald: 'var(--s-status-success-bg, #052E16)',
          'text-primary': 'var(--s-text-primary, #111827)',
          'text-secondary': 'var(--s-text-secondary, #4B5563)',
          'text-muted': 'var(--s-text-muted, #6B7280)',
          'text-inverse': 'var(--s-text-inverse, #FFFFFF)',
          'text-brand': 'var(--s-text-brand, #5B3DF5)',
          'text-link': 'var(--s-text-link, #0670E8)',
          'action-primary': 'var(--s-action-primary, #5B3DF5)',
          'action-primary-hover': 'var(--s-action-primary-hover, #4A2DE0)',
          'action-primary-pressed': 'var(--s-action-primary-pressed, #37248F)',
          'action-on-primary': 'var(--s-action-on-primary, #FFFFFF)',
          'action-danger': 'var(--s-action-danger, #DC2626)',
          'action-danger-hover': 'var(--s-action-danger-hover, #B91C1C)',
          'action-on-danger': 'var(--s-action-on-danger, #FFFFFF)',
          'status-success-bg': 'var(--s-status-success-bg, #052E16)',
          'status-success-text': 'var(--s-status-success-text, #BBF7D0)',
          'status-success-border': 'var(--s-status-success-border, #166534)',
          'status-warning-bg': 'var(--s-status-warning-bg, #451A03)',
          'status-warning-text': 'var(--s-status-warning-text, #FED7AA)',
          'status-warning-border': 'var(--s-status-warning-border, #9A3412)',
          'status-danger-bg': 'var(--s-status-danger-bg, #450A0A)',
          'status-danger-text': 'var(--s-status-danger-text, #FECACA)',
          'status-danger-border': 'var(--s-status-danger-border, #991B1B)',
          'status-info-bg': 'var(--s-status-info-bg, #0B2853)',
          'status-info-text': 'var(--s-status-info-text, #BDE2FF)',
          'status-info-border': 'var(--s-status-info-border, #1E40AF)',
        },
      },
      borderRadius,
      boxShadow: {
        's-subtle': 'var(--s-shadow-subtle, 0px 2px 4px 0px rgba(13, 16, 32, 0.06))',
        's-raised': 'var(--s-shadow-raised, 0px 8px 24px -8px rgba(13, 16, 32, 0.14))',
        's-overlay': 'var(--s-shadow-overlay, 0px 24px 64px -16px rgba(13, 16, 32, 0.22))',
        's-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        's-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      spacing: {
        's-2': 'var(--s-spacing-2, 2px)',
        's-4': 'var(--s-spacing-4, 4px)',
        's-8': 'var(--s-spacing-8, 8px)',
        's-12': 'var(--s-spacing-12, 12px)',
        's-16': 'var(--s-spacing-16, 16px)',
        's-20': 'var(--s-spacing-20, 20px)',
        's-24': 'var(--s-spacing-24, 24px)',
        's-32': 'var(--s-spacing-32, 32px)',
        's-40': 'var(--s-spacing-40, 40px)',
        's-48': 'var(--s-spacing-48, 48px)',
        's-64': 'var(--s-spacing-64, 64px)',
        's-80': 'var(--s-spacing-80, 80px)',
        's-96': 'var(--s-spacing-96, 96px)',
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
        beam: 's-animated-beam var(--duration, 2s) infinite',
        glare: 's-glare var(--duration, 650ms) ease',
        'terminal-blink': 's-terminal-blink 1s step-end infinite',
        ripple: 's-ripple var(--duration, 2s) cubic-bezier(0, 0.2, 0.8, 1) infinite',
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
        's-animated-beam': {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
        's-glare': {
          '0%': { opacity: '0', transform: 'translateX(-100%) rotate(var(--angle, 25deg))' },
          '50%': { opacity: 'var(--opacity, 0.35)' },
          '100%': { opacity: '0', transform: 'translateX(100%) rotate(var(--angle, 25deg))' },
        },
        's-terminal-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        's-ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
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

export default preset;
export { preset as sarahuiPreset, preset };
