import type { HomePageDTO } from '../types/HomePageDTO'

// Raw shape returned by HOME_PAGE_QUERY — permissive since Sanity fields are all optional until authored
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
  editorialCard1?: {
    imageUrl?: string
    eyebrow?: string
    headline: string
    body?: string
    ctaLabel?: string
    ctaUrl?: string
  } | null
  editorialCard2?: {
    imageUrl?: string
    eyebrow?: string
    headline: string
    body?: string
    ctaLabel?: string
    ctaUrl?: string
  } | null
  rewardsBanner?: {
    headline: string
    body?: string
    ctaLabel?: string
    ctaUrl?: string
    imageUrl?: string
  } | null
}

export function transformHomePage(raw: RawHomePage): HomePageDTO {
  return {
    banner: raw.banner,
    hero: {
      imageUrl: raw.hero?.imageUrl,
      imageAlt: raw.hero?.imageAlt,
      eyebrow: raw.hero?.eyebrow,
      headline: raw.hero?.headline,
      promotionalCopy: raw.hero?.promotionalCopy,
      callToAction: raw.hero?.callToAction,
      secondaryCta: raw.hero?.secondaryCta,
    },
    priceCallout: raw.priceCallout ?? undefined,
    quickLinksHeading: raw.quickLinksHeading ?? 'Quick Links',
    quickLinkTiles: (raw.quickLinkTiles ?? []).map((t) => ({
      label: t.label,
      imageUrl: t.imageUrl ?? '',
      href: t.href,
    })),
    editorialCard1: {
      imageUrl: raw.editorialCard1?.imageUrl,
      eyebrow: raw.editorialCard1?.eyebrow,
      headline: raw.editorialCard1?.headline ?? '',
      body: raw.editorialCard1?.body,
      ctaLabel: raw.editorialCard1?.ctaLabel,
      ctaUrl: raw.editorialCard1?.ctaUrl,
    },
    editorialCard2: {
      imageUrl: raw.editorialCard2?.imageUrl,
      eyebrow: raw.editorialCard2?.eyebrow,
      headline: raw.editorialCard2?.headline ?? '',
      body: raw.editorialCard2?.body,
      ctaLabel: raw.editorialCard2?.ctaLabel,
      ctaUrl: raw.editorialCard2?.ctaUrl,
    },
    rewardsBanner: {
      headline: raw.rewardsBanner?.headline ?? '',
      body: raw.rewardsBanner?.body,
      ctaLabel: raw.rewardsBanner?.ctaLabel,
      ctaUrl: raw.rewardsBanner?.ctaUrl,
      imageUrl: raw.rewardsBanner?.imageUrl,
    },
  }
}
