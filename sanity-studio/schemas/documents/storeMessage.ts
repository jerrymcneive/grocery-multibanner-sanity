import { defineType, defineField } from 'sanity'

export const storeMessage = defineType({
  name: 'storeMessage',
  title: 'Store Message',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'banners', title: 'Banners', type: 'array', of: [{ type: 'string' }] }),
  ],
})
