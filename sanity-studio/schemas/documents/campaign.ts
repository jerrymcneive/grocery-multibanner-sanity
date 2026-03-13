import { defineType, defineField } from 'sanity'

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Campaign Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'banners',
      title: 'Active on Banners',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🎪 Festival Foods',    value: 'festival-foods' },
          { title: '🏡 Hometown Grocers',  value: 'hometown-grocers' },
          { title: '🛒 Schnucks (future)', value: 'schnucks' },
        ],
        layout: 'grid',
      },
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'body',
      title: 'Body Copy',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'rewardPointMultiplier',
      title: 'Reward Point Multiplier',
      type: 'number',
      description: 'e.g., 2 for 2× points. Leave blank if not a points campaign.',
    }),
    defineField({
      name: 'startDate',
      title: 'Campaign Start',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Campaign End',
      type: 'datetime',
      validation: (rule) =>
        rule.required().min(rule.valueOfField('startDate')),
    }),
    defineField({
      name: 'linkedProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Product IDs from the Schnucks product catalog API.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startDate',
      media: 'heroImage',
      banners: 'banners',
    },
    prepare({ title, subtitle, media, banners }) {
      const icons = (banners ?? [])
        .map((b: string) => (b === 'festival-foods' ? '🎪' : b === 'hometown-grocers' ? '🏡' : '🛒'))
        .join('')
      return { title: `${icons} ${title}`, subtitle, media }
    },
  },
})
