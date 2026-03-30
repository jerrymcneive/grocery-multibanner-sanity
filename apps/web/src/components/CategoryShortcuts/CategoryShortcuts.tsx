import type { CategoryShortcutDTO } from '@grocery-multibanner/cms-adapters'
import { CategoryShortcutItem } from './CategoryShortcutItem'

interface CategoryShortcutsProps {
  shortcuts: CategoryShortcutDTO[]
}

export function CategoryShortcuts({ shortcuts }: CategoryShortcutsProps) {
  return (
    <section className="bg-background py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 overflow-x-auto">
          {shortcuts.map((item) => (
            <CategoryShortcutItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
