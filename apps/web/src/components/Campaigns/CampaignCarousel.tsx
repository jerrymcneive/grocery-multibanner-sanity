import type { CampaignDTO } from '@grocery-multibanner/cms-adapters'
import { CampaignCard } from './CampaignCard'

interface CampaignCarouselProps {
  campaigns: CampaignDTO[]
}

export function CampaignCarousel({ campaigns }: CampaignCarouselProps) {
  if (campaigns.length === 0) return null

  return (
    <section className="py-8 px-4">
      <h2 className="text-xl font-bold text-foreground mb-4">Active Campaigns</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  )
}
