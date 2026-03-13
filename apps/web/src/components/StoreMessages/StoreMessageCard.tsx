import type { StoreMessageDTO } from '@grocery-multibanner/cms-adapters'

const MESSAGE_BORDER: Record<string, string> = {
  closure: 'border-accent',
  hours: 'border-secondary',
  event: 'border-primary',
  notice: 'border-text-muted',
}

interface StoreMessageCardProps {
  message: StoreMessageDTO
}

export function StoreMessageCard({ message }: StoreMessageCardProps) {
  const borderClass = MESSAGE_BORDER[message.messageType] ?? 'border-text-muted'

  return (
    <div className={`rounded-card border-l-4 ${borderClass} bg-background p-4 shadow-sm`}>
      <h3 className="font-semibold text-foreground mb-1">{message.title}</h3>
      <p className="text-sm text-text-muted">{message.body}</p>
    </div>
  )
}
