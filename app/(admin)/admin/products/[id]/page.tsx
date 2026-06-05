import { requireAuth } from '@/lib/admin/requireAuth'
import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth()
  const { id } = await params

  const { data: product } = await supabaseAdmin
    .from('Product')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

  const [
    { data: translations },
    { data: specs },
    { data: faqs },
    { data: steps },
    { data: metrics },
    { data: packaging },
    { data: compliance },
    { data: documents },
    { data: variants },
    { data: quantityTiers },
  ] = await Promise.all([
    supabaseAdmin.from('ProductTranslation').select('*').eq('productId', id),
    supabaseAdmin.from('ProductSpec').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductFaq').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductStep').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductMetric').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductPackaging').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductCompliance').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductDocument').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductVariant').select('*').eq('productId', id).order('order'),
    supabaseAdmin.from('ProductQuantityTier').select('*').eq('productId', id).order('order'),
  ])

  const fullProduct = {
    ...product,
    translations: translations || [],
    specs: specs || [],
    faqs: faqs || [],
    steps: steps || [],
    metrics: metrics || [],
    packaging: packaging || [],
    compliance: compliance || [],
    documents: documents || [],
    variants: variants || [],
    quantityTiers: quantityTiers || [],
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <ProductForm product={fullProduct} />
      </div>
    </AdminShell>
  )
}
