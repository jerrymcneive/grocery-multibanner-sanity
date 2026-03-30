import type { EditorialCardDTO } from '@grocery-multibanner/cms-adapters'

interface EditorialCardProps {
  card: EditorialCardDTO
}

export function EditorialCard({ card }: EditorialCardProps) {
  return (
    <article className="bg-surface border border-outline rounded-card overflow-hidden flex flex-col">
      {/* Image */}
      <div className="aspect-video bg-outline flex items-center justify-center text-text-muted text-sm">
        {card.imageUrl ? (
          <img src={card.imageUrl} alt={card.headline} className="w-full h-full object-cover" />
        ) : (
          <span>Image</span>
        )}
      </div>

      {/* Copy */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{card.eyebrow}</p>
        <h3 className="text-lg font-bold font-brand text-foreground leading-snug">{card.headline}</h3>
        <p className="text-sm text-text-muted flex-1">{card.copy}</p>
        <a
          href={card.ctaHref}
          className="mt-3 self-start text-sm font-semibold text-primary underline underline-offset-2 hover:no-underline"
        >
          {card.ctaLabel} →
        </a>
      </div>
    </article>
  )
}
