import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'
import { getBannerTokens, tokensToCssVars } from '@grocery-multibanner/theme-tokens'
import { isValidBanner } from '@/lib/banner/bannerList'
import { getBannerFixtures } from '@/fixtures/index'
import { BannerProvider } from '@/lib/banner/BannerProvider'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

interface BannerLayoutProps {
  children: React.ReactNode
  params: { banner: string }
}

export default function BannerLayout({ children, params }: BannerLayoutProps) {
  const { banner } = params

  if (!isValidBanner(banner)) {
    notFound()
  }

  const tokens = getBannerTokens(banner)
  const cssVars = tokensToCssVars(tokens) as CSSProperties
  const { bannerConfig } = getBannerFixtures(banner)

  return (
    <div style={cssVars} className="min-h-screen flex flex-col bg-background text-foreground">
      <BannerProvider config={bannerConfig}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </BannerProvider>
    </div>
  )
}
