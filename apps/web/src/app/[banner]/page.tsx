import { fetchWeeklyAd, fetchStoreMessages } from '@/lib/sanity/fetchers'
import { Hero } from '@/components/Hero/Hero'
import { StoreMessages } from '@/components/StoreMessages/StoreMessages'
import { WeeklyAdGrid } from '@/components/WeeklyAd/WeeklyAdGrid'

interface BannerPageProps {
  params: { banner: string }
}

export default async function BannerPage({ params }: BannerPageProps) {
  const { banner } = params

  const [weeklyAd, storeMessages] = await Promise.all([
    fetchWeeklyAd(banner),
    fetchStoreMessages(banner),
  ])

  return (
    <>
      {weeklyAd && <Hero weeklyAd={weeklyAd} />}
      <StoreMessages messages={storeMessages} />
      {weeklyAd && <WeeklyAdGrid weeklyAd={weeklyAd} />}
    </>
  )
}
