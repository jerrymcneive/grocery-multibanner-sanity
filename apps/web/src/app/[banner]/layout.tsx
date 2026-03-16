import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'
import { getBannerTokens, tokensToCssVars } from '@grocery-multibanner/theme-tokens'
import { isValidBanner } from '@/lib/banner/bannerList'
import { fetchBannerConfig } from '@/lib/sanity/fetchers'
import { BannerProvider } from '@/lib/banner/BannerProvider'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

// Banner config changes infrequently — revalidate hourly
export const revalidate = 3600

interface BannerLayoutProps {
  children: React.ReactNode
  params: { banner: string }
}

export default async function BannerLayout({ children, params }: BannerLayoutProps) {
  const { banner } = params

  if (!isValidBanner(banner)) {
    notFound()
  }

  const tokens = getBannerTokens(banner)
  const cssVars = tokensToCssVars(tokens) as CSSProperties
  const bannerConfig = await fetchBannerConfig(banner)

  if (!bannerConfig) {
    notFound()
  }

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
