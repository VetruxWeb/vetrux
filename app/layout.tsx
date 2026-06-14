import type { Metadata } from 'next'
import { Manrope, Newsreader } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import PublicShell from '@/components/organisms/PublicShell'
import { websiteJsonLd } from '@/lib/seo'

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
  keywords:
    'CBD raw materials, CBD isolate, OEM ODM CBD, CBD supplier, Vetrux CBD, Yunnan',
  authors: [{ name: 'Vetrux CBD' }],
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png', sizes: '1254x1254' }],
    apple: [{ url: '/logo.png', type: 'image/png', sizes: '1254x1254' }],
  },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Vetrux CBD',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/vetrux_images/cbd-ethanol-extraction-tank-6m3.jpg',
        width: 4096,
        height: 1904,
        alt: 'Vetrux CBD ethanol extraction facility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/vetrux_images/cbd-ethanol-extraction-tank-6m3.jpg'],
  },
  alternates: {
    languages: {
      'en': 'https://www.vetrux.tech',
      'de': 'https://www.vetrux.tech/de',
      'fr': 'https://www.vetrux.tech/fr',
      'es': 'https://www.vetrux.tech/es',
      'it': 'https://www.vetrux.tech/it',
      'pt': 'https://www.vetrux.tech/pt',
      'ja': 'https://www.vetrux.tech/ja',
      'fi': 'https://www.vetrux.tech/fi',
      'x-default': 'https://www.vetrux.tech',
    },
  },
  other: {
    'geo.region': 'CN-YN',
    'geo.placename': 'Yunnan, China',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <a href="#main" className="skip-link">Skip to main content</a>
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
