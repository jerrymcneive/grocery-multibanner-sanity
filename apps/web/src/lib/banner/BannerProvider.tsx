'use client'

import type { ReactNode } from 'react'
import type { BannerConfigDTO } from '@grocery-multibanner/cms-adapters'
import { BannerContext } from './BannerContext'

interface BannerProviderProps {
  config: BannerConfigDTO
  children: ReactNode
}

export function BannerProvider({ config, children }: BannerProviderProps) {
  return (
    <BannerContext.Provider value={{ config }}>
      {children}
    </BannerContext.Provider>
  )
}
