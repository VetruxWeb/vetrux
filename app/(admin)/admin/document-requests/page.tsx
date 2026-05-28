import { requireAuth } from '@/lib/admin/requireAuth'
import { supabaseAdmin } from '@/lib/supabase'
import AdminShell from '@/components/admin/AdminShell'
import DocumentRequestsContent from '@/components/admin/DocumentRequestsContent'

export default async function DocumentRequestsPage() {
  await requireAuth()

  const { data: requests } = await supabaseAdmin
    .from('DocumentRequest')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(50)

  return (
    <AdminShell>
      <DocumentRequestsContent
        requests={(requests || []).map((r) => ({
          id: r.id,
          name: r.name,
          email: r.email,
          documentType: r.documentType || 'both',
          productInterest: r.productInterest || '',
          status: r.status,
          createdAt: r.createdAt,
        }))}
      />
    </AdminShell>
  )
}
