import type { MetadataRoute } from 'next'
import { articles } from '@/content/articles'
import { gallerySlugs } from '@/lib/gallery'
import { getPublishedSlugs } from '@/lib/productData'
import { getAllArticleSlugs } from '@/lib/articlesDb'
import { locales, localeMeta, localizePath, localizedRoutes } from '@/i18n/locales'

const BASE_URL = 'https://www.vetrux.tech'

const legalPages = new Set(['/privacy-policy', '/terms-of-service'])

function buildAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[localeMeta[locale].hreflang] = `${BASE_URL}${localizePath(path, locale)}`
  }
  languages['x-default'] = `${BASE_URL}${path}`
  return languages
}

function getRoutePriority(path: string): number {
  if (path === '/') return 1.0
  if (path === '/wholesale-cbd-isolate') return 0.9
  if (path === '/quality-assurance' || path === '/cbd-isolate-manufacturer') return 0.8
  if (legalPages.has(path)) return 0.3
  return 0.7
}

function getRouteChangeFrequency(path: string): 'weekly' | 'monthly' | 'yearly' {
  if (path === '/' || path === '/blog') return 'weekly'
  if (legalPages.has(path)) return 'yearly'
  return 'monthly'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split('T')[0]

  const localizedStaticRoutes: MetadataRoute.Sitemap = localizedRoutes.flatMap((path) => {
    const priority = getRoutePriority(path)
    const changeFrequency = getRouteChangeFrequency(path)
    const alternates = { languages: buildAlternates(path) }

    return locales.map((locale) => ({
      url: `${BASE_URL}${localizePath(path, locale)}`,
      lastModified: today,
      changeFrequency,
      priority: locale === 'en' ? priority : Math.max(priority - 0.1, 0.2),
      alternates,
    }))
  })

  const gallerySectorRoutes: MetadataRoute.Sitemap = gallerySlugs.flatMap((slug) => {
    const path = `/gallery/${slug}`
    const alternates = { languages: buildAlternates(path) }

    return locales.map((locale) => ({
      url: `${BASE_URL}${localizePath(path, locale)}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.6 : 0.5,
      alternates,
    }))
  })

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Merge DB-backed article slugs (published) not present in static files.
  const staticArticleSlugs = new Set(articles.map((a) => a.slug))
  const dbArticleSlugs = await getAllArticleSlugs().catch(() => [])
  const dbArticleRoutes: MetadataRoute.Sitemap = dbArticleSlugs
    .filter((row) => row.slug && !staticArticleSlugs.has(row.slug))
    .map((row) => ({
      url: `${BASE_URL}/blog/${row.slug}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Products: the /products listing + every published product detail page, in all 8 locales.
  const productSlugs = await getPublishedSlugs().catch(() => [])
  const productListAlternates = { languages: buildAlternates('/products') }
  const productRoutes: MetadataRoute.Sitemap = [
    ...locales.map((locale) => ({
      url: `${BASE_URL}${localizePath('/products', locale)}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.7 : 0.6,
      alternates: productListAlternates,
    })),
    ...productSlugs.flatMap((row) => {
      const path = `/products/${row.slug}`
      const alternates = { languages: buildAlternates(path) }
      return locales.map((locale) => ({
        url: `${BASE_URL}${localizePath(path, locale)}`,
        lastModified: today,
        changeFrequency: 'monthly' as const,
        priority: locale === 'en' ? 0.7 : 0.6,
        alternates,
      }))
    }),
  ]

  return [
    ...localizedStaticRoutes,
    ...gallerySectorRoutes,
    ...articleRoutes,
    ...dbArticleRoutes,
    ...productRoutes,
  ]
}
