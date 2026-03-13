import { z } from 'zod'

export const WeeklyAdItemSchema = z.object({
  productName: z.string(),
  imageUrl: z.string().url(),
  regularPriceCents: z.number().int().positive(),
  salePriceCents: z.number().int().positive().optional(),
  priceUnit: z.enum(['lb', 'ea', 'oz', 'pk']).optional(),
  dealType: z.enum(['sale', 'bogo', 'coupon', 'points', 'mix-match']).optional(),
  loyaltyExclusive: z.boolean(),
})

export const WeeklyAdSchema = z.object({
  id: z.string(),
  internalTitle: z.string(),
  weekOf: z.string(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  items: z.array(WeeklyAdItemSchema),
  // Banner override fields (merged at query time)
  heroImageUrl: z.string().url().optional(),
  heroHeadline: z.string().optional(),
  promotionalCopy: z.string().optional(),
})

export type WeeklyAdItemDTO = z.infer<typeof WeeklyAdItemSchema>
export type WeeklyAdDTO = z.infer<typeof WeeklyAdSchema>
