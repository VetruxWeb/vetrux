'use client'

import { useState, useRef } from 'react'
import { Plus, X } from 'lucide-react'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

interface MultiImageUploadProps {
  values: string[]
  onChange: (urls: string[]) => void
  folder?: string
  label?: string
}

export default function MultiImageUpload({ values, onChange, folder = 'general', label = 'Images' }: MultiImageUploadProps) {
  const { t } = useAdminLocale()
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (files: FileList) => {
    setUploading(true)
    const newUrls: string[] = []
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)
      const res = await fetch('/api/admin/media', { method: 'POST', body: formData })
      if (res.ok) {
        const media = await res.json()
        newUrls.push(media.url)
      }
    }
    onChange([...values, ...newUrls])
    setUploading(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files)
    }
  }

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {values.map((url, i) => (
            <div key={url} className="relative">
              <img src={url} alt={`Image ${i + 1}`} className="h-24 w-24 rounded-md border border-gray-200 object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-1 rounded-md border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-gray-400 disabled:opacity-50"
      >
        {uploading ? t('image.uploading') : <><Plus size={14} /> Add Images</>}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
