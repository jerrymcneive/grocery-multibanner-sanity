export const ACTIVE_CAMPAIGNS_QUERY = `
  *[
    _type == "campaign" &&
    $banner in banners[] &&
    dateTime(startDate) <= dateTime($now) &&
    dateTime(endDate) >= dateTime($now) &&
    !(_id in path("drafts.**"))
  ] | order(startDate desc) {
    _id,
    title,
    slug,
    banners,
    heroImage { asset->{ url } },
    headline,
    body,
    rewardPointMultiplier,
    startDate,
    endDate,
    linkedProducts
  }
`
