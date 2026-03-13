// Document types
import { bannerConfig }           from './documents/bannerConfig'
import { storeMessage }           from './documents/storeMessage'
import { weeklyAdBase }           from './documents/weeklyAdBase'
import { weeklyAdBannerOverride } from './documents/weeklyAdBannerOverride'
import { campaign }               from './documents/campaign'
import { featuredContent }        from './documents/featuredContent'

// Object types
import { weeklyAdItem }        from './objects/weeklyAdItem'
import { heroTile }            from './objects/heroTile'
import { promotionTile }       from './objects/promotionTile'
import { recipeTile }          from './objects/recipeTile'
import { categorySpotlight }   from './objects/categorySpotlight'

export const schemaTypes = [
  // Documents
  bannerConfig,
  storeMessage,
  weeklyAdBase,
  weeklyAdBannerOverride,
  campaign,
  featuredContent,

  // Objects (reusable within documents)
  weeklyAdItem,
  heroTile,
  promotionTile,
  recipeTile,
  categorySpotlight,
]
