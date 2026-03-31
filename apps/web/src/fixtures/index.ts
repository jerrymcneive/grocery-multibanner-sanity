import type {
  BannerConfigDTO,
  WeeklyAdDTO,
  StoreMessageDTO,
  AnnouncementStripDTO,
  CategoryShortcutDTO,
  EditorialCardDTO,
  RewardsBannerDTO,
  InfoTileDTO,
} from '@grocery-multibanner/cms-adapters'
import type { Phase1Banner } from '@/lib/banner/bannerList'
import { festivalFoodsBannerConfig } from './festival-foods/bannerConfig'
import { festivalFoodsWeeklyAd } from './festival-foods/weeklyAd'
import { festivalFoodsStoreMessages } from './festival-foods/storeMessages'
import { festivalFoodsAnnouncementStrip } from './festival-foods/announcementStrip'
import { festivalFoodsCategoryShortcuts } from './festival-foods/categoryShortcuts'
import { festivalFoodsEditorialCards } from './festival-foods/editorialCards'
import { festivalFoodsRewardsPromo } from './festival-foods/rewardsPromo'
import { festivalFoodsInfoTiles } from './festival-foods/infoTiles'
import { hometownGrocersBannerConfig } from './hometown-grocers/bannerConfig'
import { hometownGrocersWeeklyAd } from './hometown-grocers/weeklyAd'
import { hometownGrocersStoreMessages } from './hometown-grocers/storeMessages'
import { hometownGrocersAnnouncementStrip } from './hometown-grocers/announcementStrip'
import { hometownGrocersCategoryShortcuts } from './hometown-grocers/categoryShortcuts'
import { hometownGrocersEditorialCards } from './hometown-grocers/editorialCards'
import { hometownGrocersRewardsPromo } from './hometown-grocers/rewardsPromo'
import { hometownGrocersInfoTiles } from './hometown-grocers/infoTiles'

export interface BannerFixtures {
  bannerConfig: BannerConfigDTO
  weeklyAd: WeeklyAdDTO
  storeMessages: StoreMessageDTO[]
  announcementStrip: AnnouncementStripDTO
  categoryShortcuts: CategoryShortcutDTO[]
  editorialCards: EditorialCardDTO[]
  rewardsPromo: RewardsBannerDTO
  infoTiles: InfoTileDTO[]
}

const FIXTURES: Record<Phase1Banner, BannerFixtures> = {
  'festival-foods': {
    bannerConfig: festivalFoodsBannerConfig,
    weeklyAd: festivalFoodsWeeklyAd,
    storeMessages: festivalFoodsStoreMessages,
    announcementStrip: festivalFoodsAnnouncementStrip,
    categoryShortcuts: festivalFoodsCategoryShortcuts,
    editorialCards: festivalFoodsEditorialCards,
    rewardsPromo: festivalFoodsRewardsPromo,
    infoTiles: festivalFoodsInfoTiles,
  },
  'hometown-grocers': {
    bannerConfig: hometownGrocersBannerConfig,
    weeklyAd: hometownGrocersWeeklyAd,
    storeMessages: hometownGrocersStoreMessages,
    announcementStrip: hometownGrocersAnnouncementStrip,
    categoryShortcuts: hometownGrocersCategoryShortcuts,
    editorialCards: hometownGrocersEditorialCards,
    rewardsPromo: hometownGrocersRewardsPromo,
    infoTiles: hometownGrocersInfoTiles,
  },
}

export function getBannerFixtures(banner: Phase1Banner): BannerFixtures {
  return FIXTURES[banner]
}
