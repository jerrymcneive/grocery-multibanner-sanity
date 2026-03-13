const DEAL_LABELS: Record<string, string> = {
  sale: 'SALE',
  bogo: 'Buy 1 Get 1',
  coupon: 'Coupon',
  points: 'Bonus Points',
  'mix-match': 'Mix & Match',
}

interface DealBadgeProps {
  dealType?: string
}

export function DealBadge({ dealType }: DealBadgeProps) {
  if (!dealType) return null
  const label = DEAL_LABELS[dealType]
  if (!label) return null

  return (
    <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-button">
      {label}
    </span>
  )
}
