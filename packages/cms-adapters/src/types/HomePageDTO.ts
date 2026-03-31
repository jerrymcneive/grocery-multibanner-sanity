import type { EditorialCardDTO } from './EditorialCardDTO'
import type { QuickLinkDTO } from './QuickLinkDTO'
import type { RewardsBannerDTO } from './RewardsBannerDTO'

export interface HeroDTO {
  imageUrl?: string
  imageAlt?: string
  eyebrow?: string
  headline?: string
  promotionalCopy?: string
  callToAction?: { label: string; url: string }
  secondaryCta?: { label: string; url: string }
}

export interface PriceCalloutDTO {
  price: string
  unit: string
  productName: string
  badge?: string
}

export interface HomePageDTO {
  banner: string
  hero: HeroDTO
  priceCallout?: PriceCalloutDTO
  quickLinksHeading: string
  quickLinkTiles: QuickLinkDTO[]
  editorialCard1: EditorialCardDTO
  editorialCard2: EditorialCardDTO
  rewardsBanner: RewardsBannerDTO
}
