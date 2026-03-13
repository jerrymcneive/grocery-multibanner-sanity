import Image from 'next/image'
import type { WeeklyAdItemDTO } from '@grocery-multibanner/cms-adapters'
import { PriceBadge, DealBadge, LoyaltyBadge } from '@grocery-multibanner/shared-ui'

interface WeeklyAdItemCardProps {
  item: WeeklyAdItemDTO
}

export function WeeklyAdItemCard({ item }: WeeklyAdItemCardProps) {
  return (
    <div className="rounded-card border border-text-muted/20 bg-background overflow-hidden shadow-sm flex flex-col">
      <div className="relative aspect-square">
        <Image
          src={item.imageUrl}
          alt={item.productName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <p className="text-sm font-medium text-foreground line-clamp-2">{item.productName}</p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {item.dealType && <DealBadge dealType={item.dealType} />}
          {item.loyaltyExclusive && <LoyaltyBadge />}
        </div>
        <PriceBadge
          regularPriceCents={item.regularPriceCents}
          salePriceCents={item.salePriceCents}
          priceUnit={item.priceUnit}
        />
      </div>
    </div>
  )
}
