'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { breadcrumbStrings } from '@/content/pages/breadcrumb.content'
import type { BreadcrumbStrings } from '@/content/pages/breadcrumb.content'
import type { Locale } from '@/i18n/locales'
import generatedArticleTitles from '@/content/articles/generated-breadcrumb-titles.json'

/**
 * Breadcrumb design:
 *   — Top-level nav items are treated as category roots (not children of "Home").
 *   — When the current route IS a top-level nav root, we render nothing.
 *   — When the current route is a sub-page, we render "[Category] > [Self]".
 *   — Orphan routes (privacy, terms, etc.) render nothing.
 *   — All visible labels are localized per route locale.
 */

type Crumb = { label: string; href?: string; itemHref: string }

const siteUrl = 'https://www.vetrux.tech'

interface CategoryDef {
  /** i18n key for the category label */
  labelKey: keyof BreadcrumbStrings
  /** href the category label links to, or null if it is a non-route dropdown label */
  href: string | null
  /** URL path used only for structured data when the visible category is not linked */
  structuredPath?: string
  /** child routes belonging to this category (i18n key → route) */
  children: Record<string, keyof BreadcrumbStrings>
}
function buildCategories(): CategoryDef[] {
  return [
    {
      labelKey: 'products',
      href: '/products',
      children: {
        '/wholesale-cbd-isolate': 'wholesaleCbdIsolate',
      },
    },
    {
      labelKey: 'process',
      href: '/process',
      children: {
        '/planting': 'cultivation',
        '/equipment': 'extraction',
        '/quality-assurance': 'qualityAssurance',
      },
    },
    {
      labelKey: 'gallery',
      href: '/gallery',
      children: {
        '/gallery/campus': 'campus',
        '/gallery/cultivation': 'plantingBase',
        '/gallery/extraction': 'extractionRefinement',
        '/gallery/products': 'productLaboratory',
      },
    },
    {
      labelKey: 'blog',
      href: '/blog',
      // blog/[slug] handled dynamically via pathname startsWith match
      children: {},
    },
    {
      labelKey: 'about',
      href: null,
      structuredPath: '/about',
      children: {
        '/about': 'company',
        '/cbd-isolate-manufacturer': 'manufacturerProfile',
      },
    },
  ]
}

/** Routes where breadcrumb is hidden — only the homepage. */
const rootRoutes = new Set<string>(['/'])

/** Routes that are deliberately orphaned (footer-linked legal pages). */
const orphanRoutes = new Set<string>(['/privacy-policy', '/terms-of-service'])

/** Top-level nav pages — shown as "Home > Self" */
function buildTopLevelPages(t: BreadcrumbStrings): Record<string, string> {
  return {
    '/products': t.products,
    '/process': t.process,
    '/gallery': t.gallery,
    '/blog': t.blog,
    '/inquiry': t.inquiry,
    '/planting': t.cultivation,
    '/equipment': t.equipment,
  }
}

function findCategoryForPath(
  normalizedPath: string,
  categories: CategoryDef[],
  t: BreadcrumbStrings,
  locale: Locale,
): { category: CategoryDef; selfLabel: string; parent?: { label: string; href: string } } | null {
  // /blog/[slug] → Blog category, self = slug-derived label
  if (normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog') {
    const blogCat = categories.find((c) => c.labelKey === 'blog')!
    const slug = normalizedPath.replace('/blog/', '')
    const selfLabel = (generatedArticleTitles as Record<Locale, Record<string, string>>)[locale]?.[slug] ?? slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (ch) => ch.toUpperCase())
    return { category: blogCat, selfLabel }
  }

  // /products/[slug] → Products > Product Name (derived from slug)
  if (normalizedPath.startsWith('/products/') && normalizedPath !== '/products') {
    const productsCat = categories.find((c) => c.labelKey === 'products')!
    const slug = normalizedPath.replace('/products/', '')
    const productLabels: Record<string, string> = {
      'cbd-isolate': t.cbdIsolate,
      'cbd-oil': t.cbdOil,
    }
    const selfLabel = productLabels[slug] ?? slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (ch) => ch.toUpperCase())
    return { category: productsCat, selfLabel }
  }

  for (const cat of categories) {
    const childLabelKey = cat.children[normalizedPath]
    if (childLabelKey) {
      return { category: cat, selfLabel: t[childLabelKey] }
    }
  }

  return null
}

export default function Breadcrumb() {
  const pathname = usePathname()

  // Strip locale prefix (/de, /fr, /es, /it, /pt, /ja, /fi).
  const localeMatch = pathname.match(/^\/(de|fr|es|it|pt|ja|fi)(\/|$)/)
  const langPrefix = localeMatch ? `/${localeMatch[1]}` : ''
  const locale = (localeMatch?.[1] ?? 'en') as Locale
  const t = breadcrumbStrings[locale]
  const categories = buildCategories()
  const normalized = langPrefix ? pathname.slice(langPrefix.length) || '/' : pathname

  // Hide on: homepage, orphan routes.
  if (rootRoutes.has(normalized)) return null
  if (orphanRoutes.has(normalized)) return null

  const crumbs: Crumb[] = []
  const topLevelPages = buildTopLevelPages(t)

  // Check if it's a top-level page (Home > Self)
  const topLevel = topLevelPages[normalized]
  const found = findCategoryForPath(normalized, categories, t, locale)

  if (topLevel && !found) {
    // Top-level nav page: Home > Self
    crumbs.push({
      label: t.home,
      href: langPrefix || '/',
      itemHref: `${siteUrl}${langPrefix || '/'}`,
    })
    crumbs.push({
      label: topLevel,
      itemHref: `${siteUrl}${pathname}`,
    })
  } else if (found) {
    // Sub-page: Home > Category > [Parent] > Self
    const { category, selfLabel, parent } = found
    const categoryPath = category.href ?? category.structuredPath
    const categoryLabel = t[category.labelKey]

    crumbs.push({
      label: t.home,
      href: langPrefix || '/',
      itemHref: `${siteUrl}${langPrefix || '/'}`,
    })
    crumbs.push({
      label: categoryLabel,
      href: category.href ? langPrefix + category.href : undefined,
      itemHref: `${siteUrl}${langPrefix}${categoryPath ?? normalized}`,
    })
    if (parent) {
      crumbs.push({
        label: parent.label,
        href: langPrefix + parent.href,
        itemHref: `${siteUrl}${langPrefix}${parent.href}`,
      })
    }
    crumbs.push({
      label: selfLabel,
      itemHref: `${siteUrl}${pathname}`,
    })
  } else {
    return null
  }

  return (
    <nav
      aria-label={t.ariaLabel}
      className="relative z-10 max-w-container mx-auto px-6 lg:px-12 pt-2 pb-4"
    >
      <ol
        className="flex items-center gap-1 text-[11px] text-on-surface-variant"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li
              key={`${i}-${crumb.label}`}
              className="flex items-center gap-1"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <link itemProp="item" href={crumb.itemHref} />
              {isLast ? (
                <span className="font-semibold text-on-surface" itemProp="name">
                  {crumb.label}
                </span>
              ) : (
                <>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
                    >
                      <span itemProp="name">{crumb.label}</span>
                    </Link>
                  ) : (
                    <span className="text-on-surface-variant/70" itemProp="name">
                      {crumb.label}
                    </span>
                  )}
                  <ChevronRight
                    size={12}
                    className="text-on-surface-variant/40"
                    aria-hidden="true"
                  />
                </>
              )}
              <meta itemProp="position" content={String(i + 1)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
