import type { StoreMessageDTO } from '@grocery-multibanner/cms-adapters'

interface StoreMessageCardProps {
  message: StoreMessageDTO
}

export function StoreMessageCard({ message }: StoreMessageCardProps) {
  return (
    <div className="w-full bg-surface py-8 px-6 text-center">
      <h3 className="text-2xl font-bold text-foreground mb-3">{message.title}</h3>
      {message.body && (
        <p className="text-base text-text-muted max-w-prose mx-auto">{message.body}</p>
      )}
    </div>
  )
}
