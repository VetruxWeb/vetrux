import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'
import { updateProductSchema } from '@/lib/admin/validators'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  const { data: product } = await supabaseAdmin
    .from('Product')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const [
    { data: translations },
    { data: specs },
    { data: faqs },
    { data: steps },
    { data: metrics },
    { data: packaging },
    { data: compliance },
    { data: documents },
  ] = await Promise.all([
    supabaseAdmin.from('ProductTranslation').select('*').eq('productId', id),
    supabaseAdmin.from('ProductSpec').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductFaq').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductStep').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductMetric').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductPackaging').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductCompliance').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductDocument').select('*').eq('productId', id).order('order'),
  ])

  return NextResponse.json({
    ...product,
    translations: translations || [],
    specs: specs || [],
    faqs: faqs || [],
    steps: steps || [],
    metrics: metrics || [],
    packaging: packaging || [],
    compliance: compliance || [],
    documents: documents || [],
  })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  const body = await request.json()
  const parsed = updateProductSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { status, heroImage, images, order, translations } = parsed.data

  const updateData: Record<string, unknown> = { updatedAt: new Date().toISOString() }
  if (status !== undefined) updateData.status = status
  if (heroImage !== undefined) updateData.heroImage = heroImage
  if (images !== undefined) updateData.images = images
  if (order !== undefined) updateData.order = order

  await supabaseAdmin.from('Product').update(updateData).eq('id', id)

  if (translations && translations.length > 0) {
    for (const t of translations) {
      const { data: existing } = await supabaseAdmin
        .from('ProductTranslation')
        .select('id')
        .eq('productId', id)
        .eq('locale', t.locale)
        .single()

      if (existing) {
        await supabaseAdmin.from('ProductTranslation').update(t).eq('id', existing.id)
      } else {
        await supabaseAdmin.from('ProductTranslation').insert({ ...t, productId: id })
      }
    }
  }

  const { data: updated } = await supabaseAdmin
    .from('Product')
    .select('*')
    .eq('id', id)
    .single()

  const { data: updatedTranslations } = await supabaseAdmin
    .from('ProductTranslation')
    .select('*')
    .eq('productId', id)

  return NextResponse.json({ ...updated, translations: updatedTranslations || [] })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { id } = await params
  await supabaseAdmin.from('Product').delete().eq('id', id)

  return NextResponse.json({ success: true })
}
