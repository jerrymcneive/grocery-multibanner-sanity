import { BannerConfigDTO, BannerConfigSchema } from '../types'

interface RawBannerConfig {
  _id: string
  banner: string
  displayName: string
  tagline?: string
  primaryColor: string
  secondaryColor?: string
  logoLight?: { asset: { url: string } }
  logoDark?: { asset: { url: string } }
  supportEmail?: string
}

export function transformBannerConfig(raw: RawBannerConfig): BannerConfigDTO {
  return BannerConfigSchema.parse({
    banner: raw.banner,
    displayName: raw.displayName,
    tagline: raw.tagline,
    primaryColor: raw.primaryColor,
    secondaryColor: raw.secondaryColor,
    logoLightUrl: raw.logoLight?.asset?.url,
    logoDarkUrl: raw.logoDark?.asset?.url,
    supportEmail: raw.supportEmail,
  })
}
