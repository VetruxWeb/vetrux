import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 301-redirect legacy /insights URLs (renamed to /blog) so indexed links don't 404.
  async redirects() {
    return [
      {
        source: '/blog/how-to-read-cbd-certificate-of-analysis',
        destination: '/blog/how-to-read-cbd-certificate-of-analysis-guide',
        permanent: true,
      },
      {
        source: '/insights',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/insights/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      {
        source: '/:locale(de|fr|es|it|pt|ja|fi)/insights',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/:locale(de|fr|es|it|pt|ja|fi)/insights/:slug*',
        destination: '/:locale/blog/:slug*',
        permanent: true,
      },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/images/articles/**',
        search: '?v=20260815-photoreal',
      },
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
