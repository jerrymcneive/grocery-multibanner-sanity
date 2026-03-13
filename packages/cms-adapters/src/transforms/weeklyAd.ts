import { WeeklyAdDTO, WeeklyAdSchema, WeeklyAdItemDTO } from '../types'

interface RawWeeklyAd {
  _id: string
  internalTitle: string
  weekOf: string
  validFrom: string
  validUntil: string
  items: RawWeeklyAdItem[]
  bannerOverride?: {
    heroImage?: { asset: { url: string } }
    heroHeadline?: string
    promotionalCopy?: string
  }
}

interface RawWeeklyAdItem {
  productName: string
  image: { asset: { url: string } }
  regularPrice: number
  salePrice?: number
  priceUnit?: string
  dealType?: string
  loyaltyExclusive: boolean
}

export function transformWeeklyAd(raw: RawWeeklyAd): WeeklyAdDTO {
  const items: WeeklyAdItemDTO[] = raw.items.map((item) => ({
    productName: item.productName,
    imageUrl: item.image.asset.url,
    regularPriceCents: item.regularPrice,
    salePriceCents: item.salePrice,
    priceUnit: item.priceUnit as any,
    dealType: item.dealType as any,
    loyaltyExclusive: item.loyaltyExclusive,
  }))

  const dto = {
    id: raw._id,
    internalTitle: raw.internalTitle,
    weekOf: raw.weekOf,
    validFrom: raw.validFrom,
    validUntil: raw.validUntil,
    items,
    heroImageUrl: raw.bannerOverride?.heroImage?.asset.url,
    heroHeadline: raw.bannerOverride?.heroHeadline,
    promotionalCopy: raw.bannerOverride?.promotionalCopy,
  }

  return WeeklyAdSchema.parse(dto)
}
