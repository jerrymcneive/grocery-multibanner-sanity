'use client'

import { useBanner } from '@/lib/banner/BannerContext'

export function SiteHeader() {
  const { config } = useBanner()

  return (
    <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
      <span className="text-xl font-bold font-brand">{config.displayName}</span>
    </header>
  )
}
