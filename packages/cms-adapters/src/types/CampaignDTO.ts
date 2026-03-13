import { z } from 'zod'

export const CampaignSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  campaignType: z.enum(['standard', 'hero', 'loyalty-exclusive']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  heroImageUrl: z.string().url().optional(),
})

export type CampaignDTO = z.infer<typeof CampaignSchema>
