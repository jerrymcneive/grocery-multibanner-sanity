/**
 * Weekly Ads — Base Documents (Pattern B)
 * Shared structure, banner-specific overrides applied separately
 */

const now = new Date()
const daysFromNow = (days: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

// Calculate week boundaries (Sunday to Saturday)
const getWeekOf = (weeksFromNow: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() + (weeksFromNow * 7))
  // Adjust to Sunday
  d.setDate(d.getDate() - d.getDay())
  return d.toISOString().split('T')[0]
}

export const weeklyAds = [
  // ─────────────────────────────────────────────────────────────────
  // CURRENT WEEK AD
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'weekly-ad-current',
    _type: 'weeklyAdBase',
    internalTitle: 'Spring Savings Week',
    weekOf: getWeekOf(0),
    validFrom: daysFromNow(-3),
    validUntil: daysFromNow(4),
    items: [
      {
        _key: 'item-1',
        productName: 'Boneless Skinless Chicken Breast',
        regularPrice: 699, // $6.99/lb
        salePrice: 399,    // $3.99/lb
        priceUnit: 'lb',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'meat',
        description: 'Family pack, 3 lbs or more',
      },
      {
        _key: 'item-2',
        productName: 'Fresh Strawberries',
        regularPrice: 499, // $4.99
        salePrice: 299,    // $2.99
        priceUnit: 'ea',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'produce',
        description: '1 lb container',
      },
      {
        _key: 'item-3',
        productName: 'Coca-Cola or Pepsi 12-Pack',
        regularPrice: 799,
        salePrice: 399,
        priceUnit: 'ea',
        dealType: 'bogo',
        loyaltyExclusive: false,
        category: 'beverages',
        description: 'Buy one, get one free. Select varieties.',
      },
      {
        _key: 'item-4',
        productName: 'Large Eggs',
        regularPrice: 399,
        salePrice: 249,
        priceUnit: 'ea',
        dealType: 'coupon',
        loyaltyExclusive: true,
        category: 'dairy',
        description: 'Dozen, digital coupon required',
      },
      {
        _key: 'item-5',
        productName: 'Ground Beef 80/20',
        regularPrice: 599,
        salePrice: 449,
        priceUnit: 'lb',
        dealType: 'points',
        loyaltyExclusive: true,
        category: 'meat',
        description: 'Earn 3X points on all ground beef',
      },
      {
        _key: 'item-6',
        productName: 'Avocados',
        regularPrice: 199,
        salePrice: 99,
        priceUnit: 'ea',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'produce',
        description: 'Hass avocados, ripe and ready',
      },
      {
        _key: 'item-7',
        productName: 'Tillamook Ice Cream',
        regularPrice: 699,
        salePrice: 499,
        priceUnit: 'ea',
        dealType: 'mix-match',
        loyaltyExclusive: false,
        category: 'frozen',
        description: '1.5 qt, mix & match 2 for $9',
      },
      {
        _key: 'item-8',
        productName: 'Whole Rotisserie Chicken',
        regularPrice: 899,
        salePrice: 699,
        priceUnit: 'ea',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'deli',
        description: 'Hot & ready, seasoned to perfection',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // NEXT WEEK AD
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'weekly-ad-next',
    _type: 'weeklyAdBase',
    internalTitle: 'Easter Week Specials',
    weekOf: getWeekOf(1),
    validFrom: daysFromNow(4),
    validUntil: daysFromNow(11),
    items: [
      {
        _key: 'item-1',
        productName: 'Spiral Sliced Ham',
        regularPrice: 349, // $3.49/lb
        salePrice: 199,    // $1.99/lb
        priceUnit: 'lb',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'meat',
        description: 'Bone-in, honey glazed',
      },
      {
        _key: 'item-2',
        productName: 'Asparagus',
        regularPrice: 399,
        salePrice: 249,
        priceUnit: 'lb',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'produce',
        description: 'Fresh, tender spears',
      },
      {
        _key: 'item-3',
        productName: 'Kerrygold Butter',
        regularPrice: 599,
        salePrice: 449,
        priceUnit: 'ea',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'dairy',
        description: '8 oz, salted or unsalted',
      },
      {
        _key: 'item-4',
        productName: 'Rhodes Frozen Rolls',
        regularPrice: 699,
        salePrice: 499,
        priceUnit: 'ea',
        dealType: 'coupon',
        loyaltyExclusive: true,
        category: 'frozen',
        description: '36 ct, digital coupon required',
      },
      {
        _key: 'item-5',
        productName: 'Russet Potatoes',
        regularPrice: 499,
        salePrice: 299,
        priceUnit: 'ea',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'produce',
        description: '5 lb bag',
      },
      {
        _key: 'item-6',
        productName: 'Deviled Egg Tray',
        regularPrice: 1299,
        salePrice: 999,
        priceUnit: 'ea',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'deli',
        description: '12 count, made fresh daily',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PREVIOUS WEEK AD (for history/testing)
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'weekly-ad-previous',
    _type: 'weeklyAdBase',
    internalTitle: 'March Madness Deals',
    weekOf: getWeekOf(-1),
    validFrom: daysFromNow(-10),
    validUntil: daysFromNow(-3),
    items: [
      {
        _key: 'item-1',
        productName: 'Party Wings',
        regularPrice: 699,
        salePrice: 499,
        priceUnit: 'lb',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'meat',
        description: 'Fresh, never frozen',
      },
      {
        _key: 'item-2',
        productName: 'Tostitos & Salsa',
        regularPrice: 899,
        salePrice: 599,
        priceUnit: 'ea',
        dealType: 'mix-match',
        loyaltyExclusive: false,
        category: 'snacks',
        description: 'Chips + dip combo deal',
      },
      {
        _key: 'item-3',
        productName: 'Bud Light 24-Pack',
        regularPrice: 2499,
        salePrice: 1999,
        priceUnit: 'ea',
        dealType: 'sale',
        loyaltyExclusive: false,
        category: 'beverages',
        description: '12 oz cans',
      },
    ],
  },
]
