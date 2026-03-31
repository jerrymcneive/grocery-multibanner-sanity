import type { InfoTileDTO } from '@grocery-multibanner/cms-adapters'

interface InfoTileProps {
  tile: InfoTileDTO
}

export function InfoTile({ tile }: InfoTileProps) {
  return (
    <div className="flex flex-col gap-3 items-center text-center p-6">
      <h3 className="text-lg font-bold font-brand text-primary-foreground">{tile.heading}</h3>
      <p className="text-sm text-primary-foreground opacity-80 max-w-xs">{tile.body}</p>
      <a
        href={tile.buttonHref}
        className="mt-2 border border-primary-foreground text-primary-foreground text-sm font-semibold px-4 py-2 rounded-button hover:bg-primary-foreground hover:text-primary transition-colors"
      >
        {tile.buttonLabel}
      </a>
    </div>
  )
}
