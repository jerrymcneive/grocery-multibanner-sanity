import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './desk/structure'

export default defineConfig({
  name: 'grocery-multibanner-sanity',
  title: 'Schnucks Omnichannel CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '15lskz7p',
  dataset: process.env.SANITY_STUDIO_DATASET || 'development',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
