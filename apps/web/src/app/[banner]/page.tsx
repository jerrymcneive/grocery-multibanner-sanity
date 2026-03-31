import { notFound } from 'next/navigation'
import { isValidBanner } from '@/lib/banner/bannerList'
import { getBannerFixtures } from '@/fixtures/index'
import { AnnouncementStrip } from '@/components/AnnouncementStrip/AnnouncementStrip'
import { Hero } from '@/components/Hero/Hero'
import { CategoryShortcuts } from '@/components/CategoryShortcuts/CategoryShortcuts'
import { EditorialCardGrid } from '@/components/EditorialCardGrid/EditorialCardGrid'
import { RewardsBanner } from '@/components/RewardsBanner/RewardsBanner'
import { InfoTileRow } from '@/components/InfoTileRow/InfoTileRow'
import { HelpBar } from '@/components/layout/HelpBar'

interface BannerPageProps {
  params: { banner: string }
}

export default async function BannerPage({ params }: BannerPageProps) {
  const { banner } = params

  if (!isValidBanner(banner)) {
    notFound()
  }

  const {
    weeklyAd,
    announcementStrip,
    categoryShortcuts,
    editorialCards,
    rewardsPromo,
    infoTiles,
  } = getBannerFixtures(banner)

  return (
    <>
      <AnnouncementStrip strip={announcementStrip} />
      <Hero weeklyAd={weeklyAd} />
      <CategoryShortcuts shortcuts={categoryShortcuts} />
      <EditorialCardGrid cards={editorialCards} />
      <RewardsBanner promo={rewardsPromo} />
      <InfoTileRow tiles={infoTiles} />
      <HelpBar />
    </>
  )
}
