'use client'

import Link from 'next/link'
import StatusBadge from '@/components/admin/StatusBadge'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

interface ProductItem {
  id: string
  name: string
  slug: string
  status: string
  updatedAt: string
}

export default function ProductsContent({ products }: { products: ProductItem[] }) {
  const { t, locale } = useAdminLocale()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('products.title')}</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          {t('products.add')}
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">{locale === 'zh' ? '名称' : 'Name'}</th>
              <th className="px-6 py-3 font-medium text-gray-500">Slug</th>
              <th className="px-6 py-3 font-medium text-gray-500">{t('products.status')}</th>
              <th className="px-6 py-3 font-medium text-gray-500">{locale === 'zh' ? '更新时间' : 'Updated'}</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-gray-500">{product.slug}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {t('common.edit')}
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  {locale === 'zh' ? '暂无产品' : 'No products yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
