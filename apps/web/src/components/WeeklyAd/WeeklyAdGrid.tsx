import type { WeeklyAdDTO } from '@grocery-multibanner/cms-adapters'
import { WeeklyAdItemCard } from './WeeklyAdItemCard'

interface WeeklyAdGridProps {
  weeklyAd: WeeklyAdDTO
}

export function WeeklyAdGrid({ weeklyAd }: WeeklyAdGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">This Week&apos;s Deals</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {weeklyAd.items.map((item, index) => (
          <WeeklyAdItemCard key={`${weeklyAd.id}-item-${index}`} item={item} />
        ))}
      </div>
    </section>
  )
}
