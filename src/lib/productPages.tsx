// src/lib/productPages.tsx
// Shared server-side implementation for the product listing and product
// detail routes in all eight locales. Every locale page is a thin wrapper
// around the functions in this module.

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProductBySlug, getProductSlugs, getProducts } from '@/content/pages/products.data'
import { buildMetadata, buildProductJsonLd, buildProductMetadata } from '@/lib/seo'
import { productsPageStrings } from '@/content/pages/products.content'
import ProductDetailClient from '@/components/pages/ProductDetailClient'
import type { Locale } from '@/i18n/locales'

/** Static params for product detail routes — the two canonical slugs only. */
export function generateProductStaticParams(): { slug: string }[] {
  return getProductSlugs().map((slug) => ({ slug }))
}

/** Metadata for a localized products listing page. */
export function buildProductsListingMetadata(locale: Locale): Metadata {
  return buildMetadata('/products', locale)
}

/** Metadata for a localized product detail page. */
export function buildProductDetailMetadata(slug: string, locale: Locale): Metadata {
  return buildProductMetadata(slug, locale)
}

/** Render the localized products listing. */
export function renderProductsListing(locale: Locale) {
  const products = getProducts(locale)
  const t = productsPageStrings[locale]
  const langPrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <div className="bg-surface">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">{t.eyebrow}</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-on-background sm:text-4xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`${langPrefix}/products/${product.slug}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-soft hover:shadow-card transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <div className="aspect-[16/9] flex items-center justify-center overflow-hidden bg-surface-dim/30 p-8">
                <div className="relative w-full h-full">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl font-bold text-on-background">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="mt-2 text-sm text-on-surface-variant line-clamp-2">
                    {product.description}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center text-sm font-medium text-accent group-hover:text-accent-hover">
                  {t.viewDetails} <ArrowRight size={14} className="ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

/** Render a localized product detail page, or null for unknown slugs. */
export function renderProductDetail(slug: string, locale: Locale) {
  const product = getProductBySlug(slug, locale)
  if (!product) return null

  const schemas = buildProductJsonLd({
    slug: product.slug,
    name: product.name,
    description: product.description,
    image: product.heroImage ?? product.images[0],
    category: product.category,
    specs: product.specs,
    locale,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ProductDetailClient product={product} locale={locale} />
    </>
  )
}
