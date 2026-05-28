import { supabaseAdmin } from './supabase'
import type { Locale } from '@/i18n/locales'

export async function getArticleBySlugFromDb(slug: string, locale: Locale = 'en') {
  const { data: article } = await supabaseAdmin
    .from('Article')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!article) return null

  const { data: translations } = await supabaseAdmin
    .from('ArticleTranslation')
    .select('*')
    .eq('articleId', article.id)
    .eq('locale', locale)

  if (!translations || translations.length === 0) return null

  return { meta: article, translation: translations[0] }
}

export async function getAllArticlesFromDb(locale: Locale = 'en') {
  const { data: articles } = await supabaseAdmin
    .from('Article')
    .select('*')
    .eq('status', 'published')
    .order('publishedAt', { ascending: false })

  if (!articles || articles.length === 0) return []

  const ids = articles.map((a) => a.id)
  const { data: translations } = await supabaseAdmin
    .from('ArticleTranslation')
    .select('*')
    .in('articleId', ids)
    .eq('locale', locale)

  return articles
    .filter((a) => (translations || []).some((t) => t.articleId === a.id))
    .map((a) => {
      const t = (translations || []).find((t) => t.articleId === a.id)!
      return {
        slug: a.slug,
        title: t.title,
        excerpt: t.excerpt || '',
        category: a.category || '',
        date: a.publishedAt ? a.publishedAt.split('T')[0] : '',
        readTime: t.readTime || '',
        image: a.image || '',
        size: (a.size || 'normal') as 'normal' | 'large',
      }
    })
}

export async function getAllArticleSlugs() {
  const { data } = await supabaseAdmin
    .from('Article')
    .select('slug')
    .eq('status', 'published')

  return data || []
}
