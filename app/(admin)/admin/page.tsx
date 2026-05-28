import { requireAuth } from '@/lib/admin/requireAuth'
import { supabaseAdmin } from '@/lib/supabase'
import AdminShell from '@/components/admin/AdminShell'
import DashboardContent from '@/components/admin/DashboardContent'

export default async function AdminDashboard() {
  await requireAuth()

  const [
    { count: productCount },
    { count: articleCount },
    { count: inquiryCount },
    { data: recentInquiries },
  ] = await Promise.all([
    supabaseAdmin.from('Product').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('Article').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('Inquiry').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('Inquiry').select('*').order('createdAt', { ascending: false }).limit(5),
  ])

  return (
    <AdminShell>
      <DashboardContent
        productCount={productCount || 0}
        articleCount={articleCount || 0}
        inquiryCount={inquiryCount || 0}
        recentInquiries={(recentInquiries || []).map((inq) => ({
          id: inq.id,
          name: inq.name,
          email: inq.email,
          type: inq.type,
          createdAt: inq.createdAt,
        }))}
      />
    </AdminShell>
  )
}
