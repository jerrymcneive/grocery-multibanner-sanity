import { defineType, defineField } from 'sanity'

export const weeklyAdBannerOverride = defineType({
  name: 'weeklyAdBannerOverride',
  title: 'Weekly Ad — Banner Override',
  type: 'document',
  fields: [
    defineField({
      name: 'weeklyAdBase',
      title: 'Weekly Ad',
      type: 'reference',
      to: [{ type: 'weeklyAdBase' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'string',
      options: {
        list: [
          { title: '🎪 Festival Foods',    value: 'festival-foods' },
          { title: '🏡 Hometown Grocers',  value: 'hometown-grocers' },
          { title: '🛒 Schnucks (future)', value: 'schnucks' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Banner-Specific)',
      type: 'image',
      options: { hotspot: true },
      description: 'Overrides the base ad hero for this banner only.',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
      description: 'Accessibility description for the hero image.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline (Banner-Specific)',
      type: 'string',
      description: 'Overrides the base headline for this banner. Leave blank to inherit.',
    }),
    defineField({
      name: 'promotionalCopy',
      title: 'Promotional Copy',
      type: 'text',
      rows: 2,
      description: 'Banner-specific promotional tagline or subhead.',
    }),
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Button Label' }),
        defineField({ name: 'url',   type: 'url',    title: 'Destination URL' }),
      ],
    }),
    defineField({
      name: 'featuredCategories',
      title: 'Featured Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Meat & Seafood',  value: 'meat' },
          { title: 'Produce',         value: 'produce' },
          { title: 'Dairy',           value: 'dairy' },
          { title: 'Bakery',          value: 'bakery' },
          { title: 'Beverages',       value: 'beverages' },
          { title: 'Snacks',          value: 'snacks' },
          { title: 'Frozen',          value: 'frozen' },
          { title: 'Deli',            value: 'deli' },
        ],
      },
      description: 'Category spotlights to feature in this banner override.',
    }),
    defineField({
      name: 'featuredItemOverrides',
      title: 'Featured Item Overrides',
      description: 'Override specific ad items for this banner. Leave empty to use base items.',
      type: 'array',
      of: [{ type: 'weeklyAdItem' }],
    }),
  ],
  preview: {
    select: {
      adTitle: 'weeklyAdBase.internalTitle',
      banner: 'banner',
    },
    prepare({ adTitle, banner }) {
      const icon = banner === 'festival-foods' ? '🎪' : banner === 'hometown-grocers' ? '🏡' : '🛒'
      return { title: `${icon} ${banner}`, subtitle: adTitle }
    },
  },
})
