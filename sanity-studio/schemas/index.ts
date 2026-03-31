// Document types
import { bannerConfig }           from './documents/bannerConfig'
import { storeMessage }           from './documents/storeMessage'
import { weeklyAdBase }           from './documents/weeklyAdBase'
import { weeklyAdBannerOverride } from './documents/weeklyAdBannerOverride'
import { campaign }               from './documents/campaign'
import { infoTileRow }            from './documents/infoTileRow'
import { alertBanner }            from './documents/alertBanner'
import { homePageOverride }       from './documents/homePageOverride'

// Object types
import { weeklyAdItem }    from './objects/weeklyAdItem'
import { categoryShortcut } from './objects/categoryShortcut'
import { infoTile }        from './objects/infoTile'
import { editorialCard }   from './objects/editorialCard'

export const schemaTypes = [
  // Documents
  bannerConfig,
  storeMessage,
  weeklyAdBase,
  weeklyAdBannerOverride,
  campaign,
  infoTileRow,
  alertBanner,
  homePageOverride,

  // Objects (reusable within documents)
  weeklyAdItem,
  categoryShortcut,
  infoTile,
  editorialCard,
]
