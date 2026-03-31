import type { HeroDTO, PriceCalloutDTO } from '@grocery-multibanner/cms-adapters'

interface HeroProps {
  hero: HeroDTO
  priceCallout?: PriceCalloutDTO
}

export function Hero({ hero, priceCallout }: HeroProps) {
  const showLabels = process.env.NEXT_PUBLIC_SHOW_DATA_SOURCE_LABELS === 'true'

  return (
    <section className="relative bg-primary text-primary-foreground min-h-hero">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">

        {/* Left: copy panel */}
        <div className="flex-1 flex flex-col gap-4">
          {hero.eyebrow && (
            <p className="text-sm font-medium uppercase tracking-widest opacity-80">
              {hero.eyebrow}
            </p>
          )}
          {hero.headline && (
            <h1 className="text-4xl md:text-5xl font-bold font-brand leading-tight">
              {hero.headline}
            </h1>
          )}
          {hero.promotionalCopy && (
            <p className="text-lg opacity-90 max-w-md">{hero.promotionalCopy}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-2">
            {hero.callToAction?.label && (
              <a
                href={hero.callToAction.url}
                className="bg-primary-foreground text-primary font-semibold px-5 py-2.5 rounded-button hover:opacity-90 transition-opacity"
              >
                {hero.callToAction.label}
              </a>
            )}
            {hero.secondaryCta?.label && (
              <a
                href={hero.secondaryCta.url}
                className="border border-primary-foreground text-primary-foreground font-semibold px-5 py-2.5 rounded-button hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                {hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>

        {/* Right: image + price callout badge */}
        <div className="relative flex-1 flex items-center justify-center">
          {hero.imageUrl ? (
            <img
              src={hero.imageUrl}
              alt={hero.imageAlt ?? ''}
              className="w-full max-w-sm aspect-[4/3] object-cover rounded-card"
            />
          ) : (
            <div className="w-full max-w-sm aspect-[4/3] bg-primary-foreground bg-opacity-10 rounded-card flex items-center justify-center text-primary-foreground opacity-40 text-sm">
              Hero Image
            </div>
          )}

          {priceCallout && (
            <div className="absolute bottom-4 left-4 bg-white text-foreground rounded-full w-24 h-24 flex flex-col items-center justify-center text-center shadow-lg p-2">
              <span className="text-xl font-bold font-brand leading-none">{priceCallout.price}</span>
              <span className="text-xs font-semibold uppercase">{priceCallout.unit}</span>
              <span className="text-[10px] leading-tight mt-0.5 opacity-80">{priceCallout.productName}</span>
              {priceCallout.badge && (
                <span className="text-[9px] font-bold uppercase text-primary mt-0.5">{priceCallout.badge}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {showLabels && (
        <div className="absolute top-3 right-3">
          <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
            Sanity live
          </span>
        </div>
      )}
    </section>
  )
}
