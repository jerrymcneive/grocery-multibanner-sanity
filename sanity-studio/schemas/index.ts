// Document types
import { bannerConfig }           from './documents/bannerConfig'
import { storeMessage }           from './documents/storeMessage'
import { weeklyAdBase }           from './documents/weeklyAdBase'
import { weeklyAdBannerOverride } from './documents/weeklyAdBannerOverride'
import { campaign }               from './documents/campaign'
import { featuredContent }        from './documents/featuredContent'
import { announcementStrip }      from './documents/announcementStrip'
import { infoTileRow }            from './documents/infoTileRow'
import { rewardsBanner }          from './documents/rewardsBanner'

// Object types
import { weeklyAdItem }        from './objects/weeklyAdItem'
import { heroTile }            from './objects/heroTile'
import { promotionTile }       from './objects/promotionTile'
import { recipeTile }          from './objects/recipeTile'
import { categorySpotlight }   from './objects/categorySpotlight'
import { categoryShortcut }    from './objects/categoryShortcut'
import { infoTile }            from './objects/infoTile'

export const schemaTypes = [
  // Documents
  bannerConfig,
  storeMessage,
  weeklyAdBase,
  weeklyAdBannerOverride,
  campaign,
  featuredContent,
  announcementStrip,
  infoTileRow,
  rewardsBanner,

  // Objects (reusable within documents)
  weeklyAdItem,
  heroTile,
  promotionTile,
  recipeTile,
  categorySpotlight,
  categoryShortcut,
  infoTile,
]
