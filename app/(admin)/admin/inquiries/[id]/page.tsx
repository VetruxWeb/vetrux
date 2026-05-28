import { requireAuth } from '@/lib/admin/requireAuth'
import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import StatusBadge from '@/components/admin/StatusBadge'

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth()
  const { id } = await params

  const { data: inquiry } = await supabaseAdmin
    .from('Inquiry')
    .select('*')
    .eq('id', id)
    .single()

  if (!inquiry) notFound()

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Inquiry Detail</h1>
          <StatusBadge status={inquiry.status} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm">{inquiry.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm">{inquiry.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm">{inquiry.company || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm">{inquiry.phone || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 text-sm">{inquiry.type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Product Interest</dt>
              <dd className="mt-1 text-sm">{inquiry.productInterest || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Source Page</dt>
              <dd className="mt-1 text-sm">{inquiry.sourcePage || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm">{new Date(inquiry.createdAt).toLocaleString()}</dd>
            </div>
            {inquiry.message && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm">{inquiry.message}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </AdminShell>
  )
}
