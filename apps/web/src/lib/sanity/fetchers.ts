import {
  BANNER_CONFIG_QUERY,
  CURRENT_WEEKLY_AD_QUERY,
  STORE_MESSAGES_QUERY,
  transformBannerConfig,
  transformWeeklyAd,
  transformStoreMessages,
} from '@grocery-multibanner/cms-adapters'
import type {
  BannerConfigDTO,
  WeeklyAdDTO,
  StoreMessageDTO,
} from '@grocery-multibanner/cms-adapters'
import { sanityClient } from './client'

function now(): string {
  return new Date().toISOString()
}

export async function fetchBannerConfig(banner: string): Promise<BannerConfigDTO | null> {
  const raw = await sanityClient.fetch(BANNER_CONFIG_QUERY, { banner })
  if (!raw) return null
  try {
    return transformBannerConfig(raw)
  } catch {
    console.error(`[fetchBannerConfig] Invalid bannerConfig document for banner "${banner}"`)
    return null
  }
}

export async function fetchWeeklyAd(banner: string): Promise<WeeklyAdDTO | null> {
  const raw = await sanityClient.fetch(CURRENT_WEEKLY_AD_QUERY, { banner, now: now() })
  if (!raw) return null
  return transformWeeklyAd(raw)
}

export async function fetchStoreMessages(banner: string): Promise<StoreMessageDTO[]> {
  const raw = await sanityClient.fetch(STORE_MESSAGES_QUERY, { banner, now: now() })
  return transformStoreMessages(raw ?? [])
}
