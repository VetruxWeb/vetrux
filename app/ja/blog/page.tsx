import type { Metadata } from 'next'
import { buildBlogListingMetadata, renderBlogListing } from '@/lib/articlePages'

export async function generateMetadata(): Promise<Metadata> {
  return buildBlogListingMetadata('ja')
}

export default function BlogPage() {
  return renderBlogListing('ja')
}