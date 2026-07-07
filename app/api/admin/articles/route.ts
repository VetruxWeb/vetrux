import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'
import { createArticleSchema } from '@/lib/admin/validators'

export async function GET() {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { data: articles } = await supabaseAdmin
    .from('Article')
    .select('*')
    .order('publishedAt', { ascending: false })

  if (!articles) return NextResponse.json([])

  const ids = articles.map((a) => a.id)
  const { data: translations } = await supabaseAdmin
    .from('ArticleTranslation')
    .select('*')
    .in('articleId', ids)

  const result = articles.map((a) => ({
    ...a,
    translations: (translations || []).filter((t) => t.articleId === a.id),
  }))

  return NextResponse.json(result)
}

export async function POST(request: Request) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const body = await request.json()
  const parsed = createArticleSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { slug, status, category, image, size, publishedAt, translations } = parsed.data

  const { data: existing } = await supabaseAdmin
    .from('Article')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Article with this slug already exists' }, { status: 409 })
  }

  const { data: article, error } = await supabaseAdmin
    .from('Article')
    .insert({
      id: crypto.randomUUID(),
      slug,
      status,
      category,
      image,
      size,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single()

  if (error || !article) {
    return NextResponse.json({ error: error?.message || 'Failed to create article' }, { status: 500 })
  }

  if (translations && translations.length > 0) {
    await supabaseAdmin.from('ArticleTranslation').insert(
      translations.map((t) => ({ ...t, id: crypto.randomUUID(), articleId: article.id }))
    )
  }

  const { data: createdTranslations } = await supabaseAdmin
    .from('ArticleTranslation')
    .select('*')
    .eq('articleId', article.id)

  return NextResponse.json({ ...article, translations: createdTranslations || [] }, { status: 201 })
}
