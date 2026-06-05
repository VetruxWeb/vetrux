import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getPublishedProducts } from '@/lib/productData'
import { productsPageStrings } from '@/content/pages/products.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/products', 'it')
}

export default async function ProductsPage() {
  const products = await getPublishedProducts('it');
  const t = productsPageStrings['it'];

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
              key={product.id}
              href={`/it/products/${product.slug}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="aspect-[16/9] flex items-center justify-center overflow-hidden bg-surface-dim/30 p-8">
                <div className="relative w-full h-full">
                  {product.heroImage && (
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
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
