import { StoreMessageDTO, StoreMessageSchema } from '../types'

interface RawStoreMessage {
  _id: string
  title: string
  body: string
  messageType: string
  activeFrom: string
  activeUntil: string
}

export function transformStoreMessage(raw: RawStoreMessage): StoreMessageDTO {
  const dto = {
    id: raw._id,
    title: raw.title,
    body: raw.body,
    messageType: raw.messageType,
    activeFrom: raw.activeFrom,
    activeUntil: raw.activeUntil,
  }

  return StoreMessageSchema.parse(dto)
}

export function transformStoreMessages(raw: RawStoreMessage[]): StoreMessageDTO[] {
  return raw.map(transformStoreMessage)
}
