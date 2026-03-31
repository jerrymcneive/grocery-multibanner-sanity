import type { QuickLinkDTO } from '@grocery-multibanner/cms-adapters'

interface QuickLinksTileProps {
  tile: QuickLinkDTO
}

export function QuickLinksTile({ tile }: QuickLinksTileProps) {
  return (
    <a
      href={tile.href}
      className="flex flex-col items-center gap-2 shrink-0 w-28 group"
    >
      <div className="w-24 h-24 rounded-card overflow-hidden bg-outline border border-outline group-hover:border-primary transition-colors">
        {tile.imageUrl ? (
          <img src={tile.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-surface" />
        )}
      </div>
      <div className="flex items-center gap-1 text-sm font-bold text-foreground group-hover:text-primary transition-colors text-center leading-tight">
        <span>{tile.label}</span>
        <span aria-hidden="true" className="text-xs opacity-60">›</span>
      </div>
    </a>
  )
}
