/**
 * Store Messages — Synthetic Demo Data
 * Mix of message types across both Phase 1 banners
 */

// Helper: generate dates relative to now
const now = new Date()
const daysFromNow = (days: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export const storeMessages = [
  // ─────────────────────────────────────────────────────────────────
  // FESTIVAL FOODS MESSAGES
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'msg-ff-spring-hours',
    _type: 'storeMessage',
    title: 'Spring Hours Update',
    body: 'Starting April 1st, all Festival Foods locations will open at 6 AM to serve our early bird shoppers. Pharmacy hours remain unchanged.',
    messageType: 'hours',
    banners: ['festival-foods'],
    stores: [], // All stores
    activeFrom: daysFromNow(-5),
    activeUntil: daysFromNow(30),
  },
  {
    _id: 'msg-ff-madison-event',
    _type: 'storeMessage',
    title: 'Madison Store Grand Reopening',
    body: 'Join us this Saturday for the grand reopening of our Madison East location! Free samples, live music, and exclusive one-day deals.',
    messageType: 'event',
    banners: ['festival-foods'],
    stores: ['ff-madison-east'],
    activeFrom: daysFromNow(-2),
    activeUntil: daysFromNow(5),
  },
  {
    _id: 'msg-ff-pharmacy-notice',
    _type: 'storeMessage',
    title: 'Pharmacy Flu Shot Clinics',
    body: 'Walk-in flu shots now available at all Festival Foods pharmacies. No appointment needed. Most insurance accepted.',
    messageType: 'notice',
    banners: ['festival-foods'],
    stores: [],
    activeFrom: daysFromNow(-10),
    activeUntil: daysFromNow(60),
  },
  {
    _id: 'msg-ff-closure-remodel',
    _type: 'storeMessage',
    title: 'Temporary Closure — Appleton North',
    body: 'Our Appleton North location will be closed March 25-27 for remodeling. Please visit our Appleton South store during this time.',
    messageType: 'closure',
    banners: ['festival-foods'],
    stores: ['ff-appleton-north'],
    activeFrom: daysFromNow(10),
    activeUntil: daysFromNow(15),
  },

  // ─────────────────────────────────────────────────────────────────
  // HOMETOWN GROCERS MESSAGES
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'msg-hg-local-produce',
    _type: 'storeMessage',
    title: 'Local Produce Season Begins',
    body: 'Fresh from Missouri farms! Local strawberries, asparagus, and spring greens now available. Look for the "Local" tags in produce.',
    messageType: 'notice',
    banners: ['hometown-grocers'],
    stores: [],
    activeFrom: daysFromNow(-3),
    activeUntil: daysFromNow(45),
  },
  {
    _id: 'msg-hg-community-day',
    _type: 'storeMessage',
    title: 'Community Appreciation Day',
    body: 'This Saturday: 10% off your entire purchase for all Hometown Rewards members. Plus, meet local vendors and enjoy free coffee!',
    messageType: 'event',
    banners: ['hometown-grocers'],
    stores: [],
    activeFrom: daysFromNow(-1),
    activeUntil: daysFromNow(4),
  },
  {
    _id: 'msg-hg-easter-hours',
    _type: 'storeMessage',
    title: 'Easter Sunday Hours',
    body: 'All Hometown Grocers locations will close at 3 PM on Easter Sunday so our team can celebrate with their families.',
    messageType: 'hours',
    banners: ['hometown-grocers'],
    stores: [],
    activeFrom: daysFromNow(5),
    activeUntil: daysFromNow(12),
  },
  {
    _id: 'msg-hg-kc-closure',
    _type: 'storeMessage',
    title: 'Kansas City Downtown — Emergency Closure',
    body: 'Due to water main repairs on Main Street, our KC Downtown location is temporarily closed. Expected to reopen Thursday.',
    messageType: 'closure',
    banners: ['hometown-grocers'],
    stores: ['hg-kc-downtown'],
    activeFrom: daysFromNow(-1),
    activeUntil: daysFromNow(3),
  },

  // ─────────────────────────────────────────────────────────────────
  // SHARED MESSAGES (both banners)
  // ─────────────────────────────────────────────────────────────────
  {
    _id: 'msg-shared-rewards-promo',
    _type: 'storeMessage',
    title: 'Double Points Week',
    body: 'Earn 2X rewards points on all purchases this week! Points automatically credited to your account.',
    messageType: 'notice',
    banners: ['festival-foods', 'hometown-grocers'],
    stores: [],
    activeFrom: daysFromNow(0),
    activeUntil: daysFromNow(7),
  },
  {
    _id: 'msg-shared-app-update',
    _type: 'storeMessage',
    title: 'App Update Available',
    body: 'A new version of our app is available with faster checkout and improved digital coupons. Update now in your app store!',
    messageType: 'notice',
    banners: ['festival-foods', 'hometown-grocers'],
    stores: [],
    activeFrom: daysFromNow(-7),
    activeUntil: daysFromNow(14),
  },
]
