import { defineType, defineField } from 'sanity'

export const alertBanner = defineType({
  name: 'alertBanner',
  title: 'Alert Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: '🎪 Festival Foods',   value: 'festival-foods' },
          { title: '🏡 Hometown Grocers', value: 'hometown-grocers' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Toggle the alert banner on or off. Off = hidden from the page.',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Primary alert text, e.g. "All Stores Closing for Easter".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { headline: 'headline', banner: 'banner', enabled: 'enabled' },
    prepare({ headline, banner, enabled }) {
      const icon = banner === 'festival-foods' ? '🎪' : '🏡'
      return {
        title: `${icon} ${headline ?? ''}`,
        subtitle: enabled ? '● Live' : '○ Off',
      }
    },
  },
})
