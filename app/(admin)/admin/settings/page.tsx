import { requireAuth } from '@/lib/admin/requireAuth'
import AdminShell from '@/components/admin/AdminShell'
import SettingsContent from '@/components/admin/SettingsContent'

export default async function SettingsPage() {
  await requireAuth()

  return (
    <AdminShell>
      <SettingsContent />
    </AdminShell>
  )
}
