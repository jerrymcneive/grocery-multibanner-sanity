import type { RewardsBannerDTO } from '@grocery-multibanner/cms-adapters'

interface RewardsBannerProps {
  promo: RewardsBannerDTO
}

export function RewardsBanner({ promo }: RewardsBannerProps) {
  const showLabels = process.env.NEXT_PUBLIC_SHOW_DATA_SOURCE_LABELS === 'true'

  return (
    <section className="relative bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Copy */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold font-brand">{promo.headline}</h2>
          {promo.subhead && (
            <p className="text-lg opacity-90 max-w-lg">{promo.subhead}</p>
          )}
          <a
            href={promo.ctaHref}
            className="mt-2 self-center md:self-start bg-primary-foreground text-primary font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity"
          >
            {promo.ctaLabel}
          </a>
        </div>

        {/* Image placeholder */}
        <div className="w-48 h-48 bg-primary-foreground bg-opacity-10 rounded-card flex items-center justify-center text-primary-foreground opacity-30 text-sm shrink-0">
          Rewards Image
        </div>
      </div>

      {/* DataSourceLabel overlay */}
      {showLabels && promo.source && (
        <div className="absolute top-3 right-3">
          {promo.source === 'override' ? (
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
