export const CURRENT_WEEKLY_AD_QUERY = `
  *[
    _type == "weeklyAdBase" &&
    validFrom <= $now &&
    validUntil >= $now &&
    !(_id in path("drafts.**"))
  ][0] {
    _id,
    internalTitle,
    weekOf,
    validFrom,
    validUntil,
    items[] {
      productName,
      image { asset->{ url } },
      regularPrice,
      salePrice,
      priceUnit,
      dealType,
      loyaltyExclusive
    },
    "bannerOverride": *[
      _type == "weeklyAdBannerOverride" &&
      references(^._id) &&
      banner == $banner &&
      !(_id in path("drafts.**"))
    ][0] {
      heroImage { asset->{ url } },
      heroHeadline,
      promotionalCopy
    }
  }
`
