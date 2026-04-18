'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/products': 'Products',
  '/products/cbd-isolate': 'CBD Isolate',
  '/equipment': 'Equipment',
  '/planting': 'Planting Base',
  '/gallery': 'Gallery',
  '/inquiry': 'Inquiry',
  '/blog': 'Blog',
  '/wholesale-cbd-isolate': 'Wholesale CBD Isolate',
  '/quality-assurance': 'Quality Assurance',
  '/cbd-isolate-manufacturer': 'Manufacturer',
}

export default function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const crumbs: Array<{ label: string; href: string }> = [{ label: 'Home', href: '/' }]

  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    const label = routeLabels[currentPath] || segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    crumbs.push({ label, href: currentPath })
  }

  return (
    <nav aria-label="Breadcrumb" className="max-w-container mx-auto px-6 lg:px-12 py-3">
      <ol className="flex items-center gap-1 text-xs text-on-surface-variant" itemScope itemType="https://schema.org/BreadcrumbList">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {isLast ? (
                <span className="font-semibold text-on-surface" itemProp="name">{crumb.label}</span>
              ) : (
                <>
                  <Link href={crumb.href} className="hover:text-primary transition-colors" itemProp="item">
                    <span itemProp="name">{crumb.label}</span>
                  </Link>
                  <ChevronRight size={12} className="text-on-surface-variant/50" />
                </>
              )}
              <meta itemProp="position" content={String(i + 1)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
