'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FileText,
  MessageSquare,
  Image,
  Settings,
  LogOut,
  FileDown,
} from 'lucide-react'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

const navItems = [
  { href: '/admin', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { href: '/admin/products', labelKey: 'nav.products', icon: Package },
  { href: '/admin/articles', labelKey: 'nav.articles', icon: FileText },
  { href: '/admin/inquiries', labelKey: 'nav.inquiries', icon: MessageSquare },
  { href: '/admin/document-requests', labelKey: 'nav.documentRequests', icon: FileDown },
  { href: '/admin/media', labelKey: 'nav.media', icon: Image },
  { href: '/admin/settings', labelKey: 'nav.settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { t } = useAdminLocale()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <span className="text-lg font-bold tracking-tight">{t('admin.title')}</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(item.labelKey)}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={() => {
            window.location.href = '/api/auth/signout'
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4" />
          {t('nav.signout')}
        </button>
      </div>
    </aside>
  )
}
