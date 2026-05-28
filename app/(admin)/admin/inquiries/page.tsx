import { requireAuth } from '@/lib/admin/requireAuth'
import { supabaseAdmin } from '@/lib/supabase'
import AdminShell from '@/components/admin/AdminShell'
import InquiriesContent from '@/components/admin/InquiriesContent'

export default async function InquiriesPage() {
  await requireAuth()

  const { data: inquiries } = await supabaseAdmin
    .from('Inquiry')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(50)

  return (
    <AdminShell>
      <InquiriesContent
        inquiries={(inquiries || []).map((inq) => ({
          id: inq.id,
          name: inq.name,
          email: inq.email,
          type: inq.type,
          status: inq.status,
          createdAt: inq.createdAt,
        }))}
      />
    </AdminShell>
  )
}
