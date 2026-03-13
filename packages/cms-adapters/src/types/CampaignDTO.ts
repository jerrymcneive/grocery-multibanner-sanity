import { z } from 'zod'

export const CampaignSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  banners: z.array(z.string()),
  heroImageUrl: z.string().url().optional(),
  headline: z.string(),
  body: z.unknown().optional(),
  rewardPointMultiplier: z.number().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  linkedProducts: z.array(z.string()).optional(),
})

export type CampaignDTO = z.infer<typeof CampaignSchema>
