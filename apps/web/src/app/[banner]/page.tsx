import { notFound } from 'next/navigation'
import { isValidBanner } from '@/lib/banner/bannerList'
import { getBannerFixtures } from '@/fixtures/index'
import { fetchActiveCampaigns } from '@/lib/sanity/fetchers'
import { Hero } from '@/components/Hero/Hero'
import { StoreMessages } from '@/components/StoreMessages/StoreMessages'
import { WeeklyAdGrid } from '@/components/WeeklyAd/WeeklyAdGrid'
import { CampaignCarousel } from '@/components/Campaigns/CampaignCarousel'

interface BannerPageProps {
  params: { banner: string }
}

export default async function BannerPage({ params }: BannerPageProps) {
  const { banner } = params

  if (!isValidBanner(banner)) {
    notFound()
  }

  const { weeklyAd, storeMessages } = getBannerFixtures(banner)
  const campaigns = await fetchActiveCampaigns(banner)

  return (
    <>
      <Hero weeklyAd={weeklyAd} />
      <CampaignCarousel campaigns={campaigns} />
      <StoreMessages messages={storeMessages} />
      <WeeklyAdGrid weeklyAd={weeklyAd} />
    </>
  )
}
