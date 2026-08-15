// src/lib/articlePages.tsx
// Shared server-side implementation for the blog listing and article detail
// routes in all eight locales. Every locale page is a thin wrapper around the
// functions in this module, so localized routes cannot drift from the English
// implementation.

import type { Metadata } from 'next'
import {
  getArticle,
  getArticleLocales,
  getArticlesForLocale,
  getArticleSlugsForLocale,
  type LocalizedArticle,
} from '@/content/articles'
import { buildArticleJsonLd, buildArticleMetadata, buildMetadata } from '@/lib/seo'
import ArticlePageClient from '@/components/pages/ArticlePageClient'
import InsightsPageClient from '@/components/pages/InsightsPageClient'
import type { Locale } from '@/i18n/locales'

/** Static params for a locale's blog detail routes (only locales with real content). */
export function generateArticleStaticParams(locale: Locale): { slug: string }[] {
  return getArticleSlugsForLocale(locale).map((slug) => ({ slug }))
}

/** Metadata for a localized blog listing page. */
export function buildBlogListingMetadata(locale: Locale): Metadata {
  return buildMetadata('/blog', locale)
}

/** Metadata for a localized article detail page. */
export function buildBlogArticleMetadata(slug: string, locale: Locale): Metadata {
  return buildArticleMetadata(slug, locale)
}

/** Render the localized blog listing. */
export function renderBlogListing(locale: Locale) {
  const articles = getArticlesForLocale(locale)
  return <InsightsPageClient articles={articles} locale={locale} />
}

/**
 * Render a localized article detail page, or null when the article has no
 * real content in this locale (the caller maps null to notFound()).
 */
export function renderBlogArticle(slug: string, locale: Locale) {
  const article = getArticle(slug, locale)
  if (!article) return null

  // Visible content only: Article + BreadcrumbList structured data. The FAQ
  // accordion is rendered on the page but is not emitted as FAQPage JSON-LD,
  // because Google deprecated FAQ rich results.
  const schemas: Record<string, unknown>[] = buildArticleJsonLd({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image || undefined,
    datePublished: article.date,
    locale,
  })

  const availableLocales = getArticleLocales(article.slug).join(',')

  return (
    <div data-locales={availableLocales}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ArticlePageClient meta={article} content={article.content} locale={locale} />
    </div>
  )
}

export type { LocalizedArticle }
