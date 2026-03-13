import type { BannerConfigDTO, WeeklyAdDTO, StoreMessageDTO } from '@grocery-multibanner/cms-adapters'
import type { Phase1Banner } from '@/lib/banner/bannerList'
import { festivalFoodsBannerConfig } from './festival-foods/bannerConfig'
import { festivalFoodsWeeklyAd } from './festival-foods/weeklyAd'
import { festivalFoodsStoreMessages } from './festival-foods/storeMessages'
import { hometownGrocersBannerConfig } from './hometown-grocers/bannerConfig'
import { hometownGrocersWeeklyAd } from './hometown-grocers/weeklyAd'
import { hometownGrocersStoreMessages } from './hometown-grocers/storeMessages'

export interface BannerFixtures {
  bannerConfig: BannerConfigDTO
  weeklyAd: WeeklyAdDTO
  storeMessages: StoreMessageDTO[]
}

const FIXTURES: Record<Phase1Banner, BannerFixtures> = {
  'festival-foods': {
    bannerConfig: festivalFoodsBannerConfig,
    weeklyAd: festivalFoodsWeeklyAd,
    storeMessages: festivalFoodsStoreMessages,
  },
  'hometown-grocers': {
    bannerConfig: hometownGrocersBannerConfig,
    weeklyAd: hometownGrocersWeeklyAd,
    storeMessages: hometownGrocersStoreMessages,
  },
}

export function getBannerFixtures(banner: Phase1Banner): BannerFixtures {
  return FIXTURES[banner]
}
