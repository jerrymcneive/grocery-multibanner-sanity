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

  // Fixtures supply out-of-scope sections (announcement, category shortcuts, info tiles, store messages)
  const { announcementStrip, categoryShortcuts, storeMessages, infoTiles } = getBannerFixtures(banner)

  // Live Sanity data for the five homepage sections
  const homePage = await fetchHomePage(banner)

  // Fixture fallback for editorial cards and rewards promo when Sanity returns null
  const { editorialCards, rewardsPromo } = getBannerFixtures(banner)

  const hero           = homePage?.hero           ?? { headline: undefined }
  const priceCallout   = homePage?.priceCallout
  const quickLinks     = homePage?.quickLinkTiles  ?? []
  const quickHeading   = homePage?.quickLinksHeading ?? 'Quick Links'
  const editorialCard1 = homePage?.editorialCard1  ?? editorialCards[0]
  const editorialCard2 = homePage?.editorialCard2  ?? editorialCards[1]
  const rewardsBanner  = homePage?.rewardsBanner   ?? rewardsPromo

  return (
    <>
      <AnnouncementStrip strip={announcementStrip} />
      <Hero hero={hero} priceCallout={priceCallout} />
      <CategoryShortcuts shortcuts={categoryShortcuts} />
      {storeMessages.length > 0 && <StoreMessages messages={storeMessages} />}
      <QuickLinksCarousel heading={quickHeading} tiles={quickLinks} />
      <EditorialCardGrid cards={[editorialCard1, editorialCard2]} />
      <RewardsBanner promo={rewardsBanner} />
      <InfoTileRow tiles={infoTiles} />
      <HelpBar />
    </>
  )
}
