'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'
import TrendChart from '@/components/admin/charts/TrendChart'
import PieChart from '@/components/admin/charts/PieChart'
import BarChart from '@/components/admin/charts/BarChart'

interface AnalyticsData {
  overview: { totalUsers: number; totalPageviews: number }
  trend: Array<{ date: string; pageviews: number; users: number }>
  topPages: Array<{ path: string; pageviews: number; users: number }>
  trafficSources: Array<{ source: string; sessions: number }>
  devices: Array<{ category: string; sessions: number }>
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function AnalyticsDashboard() {
  const { t, locale } = useAdminLocale()
  const [range, setRange] = useState<'7d' | '30d'>('7d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [realtime, setRealtime] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`)
      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Failed to load')
        return
      }
      const json = await res.json()
      setData(json)
      setError('')
    } catch {
      setError(locale === 'zh' ? '网络错误' : 'Network error')
    } finally {
      setLoading(false)
    }
  }, [range, locale])

  const fetchRealtime = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/analytics/realtime')
      if (res.ok) {
        const json = await res.json()
        setRealtime(json.activeUsers)
      }
    } catch {}
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchRealtime()
    const interval = setInterval(fetchRealtime, 60000)
    return () => clearInterval(interval)
  }, [fetchRealtime])

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
        {t('common.loading')}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-red-500">
        {error}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('analytics.title')}</h2>
        <div className="flex items-center gap-2">
          {realtime !== null && (
            <span className="mr-3 flex items-center gap-1.5 text-sm text-gray-600">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {t('analytics.realtime')}: {realtime}
            </span>
          )}
          <button
            onClick={() => setRange('7d')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              range === '7d' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('analytics.7d')}
          </button>
          <button
            onClick={() => setRange('30d')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              range === '30d' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('analytics.30d')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('analytics.pageviews')}</p>
          <p className="mt-1 text-2xl font-bold">{data.overview.totalPageviews.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('analytics.users')}</p>
          <p className="mt-1 text-2xl font-bold">{data.overview.totalUsers.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('analytics.realtime')}</p>
          <p className="mt-1 text-2xl font-bold">{realtime ?? '—'}</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-medium text-gray-700">{t('analytics.overview')}</h3>
        <TrendChart
          data={data.trend}
          pvLabel={t('analytics.pageviews')}
          uvLabel={t('analytics.users')}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-medium text-gray-700">{t('analytics.topPages')}</h3>
          <BarChart
            data={data.topPages.map((p) => ({ label: p.path, value: p.pageviews }))}
            valueLabel={t('analytics.views')}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-medium text-gray-700">{t('analytics.trafficSources')}</h3>
            <PieChart
              data={data.trafficSources.map((s, i) => ({
                label: s.source,
                value: s.sessions,
                color: COLORS[i % COLORS.length],
              }))}
            />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-medium text-gray-700">{t('analytics.devices')}</h3>
            <PieChart
              data={data.devices.map((d, i) => ({
                label: d.category,
                value: d.sessions,
                color: COLORS[i % COLORS.length],
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
