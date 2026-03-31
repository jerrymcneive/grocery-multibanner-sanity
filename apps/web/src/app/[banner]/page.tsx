import { notFound } from 'next/navigation'
import { isValidBanner } from '@/lib/banner/bannerList'
import { getBannerFixtures } from '@/fixtures/index'
import { fetchHomePage } from '@/lib/sanity/fetchers'
import { AnnouncementStrip } from '@/components/AnnouncementStrip/AnnouncementStrip'
import { Hero } from '@/components/Hero/Hero'
import { CategoryShortcuts } from '@/components/CategoryShortcuts/CategoryShortcuts'
import { QuickLinksCarousel } from '@/components/QuickLinksCarousel/QuickLinksCarousel'
import { StoreMessages } from '@/components/StoreMessages/StoreMessages'
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

  const fixtures = getBannerFixtures(banner)
  const homePage = await fetchHomePage(banner)

  const hero = homePage?.hero ?? { headline: undefined }
  const priceCallout = homePage?.priceCallout
  const quickLinks = homePage?.quickLinkTiles ?? []
  const quickHeading = homePage?.quickLinksHeading ?? 'Quick Links'
  const editorialCard1 = homePage?.editorialCard1 ?? fixtures.editorialCards[0]
  const editorialCard2 = homePage?.editorialCard2 ?? fixtures.editorialCards[1]
  const rewardsBanner = homePage?.rewardsBanner ?? fixtures.rewardsPromo

  return (
    <>
      <AnnouncementStrip strip={fixtures.announcementStrip} />
      <Hero hero={hero} priceCallout={priceCallout} />
      <CategoryShortcuts shortcuts={fixtures.categoryShortcuts} />
      {fixtures.storeMessages.length > 0 && <StoreMessages messages={fixtures.storeMessages} />}
      <QuickLinksCarousel heading={quickHeading} tiles={quickLinks} />
      <EditorialCardGrid cards={[editorialCard1, editorialCard2]} />
      <RewardsBanner promo={rewardsBanner} />
      <InfoTileRow tiles={fixtures.infoTiles} />
      <HelpBar />
    </>
  )
}
