import { requireAuth } from '@/lib/admin/requireAuth'
import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import ArticleForm from '@/components/admin/ArticleForm'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth()
  const { id } = await params

  const { data: article } = await supabaseAdmin
    .from('Article')
    .select('*')
    .eq('id', id)
    .single()

  if (!article) notFound()

  const { data: translations } = await supabaseAdmin
    .from('ArticleTranslation')
    .select('*')
    .eq('articleId', id)

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Edit Article</h1>
        <ArticleForm article={{ ...article, translations: translations || [] }} />
      </div>
    </AdminShell>
  )
}
