'use client'

import Link from 'next/link'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'

interface DashboardContentProps {
  productCount: number
  articleCount: number
  inquiryCount: number
  recentInquiries: Array<{
    id: string
    name: string
    email: string
    type: string
    createdAt: string
  }>
}

export default function DashboardContent({ productCount, articleCount, inquiryCount, recentInquiries }: DashboardContentProps) {
  const { t, locale } = useAdminLocale()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label={t('dashboard.products')} value={productCount} />
        <StatCard label={t('dashboard.articles')} value={articleCount} />
        <StatCard label={t('dashboard.inquiries')} value={inquiryCount} />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          {locale === 'zh' ? '最近询盘' : 'Recent Inquiries'}
        </h2>
        {recentInquiries.length === 0 ? (
          <p className="text-sm text-gray-500">{t('inquiries.noData')}</p>
        ) : (
          <div className="space-y-3">
            {recentInquiries.map((inq) => (
              <Link
                key={inq.id}
                href={`/admin/inquiries/${inq.id}`}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded"
              >
                <div>
                  <p className="text-sm font-medium">{inq.name}</p>
                  <p className="text-xs text-gray-500">{inq.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    {inq.type}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <AnalyticsDashboard />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  )
}
