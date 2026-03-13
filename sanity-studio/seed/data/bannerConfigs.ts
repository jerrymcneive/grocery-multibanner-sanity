/**
 * Banner Configuration Singletons
 * Phase 1: Festival Foods + Hometown Grocers
 * Future: Schnucks (schema-ready, not active)
 */

export const bannerConfigs = [
  // ─────────────────────────────────────────────────────────────────
  // 🎪 FESTIVAL FOODS — Phase 1
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'banner-festival-foods',
    _type: 'bannerConfig',
    banner: 'festival-foods',
    displayName: 'Festival Foods',
    primaryColor: '#E31837',  // Festival red
    secondaryColor: '#FFD100', // Festival gold
    supportEmail: 'support@festfoods.com',
    tagline: 'We love our customers!',
    storeCount: 34,
    regions: ['Wisconsin', 'Minnesota', 'Illinois'],
  },

  // ─────────────────────────────────────────────────────────────────
  // 🏡 HOMETOWN GROCERS — Phase 1
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'banner-hometown-grocers',
    _type: 'bannerConfig',
    banner: 'hometown-grocers',
    displayName: 'Hometown Grocers',
    primaryColor: '#2E7D32',  // Hometown green
    secondaryColor: '#FFF8E1', // Cream
    supportEmail: 'hello@hometowngrocers.com',
    tagline: 'Your neighbors, your grocers',
    storeCount: 12,
    regions: ['Missouri', 'Kansas'],
  },

  // ─────────────────────────────────────────────────────────────────
  // 🛒 SCHNUCKS — Future Phase (schema-ready)
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'banner-schnucks',
    _type: 'bannerConfig',
    banner: 'schnucks',
    displayName: 'Schnucks',
    primaryColor: '#C8102E',  // Schnucks red
    secondaryColor: '#FFFFFF',
    supportEmail: 'support@schnucks.com',
    tagline: 'Friendliest stores in town',
    storeCount: 112,
    regions: ['Missouri', 'Illinois', 'Indiana', 'Wisconsin'],
    // Note: Deferred to future phase — config exists for schema validation
  },
]
