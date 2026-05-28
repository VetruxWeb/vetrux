import { requireAuth } from '@/lib/admin/requireAuth'
import { supabaseAdmin } from '@/lib/supabase'
import AdminShell from '@/components/admin/AdminShell'
import ArticlesContent from '@/components/admin/ArticlesContent'

export default async function ArticlesPage() {
  await requireAuth()

  const { data: articles } = await supabaseAdmin
    .from('Article')
    .select('*')
    .order('publishedAt', { ascending: false })

  const ids = (articles || []).map((a) => a.id)
  const { data: translations } = ids.length > 0
    ? await supabaseAdmin.from('ArticleTranslation').select('*').in('articleId', ids).eq('locale', 'en')
    : { data: [] }

  const articlesWithTitles = (articles || []).map((a) => ({
    id: a.id,
    title: (translations || []).find((t) => t.articleId === a.id)?.title || a.slug,
    slug: a.slug,
    category: a.category,
    status: a.status,
    publishedAt: a.publishedAt,
  }))

  return (
    <AdminShell>
      <ArticlesContent articles={articlesWithTitles} />
    </AdminShell>
  )
}
