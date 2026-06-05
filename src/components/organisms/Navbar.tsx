'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { navbarStrings } from '@/content/pages/navbar.content'
import type { Locale } from '@/i18n/locales'

type NavItem = {
  label: string
  href?: string
  children?: { label: string; href: string }[]
}

function buildNavLinks(t: typeof navbarStrings.en): NavItem[] {
  return [
    { label: t.home, href: '/' },
    {
      label: t.products,
      children: [
        { label: t.productsChildren.allProducts, href: '/products' },
        { label: t.productsChildren.cbdIsolate, href: '/products/cbd-isolate' },
        { label: t.productsChildren.cbdCrudeOil, href: '/products/cbd-crude-oil' },
      ],
    },
    {
      label: t.process,
      children: [
        { label: t.processChildren.seedToIsolate, href: '/process' },
        { label: t.processChildren.cultivation, href: '/planting' },
        { label: t.processChildren.extraction, href: '/equipment' },
        { label: t.processChildren.qualityAssurance, href: '/quality-assurance' },
      ],
    },
    { label: t.gallery, href: '/gallery' },
    { label: t.blog, href: '/blog' },
    {
      label: t.about,
      children: [
        { label: t.aboutChildren.company, href: '/about' },
        { label: t.aboutChildren.manufacturer, href: '/cbd-isolate-manufacturer' },
      ],
    },
  ]
}

const languages = [
  { code: 'en', label: 'English', flag: '/flags/en.svg', href: '/' },
  { code: 'de', label: 'Deutsch', flag: '/flags/de.svg', href: '/de' },
  { code: 'fr', label: 'Français', flag: '/flags/fr.svg', href: '/fr' },
  { code: 'es', label: 'Español', flag: '/flags/es.svg', href: '/es' },
  { code: 'it', label: 'Italiano', flag: '/flags/it.svg', href: '/it' },
  { code: 'pt', label: 'Português', flag: '/flags/pt.svg', href: '/pt' },
  { code: 'ja', label: '日本語', flag: '/flags/ja.svg', href: '/ja' },
  { code: 'fi', label: 'Suomi', flag: '/flags/fi.svg', href: '/fi' },
]

const supportedLangPrefixes = ['/de', '/fr', '/es', '/it', '/pt', '/ja', '/fi']

function detectLangPrefix(pathname: string): string {
  for (const prefix of supportedLangPrefixes) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      return prefix
    }
  }
  return ''
}

function detectLocale(langPrefix: string): Locale {
  if (!langPrefix) return 'en'
  return langPrefix.slice(1) as Locale
}

function localizeHref(href: string, langPrefix: string): string {
  if (!langPrefix) return href
  if (href === '/') return langPrefix
  return langPrefix + href
}

function FlagIcon({ src, label, size = 16 }: { src: string; label: string; size?: number }) {
  return (
    <span
      className="inline-flex overflow-hidden rounded-[2px] ring-1 ring-black/5"
      style={{ width: size, height: Math.round(size * 0.66) }}
      aria-hidden="true"
    >
      <Image src={src} alt="" width={size} height={Math.round(size * 0.66)} unoptimized />
      <span className="sr-only">{label}</span>
    </span>
  )
}

function DesktopDropdown({
  item,
  pathname,
  langPrefix,
}: {
  item: NavItem
  pathname: string
  langPrefix: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isChildActive = item.children?.some(
    (c) => pathname === localizeHref(c.href, langPrefix)
  )

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={`inline-flex items-center gap-1 h-8 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm ${
          isChildActive
            ? 'text-primary'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-soft py-1.5 min-w-[180px] rounded-md">
            {item.children!.map((child) => {
              const childHref = localizeHref(child.href, langPrefix)
              return (
                <Link
                  key={child.href}
                  href={childHref}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-xs font-semibold tracking-wider transition-colors duration-150 ${
                    pathname === childHref
                      ? 'text-primary bg-primary-fixed/30'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {child.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </li>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const langPrefix = useMemo(() => detectLangPrefix(pathname), [pathname])
  const locale = useMemo(() => detectLocale(langPrefix), [langPrefix])
  const t = navbarStrings[locale]
  const navLinks = useMemo(() => buildNavLinks(t), [t])

  const currentLang =
    languages.find((l) => l.code !== 'en' && pathname.startsWith(l.href)) ||
    languages[0]

  const homePath = localizeHref('/', langPrefix)

  const stripPrefix = (p: string) => {
    for (const prefix of supportedLangPrefixes) {
      if (p === prefix) return '/'
      if (p.startsWith(prefix + '/')) return p.slice(prefix.length)
    }
    return p
  }
  const basePath = stripPrefix(pathname)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggleMobileGroup = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-lg border-b border-outline-variant/20">
      <nav className="max-w-container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link
          href={homePath}
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
          aria-label="Vetrux CBD home"
        >
          <Image
            src="/logo.svg"
            alt="Vetrux CBD"
            width={199}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            if (item.children) {
              return (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  langPrefix={langPrefix}
                />
              )
            }
            const linkHref = localizeHref(item.href!, langPrefix)
            const isActive = pathname === linkHref
            return (
              <li key={item.href}>
                <Link
                  href={linkHref}
                  className={`inline-flex items-center h-8 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm ${
                    isActive
                      ? 'text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] text-xs font-semibold tracking-wider text-on-surface-variant hover:text-on-surface transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
              aria-label={`Switch language, current: ${currentLang.label}`}
              aria-expanded={langOpen}
              aria-haspopup="true"
            >
              <Globe size={14} />
              <FlagIcon src={currentLang.flag} label={currentLang.label} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-surface-container-lowest border border-outline-variant/20 shadow-soft py-1 min-w-[160px] z-50 rounded-md">
                {languages.map((lang) => {
                  const langHref =
                    lang.code === 'en'
                      ? basePath
                      : basePath === '/'
                        ? `/${lang.code}`
                        : `/${lang.code}${basePath}`
                  return (
                    <Link
                      key={lang.code}
                      href={langHref}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2 text-xs font-semibold tracking-wider transition-colors duration-150 ${
                        currentLang.code === lang.code
                          ? 'text-primary bg-primary-fixed/30'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <FlagIcon src={lang.flag} label={lang.label} />
                      <span>{lang.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <Link
            href={localizeHref('/inquiry', langPrefix)}
            className="inline-flex items-center px-4 py-2 bg-accent text-white text-xs font-semibold tracking-widest uppercase rounded-md hover:bg-accent-hover transition-all duration-200 ease-industrial whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            {t.contactUs}
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-on-surface min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-outline-variant/20 px-6 py-6">
          <ul className="flex flex-col gap-2">
            {navLinks.map((item) => {
              if (item.children) {
                const isExpanded = mobileExpanded === item.label
                const isChildActive = item.children.some(
                  (c) => pathname === localizeHref(c.href, langPrefix)
                )
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleMobileGroup(item.label)}
                      className={`flex items-center justify-between w-full text-xs font-semibold tracking-widest uppercase py-2 min-h-[44px] transition-colors duration-200 ${
                        isChildActive
                          ? 'text-primary'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                      aria-expanded={isExpanded}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="pl-4 flex flex-col gap-1 pb-2">
                        {item.children.map((child) => {
                          const childHref = localizeHref(child.href, langPrefix)
                          return (
                            <li key={child.href}>
                              <Link
                                href={childHref}
                                onClick={() => setMobileOpen(false)}
                                className={`block text-xs font-semibold tracking-wider py-1.5 min-h-[44px] flex items-center transition-colors duration-200 ${
                                  pathname === childHref
                                    ? 'text-primary'
                                    : 'text-on-surface-variant/70 hover:text-on-surface'
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              }
              const mobileLinkHref = localizeHref(item.href!, langPrefix)
              const isActive = pathname === mobileLinkHref
              return (
                <li key={item.href}>
                  <Link
                    href={mobileLinkHref}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-xs font-semibold tracking-widest uppercase py-2 min-h-[44px] flex items-center transition-colors duration-200 ${
                      isActive
                        ? 'text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-2">
              <Link
                href={localizeHref('/inquiry', langPrefix)}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center px-4 py-2 bg-accent text-white text-xs font-semibold tracking-widest uppercase rounded-md hover:bg-accent-hover transition-all duration-200 mt-2"
              >
                {t.contactUs}
              </Link>
            </li>
            <li className="pt-2 border-t border-outline-variant/20 mt-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-2">
                {t.language}
              </p>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => {
                  const langHref =
                    lang.code === 'en'
                      ? basePath
                      : basePath === '/'
                        ? `/${lang.code}`
                        : `/${lang.code}${basePath}`
                  return (
                    <Link
                      key={lang.code}
                      href={langHref}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs font-semibold tracking-wider rounded-md transition-colors duration-150 ${
                        currentLang.code === lang.code
                          ? 'text-primary bg-primary-fixed/30'
                          : 'text-on-surface-variant hover:text-on-surface bg-surface-container'
                      }`}
                    >
                      <FlagIcon src={lang.flag} label={lang.label} />
                      <span>{lang.label}</span>
                    </Link>
                  )
                })}
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
