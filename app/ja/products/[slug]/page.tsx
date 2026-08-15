import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  buildProductDetailMetadata,
  generateProductStaticParams,
  renderProductDetail,
} from '@/lib/productPages'

const LOCALE = 'ja' as const

export const dynamicParams = false

export function generateStaticParams() {
  return generateProductStaticParams()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return buildProductDetailMetadata(slug, LOCALE)
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const view = renderProductDetail(slug, LOCALE)
  if (!view) notFound()
  return view
}
