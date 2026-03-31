import { z } from 'zod'

export const QuickLinkSchema = z.object({
  label:    z.string(),
  imageUrl: z.string().url(),
  href:     z.string().url(),
})

export type QuickLinkDTO = z.infer<typeof QuickLinkSchema>
