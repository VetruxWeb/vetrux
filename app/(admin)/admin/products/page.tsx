import { requireAuth } from '@/lib/admin/requireAuth'
import { supabaseAdmin } from '@/lib/supabase'
import AdminShell from '@/components/admin/AdminShell'
import ProductsContent from '@/components/admin/ProductsContent'

export default async function ProductsPage() {
  await requireAuth()

  const { data: products } = await supabaseAdmin
    .from('Product')
    .select('*')
    .order('order')

  const ids = (products || []).map((p) => p.id)
  const { data: translations } = ids.length > 0
    ? await supabaseAdmin.from('ProductTranslation').select('*').in('productId', ids).eq('locale', 'en')
    : { data: [] }

  const productsWithNames = (products || []).map((p) => ({
    id: p.id,
    name: (translations || []).find((t) => t.productId === p.id)?.name || p.slug,
    slug: p.slug,
    status: p.status,
    updatedAt: p.updatedAt,
  }))

  return (
    <AdminShell>
      <ProductsContent products={productsWithNames} />
    </AdminShell>
  )
}
