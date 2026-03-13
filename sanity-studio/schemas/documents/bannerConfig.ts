import { defineType, defineField } from 'sanity'

export const bannerConfig = defineType({
  name: 'bannerConfig',
  title: 'Banner Configuration',
  type: 'document',
  fields: [
    defineField({ name: 'banner', title: 'Banner', type: 'string' }),
    defineField({ name: 'displayName', title: 'Display Name', type: 'string' }),
    defineField({ name: 'primaryColor', title: 'Primary Color', type: 'string' }),
  ],
})
