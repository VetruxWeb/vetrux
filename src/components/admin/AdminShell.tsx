'use client'

import { SessionProvider } from 'next-auth/react'
import { AdminLocaleProvider } from '@/components/admin/AdminLocaleContext'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLocaleProvider>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex flex-1 flex-col pl-64">
            <AdminTopbar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </AdminLocaleProvider>
    </SessionProvider>
  )
}
