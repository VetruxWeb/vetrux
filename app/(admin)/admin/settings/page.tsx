'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

function SettingsContent() {
  const { t } = useAdminLocale()
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('deepseek-v4-pro')
  const [baseUrl, setBaseUrl] = useState('https://api.deepseek.com')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.ai_api_key) setApiKey(data.ai_api_key)
        if (data.ai_model) setModel(data.ai_model)
        if (data.ai_base_url) setBaseUrl(data.ai_base_url)
      })
      .finally(() => setLoading(false))
  }, [])

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ai_provider: 'deepseek',
          ai_api_key: apiKey,
          ai_model: model,
          ai_base_url: baseUrl,
        }),
      })
      if (res.ok) {
        showMessage(t('settings.ai.saveSuccess'), 'success')
      } else {
        showMessage(t('settings.ai.saveFailed'), 'error')
      }
    } catch {
      showMessage(t('common.networkError'), 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleTest = async () => {
    if (!apiKey) {
      showMessage(t('settings.ai.noKey'), 'error')
      return
    }

    setTesting(true)
    try {
      const res = await fetch('/api/admin/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: { test: 'Hello, this is a connection test.' },
          targetLocale: 'de',
        }),
      })
      const data = await res.json()
      if (res.ok && data.translations) {
        showMessage(`${t('settings.ai.testSuccess')} "${data.translations.test}"`, 'success')
      } else {
        showMessage(data.error || t('settings.ai.testFailed'), 'error')
      }
    } catch {
      showMessage(t('settings.ai.networkError'), 'error')
    } finally {
      setTesting(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center text-gray-500">
          {t('common.loading')}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('settings.title')}</h1>

      {message && (
        <div className={`rounded-md p-3 text-sm ${messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">{t('settings.ai.title')}</h2>
        <p className="mb-6 text-sm text-gray-500">{t('settings.ai.desc')}</p>

        <div className="space-y-4 max-w-lg">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t('settings.ai.apiKey')}</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t('settings.ai.model')}</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="deepseek-v4-pro">deepseek-v4-pro</option>
              <option value="deepseek-v4-flash">deepseek-v4-flash</option>
              <option value="deepseek-chat">deepseek-chat (legacy)</option>
              <option value="deepseek-reasoner">deepseek-reasoner (legacy)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t('settings.ai.baseUrl')}</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.deepseek.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">{t('settings.ai.baseUrlHint')}</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? t('settings.ai.saving') : t('settings.ai.save')}
            </button>
            <button
              onClick={handleTest}
              disabled={testing || !apiKey}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              {testing ? t('settings.ai.testing') : t('settings.ai.test')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AdminShell>
      <SettingsContent />
    </AdminShell>
  )
}
