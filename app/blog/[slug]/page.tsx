import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  buildBlogArticleMetadata,
  generateArticleStaticParams,
  renderBlogArticle,
} from '@/lib/articlePages'

const LOCALE = 'en' as const

export const dynamicParams = false

export function generateStaticParams() {
  return generateArticleStaticParams(LOCALE)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return buildBlogArticleMetadata(slug, LOCALE)
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const view = renderBlogArticle(slug, LOCALE)
  if (!view) notFound()
  return view
}
