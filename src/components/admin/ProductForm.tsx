'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, GripVertical } from 'lucide-react'
import FormField from '@/components/admin/FormField'
import LocaleTabs, { useLocaleTab } from '@/components/admin/LocaleTabs'
import AiTranslateButton from '@/components/admin/AiTranslateButton'
import ImageUpload from '@/components/admin/ImageUpload'
import MultiImageUpload from '@/components/admin/MultiImageUpload'
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
  const [images, setImages] = useState<string[]>((product?.images as string[]) || [])
  const [order, setOrder] = useState((product?.order as number) || 0)
  const [category, setCategory] = useState((product?.category as string) || '')
  const [moq, setMoq] = useState((product?.moq as string) || '')

  const existingVariants = (product?.variants as Array<{ label: string; order: number }>) || []
  const [variants, setVariants] = useState<{ label: string; order: number }[]>(
    existingVariants.length > 0 ? existingVariants : []
  )

  const existingTiers = (product?.quantityTiers as Array<{ label: string; order: number }>) || []
  const [quantityTiers, setQuantityTiers] = useState<{ label: string; order: number }[]>(
    existingTiers.length > 0 ? existingTiers : []
  )

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

  function addVariant() {
    setVariants((prev) => [...prev, { label: '', order: prev.length }])
  }
  function removeVariant(index: number) {
    setVariants((prev) => prev.filter((_, i) => i !== index))
  }
  function updateVariant(index: number, label: string) {
    setVariants((prev) => prev.map((v, i) => i === index ? { ...v, label } : v))
  }

  function addTier() {
    setQuantityTiers((prev) => [...prev, { label: '', order: prev.length }])
  }
  function removeTier(index: number) {
    setQuantityTiers((prev) => prev.filter((_, i) => i !== index))
  }
  function updateTier(index: number, label: string) {
    setQuantityTiers((prev) => prev.map((t, i) => i === index ? { ...t, label } : t))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const translationsArray = Object.entries(translations)
      .filter(([, t]) => t.name)
      .map(([locale, t]) => ({ ...t, locale }))

    const payload: Record<string, unknown> = {
      slug,
      status,
      heroImage: heroImage || undefined,
      images,
      order,
      category: category || undefined,
      moq: moq || undefined,
      translations: translationsArray,
      variants: variants.filter((v) => v.label),
      quantityTiers: quantityTiers.filter((t) => t.label),
    }

    const url = isEdit ? `/api/admin/products/${(product as Record<string, unknown>).id}` : '/api/admin/products'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let message = res.statusText
        try {
          const data = await res.json()
          if (data.error) message = data.error
        } catch {
          // response body was not JSON, fall back to statusText
        }
        setError(message || 'Something went wrong')
        return
      }

      router.push('/admin/products')
      router.refresh()
    } catch {
      setError('Network error, please try again')
    } finally {
      setLoading(false)
    }
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Category">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Isolate, Oil"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="MOQ">
            <input
              type="text"
              value={moq}
              onChange={(e) => setMoq(e.target.value)}
              placeholder="e.g. 100 kg"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
        </div>
        <ImageUpload value={heroImage} onChange={setHeroImage} folder="products" label="Hero Image" />
        <MultiImageUpload values={images} onChange={setImages} folder="products" label="Product Images" />
      </div>

{/* VARIANTS_PLACEHOLDER */}
      {/* VARIANTS */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Variants (Purity Grades)</h2>
          <button type="button" onClick={addVariant} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
            <Plus size={14} /> Add
          </button>
        </div>
        {variants.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <GripVertical size={16} className="text-gray-400" />
            <input
              type="text"
              value={v.label}
              onChange={(e) => updateVariant(i, e.target.value)}
              placeholder="e.g. 99.96%"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <button type="button" onClick={() => removeVariant(i)} className="text-red-500 hover:text-red-700">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* QUANTITY TIERS */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quantity Tiers</h2>
          <button type="button" onClick={addTier} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
            <Plus size={14} /> Add
          </button>
        </div>
        {quantityTiers.map((tier, i) => (
          <div key={i} className="flex items-center gap-2">
            <GripVertical size={16} className="text-gray-400" />
            <input
              type="text"
              value={tier.label}
              onChange={(e) => updateTier(i, e.target.value)}
              placeholder="e.g. ≥ 100 Kg"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <button type="button" onClick={() => removeTier(i)} className="text-red-500 hover:text-red-700">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

{/* TRANSLATIONS_PLACEHOLDER */}
      {/* TRANSLATIONS */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold">Translations</h2>
          <div className="flex items-center gap-3">
            <AiTranslateButton
              sourceTexts={translations['en'] || {}}
              targetLocale={activeLocale}
              context="CBD product page"
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
        </div>
        <FormField label="Description">
          <textarea
            value={t.description || ''}
            onChange={(e) => updateTranslation('description', e.target.value)}
            rows={4}
            placeholder="Product description (supports multiple paragraphs separated by newlines)"
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

      {error && <p className="text-sm text-red-600">{error}</p>}

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
