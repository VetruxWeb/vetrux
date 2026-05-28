'use client'

import Link from 'next/link'
import StatusBadge from '@/components/admin/StatusBadge'
import { useAdminLocale } from '@/components/admin/AdminLocaleContext'

interface ArticleItem {
  id: string
  title: string
  slug: string
  category: string | null
  status: string
  publishedAt: string | null
}

export default function ArticlesContent({ articles }: { articles: ArticleItem[] }) {
  const { t, locale } = useAdminLocale()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('articles.title')}</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          {t('articles.add')}
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">{locale === 'zh' ? '标题' : 'Title'}</th>
              <th className="px-6 py-3 font-medium text-gray-500">{t('articles.category')}</th>
              <th className="px-6 py-3 font-medium text-gray-500">{t('articles.status')}</th>
              <th className="px-6 py-3 font-medium text-gray-500">{locale === 'zh' ? '发布日期' : 'Published'}</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 font-medium">{article.title}</td>
                <td className="px-6 py-4 text-gray-500">{article.category || '—'}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={article.status} />
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {t('common.edit')}
                  </Link>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  {locale === 'zh' ? '暂无文章' : 'No articles yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
