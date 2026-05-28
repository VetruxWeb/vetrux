import { requireAuth } from '@/lib/admin/requireAuth'
import AdminShell from '@/components/admin/AdminShell'
import ProductForm from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  await requireAuth()

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">New Product</h1>
        <ProductForm />
      </div>
    </AdminShell>
  )
}
