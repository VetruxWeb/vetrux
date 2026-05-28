'use client'

import Link from 'next/link'
import StatusBadge from '@/components/admin/StatusBadge'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

interface InquiryItem {
  id: string
  name: string
  email: string
  type: string
  status: string
  createdAt: string
}

export default function InquiriesContent({ inquiries }: { inquiries: InquiryItem[] }) {
  const { t, locale } = useAdminLocale()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('inquiries.title')}</h1>

      <div className="rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">{locale === 'zh' ? '姓名' : 'Name'}</th>
              <th className="px-6 py-3 font-medium text-gray-500">{locale === 'zh' ? '邮箱' : 'Email'}</th>
              <th className="px-6 py-3 font-medium text-gray-500">{locale === 'zh' ? '类型' : 'Type'}</th>
              <th className="px-6 py-3 font-medium text-gray-500">{t('products.status')}</th>
              <th className="px-6 py-3 font-medium text-gray-500">{t('inquiries.date')}</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inquiries.map((inq) => (
              <tr key={inq.id}>
                <td className="px-6 py-4 font-medium">{inq.name}</td>
                <td className="px-6 py-4 text-gray-500">{inq.email}</td>
                <td className="px-6 py-4 text-gray-500">{inq.type}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={inq.status} />
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/inquiries/${inq.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {locale === 'zh' ? '查看' : 'View'}
                  </Link>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  {t('inquiries.noData')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
