/**
 * Spread into apps/web/tailwind.config.ts theme.extend.
 * Each value references a CSS custom property — zero brand values hardcoded here.
 */
export const tailwindThemeExtension = {
  colors: {
    primary: {
      DEFAULT: 'var(--color-primary)',
      foreground: 'var(--color-primary-foreground)',
    },
    secondary: {
      DEFAULT: 'var(--color-secondary)',
      foreground: 'var(--color-secondary-foreground)',
    },
    accent: {
      DEFAULT: 'var(--color-accent)',
      foreground: 'var(--color-accent-foreground)',
    },
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    text: {
      muted: 'var(--color-text-muted)',
    },
  },
  fontFamily: {
    brand: 'var(--font-family)',
  },
  borderRadius: {
    card: 'var(--radius-card)',
    button: 'var(--radius-button)',
  },
  minHeight: {
    hero: 'var(--hero-min-height)',
  },
}
