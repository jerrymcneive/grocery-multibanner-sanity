export const STORE_MESSAGES_QUERY = `
  *[
    _type == "storeMessage" &&
    $banner in banners &&
    activeFrom <= $now &&
    activeUntil >= $now &&
    !(_id in path("drafts.**"))
  ] | order(activeFrom desc) {
    _id,
    title,
    body,
    messageType,
    activeFrom,
    activeUntil
  }
`
