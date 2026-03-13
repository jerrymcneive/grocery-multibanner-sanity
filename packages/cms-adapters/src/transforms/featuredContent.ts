import { FeaturedContentDTO, FeaturedContentSchema } from '../types'

interface RawFeaturedContent {
  _id: string
  banner: string
  blocks?: unknown[]
}

export function transformFeaturedContent(raw: RawFeaturedContent): FeaturedContentDTO {
  return FeaturedContentSchema.parse({
    id: raw._id,
    banner: raw.banner,
    blocks: raw.blocks ?? [],
  })
}
