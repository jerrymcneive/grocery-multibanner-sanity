import { describe, it, expect } from 'vitest'
import { transformCampaign, transformCampaigns } from './campaign'

const BASE_RAW = {
  _id: 'campaign-abc-123',
  title: 'Spring Grilling Season',
  slug: { current: 'spring-grilling-season' },
  banners: ['festival-foods'],
  headline: 'Fire Up the Grill — Earn 3x Points',
  rewardPointMultiplier: 3,
  startDate: '2026-03-01T00:00:00Z',
  endDate: '2026-05-31T23:59:59Z',
  linkedProducts: ['prod-001', 'prod-002'],
  heroImage: { asset: { url: 'https://cdn.sanity.io/images/abc/campaign.jpg' } },
}

describe('transformCampaign', () => {
  it('maps all fields from a complete raw document', () => {
    const result = transformCampaign(BASE_RAW)

    expect(result).toEqual({
      id: 'campaign-abc-123',
      title: 'Spring Grilling Season',
      slug: 'spring-grilling-season',
      banners: ['festival-foods'],
      headline: 'Fire Up the Grill — Earn 3x Points',
      heroImageUrl: 'https://cdn.sanity.io/images/abc/campaign.jpg',
      rewardPointMultiplier: 3,
      startDate: '2026-03-01T00:00:00Z',
      endDate: '2026-05-31T23:59:59Z',
      linkedProducts: ['prod-001', 'prod-002'],
      body: undefined,
    })
  })

  it('produces no heroImageUrl when heroImage is absent', () => {
    const { heroImage: _, ...raw } = BASE_RAW
    const result = transformCampaign(raw)
    expect(result.heroImageUrl).toBeUndefined()
  })

  it('produces no heroImageUrl when heroImage.asset.url is absent', () => {
    const raw = { ...BASE_RAW, heroImage: { asset: { url: undefined as unknown as string } } }
    const result = transformCampaign(raw)
    expect(result.heroImageUrl).toBeUndefined()
  })

  it('passes rewardPointMultiplier: 0 through as 0 (not stripped)', () => {
    const result = transformCampaign({ ...BASE_RAW, rewardPointMultiplier: 0 })
    expect(result.rewardPointMultiplier).toBe(0)
  })

  it('produces no rewardPointMultiplier when absent', () => {
    const { rewardPointMultiplier: _, ...raw } = BASE_RAW
    const result = transformCampaign(raw)
    expect(result.rewardPointMultiplier).toBeUndefined()
  })

  it('defaults linkedProducts to [] when absent', () => {
    const { linkedProducts: _, ...raw } = BASE_RAW
    const result = transformCampaign(raw)
    expect(result.linkedProducts).toEqual([])
  })

  it('passes body through as-is when present', () => {
    const body = [{ _type: 'block', children: [] }]
    const result = transformCampaign({ ...BASE_RAW, body })
    expect(result.body).toBe(body)
  })

  it('supports multiple banners', () => {
    const result = transformCampaign({ ...BASE_RAW, banners: ['festival-foods', 'hometown-grocers'] })
    expect(result.banners).toEqual(['festival-foods', 'hometown-grocers'])
  })

  it('throws ZodError when startDate is not a valid ISO datetime', () => {
    expect(() =>
      transformCampaign({ ...BASE_RAW, startDate: 'not-a-date' })
    ).toThrow()
  })

  it('throws ZodError when endDate is not a valid ISO datetime', () => {
    expect(() =>
      transformCampaign({ ...BASE_RAW, endDate: 'not-a-date' })
    ).toThrow()
  })

  it('throws ZodError when heroImageUrl is not a valid URL', () => {
    expect(() =>
      transformCampaign({ ...BASE_RAW, heroImage: { asset: { url: 'not-a-url' } } })
    ).toThrow()
  })
})

describe('transformCampaigns', () => {
  it('returns an empty array for empty input', () => {
    expect(transformCampaigns([])).toEqual([])
  })

  it('maps multiple valid documents', () => {
    const second = {
      ...BASE_RAW,
      _id: 'campaign-xyz-456',
      title: 'Local Harvest',
      slug: { current: 'local-harvest' },
      banners: ['hometown-grocers'],
    }
    const results = transformCampaigns([BASE_RAW, second])
    expect(results).toHaveLength(2)
    expect(results[0].id).toBe('campaign-abc-123')
    expect(results[1].id).toBe('campaign-xyz-456')
  })

  it('throws on the first invalid document — all-or-nothing behavior', () => {
    const invalid = { ...BASE_RAW, startDate: 'bad-date' }
    // transformCampaigns uses .map() which throws on first bad doc.
    // fetchActiveCampaigns catches this and returns [] — this test
    // documents the current failure mode so regressions are visible.
    expect(() => transformCampaigns([invalid, BASE_RAW])).toThrow()
  })
})
