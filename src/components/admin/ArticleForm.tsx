'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import FormField from '@/components/admin/FormField'
import LocaleTabs, { useLocaleTab } from '@/components/admin/LocaleTabs'
import AiTranslateButton from '@/components/admin/AiTranslateButton'
import AiGenerateArticleDialog from '@/components/admin/AiGenerateArticleDialog'
import ImageUpload from '@/components/admin/ImageUpload'
import { adminConfig } from '@/lib/admin/config'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface ArticleFormProps {
  article?: Record<string, unknown>
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const { activeLocale, setActiveLocale } = useLocaleTab()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showGenerate, setShowGenerate] = useState(false)

  const isEdit = !!article

  const [slug, setSlug] = useState((article?.slug as string) || '')
  const [status, setStatus] = useState((article?.status as string) || 'draft')
  const [category, setCategory] = useState((article?.category as string) || '')
  const [image, setImage] = useState((article?.image as string) || '')
  const [size, setSize] = useState((article?.size as string) || 'normal')

  const existingTranslations = (article?.translations as Array<Record<string, string>>) || []

  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {}
    for (const locale of adminConfig.locales) {
      const existing = existingTranslations.find((t) => t.locale === locale)
      initial[locale] = existing || { locale, title: '', content: '' }
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
      .filter(([, t]) => t.title && t.content)
      .map(([locale, t]) => ({ ...t, locale }))

    const payload = {
      slug,
      status,
      category: category || undefined,
      image: image || undefined,
      size,
      publishedAt: status === 'published' ? new Date().toISOString() : undefined,
      translations: translationsArray,
    }

    const url = isEdit ? `/api/admin/articles/${(article as Record<string, unknown>).id}` : '/api/admin/articles'
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

    router.push('/admin/articles')
    router.refresh()
  }

  const t = translations[activeLocale] || {}

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <FormField label="Slug" required>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={isEdit}
              placeholder="my-article-slug"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100"
            />
          </FormField>
          <FormField label="Category">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Product Guide"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
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
          <FormField label="Size">
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="normal">Normal</option>
              <option value="large">Large</option>
            </select>
          </FormField>
        </div>
        <ImageUpload
          value={image}
          onChange={setImage}
          folder="articles"
          label="Cover Image"
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Content</h2>
            <button
              type="button"
              onClick={() => setShowGenerate(true)}
              className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
            >
              AI Generate
            </button>
          </div>
          <div className="flex items-center gap-3">
            <AiTranslateButton
              sourceTexts={translations['en'] || {}}
              targetLocale={activeLocale}
              context="CBD industry blog article"
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

        <AiGenerateArticleDialog
          open={showGenerate}
          onClose={() => setShowGenerate(false)}
          onGenerated={(article) => {
            setTranslations((prev) => ({
              ...prev,
              en: {
                ...prev['en'],
                locale: 'en',
                title: article.title,
                excerpt: article.excerpt,
                content: article.content,
                seoTitle: article.seoTitle,
                seoDescription: article.seoDescription,
                readTime: article.readTime,
              },
            }))
            setActiveLocale('en')
          }}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Title" required>
            <input
              type="text"
              value={t.title || ''}
              onChange={(e) => updateTranslation('title', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
          <FormField label="Read Time">
            <input
              type="text"
              value={t.readTime || ''}
              onChange={(e) => updateTranslation('readTime', e.target.value)}
              placeholder="8 min"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
        </div>
        <FormField label="Excerpt">
          <textarea
            value={t.excerpt || ''}
            onChange={(e) => updateTranslation('excerpt', e.target.value)}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </FormField>
        <FormField label="Content (Markdown)" required>
          <div data-color-mode="light">
            <MDEditor
              value={t.content || ''}
              onChange={(val) => updateTranslation('content', val || '')}
              height={400}
            />
          </div>
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
          <FormField label="SEO Description">
            <input
              type="text"
              value={t.seoDescription || ''}
              onChange={(e) => updateTranslation('seoDescription', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </FormField>
        </div>
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
          {loading ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
        </button>
      </div>
    </form>
  )
}
