'use client'

import { useState } from 'react'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

interface DocRequest {
  id: string
  name: string
  email: string
  documentType: string
  productInterest: string
  status: string
  createdAt: string
}

export default function DocumentRequestsContent({ requests: initialRequests }: { requests: DocRequest[] }) {
  const { locale } = useAdminLocale()
  const [requests, setRequests] = useState(initialRequests)
  const [sending, setSending] = useState<string | null>(null)

  const handleSend = async (id: string) => {
    if (!confirm(locale === 'zh' ? '确定发送文档到客户邮箱？' : 'Send documents to customer email?')) return

    setSending(id)
    try {
      const res = await fetch('/api/admin/document-requests/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiryId: id }),
      })
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: 'fulfilled' } : r))
        )
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to send')
      }
    } catch {
      alert(locale === 'zh' ? '网络错误' : 'Network error')
    } finally {
      setSending(null)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {locale === 'zh' ? '文档请求' : 'Document Requests'}
      </h1>

      <div className="rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">
                {locale === 'zh' ? '姓名' : 'Name'}
              </th>
              <th className="px-6 py-3 font-medium text-gray-500">
                {locale === 'zh' ? '邮箱' : 'Email'}
              </th>
              <th className="px-6 py-3 font-medium text-gray-500">
                {locale === 'zh' ? '文档类型' : 'Document'}
              </th>
              <th className="px-6 py-3 font-medium text-gray-500">
                {locale === 'zh' ? '状态' : 'Status'}
              </th>
              <th className="px-6 py-3 font-medium text-gray-500">
                {locale === 'zh' ? '日期' : 'Date'}
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="px-6 py-4 font-medium">{req.name}</td>
                <td className="px-6 py-4 text-gray-500">{req.email}</td>
                <td className="px-6 py-4 text-gray-500">{req.documentType.toUpperCase()}</td>
                <td className="px-6 py-4">
                  {req.status === 'fulfilled' ? (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                      {locale === 'zh' ? '已发送' : 'Sent'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700">
                      {locale === 'zh' ? '待处理' : 'Pending'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(req.createdAt).toLocaleDateString('en-CA')}
                </td>
                <td className="px-6 py-4 text-right">
                  {req.status !== 'fulfilled' && (
                    <button
                      onClick={() => handleSend(req.id)}
                      disabled={sending === req.id}
                      className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {sending === req.id
                        ? (locale === 'zh' ? '发送中...' : 'Sending...')
                        : (locale === 'zh' ? '发送文档' : 'Send Docs')}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  {locale === 'zh' ? '暂无文档请求' : 'No document requests yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
