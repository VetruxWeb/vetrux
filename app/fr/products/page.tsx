import type { Metadata } from 'next'
import { buildProductsListingMetadata, renderProductsListing } from '@/lib/productPages'

export async function generateMetadata(): Promise<Metadata> {
  return buildProductsListingMetadata('fr')
}

export default function ProductsPage() {
  return renderProductsListing('fr')
}