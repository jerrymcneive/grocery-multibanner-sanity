'use client'

import { useBanner } from '@/lib/banner/BannerContext'

const NAV_COLUMNS = [
  {
    heading: 'Shop',
    links: ['Weekly Ad', 'Departments', 'Organic & Natural', 'Deli & Bakery', 'Floral'],
  },
  {
    heading: 'Savings',
    links: ['Digital Coupons', 'Rewards Program', 'Special Offers', 'Buy Online'],
  },
  {
    heading: 'Services',
    links: ['Pharmacy', 'Catering', 'Gift Cards', 'Fuel Program'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Careers', 'Sustainability', 'Community'],
  },
  {
    heading: 'Help',
    links: ['Contact Us', 'FAQ', 'Store Finder', 'Accessibility'],
  },
]

export function SiteFooter() {
  const { config } = useBanner()

  return (
    <footer className="bg-foreground text-primary-foreground mt-auto">
      {/* Link grid */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
        {NAV_COLUMNS.map((col) => (
          <div key={col.heading}>
            <p className="font-bold mb-3 opacity-90">{col.heading}</p>
            <ul className="space-y-1.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* App store badges */}
      <div className="border-t border-outline border-opacity-20 px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-sm opacity-70">
          <span>Get the {config.displayName} app</span>
          <a href="#" className="underline hover:opacity-100">App Store</a>
          <a href="#" className="underline hover:opacity-100">Google Play</a>
        </div>

        {/* Legal row */}
        <p className="text-xs opacity-50 text-center md:text-right">
          &copy; {new Date().getFullYear()} {config.displayName}. All rights reserved.
          {' · '}
          <a href="#" className="underline hover:opacity-80">Privacy Policy</a>
          {' · '}
          <a href="#" className="underline hover:opacity-80">Terms of Use</a>
        </p>
      </div>
    </footer>
  )
}
