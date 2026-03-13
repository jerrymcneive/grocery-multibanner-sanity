'use client'

import { createContext, useContext } from 'react'
import type { BannerConfigDTO } from '@grocery-multibanner/cms-adapters'

interface BannerContextValue {
  config: BannerConfigDTO
}

export const BannerContext = createContext<BannerContextValue | null>(null)

export function useBanner(): BannerContextValue {
  const ctx = useContext(BannerContext)
  if (!ctx) throw new Error('useBanner must be used within BannerProvider')
  return ctx
}
