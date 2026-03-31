import {
  ACTIVE_CAMPAIGNS_QUERY,
  HOME_PAGE_QUERY,
  transformCampaigns,
  transformHomePage,
} from '@grocery-multibanner/cms-adapters'
import type { CampaignDTO, HomePageDTO } from '@grocery-multibanner/cms-adapters'
import { sanityClient } from './client'

function now(): string {
  return new Date().toISOString()
}

export async function fetchActiveCampaigns(banner: string): Promise<CampaignDTO[]> {
  try {
    const raw = await sanityClient.fetch(ACTIVE_CAMPAIGNS_QUERY, { banner, now: now() })
    return transformCampaigns(raw ?? [])
  } catch (err) {
    console.error('[fetchActiveCampaigns] fetch failed:', err)
    return []
  }
}

export async function fetchHomePage(banner: string): Promise<HomePageDTO | null> {
  try {
    const raw = await sanityClient.fetch(HOME_PAGE_QUERY, { banner })
    if (!raw) return null
    return transformHomePage(raw)
  } catch (err) {
    console.error('[fetchHomePage] fetch failed:', err)
    return null
  }
}
