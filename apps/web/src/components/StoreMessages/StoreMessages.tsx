import type { StoreMessageDTO } from '@grocery-multibanner/cms-adapters'
import { StoreMessageCard } from './StoreMessageCard'

interface StoreMessagesProps {
  messages: StoreMessageDTO[]
}

export function StoreMessages({ messages }: StoreMessagesProps) {
  if (messages.length === 0) return null

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Store Updates</h2>
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <StoreMessageCard key={message.id} message={message} />
        ))}
      </div>
    </section>
  )
}
