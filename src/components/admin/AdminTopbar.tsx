'use client'

import { useSession } from 'next-auth/react'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

export default function AdminTopbar() {
  const { data: session } = useSession()
  const { locale, setLocale } = useAdminLocale()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-md border border-gray-200 text-sm">
          <button
            onClick={() => setLocale('zh')}
            className={`px-3 py-1.5 rounded-l-md transition-colors ${
              locale === 'zh' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => setLocale('en')}
            className={`px-3 py-1.5 rounded-r-md transition-colors ${
              locale === 'en' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            EN
          </button>
        </div>
        {session?.user && (
          <span className="text-sm text-gray-600">
            {session.user.name || session.user.email}
          </span>
        )}
      </div>
    </header>
  )
}
