export const adminConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Vetrux',
  locales: ['en', 'de', 'fr', 'es', 'it', 'pt', 'ja', 'fi'] as const,
  defaultLocale: 'en' as const,
  mediaProvider: 'vercel-blob' as const,
  statuses: {
    product: ['draft', 'published'] as const,
    article: ['draft', 'published'] as const,
    inquiry: ['new', 'read', 'replied', 'archived'] as const,
  },
}

export type AdminLocale = (typeof adminConfig.locales)[number]
