import type { WeeklyAdDTO } from '@grocery-multibanner/cms-adapters'

interface HeroProps {
  weeklyAd: WeeklyAdDTO
  source?: 'default' | 'override'
}

export function Hero({ weeklyAd, source }: HeroProps) {
  const showLabels = process.env.NEXT_PUBLIC_SHOW_DATA_SOURCE_LABELS === 'true'

  return (
    <section className="relative bg-primary text-primary-foreground min-h-hero">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
        {/* Left: copy */}
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-widest opacity-80">
            This Week&apos;s Deals
          </p>
          {weeklyAd.heroHeadline && (
            <h1 className="text-4xl md:text-5xl font-bold font-brand leading-tight">
              {weeklyAd.heroHeadline}
            </h1>
          )}
          {weeklyAd.promotionalCopy && (
            <p className="text-lg opacity-90 max-w-md">{weeklyAd.promotionalCopy}</p>
          )}
          {/* Price badge */}
          <div className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-button self-start">
            <span>🏷</span>
            <span>Savings this week</span>
          </div>
          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="#deals"
              className="bg-primary-foreground text-primary font-semibold px-5 py-2.5 rounded-button hover:opacity-90 transition-opacity"
            >
              Shop Deals
            </a>
            <a
              href="#weekly-ad"
              className="border border-primary-foreground text-primary-foreground font-semibold px-5 py-2.5 rounded-button hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              View Weekly Ad
            </a>
          </div>
        </div>

        {/* Right: image placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm aspect-[4/3] bg-primary-foreground bg-opacity-10 rounded-card flex items-center justify-center text-primary-foreground opacity-40 text-sm">
            Hero Image
          </div>
        </div>
      </div>

      {/* DataSourceLabel overlay */}
      {showLabels && source && (
        <div className="absolute top-3 right-3">
          {source === 'override' ? (
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
              Banner override
            </span>
          ) : (
            <span className="bg-text-muted text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              Sanity default
            </span>
          )}
        </div>
      )}
    </section>
  )
}
