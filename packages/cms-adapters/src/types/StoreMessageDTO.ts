import { z } from 'zod'

export const StoreMessageSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  messageType: z.enum(['closure', 'hours', 'event', 'notice']),
  activeFrom: z.string().datetime(),
  activeUntil: z.string().datetime(),
})

export type StoreMessageDTO = z.infer<typeof StoreMessageSchema>
