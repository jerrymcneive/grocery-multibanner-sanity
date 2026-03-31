import type { RewardsBannerDTO } from '@grocery-multibanner/cms-adapters'

interface RewardsBannerProps {
  promo: RewardsBannerDTO
}

export function RewardsBanner({ promo }: RewardsBannerProps) {
  return (
    <section className="flex flex-col md:flex-row min-h-[320px]">
      {/* Left panel: copy */}
      <div className="flex-1 bg-surface flex flex-col justify-center gap-4 px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-bold font-brand text-foreground leading-tight">
          {promo.headline}
        </h2>
        {promo.body && (
          <p className="text-base text-text-muted max-w-md">{promo.body}</p>
        )}
        {promo.ctaLabel && promo.ctaUrl && (
          <a
            href={promo.ctaUrl}
            className="mt-2 self-start bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity"
          >
            {promo.ctaLabel}
          </a>
        )}
      </div>

      {/* Right panel: product image + loyalty badge */}
      <div className="relative flex-1 bg-foreground min-h-[240px] md:min-h-0">
        {promo.imageUrl ? (
          <img
            src={promo.imageUrl}
            alt=""
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary-foreground opacity-20 text-sm">
            Product Image
          </div>
        )}

        {/* Static loyalty badge */}
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow">
          Rewards
        </div>
      </div>
    </section>
  )
}
