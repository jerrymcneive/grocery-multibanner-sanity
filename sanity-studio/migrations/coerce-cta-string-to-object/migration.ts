/**
 * Migration: coerce-cta-string-to-object
 *
 * Problem: `callToAction` on `weeklyAdBannerOverride` was previously stored
 * as a plain string in some documents. The schema now defines it as an object
 * with `label` (string) and `url` (url) fields. Studio shows an
 * "Invalid property value" error on affected documents.
 *
 * Fix: For every `weeklyAdBannerOverride` document where `callToAction` is a
 * string, replace it with `{ label: <original string> }`. The `url` field is
 * intentionally left absent — authors can fill it in Studio after migration.
 *
 * Run from sanity-studio/ (must be co-located with sanity.cli.ts):
 *
 *   cd sanity-studio
 *   npx sanity@latest migration run coerce-cta-string-to-object --dry-run
 *   npx sanity@latest migration run coerce-cta-string-to-object
 */

import { defineMigration, at, patch, set } from 'sanity/migrate'

export default defineMigration({
  title: 'Coerce callToAction from string to object in weeklyAdBannerOverride',
  documentTypes: ['weeklyAdBannerOverride'],

  migrate: {
    document(doc) {
      if (typeof doc.callToAction !== 'string') return undefined

      return patch(doc._id, [
        at('callToAction', set({ label: doc.callToAction })),
      ])
    },
  },
})
