import type { BannerTokens } from './types'

/**
 * Converts camelCase token keys to --kebab-case CSS custom properties.
 * colorPrimary → --color-primary
 */
export function tokensToCssVars(tokens: BannerTokens): Record<string, string> {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [
      '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase(),
      value,
    ])
  )
}
