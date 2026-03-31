'use client'

import { useBanner } from '@/lib/banner/BannerContext'

export function HelpBar() {
  const { config } = useBanner()

  return (
    <div className="bg-surface border-t border-outline py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-text-muted">
        <span className="font-medium text-foreground">Need help?</span>
        <div className="flex items-center gap-4">
          {config.supportEmail && (
            <a href={`mailto:${config.supportEmail}`} className="hover:text-foreground transition-colors">
              ✉ Email us
            </a>
          )}
          <a href="#" className="hover:text-foreground transition-colors">📞 Call us</a>
          <a href="#" className="hover:text-foreground transition-colors">💬 Live chat</a>
          <a href="#" className="hover:text-foreground transition-colors">❓ FAQ</a>
        </div>
      </div>
    </div>
  )
}
