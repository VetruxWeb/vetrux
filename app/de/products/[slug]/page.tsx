import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProductSlugs } from '@/lib/products'
import { buildMetadata } from '@/lib/seo'
import ProductPageClient from '@/components/pages/ProductPageClient'

export async function generateStaticParams() {
  const products = await getAllProductSlugs()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return buildMetadata(`/products/${slug}`, 'de')
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug, 'de')
  if (!product) notFound()

  return <ProductPageClient product={product} locale="de" />
}
