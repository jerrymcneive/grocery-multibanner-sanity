import { defineType, defineField } from 'sanity'

export const bannerConfig = defineType({
  name: 'bannerConfig',
  title: 'Banner Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: '🎪 Festival Foods',    value: 'festival-foods' },
          { title: '🏡 Hometown Grocers',  value: 'hometown-grocers' },
          { title: '🛒 Schnucks (future)', value: 'schnucks' },
        ],
      },
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'The banner name as shown to customers (e.g., "Festival Foods").',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short brand tagline shown to customers.',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Brand Color',
      type: 'string',
      description: 'Hex value — e.g., #C8102E',
      validation: (rule) =>
        rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color'),
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Brand Color',
      type: 'string',
      description: 'Hex value — e.g., #FFD100',
      validation: (rule) =>
        rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color'),
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo (Light Background)',
      type: 'image',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Background)',
      type: 'image',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Customer Support Email',
      type: 'string',
    }),
    defineField({
      name: 'regions',
      title: 'Operating Regions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Wisconsin',  value: 'Wisconsin' },
          { title: 'Minnesota',  value: 'Minnesota' },
          { title: 'Illinois',   value: 'Illinois' },
          { title: 'Missouri',   value: 'Missouri' },
          { title: 'Iowa',       value: 'Iowa' },
          { title: 'Indiana',    value: 'Indiana' },
          { title: 'Kansas',     value: 'Kansas' },
        ],
      },
      description: 'States where this banner operates.',
    }),
    defineField({
      name: 'storeCount',
      title: 'Store Count',
      type: 'number',
      description: 'Total number of physical store locations.',
      validation: (rule) => rule.integer().positive(),
    }),
  ],
  preview: {
    select: { title: 'displayName', subtitle: 'banner' },
  },
})
