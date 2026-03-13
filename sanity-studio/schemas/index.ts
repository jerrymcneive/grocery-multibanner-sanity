// Document types
import { bannerConfig } from './documents/bannerConfig'
import { storeMessage } from './documents/storeMessage'
import { weeklyAdBase } from './documents/weeklyAdBase'
import { weeklyAdBannerOverride } from './documents/weeklyAdBannerOverride'

// Object types
import { weeklyAdItem } from './objects/weeklyAdItem'

export const schemaTypes = [
  // Documents
  bannerConfig,
  storeMessage,
  weeklyAdBase,
  weeklyAdBannerOverride,
  // Objects
  weeklyAdItem,
]
