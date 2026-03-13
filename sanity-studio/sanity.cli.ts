import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '15lskz7p',
    dataset: process.env.SANITY_STUDIO_DATASET || 'development',
  },
})
