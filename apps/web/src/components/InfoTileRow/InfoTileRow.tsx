import type { InfoTileDTO } from '@grocery-multibanner/cms-adapters'
import { InfoTile } from './InfoTile'

interface InfoTileRowProps {
  tiles: InfoTileDTO[]
}

export function InfoTileRow({ tiles }: InfoTileRowProps) {
  return (
    <section className="bg-primary px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-primary-foreground divide-opacity-20">
        {tiles.map((tile) => (
          <InfoTile key={tile.id} tile={tile} />
        ))}
      </div>
    </section>
  )
}
