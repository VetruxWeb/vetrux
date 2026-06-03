'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/articleParser'

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (items.length === 0) return null

  return (
    <section className="mt-12 mb-8" id="faq">
      <h2 className="font-display text-2xl font-bold text-on-background mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className="border-l-3 border-accent/40 bg-surface-container-lowest rounded-r-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-on-background pr-4">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-accent transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-200 ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-4 text-sm text-on-surface-variant leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
