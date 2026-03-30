import type { EditorialCardDTO } from '@grocery-multibanner/cms-adapters'
import { EditorialCard } from './EditorialCard'

interface EditorialCardGridProps {
  cards: EditorialCardDTO[]
}

export function EditorialCardGrid({ cards }: EditorialCardGridProps) {
  return (
    <section className="bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <EditorialCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}
