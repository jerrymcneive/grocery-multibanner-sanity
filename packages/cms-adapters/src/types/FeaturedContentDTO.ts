import { z } from 'zod'

export const FeaturedContentSchema = z.object({
  id: z.string(),
  banner: z.enum(['festival-foods', 'hometown-grocers', 'schnucks']),
  blocks: z.array(z.unknown()),
})

export type FeaturedContentDTO = z.infer<typeof FeaturedContentSchema>
