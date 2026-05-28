'use client'

import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

export default function MediaContent() {
  const { t } = useAdminLocale()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('media.title')}</h1>
        <button className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          {t('media.upload')}
        </button>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center text-gray-500">
        {t('media.noData')}
      </div>
    </div>
  )
}
