'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormField from '@/components/admin/FormField'
import LocaleTabs, { useLocaleTab } from '@/components/admin/LocaleTabs'
import AiTranslateButton from '@/components/admin/AiTranslateButton'
import ImageUpload from '@/components/admin/ImageUpload'
import { adminConfig } from '@/lib/admin/config'

interface ProductFormProps {
  product?: Record<string, unknown>
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const { activeLocale, setActiveLocale } = useLocaleTab()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isEdit = !!product

  const [slug, setSlug] = useState((product?.slug as string) || '')
  const [status, setStatus] = useState((product?.status as string) || 'draft')
  const [heroImage, setHeroImage] = useState((product?.heroImage as string) || '')
  const [order, setOrder] = useState((product?.order as number) || 0)

  const existingTranslations = (product?.translations as Array<Record<string, string>>) || []

  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {}
    for (const locale of adminConfig.locales) {
      const existing = existingTranslations.find((t) => t.locale === locale)
      initial[locale] = existing || { locale, name: '' }
    }
    return initial
  })

  function updateTranslation(field: string, value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLocale]: { ...prev[activeLocale], [field]: value },
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const translationsArray = Object.entries(translations)
      .filter(([, t]) => t.name)
      .map(([locale, t]) => ({ ...t, locale }))

    const payload = {
      slug,
      status,
      heroImage: heroImage || undefined,
      order,
      translations: translationsArray,
    }

    const url = isEdit ? `/api/admin/products/${(product as Record<string, unknown>).id}` : '/api/admin/products'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
      return
    }

    router.push('/admin/products')
    router.refresh()
  }

  const t = translations[activeLocale] || {}

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Slug" required>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={isEdit}
              placeholder="cbd-isolate"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100"
            />
          </FormField>
          <FormField label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </FormField>
          <FormField label="Order">
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
        </div>
        <ImageUpload
          value={heroImage}
          onChange={setHeroImage}
          folder="products"
          label="Hero Image"
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold">Translations</h2>
          <div className="flex items-center gap-3">
            <AiTranslateButton
              sourceTexts={translations['en'] || {}}
              targetLocale={activeLocale}
              context="CBD isolate product page"
              onTranslated={(result) => {
                setTranslations((prev) => ({
                  ...prev,
                  [activeLocale]: { ...prev[activeLocale], ...result, locale: activeLocale },
                }))
              }}
            />
            <LocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Product Name" required>
            <input
              type="text"
              value={t.name || ''}
              onChange={(e) => updateTranslation('name', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Badge">
            <input
              type="text"
              value={t.badge || ''}
              onChange={(e) => updateTranslation('badge', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Hero Title Line 1">
            <input
              type="text"
              value={t.heroTitle1 || ''}
              onChange={(e) => updateTranslation('heroTitle1', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Hero Title Line 2">
            <input
              type="text"
              value={t.heroTitle2 || ''}
              onChange={(e) => updateTranslation('heroTitle2', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
        </div>
        <FormField label="Hero Body">
          <textarea
            value={t.heroBody || ''}
            onChange={(e) => updateTranslation('heroBody', e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Tech Section Label">
            <input
              type="text"
              value={t.techSection || ''}
              onChange={(e) => updateTranslation('techSection', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Tech Title">
            <input
              type="text"
              value={t.techTitle || ''}
              onChange={(e) => updateTranslation('techTitle', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
        </div>
        <FormField label="Tech Body">
          <textarea
            value={t.techBody || ''}
            onChange={(e) => updateTranslation('techBody', e.target.value)}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="SEO Title">
            <input
              type="text"
              value={t.seoTitle || ''}
              onChange={(e) => updateTranslation('seoTitle', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="SEO Keywords">
            <input
              type="text"
              value={t.seoKeywords || ''}
              onChange={(e) => updateTranslation('seoKeywords', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
        </div>
        <FormField label="SEO Description">
          <textarea
            value={t.seoDescription || ''}
            onChange={(e) => updateTranslation('seoDescription', e.target.value)}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </FormField>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}
