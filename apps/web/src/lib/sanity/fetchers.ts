import {
  ACTIVE_CAMPAIGNS_QUERY,
  transformCampaigns,
} from '@grocery-multibanner/cms-adapters'
import type { CampaignDTO } from '@grocery-multibanner/cms-adapters'
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
