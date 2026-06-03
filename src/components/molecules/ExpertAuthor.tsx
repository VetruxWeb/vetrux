'use client'

import { Award } from 'lucide-react'
import Link from 'next/link'

interface ExpertAuthorProps {
  locale?: string
}

export default function ExpertAuthor({ locale = 'en' }: ExpertAuthorProps) {
  const aboutPath = locale === 'en' ? '/about' : `/${locale}/about`

  return (
    <section className="mt-12 mb-8 rounded-lg border border-gray-200 bg-surface-container-lowest p-6">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
          <Award className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-muted mb-1">
            Reviewed by
          </p>
          <p className="font-display text-lg font-bold text-on-background">
            VETRUX Technical Team
          </p>
          <p className="text-sm text-accent font-medium">
            CBD Extraction & Purification Specialists
          </p>
          <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
            Our technical team brings over a decade of experience in industrial hemp processing,
            supercritical CO₂ extraction, and cannabinoid purification. Based at our Chuxiong facility
            in Yunnan, China, we oversee quality control for every batch produced.
          </p>
          <Link
            href={aboutPath}
            className="mt-3 inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about our team →
          </Link>
        </div>
      </div>
    </section>
  )
}
