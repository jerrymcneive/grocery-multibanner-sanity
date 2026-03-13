import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env from project root (2 levels up from sanity-studio/seed)
config({ path: resolve(__dirname, '../..', '.env') })

import { createClient } from '@sanity/client'
import { bannerConfigs } from './data/bannerConfigs'
import { storeMessages } from './data/storeMessages'
import { weeklyAds } from './data/weeklyAds'
import { weeklyAdOverrides } from './data/weeklyAdOverrides'

// Debug: show what we loaded
console.log('🔍 Environment check:')
console.log(`   SANITY_PROJECT_ID: ${process.env.SANITY_PROJECT_ID}`)
console.log(`   SANITY_DATASET: ${process.env.SANITY_DATASET}`)
console.log(`   SANITY_TOKEN: ${process.env.SANITY_TOKEN ? '✓ Set' : '✗ Missing'}\n`)

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'development',
  token: process.env.SANITY_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function seed() {
  if (!process.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID.includes('your-')) {
    console.error('❌ Invalid SANITY_PROJECT_ID')
    process.exit(1)
  }
  if (!process.env.SANITY_TOKEN || process.env.SANITY_TOKEN.includes('your-')) {
    console.error('❌ Invalid SANITY_TOKEN')
    process.exit(1)
  }

  console.log('🌱 Starting Sanity seed...\n')

  console.log('📦 Seeding Banner Configurations...')
  for (const cfg of bannerConfigs) {
    await client.createOrReplace(cfg as any)
    console.log(`   ✓ ${cfg.displayName}`)
  }

  console.log('\n📦 Seeding Store Messages...')
  for (const message of storeMessages) {
    await client.createOrReplace(message as any)
    console.log(`   ✓ ${message.title}`)
  }

  console.log('\n📦 Seeding Weekly Ads...')
  for (const ad of weeklyAds) {
    await client.createOrReplace(ad as any)
    console.log(`   ✓ ${ad.internalTitle}`)
  }

  console.log('\n📦 Seeding Weekly Ad Overrides...')
  for (const override of weeklyAdOverrides) {
    await client.createOrReplace(override as any)
    console.log(`   ✓ ${override._id}`)
  }

  console.log('\n✅ Seed complete!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message || err)
  process.exit(1)
})
