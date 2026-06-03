'use client'

import { useEffect, useRef, useState } from 'react'
import { List, ChevronDown } from 'lucide-react'
import type { TocHeading } from '@/lib/articleParser'

interface TableOfContentsProps {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const el of elements) {
      observerRef.current.observe(el)
    }

    return () => observerRef.current?.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
      setIsOpen(false)
    }
  }

  const navContent = (
    <nav aria-label="Table of contents">
      <ul className="space-y-2.5">
        {headings.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => handleClick(h.id)}
              className={`block w-full text-left transition-colors duration-150 border-l-2 ${
                h.level === 3 ? 'pl-8 text-[13px]' : 'pl-3 text-sm'
              } ${
                activeId === h.id
                  ? 'font-medium text-accent border-accent'
                  : 'text-on-surface-muted hover:text-on-surface border-transparent'
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
          <List className="h-4 w-4" />
          <span>Contents</span>
        </div>
        {navContent}
      </div>

      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-8 rounded-lg border border-gray-200 bg-surface-container-lowest">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-on-surface"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Table of Contents
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && <div className="px-4 pb-4">{navContent}</div>}
      </div>
    </>
  )
}
