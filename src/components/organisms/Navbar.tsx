'use client'

// src/components/organisms/Navbar.tsx
// Fixed top navigation bar with mobile hamburger menu

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products/cbd-isolate' },
  { label: 'Equipment', href: '/equipment' },
  { label: 'Planting', href: '/planting' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-lg border-b border-outline-variant/20">
      <nav className="max-w-container mx-auto px-6 lg:px-12 h-12 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center overflow-hidden h-10">
          <img
            src="/logo.svg"
            alt="Yunnan Vetrux"
            className="h-32 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/inquiry"
          className="hidden lg:inline-flex items-center px-4 py-2 bg-primary text-white text-xs font-semibold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300 whitespace-nowrap"
        >
          Contact Us
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-outline-variant/20 px-6 py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-xs font-semibold tracking-widest uppercase py-2 transition-colors duration-200 ${isActive
                      ? 'text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                href="/inquiry"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center px-4 py-2 bg-primary text-white text-xs font-semibold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300 mt-2"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
