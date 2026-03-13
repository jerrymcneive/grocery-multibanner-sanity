/**
 * Clean Script
 * Removes all seeded synthetic data
 * Use with caution!
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'development',
  token: process.env.SANITY_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// IDs of seeded documents (must match seed data)
const seededIds = [
  // Banner configs
  'banner-festival-foods',
  'banner-hometown-grocers',
  'banner-schnucks',
  // Store messages
  'msg-ff-spring-hours',
  'msg-ff-madison-event',
  'msg-ff-pharmacy-notice',
  'msg-ff-closure-remodel',
  'msg-hg-local-produce',
  'msg-hg-community-day',
  'msg-hg-easter-hours',
  'msg-hg-kc-closure',
  'msg-shared-rewards-promo',
  'msg-shared-app-update',
  // Weekly ads
  'weekly-ad-current',
  'weekly-ad-next',
  'weekly-ad-previous',
  // Overrides
  'override-current-festival',
  'override-current-hometown',
  'override-next-festival',
  'override-next-hometown',
  'override-previous-festival',
  'override-previous-hometown',
]

async function clean() {
  console.log('🧹 Cleaning seeded data...\n')

  for (const id of seededIds) {
    try {
      await client.delete(id)
      console.log(`   ✓ Deleted ${id}`)
    } catch (err: any) {
      if (err.statusCode === 404) {
        console.log(`   - Skipped ${id} (not found)`)
      } else {
        console.error(`   ✗ Failed ${id}:`, err.message)
      }
    }
  }

  console.log('\n✅ Clean complete!')
}

clean().catch((err) => {
  console.error('❌ Clean failed:', err)
  process.exit(1)
})
