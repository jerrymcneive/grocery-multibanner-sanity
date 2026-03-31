import { StructureBuilder } from 'sanity/structure'

const BANNERS = [
  { title: '🎪 Festival Foods',   id: 'festival-foods' },
  { title: '🏡 Hometown Grocers', id: 'hometown-grocers' },
  // { title: '🛒 Schnucks', id: 'schnucks' }, // Future phase
]

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([

      // ── Homepage ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items(
              BANNERS.map((b) =>
                S.listItem()
                  .title(b.title)
                  .child(
                    S.document()
                      .schemaType('homePageOverride')
                      .documentId(`home-${b.id}`)
                      .title(b.title)
                  )
              )
            )
        ),

      // ── Alert Banner ──────────────────────────────────────────────────────
      S.listItem()
        .title('Alert Banner')
        .child(
          S.list()
            .title('Alert Banner')
            .items(
              BANNERS.map((b) =>
                S.listItem()
                  .title(b.title)
                  .child(
                    S.document()
                      .schemaType('alertBanner')
                      .documentId(`alert-${b.id}`)
                      .title(b.title)
                  )
              )
            )
        ),

      S.divider(),

      // ── Weekly Ad ────────────────────────────────────────────────────────
      S.listItem()
        .title('Weekly Ad')
        .child(
          S.list()
            .title('Weekly Ad')
            .items([
              S.listItem()
                .title('Ad Editions')
                .child(S.documentTypeList('weeklyAdBase').title('Weekly Ads')),
              S.listItem()
                .title('Banner Overrides')
                .child(
                  S.list()
                    .title('Overrides by Banner')
                    .items(
                      BANNERS.map((b) =>
                        S.listItem()
                          .title(b.title)
                          .child(
                            S.documentTypeList('weeklyAdBannerOverride')
                              .title(`${b.title} Overrides`)
                              .filter('_type == "weeklyAdBannerOverride" && banner == $bannerId')
                              .params({ bannerId: b.id })
                          )
                      )
                    )
                ),
            ])
        ),

      // ── Campaigns & Promotions ────────────────────────────────────────────
      S.listItem()
        .title('Campaigns & Promotions')
        .child(
          S.list()
            .title('Campaigns')
            .items(
              BANNERS.map((b) =>
                S.listItem()
                  .title(b.title)
                  .child(
                    S.documentTypeList('campaign')
                      .title(`${b.title} Campaigns`)
                      .filter('_type == "campaign" && $bannerId in banners')
                      .params({ bannerId: b.id })
                  )
              )
            )
        ),

      // ── Store Messages ────────────────────────────────────────────────────
      S.listItem()
        .title('Store Messages')
        .child(S.documentTypeList('storeMessage').title('Store Messages')),

      S.divider(),

      // ── Banner Settings ───────────────────────────────────────────────────
      S.listItem()
        .title('Banner Settings')
        .child(
          S.list()
            .title('Banner Settings')
            .items(
              BANNERS.map((b) =>
                S.listItem()
                  .title(b.title)
                  .child(
                    S.document()
                      .schemaType('bannerConfig')
                      .documentId(`banner-${b.id}`)
                  )
              )
            )
        ),
    ])
