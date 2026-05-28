'use client'

import { adminConfig } from '@/lib/admin/config'
import { useState } from 'react'

interface LocaleTabsProps {
  activeLocale: string
  onChange: (locale: string) => void
}

export default function LocaleTabs({ activeLocale, onChange }: LocaleTabsProps) {
  return (
    <div className="flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
      {adminConfig.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => onChange(locale)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
            activeLocale === locale
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}

export function useLocaleTab() {
  const [activeLocale, setActiveLocale] = useState<string>(adminConfig.defaultLocale)
  return { activeLocale, setActiveLocale }
}
