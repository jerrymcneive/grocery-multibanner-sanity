interface PriceBadgeProps {
  regularPriceCents: number
  salePriceCents?: number
  priceUnit?: string
}

function centsToPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function PriceBadge({ regularPriceCents, salePriceCents, priceUnit }: PriceBadgeProps) {
  const isOnSale = salePriceCents !== undefined

  return (
    <div className="flex flex-col items-end">
      {isOnSale && (
        <span className="text-xs line-through text-text-muted">
          {centsToPrice(regularPriceCents)}
        </span>
      )}
      <span className={`font-bold ${isOnSale ? 'text-accent' : 'text-foreground'}`}>
        {centsToPrice(isOnSale ? salePriceCents : regularPriceCents)}
        {priceUnit && <span className="text-xs font-normal">/{priceUnit}</span>}
      </span>
    </div>
  )
}
