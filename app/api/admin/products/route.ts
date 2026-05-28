import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { apiAuth } from '@/lib/admin/apiAuth'
import { createProductSchema } from '@/lib/admin/validators'

export async function GET() {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const { data: products } = await supabaseAdmin
    .from('Product')
    .select('*')
    .order('order')

  if (!products) return NextResponse.json([])

  const ids = products.map((p) => p.id)
  const { data: translations } = await supabaseAdmin
    .from('ProductTranslation')
    .select('*')
    .in('productId', ids)

  const result = products.map((p) => ({
    ...p,
    translations: (translations || []).filter((t) => t.productId === p.id),
  }))

  return NextResponse.json(result)
}

export async function POST(request: Request) {
  const session = await apiAuth()
  if (session instanceof NextResponse) return session

  const body = await request.json()
  const parsed = createProductSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { slug, status, heroImage, images, order, translations } = parsed.data

  const { data: existing } = await supabaseAdmin
    .from('Product')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 409 })
  }

  const { data: product, error } = await supabaseAdmin
    .from('Product')
    .insert({
      slug,
      status,
      heroImage,
      images: images || [],
      order,
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single()

  if (error || !product) {
    return NextResponse.json({ error: error?.message || 'Failed to create product' }, { status: 500 })
  }

  if (translations && translations.length > 0) {
    await supabaseAdmin.from('ProductTranslation').insert(
      translations.map((t) => ({ ...t, productId: product.id }))
    )
  }

  const { data: created } = await supabaseAdmin
    .from('Product')
    .select('*')
    .eq('id', product.id)
    .single()

  const { data: createdTranslations } = await supabaseAdmin
    .from('ProductTranslation')
    .select('*')
    .eq('productId', product.id)

  return NextResponse.json({ ...created, translations: createdTranslations || [] }, { status: 201 })
}
