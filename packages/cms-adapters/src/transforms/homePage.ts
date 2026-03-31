import type { EditorialCardDTO } from '../types/EditorialCardDTO'
import type { HomePageDTO } from '../types/HomePageDTO'

interface RawEditorialCard {
  imageUrl?: string
  eyebrow?: string
  headline: string
  body?: string
  ctaLabel?: string
  ctaUrl?: string
}

interface RawHomePage {
  banner: string
  hero?: {
    imageUrl?: string
    imageAlt?: string
    eyebrow?: string
    headline?: string
    promotionalCopy?: string
    callToAction?: { label: string; url: string }
    secondaryCta?: { label: string; url: string }
  } | null
  priceCallout?: {
    price: string
    unit: string
    productName: string
    badge?: string
  } | null
  quickLinksHeading?: string
  quickLinkTiles?: Array<{ imageUrl?: string; label: string; href: string }>
  editorialCard1?: RawEditorialCard | null
  editorialCard2?: RawEditorialCard | null
  rewardsBanner?: {
    headline: string
    body?: string
    ctaLabel?: string
    ctaUrl?: string
    imageUrl?: string
  } | null
}

function toEditorialCard(raw: RawEditorialCard | null | undefined): EditorialCardDTO {
  return {
    imageUrl: raw?.imageUrl,
    eyebrow: raw?.eyebrow,
    headline: raw?.headline ?? '',
    body: raw?.body,
    ctaLabel: raw?.ctaLabel,
    ctaUrl: raw?.ctaUrl,
  }
}

export function transformHomePage(raw: RawHomePage): HomePageDTO {
  return {
    banner: raw.banner,
    hero: raw.hero ?? {},
    priceCallout: raw.priceCallout ?? undefined,
    quickLinksHeading: raw.quickLinksHeading ?? 'Quick Links',
    quickLinkTiles: (raw.quickLinkTiles ?? []).map((t) => ({
      label: t.label,
      imageUrl: t.imageUrl ?? '',
      href: t.href,
    })),
    editorialCard1: toEditorialCard(raw.editorialCard1),
    editorialCard2: toEditorialCard(raw.editorialCard2),
    rewardsBanner: {
      headline: raw.rewardsBanner?.headline ?? '',
      body: raw.rewardsBanner?.body,
      ctaLabel: raw.rewardsBanner?.ctaLabel,
      ctaUrl: raw.rewardsBanner?.ctaUrl,
      imageUrl: raw.rewardsBanner?.imageUrl,
    },
  }
}
