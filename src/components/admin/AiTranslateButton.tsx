'use client'

import { useState } from 'react'

interface AiTranslateButtonProps {
  sourceTexts: Record<string, string>
  targetLocale: string
  context?: string
  onTranslated: (translations: Record<string, string>) => void
  disabled?: boolean
}

export default function AiTranslateButton({ sourceTexts, targetLocale, context, onTranslated, disabled }: AiTranslateButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTranslate = async () => {
    if (targetLocale === 'en') return

    const nonEmpty: Record<string, string> = {}
    for (const [k, v] of Object.entries(sourceTexts)) {
      if (v && v.trim()) nonEmpty[k] = v
    }

    if (Object.keys(nonEmpty).length === 0) {
      setError('No English content to translate')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: nonEmpty, targetLocale, context }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Translation failed')
        return
      }

      onTranslated(data.translations)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  if (targetLocale === 'en') return null

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleTranslate}
        disabled={disabled || loading}
        className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Translating...' : `AI Translate → ${targetLocale.toUpperCase()}`}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
