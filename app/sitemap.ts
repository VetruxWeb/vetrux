import type { MetadataRoute } from 'next'
import { articles } from '@/content/articles'

const BASE_URL = 'https://www.vetrux.tech'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                          lastModified: '2025-06-01', changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/products/cbd-isolate`,      lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/wholesale-cbd-isolate`,     lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/quality-assurance`,         lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/cbd-isolate-manufacturer`,  lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/inquiry`,                   lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/equipment`,                 lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/planting`,                  lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`,                      lastModified: new Date().toISOString().split('T')[0], changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/de`,                        lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/fr`,                        lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gallery`,                   lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/about`,                     lastModified: new Date().toISOString().split('T')[0], changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`,            lastModified: new Date().toISOString().split('T')[0], changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`,          lastModified: new Date().toISOString().split('T')[0], changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...articleRoutes]
}
