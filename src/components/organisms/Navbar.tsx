'use client'

import { useState, useRef, useEffect, useMemo, useCallback, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { navbarStrings } from '@/content/pages/navbar.content'
import { isSupportedLocale, type Locale } from '@/i18n/locales'

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'ja', 'fi'] as const

const subscribeToLocaleAvailability = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['data-locales'],
  })
  return () => observer.disconnect()
}

const getLocaleAvailabilitySnapshot = () =>
  document.querySelector('[data-locales]')?.getAttribute('data-locales') ?? ''

const getServerLocaleAvailabilitySnapshot = () => ''

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
        { label: t.productsChildren.cbdOil, href: '/products/cbd-oil' },
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
] as const

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

/**
 * Desktop dropdown with complete keyboard interaction:
 * — Escape closes the menu and returns focus to the trigger
 * — outside click closes without racing the hover-close timer
 * — focus remains inside the menu while tabbing
 */
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
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isChildActive = item.children?.some(
    (c) => pathname === localizeHref(c.href, langPrefix),
  )

  const close = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(false)
  }, [])

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  // Escape closes the menu and returns focus to the trigger.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      event.stopPropagation()
      close()
      buttonRef.current?.focus()
    }
  }

  // Close on outside click, and cancel the pending hover-close when the
  // pointer re-enters the menu (no race between mouse and click handlers).
  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [open, close])

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
        ref={buttonRef}
        className={`inline-flex items-center gap-1 h-8 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm ${
          isChildActive
            ? 'text-primary'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={`dropdown-${item.label}`}
      >
        {item.label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          ref={menuRef}
          id={`dropdown-${item.label}`}
          className="absolute left-0 top-full pt-2 z-50"
          onKeyDown={handleKeyDown}
        >
          <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-soft py-1.5 min-w-[180px] rounded-md">
            {item.children!.map((child) => {
              const childHref = localizeHref(child.href, langPrefix)
              const isActive = pathname === childHref
              return (
                <Link
                  key={child.href}
                  href={childHref}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center min-h-[40px] px-4 py-2 text-xs font-semibold tracking-wider transition-colors duration-150 ${
                    isActive
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
  const langButtonRef = useRef<HTMLButtonElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
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

  // Article pages expose their real locale cluster in the DOM. A small
  // external-store subscription keeps the switcher in sync across client
  // navigations without introducing an effect-driven render cascade.
  const rawAvailableLocales = useSyncExternalStore(
    subscribeToLocaleAvailability,
    getLocaleAvailabilitySnapshot,
    getServerLocaleAvailabilitySnapshot,
  )
  const localeSet = useMemo(
    () => rawAvailableLocales
      ? rawAvailableLocales.split(',').map((value) => value.trim()).filter(isSupportedLocale)
      : ALL_LOCALES,
    [rawAvailableLocales],
  )

  const buildLangHref = useCallback(
    (code: Locale) => {
      if (localeSet.includes(code)) {
        if (code === 'en') return basePath === '/' ? '/' : basePath
        return basePath === '/' ? `/${code}` : `/${code}${basePath}`
      }
      // The route does not exist in the target locale (e.g. an English-only
      // article) — fall back to that locale's homepage instead of a 404.
      return code === 'en' ? '/' : `/${code}`
    },
    [localeSet, basePath],
  )

  // Escape closes every overlay.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (mobileOpen) {
          setMobileOpen(false)
          mobileToggleRef.current?.focus()
        }
        if (langOpen) {
          setLangOpen(false)
          langButtonRef.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen, langOpen])

  // Close the language menu on outside click.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Prevent the page from scrolling while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  const toggleMobileGroup = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label)
  }

  const closeMobile = () => {
    setMobileOpen(false)
    mobileToggleRef.current?.focus()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-lg border-b border-outline-variant/20">
      <nav className="max-w-container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link
          href={homePath}
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
          aria-label={t.homeAria}
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
                  aria-current={isActive ? 'page' : undefined}
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
              ref={langButtonRef}
              onClick={() => setLangOpen(!langOpen)}
              onKeyDown={(event) => {
                if (event.key === 'Escape' && langOpen) {
                  event.stopPropagation()
                  setLangOpen(false)
                  langButtonRef.current?.focus()
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] text-xs font-semibold tracking-wider text-on-surface-variant hover:text-on-surface transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
              aria-label={`${t.switchLanguage}, ${t.currentLanguage}: ${currentLang.label}`}
              aria-expanded={langOpen}
              aria-haspopup="true"
            >
              <Globe size={14} />
              <FlagIcon src={currentLang.flag} label={currentLang.label} />
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-1 bg-surface-container-lowest border border-outline-variant/20 shadow-soft py-1 min-w-[160px] z-50 rounded-md"
                role="menu"
              >
                {languages.map((lang) => {
                  const langHref = buildLangHref(lang.code)
                  const isCurrent = currentLang.code === lang.code
                  return (
                    <Link
                      key={lang.code}
                      href={langHref}
                      role="menuitem"
                      onClick={() => setLangOpen(false)}
                      aria-current={isCurrent ? 'true' : undefined}
                      className={`flex items-center gap-2.5 px-4 py-2 min-h-[44px] text-xs font-semibold tracking-wider transition-colors duration-150 ${
                        isCurrent
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
            className="inline-flex items-center px-4 py-2 min-h-[44px] bg-accent text-white text-xs font-semibold tracking-widest uppercase rounded-md hover:bg-accent-hover transition-all duration-200 ease-industrial whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            {t.contactUs}
          </Link>
        </div>

        <button
          ref={mobileToggleRef}
          className="lg:hidden p-2 text-on-surface min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t.closeMenu : t.openMenu}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-surface-container-lowest border-t border-outline-variant/20 px-6 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((item) => {
              if (item.children) {
                const isExpanded = mobileExpanded === item.label
                const isChildActive = item.children.some(
                  (c) => pathname === localizeHref(c.href, langPrefix),
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
                      aria-controls={`mobile-group-${item.label}`}
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
                      <ul
                        id={`mobile-group-${item.label}`}
                        className="pl-4 flex flex-col gap-1 pb-2"
                      >
                        {item.children.map((child) => {
                          const childHref = localizeHref(child.href, langPrefix)
                          const isActive = pathname === childHref
                          return (
                            <li key={child.href}>
                              <Link
                                href={childHref}
                                onClick={closeMobile}
                                aria-current={isActive ? 'page' : undefined}
                                className={`block text-xs font-semibold tracking-wider py-1.5 min-h-[44px] flex items-center transition-colors duration-200 ${
                                  isActive
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
                    onClick={closeMobile}
                    aria-current={isActive ? 'page' : undefined}
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
                onClick={closeMobile}
                className="inline-flex items-center px-4 py-2 min-h-[44px] bg-accent text-white text-xs font-semibold tracking-widest uppercase rounded-md hover:bg-accent-hover transition-all duration-200 mt-2"
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
                  const langHref = buildLangHref(lang.code)
                  const isCurrent = currentLang.code === lang.code
                  return (
                    <Link
                      key={lang.code}
                      href={langHref}
                      onClick={closeMobile}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs font-semibold tracking-wider rounded-md transition-colors duration-150 ${
                        isCurrent
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
