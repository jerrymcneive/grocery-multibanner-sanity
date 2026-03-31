import type { CategoryShortcutDTO } from '@grocery-multibanner/cms-adapters'

interface CategoryShortcutItemProps {
  item: CategoryShortcutDTO
}

export function CategoryShortcutItem({ item }: CategoryShortcutItemProps) {
  return (
    <a
      href={item.href}
      className="flex flex-col items-center gap-2 p-3 rounded-card bg-surface border border-outline hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors group"
    >
      <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
      <span className="text-xs font-medium text-foreground group-hover:text-primary-foreground text-center leading-tight">
        {item.label}
      </span>
    </a>
  )
}
