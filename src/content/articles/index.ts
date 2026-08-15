// src/content/articles/index.ts
// Local-first article registry.
//
// Content files live in this directory:
//   <slug>.md          → English article (canonical)
//   <slug>.<locale>.md → fully localized variant (locale ∈ de/fr/es/it/pt/ja/fi)
//
// Enumeration is deterministic: a prebuild script snapshots every *.md file
// into generated-articles.json, then this module registers the slug declared
// in frontmatter. This avoids runtime filesystem access and keeps deployment
// tracing scoped to the content that is actually used. Localized routes only
// exist for locales that actually have a file — there is no silent fallback
// to English content beneath a non-English URL.
//
// Dates are normalized to ISO 8601 (YYYY-MM-DD). Ambiguous values such as
// "May 2026" or "2024" are normalized to the first day of the period; values
// that cannot be parsed are preserved verbatim and omitted from the sitemap.

import generatedArticleFiles from './generated-articles.json'
import { locales, type Locale } from '@/i18n/locales'

export interface Article {
  slug: string
  category: string
  title: string
  excerpt: string
  /** ISO 8601 date (YYYY-MM-DD). */
  date: string
  /** Raw read time, e.g. "9 min". Localized label suffixes are applied by the UI. */
  readTime: string
  /** Repository-local public image path, e.g. `/images/articles/<slug>.webp`. */
  image: string
  /** Localized alternative text for the hero image. */
  imageAlt: string
  size: 'normal' | 'large'
  locale: Locale
}

export interface LocalizedArticle extends Article {
  content: string
}

// ── Frontmatter parsing ──────────────────────────────────────────────────────

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const result: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
    if (key) result[key] = val
  }
  return result
}

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

const MONTH_INDEX: Record<string, string> = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
}

/** Normalize frontmatter dates to ISO YYYY-MM-DD where possible. */
export function normalizeArticleDate(value: string): string {
  const trimmed = value.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed
  const yearOnly = trimmed.match(/^(\d{4})$/)
  if (yearOnly) return `${yearOnly[1]}-01-01`
  const monthYear = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (monthYear) {
    const month = MONTH_INDEX[monthYear[1].toLowerCase()]
    if (month) return `${monthYear[2]}-${month}-01`
  }
  return trimmed
}

// ── Deterministic enumeration ────────────────────────────────────────────────

const localizedLocales = locales.filter((locale) => locale !== 'en')
const articleImageVersion = '20260815-photoreal'

/**
 * Keep article image URLs cache-safe when the photography collection is
 * replaced without changing the human-readable asset filenames.
 */
function versionArticleImage(image: string): string {
  if (!image.startsWith('/images/articles/')) return image
  return `${image}?v=${articleImageVersion}`
}

function isLocalizedLocale(value: string): value is Exclude<Locale, 'en'> {
  return (localizedLocales as readonly string[]).includes(value)
}

interface ArticleFileEntry {
  slug: string
  locale: Locale
  filename: string
  raw: string
}

/** Enumerate every article file once, keyed by slug::locale (deterministic). */
function enumerateArticleFiles(): ArticleFileEntry[] {
  const seen = new Map<string, { filename: string; raw: string }>()

  for (const { filename, raw } of generatedArticleFiles) {
    const fm = parseFrontmatter(raw)
    const slug = (fm.slug ?? '').trim()
    if (!slug) {
      console.warn(`[articles] skipping "${filename}": no frontmatter slug`)
      continue
    }

    let locale: Locale = 'en'
    const suffixMatch = filename.match(/\.([a-z]{2})\.md$/)
    if (suffixMatch && isLocalizedLocale(suffixMatch[1])) {
      locale = suffixMatch[1]
    }

    const key = `${slug}::${locale}`
    const previous = seen.get(key)
    if (previous) {
      console.warn(
        `[articles] duplicate "${key}": keeping "${previous.filename}", ignoring "${filename}"`,
      )
      continue
    }
    seen.set(key, { filename, raw })
  }

  return Array.from(seen.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, file]) => {
      const [slug, locale] = key.split('::')
      return { slug, locale: locale as Locale, filename: file.filename, raw: file.raw }
    })
}

function readLocalizedArticle(entry: ArticleFileEntry): LocalizedArticle {
  const raw = entry.raw
  const fm = parseFrontmatter(raw)
  const size = fm.size === 'large' ? 'large' : 'normal'
  const readTime = (fm.readTime ?? '').trim().replace(/\s+Read$/i, '')
  return {
    slug: entry.slug,
    locale: entry.locale,
    category: fm.category ?? 'Insight',
    title: fm.title ?? entry.slug,
    excerpt: fm.excerpt ?? '',
    date: normalizeArticleDate(fm.date ?? ''),
    readTime,
    image: versionArticleImage(fm.image ?? ''),
    imageAlt: fm.imageAlt ?? fm.title ?? entry.slug,
    size,
    content: stripFrontmatter(raw),
  }
}

// ── Registry ─────────────────────────────────────────────────────────────────

const registry: LocalizedArticle[] = enumerateArticleFiles().map(readLocalizedArticle)

/** Every localized variant of every article. */
export function getAllLocalizedArticles(): LocalizedArticle[] {
  return registry
}

/** All articles available in a given locale, newest first. */
export function getArticlesForLocale(locale: Locale): Article[] {
  return registry
    .filter((article) => article.locale === locale)
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
    )
}

/** Exact-locale lookup. Returns null when the locale file does not exist. */
export function getArticle(slug: string, locale: Locale): LocalizedArticle | null {
  return registry.find((article) => article.slug === slug && article.locale === locale) ?? null
}

/** Locales that have a real localized file for this slug (always includes 'en' when the article exists). */
export function getArticleLocales(slug: string): Locale[] {
  return locales.filter((locale) =>
    registry.some((article) => article.slug === slug && article.locale === locale),
  )
}

/** All unique article slugs, sorted. */
export function getAllArticleSlugs(): string[] {
  return Array.from(new Set(registry.map((article) => article.slug))).sort()
}

/** Slugs that have a variant in the given locale. */
export function getArticleSlugsForLocale(locale: Locale): string[] {
  return registry
    .filter((article) => article.locale === locale)
    .map((article) => article.slug)
    .sort()
}
