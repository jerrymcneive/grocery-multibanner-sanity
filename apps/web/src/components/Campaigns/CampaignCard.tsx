import type { CampaignDTO } from '@grocery-multibanner/cms-adapters'

interface CampaignCardProps {
  campaign: CampaignDTO
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <div className="rounded-card bg-background shadow-sm overflow-hidden border border-border">
      {campaign.heroImageUrl && (
        <img
          src={campaign.heroImageUrl}
          alt={campaign.headline}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4 flex flex-col gap-2">
        {campaign.rewardPointMultiplier && (
          <span className="self-start text-xs font-bold uppercase tracking-wide bg-primary text-primary-foreground px-2 py-1 rounded-full">
            {campaign.rewardPointMultiplier}x Points
          </span>
        )}
        <h3 className="font-semibold text-foreground leading-snug">{campaign.headline}</h3>
      </div>
    </div>
  )
}
