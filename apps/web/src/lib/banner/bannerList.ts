// Phase 1 only — Schnucks is intentionally excluded from valid routes
export type Phase1Banner = 'festival-foods' | 'hometown-grocers'

export const VALID_BANNERS: Phase1Banner[] = ['festival-foods', 'hometown-grocers']

export function isValidBanner(slug: string): slug is Phase1Banner {
  return VALID_BANNERS.includes(slug as Phase1Banner)
}
