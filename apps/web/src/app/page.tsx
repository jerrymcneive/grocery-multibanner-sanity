import Link from 'next/link'
import { VALID_BANNERS } from '@/lib/banner/bannerList'

export default function BannerSwitcher() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900">Phase 1 Banners</h1>
      <nav className="flex flex-col sm:flex-row gap-4">
        {VALID_BANNERS.map((banner) => (
          <Link
            key={banner}
            href={`/${banner}`}
            className="px-8 py-4 text-lg font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors text-center"
          >
            {banner}
          </Link>
        ))}
      </nav>
    </main>
  )
}
