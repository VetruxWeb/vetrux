import type { Metadata } from 'next'
import { buildBlogListingMetadata, renderBlogListing } from '@/lib/articlePages'

export async function generateMetadata(): Promise<Metadata> {
  return buildBlogListingMetadata('de')
}

export default function BlogPage() {
  return renderBlogListing('de')
}