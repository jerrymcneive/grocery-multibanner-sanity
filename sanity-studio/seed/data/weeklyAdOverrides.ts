/**
 * Weekly Ad Banner Overrides (Pattern B)
 * Banner-specific hero images, headlines, and promotional copy
 */

export const weeklyAdOverrides = [
  // ─────────────────────────────────────────────────────────────────
  // CURRENT WEEK — FESTIVAL FOODS OVERRIDE
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'override-current-festival',
    _type: 'weeklyAdBannerOverride',
    banner: 'festival-foods',
    weeklyAdBase: {
      _type: 'reference',
      _ref: 'weekly-ad-current',
    },
    heroHeadline: 'Spring Into Savings!',
    promotionalCopy: 'Wisconsin\'s freshest deals are here. Stock up on family favorites at prices you\'ll love. Valid Sunday through Saturday at all Festival Foods locations.',
    callToAction: 'Shop This Week\'s Deals',
    // Note: heroImage would be an asset reference in production
    // For seed data, we'll use a placeholder structure
    heroImageAlt: 'Festival Foods spring produce display',
    featuredCategories: ['produce', 'meat', 'dairy'],
    featuredItemOverrides: [
      {
        _key: 'override-1',
        originalItemKey: 'item-1',
        badgeText: 'Manager\'s Special',
        displayOrder: 1,
      },
      {
        _key: 'override-2',
        originalItemKey: 'item-2',
        badgeText: 'Local Favorite',
        displayOrder: 2,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // CURRENT WEEK — HOMETOWN GROCERS OVERRIDE
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'override-current-hometown',
    _type: 'weeklyAdBannerOverride',
    banner: 'hometown-grocers',
    weeklyAdBase: {
      _type: 'reference',
      _ref: 'weekly-ad-current',
    },
    heroHeadline: 'Neighbors Helping Neighbors Save',
    promotionalCopy: 'Great prices from your local grocer. We source from Missouri and Kansas farms whenever possible. These deals are our way of saying thanks for shopping local.',
    callToAction: 'See All Deals',
    heroImageAlt: 'Hometown Grocers friendly staff with fresh produce',
    featuredCategories: ['produce', 'deli', 'meat'],
    featuredItemOverrides: [
      {
        _key: 'override-1',
        originalItemKey: 'item-2',
        badgeText: 'Locally Sourced',
        displayOrder: 1,
      },
      {
        _key: 'override-2',
        originalItemKey: 'item-8',
        badgeText: 'Made In-Store',
        displayOrder: 2,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // NEXT WEEK — FESTIVAL FOODS OVERRIDE
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'override-next-festival',
    _type: 'weeklyAdBannerOverride',
    banner: 'festival-foods',
    weeklyAdBase: {
      _type: 'reference',
      _ref: 'weekly-ad-next',
    },
    heroHeadline: 'Hop Into Easter Savings!',
    promotionalCopy: 'Everything you need for the perfect Easter celebration. From spiral ham to fresh asparagus, we\'ve got your holiday table covered.',
    callToAction: 'Plan Your Easter Meal',
    heroImageAlt: 'Easter ham with spring vegetables',
    featuredCategories: ['meat', 'produce', 'bakery'],
    featuredItemOverrides: [
      {
        _key: 'override-1',
        originalItemKey: 'item-1',
        badgeText: 'Easter Favorite',
        displayOrder: 1,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // NEXT WEEK — HOMETOWN GROCERS OVERRIDE
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'override-next-hometown',
    _type: 'weeklyAdBannerOverride',
    banner: 'hometown-grocers',
    weeklyAdBase: {
      _type: 'reference',
      _ref: 'weekly-ad-next',
    },
    heroHeadline: 'A Hometown Easter',
    promotionalCopy: 'Gather around the table with family and friends. Our Easter specials make hosting easy and affordable. Pre-order your ham today!',
    callToAction: 'Pre-Order Ham',
    heroImageAlt: 'Family enjoying Easter dinner',
    featuredCategories: ['meat', 'deli', 'bakery'],
    featuredItemOverrides: [
      {
        _key: 'override-1',
        originalItemKey: 'item-1',
        badgeText: 'Pre-Order Available',
        displayOrder: 1,
      },
      {
        _key: 'override-2',
        originalItemKey: 'item-6',
        badgeText: 'Made Fresh',
        displayOrder: 2,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PREVIOUS WEEK — FESTIVAL FOODS OVERRIDE (for history)
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'override-previous-festival',
    _type: 'weeklyAdBannerOverride',
    banner: 'festival-foods',
    weeklyAdBase: {
      _type: 'reference',
      _ref: 'weekly-ad-previous',
    },
    heroHeadline: 'Game Day Deals!',
    promotionalCopy: 'Score big savings on all your March Madness party essentials. Wings, chips, drinks — we\'ve got you covered.',
    callToAction: 'Shop Party Supplies',
    heroImageAlt: 'Game day snacks spread',
    featuredCategories: ['snacks', 'beverages', 'meat'],
  },

  // ─────────────────────────────────────────────────────────────────
  // PREVIOUS WEEK — HOMETOWN GROCERS OVERRIDE (for history)
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'override-previous-hometown',
    _type: 'weeklyAdBannerOverride',
    banner: 'hometown-grocers',
    weeklyAdBase: {
      _type: 'reference',
      _ref: 'weekly-ad-previous',
    },
    heroHeadline: 'Watch Party Ready!',
    promotionalCopy: 'Host the best watch party on the block with these winning deals. Fresh wings, cold drinks, and all the fixings.',
    callToAction: 'Get Party Ready',
    heroImageAlt: 'Friends watching basketball with snacks',
    featuredCategories: ['meat', 'snacks', 'beverages'],
  },
]
