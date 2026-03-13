import type { WeeklyAdDTO } from '@grocery-multibanner/cms-adapters'

interface HeroProps {
  weeklyAd: WeeklyAdDTO
}

export function Hero({ weeklyAd }: HeroProps) {
  return (
    <section className="bg-primary text-primary-foreground min-h-hero flex flex-col justify-center items-center text-center px-4 py-16">
      {weeklyAd.heroHeadline && (
        <h1 className="text-4xl font-bold font-brand mb-4">{weeklyAd.heroHeadline}</h1>
      )}
      {weeklyAd.promotionalCopy && (
        <p className="text-lg max-w-2xl">{weeklyAd.promotionalCopy}</p>
      )}
    </section>
  )
}
