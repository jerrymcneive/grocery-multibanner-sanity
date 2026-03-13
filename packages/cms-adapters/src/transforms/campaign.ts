import { CampaignDTO, CampaignSchema } from '../types'

interface RawCampaign {
  _id: string
  title: string
  slug: { current: string }
  banners: string[]
  heroImage?: { asset: { url: string } }
  headline: string
  body?: unknown
  rewardPointMultiplier?: number
  startDate: string
  endDate: string
  linkedProducts?: string[]
}

export function transformCampaign(raw: RawCampaign): CampaignDTO {
  return CampaignSchema.parse({
    id: raw._id,
    title: raw.title,
    slug: raw.slug.current,
    banners: raw.banners,
    heroImageUrl: raw.heroImage?.asset?.url,
    headline: raw.headline,
    body: raw.body,
    rewardPointMultiplier: raw.rewardPointMultiplier,
    startDate: raw.startDate,
    endDate: raw.endDate,
    linkedProducts: raw.linkedProducts ?? [],
  })
}

export function transformCampaigns(raw: RawCampaign[]): CampaignDTO[] {
  return raw.map(transformCampaign)
}
