export const HOME_PAGE_QUERY = `
  *[
    _type == "homePageOverride" &&
    banner == $banner &&
    !(_id in path("drafts.**"))
  ][0] {
    banner,
    "hero": heroWeeklyAdRef-> {
      "imageUrl": heroImage.asset->url,
      "imageAlt": heroImageAlt,
      "eyebrow": heroEyebrow,
      "headline": heroHeadline,
      "promotionalCopy": promotionalCopy,
      "callToAction": callToAction { label, url },
      "secondaryCta": secondaryCta { label, url },
    },
    "priceCallout": priceCallout {
      price,
      unit,
      productName,
      badge,
    },
    "quickLinksHeading": coalesce(quickLinksHeading, "Quick Links"),
    "quickLinkTiles": quickLinkTiles[] {
      "imageUrl": image.asset->url,
      label,
      "href": url,
    },
    "editorialCard1": editorialCard1 {
      "imageUrl": image.asset->url,
      eyebrow,
      headline,
      body,
      ctaLabel,
      "ctaUrl": ctaUrl,
    },
    "editorialCard2": editorialCard2 {
      "imageUrl": image.asset->url,
      eyebrow,
      headline,
      body,
      ctaLabel,
      "ctaUrl": ctaUrl,
    },
    "rewardsBanner": {
      "headline": spotlightHeadline,
      "body": spotlightBody,
      "ctaLabel": spotlightCtaLabel,
      "ctaUrl": spotlightCtaUrl,
      "imageUrl": spotlightImage.asset->url,
    },
  }
`
