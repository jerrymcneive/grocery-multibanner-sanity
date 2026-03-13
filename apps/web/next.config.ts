import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@grocery-multibanner/theme-tokens',
    '@grocery-multibanner/shared-ui',
    '@grocery-multibanner/cms-adapters',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

export default nextConfig
