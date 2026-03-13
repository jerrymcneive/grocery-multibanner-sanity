import type { BannerTokens } from '../types'
import { festivalFoodsTokens } from './festival-foods'
import { hometownGrocersTokens } from './hometown-grocers'

type Phase1Banner = 'festival-foods' | 'hometown-grocers'

const TOKEN_MAP: Record<Phase1Banner, BannerTokens> = {
  'festival-foods': festivalFoodsTokens,
  'hometown-grocers': hometownGrocersTokens,
}

export function getBannerTokens(banner: Phase1Banner): BannerTokens {
  return TOKEN_MAP[banner]
}
