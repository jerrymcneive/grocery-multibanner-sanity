export const BANNER_CONFIG_QUERY = `
  *[
    _type == "bannerConfig" &&
    banner == $banner &&
    !(_id in path("drafts.**"))
  ][0] {
    _id,
    banner,
    displayName,
    tagline,
    primaryColor,
    secondaryColor,
    logoLight { asset->{ url } },
    logoDark { asset->{ url } },
    supportEmail
  }
`
