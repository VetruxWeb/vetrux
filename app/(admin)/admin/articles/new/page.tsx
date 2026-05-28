import { requireAuth } from '@/lib/admin/requireAuth'
import AdminShell from '@/components/admin/AdminShell'
import ArticleForm from '@/components/admin/ArticleForm'

export default async function NewArticlePage() {
  await requireAuth()

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">New Article</h1>
        <ArticleForm />
      </div>
    </AdminShell>
  )
}
