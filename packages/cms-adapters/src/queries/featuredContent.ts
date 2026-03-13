export const FEATURED_CONTENT_QUERY = `
  *[
    _type == "featuredContent" &&
    banner == $banner &&
    !(_id in path("drafts.**"))
  ][0] {
    _id,
    banner,
    blocks[] {
      _type,
      _key,
      ...
    }
  }
`
