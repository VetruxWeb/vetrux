'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/organisms/Navbar'
import Footer from '@/components/organisms/Footer'
import Breadcrumb from '@/components/molecules/Breadcrumb'

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <div className="min-h-screen bg-gray-50">{children}</div>
  }

  return (
    <>
      <Navbar />
      <main id="main" className="flex-1 pt-16">
        <Breadcrumb />
        {children}
      </main>
      <Footer />
    </>
  )
}
