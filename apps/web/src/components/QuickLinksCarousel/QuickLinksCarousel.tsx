'use client'

import { useRef } from 'react'
import type { QuickLinkDTO } from '@grocery-multibanner/cms-adapters'
import { QuickLinksTile } from './QuickLinksTile'

interface QuickLinksCarouselProps {
  heading: string
  tiles: QuickLinkDTO[]
}

export function QuickLinksCarousel({ heading, tiles }: QuickLinksCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 'left' | 'right') {
    if (!scrollRef.current) return
    const amount = 240
    scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  if (tiles.length === 0) return null

  return (
    <section className="bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-bold text-foreground mb-4">{heading}</h2>

        <div className="relative">
          {/* Prev button */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-3 bg-background border border-outline rounded-full w-8 h-8 flex items-center justify-center shadow hover:border-primary transition-colors"
          >
            ‹
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-6"
          >
            {tiles.map((tile) => (
              <QuickLinksTile key={tile.href} tile={tile} />
            ))}
          </div>

          {/* Next button */}
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-3 bg-background border border-outline rounded-full w-8 h-8 flex items-center justify-center shadow hover:border-primary transition-colors"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
