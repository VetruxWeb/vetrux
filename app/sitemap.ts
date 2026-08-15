import type { MetadataRoute } from 'next'
import {
  getAllArticleSlugs,
  getArticle,
  getArticleLocales,
} from '@/content/articles'
import { getProductSlugs } from '@/content/pages/products.data'
import { gallerySlugs } from '@/lib/gallery'
import {
  locales,
  localeMeta,
  localizePath,
  localizedRoutes,
  type Locale,
} from '@/i18n/locales'

const BASE_URL = 'https://www.vetrux.tech'
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Self-referencing, reciprocal hreflang cluster. Only locales with real
 * localized content are advertised; x-default always points at the canonical
 * English URL.
 */
function buildAlternates(
  path: string,
  availableLocales: readonly Locale[],
): MetadataRoute.Sitemap[number]['alternates'] {
  const languages: Record<string, string> = {}
  for (const locale of availableLocales) {
    languages[localeMeta[locale].hreflang] = `${BASE_URL}${localizePath(path, locale)}`
  }
  languages['x-default'] = `${BASE_URL}${path}`
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static localized routes (including the products listing) — every locale.
  for (const path of [...localizedRoutes, '/products'] as const) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}${localizePath(path, locale)}`,
        alternates: buildAlternates(path, locales),
      })
    }
  }

  // Gallery sector pages — every locale.
  for (const slug of gallerySlugs) {
    const path = `/gallery/${slug}`
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}${localizePath(path, locale)}`,
        alternates: buildAlternates(path, locales),
      })
    }
  }

  // Articles — one entry per locale that actually has content. lastModified is
  // emitted only when the frontmatter date is a full ISO date; ambiguous dates
  // are omitted rather than replaced with "today".
  for (const slug of getAllArticleSlugs()) {
    const availableLocales = getArticleLocales(slug)
    for (const locale of availableLocales) {
      const article = getArticle(slug, locale)
      if (!article) continue
      const entry: MetadataRoute.Sitemap[number] = {
        url: `${BASE_URL}${localizePath(`/blog/${slug}`, locale)}`,
        alternates: buildAlternates(`/blog/${slug}`, availableLocales),
      }
      if (ISO_DATE_RE.test(article.date)) {
        entry.lastModified = article.date
      }
      entries.push(entry)
    }
  }

  // Products — both canonical slugs, every locale (all localized variants exist).
  for (const slug of getProductSlugs()) {
    const path = `/products/${slug}`
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}${localizePath(path, locale)}`,
        alternates: buildAlternates(path, locales),
      })
    }
  }

  return entries
}
