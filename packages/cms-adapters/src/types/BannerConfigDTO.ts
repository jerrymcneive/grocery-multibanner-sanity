import { z } from 'zod'

export const BannerConfigSchema = z.object({
  banner: z.enum(['festival-foods', 'hometown-grocers', 'schnucks']),
  displayName: z.string(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  logoLightUrl: z.string().url().optional(),
  logoDarkUrl: z.string().url().optional(),
  supportEmail: z.string().email().optional(),
})

export type BannerConfigDTO = z.infer<typeof BannerConfigSchema>
