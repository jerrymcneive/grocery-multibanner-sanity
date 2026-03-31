import { defineType, defineField } from 'sanity'

export const homePageOverride = defineType({
  name: 'homePageOverride',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero',      title: 'Hero' },
    { name: 'links',     title: 'Quick Links' },
    { name: 'editorial', title: 'Editorial Grid' },
    { name: 'spotlight', title: 'Rewards Spotlight' },
  ],
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

    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroWeeklyAdRef',
      title: 'Weekly Ad Override',
      type: 'reference',
      to: [{ type: 'weeklyAdBannerOverride' }],
      group: 'hero',
      description: 'Pulls hero image, headline, body, and CTA from the selected banner override.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceCallout',
      title: 'Price Callout',
      type: 'object',
      group: 'hero',
      description: 'Optional featured price badge overlaid on the hero image. Leave blank for a non-sale hero.',
      fields: [
        defineField({ name: 'price',       title: 'Price',        type: 'string', description: 'e.g. "$1.49"' }),
        defineField({ name: 'unit',        title: 'Unit',         type: 'string', options: { list: ['lb', 'ea', 'oz', 'pk'] } }),
        defineField({ name: 'productName', title: 'Product Name', type: 'string' }),
        defineField({ name: 'badge',       title: 'Badge Text',   type: 'string', description: 'Optional, e.g. "SAVE NOW"' }),
      ],
    }),

    // ── Quick Links ───────────────────────────────────────────────────────────
    defineField({
      name: 'quickLinksHeading',
      title: 'Section Heading',
      type: 'string',
      group: 'links',
      initialValue: 'Quick Links',
    }),
    defineField({
      name: 'quickLinkTiles',
      title: 'Tiles',
      type: 'array',
      group: 'links',
      description: 'Min 3, max 8 tiles. Each banner defines its own set.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'url',   title: 'URL',   type: 'url',    validation: (r) => r.required() }),
          ],
          preview: {
            select: { label: 'label' },
            prepare({ label }) { return { title: label } },
          },
        },
      ],
      validation: (rule) => rule.required().min(3).max(8),
    }),

    // ── Editorial Grid ────────────────────────────────────────────────────────
    defineField({
      name: 'editorialCard1',
      title: 'Card 1',
      type: 'editorialCard',
      group: 'editorial',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editorialCard2',
      title: 'Card 2',
      type: 'editorialCard',
      group: 'editorial',
      validation: (rule) => rule.required(),
    }),

    // ── Rewards Spotlight ─────────────────────────────────────────────────────
    defineField({
      name: 'spotlightHeadline',
      title: 'Headline',
      type: 'string',
      group: 'spotlight',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'spotlightBody',
      title: 'Body',
      type: 'text',
      rows: 2,
      group: 'spotlight',
    }),
    defineField({
      name: 'spotlightCtaLabel',
      title: 'CTA Label',
      type: 'string',
      group: 'spotlight',
    }),
    defineField({
      name: 'spotlightCtaUrl',
      title: 'CTA URL',
      type: 'url',
      group: 'spotlight',
    }),
    defineField({
      name: 'spotlightImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      group: 'spotlight',
      description: 'Promotional or product image shown on the right side of the block.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { banner: 'banner' },
    prepare({ banner }) {
      const icon = banner === 'festival-foods' ? '🎪' : '🏡'
      const name = banner === 'festival-foods' ? 'Festival Foods' : 'Hometown Grocers'
      return { title: `${icon} ${name}`, subtitle: 'Homepage' }
    },
  },
})
