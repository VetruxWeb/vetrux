import type { Metadata } from 'next'
import { buildProductsListingMetadata, renderProductsListing } from '@/lib/productPages'

export async function generateMetadata(): Promise<Metadata> {
  return buildProductsListingMetadata('es')
}

export default function ProductsPage() {
  return renderProductsListing('es')
}