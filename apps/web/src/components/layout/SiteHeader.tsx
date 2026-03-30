'use client'

import { useBanner } from '@/lib/banner/BannerContext'

export function SiteHeader() {
  const { config } = useBanner()

  return (
    <header>
      {/* Utility bar */}
      <div className="bg-surface border-b border-outline text-text-muted text-xs px-4 py-1 flex items-center justify-end gap-4">
        <a href="#" className="hover:text-foreground">Store Finder</a>
        <a href="#" className="hover:text-foreground">Weekly Ad</a>
        <a href="#" className="hover:text-foreground">Pharmacy</a>
        {config.supportEmail && (
          <a href={`mailto:${config.supportEmail}`} className="hover:text-foreground">
            Contact Us
          </a>
        )}
      </div>

      {/* Main nav row */}
      <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo / display name */}
        <span className="text-xl font-bold font-brand shrink-0">{config.displayName}</span>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Main navigation">
          <a href="#" className="opacity-90 hover:opacity-100">Deals</a>
          <a href="#" className="opacity-90 hover:opacity-100">Departments</a>
          <a href="#" className="opacity-90 hover:opacity-100">Recipes</a>
          <a href="#" className="opacity-90 hover:opacity-100">Rewards</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 text-sm shrink-0">
          <button type="button" aria-label="Search" className="opacity-90 hover:opacity-100">
            🔍
          </button>
          <button type="button" aria-label="Sign in" className="opacity-90 hover:opacity-100">
            Sign In
          </button>
          <button type="button" aria-label="Cart" className="opacity-90 hover:opacity-100">
            🛒
          </button>
        </div>
      </div>

      {/* Store selector sub-bar */}
      <div className="bg-secondary text-secondary-foreground text-xs px-4 py-1.5 flex items-center gap-2">
        <span>📍</span>
        <span className="font-medium">Select a store</span>
        <span className="opacity-70 ml-1">to see local deals and availability</span>
      </div>
    </header>
  )
}
