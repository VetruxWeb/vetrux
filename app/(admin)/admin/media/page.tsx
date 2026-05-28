import { requireAuth } from '@/lib/admin/requireAuth'
import AdminShell from '@/components/admin/AdminShell'
import MediaContent from '@/components/admin/MediaContent'

export default async function MediaPage() {
  await requireAuth()

  return (
    <AdminShell>
      <MediaContent />
    </AdminShell>
  )
}
