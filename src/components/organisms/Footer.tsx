'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { footerStrings } from '@/content/pages/footer.content'
import type { Locale } from '@/i18n/locales'

const supportedLangPrefixes = ['/de', '/fr', '/es', '/it', '/pt', '/ja', '/fi']

function detectLangPrefix(pathname: string): string {
  for (const prefix of supportedLangPrefixes) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) return prefix
  }
  return ''
}

function detectLocale(langPrefix: string): Locale {
  if (!langPrefix) return 'en'
  return langPrefix.slice(1) as Locale
}

export default function Footer() {
  const pathname = usePathname()
  const langPrefix = detectLangPrefix(pathname)
  const locale = detectLocale(langPrefix)
  const t = footerStrings[locale]

  const footerLinks = [
    {
      heading: t.colProducts,
      links: [
        { label: t.cbdIsolateOverview, href: '/products/cbd-isolate' },
        { label: t.wholesaleCbdIsolate, href: '/wholesale-cbd-isolate' },
        { label: t.wholesaleInquiry, href: '/inquiry' },
      ],
    },
    {
      heading: t.colProcess,
      links: [
        { label: t.seedToIsolate, href: '/process' },
        { label: t.cultivation, href: '/planting' },
        { label: t.extraction, href: '/equipment' },
        { label: t.qualityAssurance, href: '/quality-assurance' },
        { label: t.facilityGallery, href: '/gallery' },
      ],
    },
    {
      heading: t.colCompany,
      links: [
        { label: t.aboutVetrux, href: '/about' },
        { label: t.manufacturerProfile, href: '/cbd-isolate-manufacturer' },
        { label: t.blogInsights, href: '/blog' },
        { label: t.contactInquiry, href: '/inquiry' },
        { label: t.privacyPolicy, href: '/privacy-policy' },
        { label: t.termsOfService, href: '/terms-of-service' },
      ],
    },
  ]

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.svg"
                alt="Vetrux CBD"
                width={319}
                height={64}
                className="h-16 w-auto invert"
                priority
              />
            </div>
            <p className="text-xs text-inverse-on-surface/60 leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full tracking-wider uppercase">
                CBD Isolate
              </span>
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full tracking-wider uppercase">
                OEM/ODM
              </span>
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full tracking-wider uppercase">
                Technical Services
              </span>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={`${langPrefix}${link.href}`}
                      className="text-xs text-inverse-on-surface/70 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-xs text-inverse-on-surface/60 leading-relaxed">
              <p className="font-semibold text-inverse-on-surface/80 mb-1">Vetrux CBD</p>
              <p className="text-inverse-on-surface/50">Operated by 蔚萃生物科技（楚雄）有限公司</p>
              <p>Chuxiong, Yunnan Province, China</p>
              <p>
                Email:{' '}
                <a href="mailto:inquiry@vetrux.tech" className="text-inverse-on-surface/80 hover:text-white transition-colors">
                  inquiry@vetrux.tech
                </a>
                {' / '}
                <a href="mailto:sales@vetrux.tech" className="text-inverse-on-surface/80 hover:text-white transition-colors">
                  sales@vetrux.tech
                </a>
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://www.linkedin.com/in/%E8%90%83-%E8%94%9A-994421408/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-inverse-on-surface/50 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/VetruxCBD"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-inverse-on-surface/50 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61589338740056"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-inverse-on-surface/50 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCTppL8lRF6EieMGZWwTq4aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-inverse-on-surface/50 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-xs text-inverse-on-surface/40">
              © {new Date().getFullYear()} Vetrux CBD. {t.allRightsReserved}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
