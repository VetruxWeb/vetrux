import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'
import { updateArticleSchema } from '@/lib/admin/validators'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  const { data: article } = await supabaseAdmin
    .from('Article')
    .select('*')
    .eq('id', id)
    .single()

  if (!article) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { data: translations } = await supabaseAdmin
    .from('ArticleTranslation')
    .select('*')
    .eq('articleId', id)

  return NextResponse.json({ ...article, translations: translations || [] })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  const body = await request.json()
  const parsed = updateArticleSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { status, category, image, size, publishedAt, translations } = parsed.data

  const updateData: Record<string, unknown> = { updatedAt: new Date().toISOString() }
  if (status !== undefined) updateData.status = status
  if (category !== undefined) updateData.category = category
  if (image !== undefined) updateData.image = image
  if (size !== undefined) updateData.size = size
  if (publishedAt !== undefined) updateData.publishedAt = new Date(publishedAt).toISOString()

  await supabaseAdmin.from('Article').update(updateData).eq('id', id)

  if (translations && translations.length > 0) {
    for (const t of translations) {
      const { data: existing } = await supabaseAdmin
        .from('ArticleTranslation')
        .select('id')
        .eq('articleId', id)
        .eq('locale', t.locale)
        .single()

      if (existing) {
        await supabaseAdmin.from('ArticleTranslation').update(t).eq('id', existing.id)
      } else {
        await supabaseAdmin.from('ArticleTranslation').insert({ ...t, id: crypto.randomUUID(), articleId: id })
      }
    }
  }

  const { data: updated } = await supabaseAdmin
    .from('Article')
    .select('*')
    .eq('id', id)
    .single()

  const { data: updatedTranslations } = await supabaseAdmin
    .from('ArticleTranslation')
    .select('*')
    .eq('articleId', id)

  return NextResponse.json({ ...updated, translations: updatedTranslations || [] })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  await supabaseAdmin.from('Article').delete().eq('id', id)

  return NextResponse.json({ success: true })
}
