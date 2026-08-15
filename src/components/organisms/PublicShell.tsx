'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/organisms/Navbar'
import Footer from '@/components/organisms/Footer'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { defaultLocale, isSupportedLocale, type Locale } from '@/i18n/locales'

const skipLinkLabels: Record<Locale, string> = {
  en: 'Skip to main content',
  de: 'Zum Hauptinhalt springen',
  fr: 'Aller au contenu principal',
  es: 'Saltar al contenido principal',
  it: 'Vai al contenuto principale',
  pt: 'Saltar para o conteúdo principal',
  ja: 'メインコンテンツへ移動',
  fi: 'Siirry pääsisältöön',
}

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const firstSegment = pathname.split('/')[1]
  const locale = isSupportedLocale(firstSegment) ? firstSegment : defaultLocale

  // Root layouts persist during client-side navigation. Keep the document
  // language synchronized when a visitor changes locale without a full load.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // /admin routes are retired: they render the app-wide 404, so no admin
  // chrome is needed here.
  if (isAdmin) {
    return <div className="min-h-screen bg-gray-50">{children}</div>
  }

  return (
    <>
      <a href="#main" className="skip-link">{skipLinkLabels[locale]}</a>
      <Navbar />
      <main id="main" className="flex-1 pt-16">
        <Breadcrumb />
        {children}
      </main>
      <Footer />
    </>
  )
}
