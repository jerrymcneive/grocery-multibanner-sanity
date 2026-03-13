import { defineType, defineField } from 'sanity'

export const weeklyAdBannerOverride = defineType({
  name: 'weeklyAdBannerOverride',
  title: 'Weekly Ad Banner Override',
  type: 'document',
  fields: [
    defineField({ name: 'banner', title: 'Banner', type: 'string' }),
    defineField({ name: 'weeklyAdBase', title: 'Weekly Ad', type: 'reference', to: [{ type: 'weeklyAdBase' }] }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
  ],
})
