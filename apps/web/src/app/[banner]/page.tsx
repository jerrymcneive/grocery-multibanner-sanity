import { notFound } from 'next/navigation'
import { isValidBanner } from '@/lib/banner/bannerList'
import { getBannerFixtures } from '@/fixtures/index'
import { Hero } from '@/components/Hero/Hero'
import { StoreMessages } from '@/components/StoreMessages/StoreMessages'
import { WeeklyAdGrid } from '@/components/WeeklyAd/WeeklyAdGrid'

interface BannerPageProps {
  params: { banner: string }
}

export default function BannerPage({ params }: BannerPageProps) {
  const { banner } = params

  if (!isValidBanner(banner)) {
    notFound()
  }

  const { weeklyAd, storeMessages } = getBannerFixtures(banner)

  return (
    <>
      <Hero weeklyAd={weeklyAd} />
      <StoreMessages messages={storeMessages} />
      <WeeklyAdGrid weeklyAd={weeklyAd} />
    </>
  )
}
