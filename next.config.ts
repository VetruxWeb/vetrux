import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 301-redirect legacy /insights URLs (renamed to /blog) so indexed links don't 404.
  async redirects() {
    return [
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
  outputFileTracingIncludes: {
    '/blog': ['./src/content/articles/*.md'],
    '/blog/[slug]': ['./src/content/articles/*.md'],
    '/de/blog': ['./src/content/articles/*.md'],
    '/de/blog/[slug]': ['./src/content/articles/*.md'],
    '/fr/blog': ['./src/content/articles/*.md'],
    '/fr/blog/[slug]': ['./src/content/articles/*.md'],
    '/es/blog': ['./src/content/articles/*.md'],
    '/es/blog/[slug]': ['./src/content/articles/*.md'],
    '/it/blog': ['./src/content/articles/*.md'],
    '/it/blog/[slug]': ['./src/content/articles/*.md'],
    '/pt/blog': ['./src/content/articles/*.md'],
    '/pt/blog/[slug]': ['./src/content/articles/*.md'],
    '/ja/blog': ['./src/content/articles/*.md'],
    '/ja/blog/[slug]': ['./src/content/articles/*.md'],
    '/fi/blog': ['./src/content/articles/*.md'],
    '/fi/blog/[slug]': ['./src/content/articles/*.md'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
