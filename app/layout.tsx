import type { Metadata } from 'next'
import { Manrope, Newsreader } from 'next/font/google'
import { headers } from 'next/headers'
import Script from 'next/script'
import './globals.css'
import PublicShell from '@/components/organisms/PublicShell'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vetrux.tech'),
  applicationName: 'Vetrux CBD',
  title: {
    default: 'Wholesale CBD Isolate Supplier | Bulk CBD Isolate Manufacturer — Vetrux CBD',
    template: '%s — Vetrux CBD',
  },
  description:
    'VETRUX — the CBD raw material brand operated by Vetrux Biotechnology (Chuxiong) Co., Ltd. CBD raw material sales, OEM/ODM services, and technical support.',
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png', sizes: '1254x1254' }],
    apple: [{ url: '/logo.png', type: 'image/png', sizes: '1254x1254' }],
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The locale-aware `<html lang>` is driven by middleware, which stamps an
  // `x-locale` header from the URL prefix. Page-level generateMetadata() owns
  // all per-route alternates/canonical/OG data.
  const headerStore = await headers()
  const locale = headerStore.get('x-locale') ?? 'en'

  return (
    <html lang={locale} className={`${manrope.variable} ${newsreader.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface font-sans">
        <PublicShell>{children}</PublicShell>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WSY6VLTBFL"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WSY6VLTBFL');
        `}</Script>
      </body>
    </html>
  )
}
