'use client'

import { useBanner } from '@/lib/banner/BannerContext'

export function SiteFooter() {
  const { config } = useBanner()

  return (
    <footer className="bg-primary text-primary-foreground px-4 py-6 text-center text-sm mt-auto">
      <p>&copy; {new Date().getFullYear()} {config.displayName}. All rights reserved.</p>
    </footer>
  )
}
