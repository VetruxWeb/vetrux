import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts } from '@/lib/products'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/products', 'fr')
}

export default async function ProductsPage() {
  const products = await getAllProducts('fr')

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Our Products
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-on-background sm:text-4xl">
          CBD Raw Materials for B2B Supply
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {products.map((product) => {
          const t = product.translations[0]
          if (!t) return null
          return (
            <Link
              key={product.id}
              href={`/fr/products/${product.slug}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-soft transition-shadow hover:shadow-card"
            >
              {product.heroImage && (
                <div className="aspect-[16/9] overflow-hidden bg-surface-dim">
                  <img
                    src={product.heroImage}
                    alt={t.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                {t.badge && (
                  <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                    {t.badge}
                  </span>
                )}
                <h2 className="mt-3 font-display text-xl font-bold text-on-background">
                  {t.name}
                </h2>
                {t.heroBody && (
                  <p className="mt-2 line-clamp-3 text-sm text-on-surface-variant">
                    {t.heroBody}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center text-sm font-medium text-accent group-hover:text-accent-hover">
                  View Details →
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
