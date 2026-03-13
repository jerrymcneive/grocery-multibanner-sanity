import { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Banner Configuration (singletons)
      S.listItem()
        .title('Banner Configuration')
        .child(
          S.list()
            .title('Banners')
            .items([
              S.listItem()
                .title('🎪 Festival Foods')
                .child(
                  S.document()
                    .schemaType('bannerConfig')
                    .documentId('banner-festival-foods')
                ),
              S.listItem()
                .title('🏡 Hometown Grocers')
                .child(
                  S.document()
                    .schemaType('bannerConfig')
                    .documentId('banner-hometown-grocers')
                ),
            ])
        ),
      S.divider(),
      // Content by type
      S.documentTypeListItem('storeMessage').title('Store Messages'),
      S.documentTypeListItem('weeklyAdBase').title('Weekly Ads'),
      S.documentTypeListItem('weeklyAdBannerOverride').title('Weekly Ad Overrides'),
    ])
