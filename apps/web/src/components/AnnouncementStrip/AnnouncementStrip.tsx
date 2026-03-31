import type { AnnouncementStripDTO } from '@grocery-multibanner/cms-adapters'

interface AnnouncementStripProps {
  strip: AnnouncementStripDTO
}

export function AnnouncementStrip({ strip }: AnnouncementStripProps) {
  return (
    <div className="bg-accent text-accent-foreground text-sm px-4 py-2 flex items-center justify-center gap-2 text-center">
      <span aria-hidden="true">{strip.emoji}</span>
      <span>{strip.message}</span>
      <a
        href={strip.ctaHref}
        className="font-bold underline underline-offset-2 hover:no-underline ml-1"
      >
        {strip.ctaLabel}
      </a>
    </div>
  )
}
