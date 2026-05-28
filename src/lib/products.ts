import { supabaseAdmin } from './supabase'
import type { Locale } from '@/i18n/locales'

export interface ProductRecord {
  id: string
  slug: string
  status: string
  heroImage: string | null
  images: unknown
  order: number
  createdAt: string
  updatedAt: string
}

export interface ProductTranslationRecord {
  id: string
  productId: string
  locale: string
  name: string
  badge: string | null
  heroTitle1: string | null
  heroTitle2: string | null
  heroBody: string | null
  techSection: string | null
  techTitle: string | null
  techBody: string | null
  buyerSection: string | null
  buyerTitle: string | null
  processSection: string | null
  processTitle: string | null
  specSection: string | null
  specTitle: string | null
  complianceSection: string | null
  complianceTitle: string | null
  exportNotice: string | null
  exportBody: string | null
  buyerResponsibility: string | null
  qualitySection: string | null
  qualityTitle: string | null
  qualityAssuranceLink: string | null
  qualityAssuranceSub: string | null
  wholesaleLink: string | null
  wholesaleSub: string | null
  contactSalesLink: string | null
  requestSpecSheet: string | null
  requestCoa: string | null
  seoTitle: string | null
  seoDescription: string | null
  seoKeywords: string | null
}

export interface ProductSpecRecord {
  id: string; productId: string; locale: string; label: string; value: string; order: number
}

export interface ProductFaqRecord {
  id: string; productId: string; locale: string; question: string; answer: string; order: number
}

export interface ProductStepRecord {
  id: string; productId: string; locale: string; title: string; desc: string; order: number
}

export interface ProductMetricRecord {
  id: string; productId: string; locale: string; label: string; value: string; status: string | null; order: number
}

export interface ProductPackagingRecord {
  id: string; productId: string; locale: string; label: string; value: string; order: number
}

export interface ProductComplianceRecord {
  id: string; productId: string; locale: string; standard: string; detail: string; order: number
}

export interface ProductDocumentRecord {
  id: string; productId: string; locale: string; title: string; desc: string; image: string; alt: string; order: number
}

export interface ProductWithDetails extends ProductRecord {
  translations: ProductTranslationRecord[]
  specs: ProductSpecRecord[]
  faqs: ProductFaqRecord[]
  steps: ProductStepRecord[]
  metrics: ProductMetricRecord[]
  packaging: ProductPackagingRecord[]
  compliance: ProductComplianceRecord[]
  documents: ProductDocumentRecord[]
}

export async function getProductBySlug(slug: string, locale: Locale): Promise<ProductWithDetails | null> {
  const { data: product } = await supabaseAdmin
    .from('Product')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!product) return null

  const [
    { data: translations },
    { data: specs },
    { data: faqs },
    { data: steps },
    { data: metrics },
    { data: packaging },
    { data: compliance },
    { data: documents },
  ] = await Promise.all([
    supabaseAdmin.from('ProductTranslation').select('*').eq('productId', product.id).eq('locale', locale),
    supabaseAdmin.from('ProductSpec').select('*').eq('productId', product.id).eq('locale', locale).order('order'),
    supabaseAdmin.from('ProductFaq').select('*').eq('productId', product.id).eq('locale', locale).order('order'),
    supabaseAdmin.from('ProductStep').select('*').eq('productId', product.id).eq('locale', locale).order('order'),
    supabaseAdmin.from('ProductMetric').select('*').eq('productId', product.id).eq('locale', locale).order('order'),
    supabaseAdmin.from('ProductPackaging').select('*').eq('productId', product.id).eq('locale', locale).order('order'),
    supabaseAdmin.from('ProductCompliance').select('*').eq('productId', product.id).eq('locale', locale).order('order'),
    supabaseAdmin.from('ProductDocument').select('*').eq('productId', product.id).eq('locale', locale).order('order'),
  ])

  if (!translations || translations.length === 0) return null

  return {
    ...product,
    translations: translations as ProductTranslationRecord[],
    specs: (specs || []) as ProductSpecRecord[],
    faqs: (faqs || []) as ProductFaqRecord[],
    steps: (steps || []) as ProductStepRecord[],
    metrics: (metrics || []) as ProductMetricRecord[],
    packaging: (packaging || []) as ProductPackagingRecord[],
    compliance: (compliance || []) as ProductComplianceRecord[],
    documents: (documents || []) as ProductDocumentRecord[],
  } as ProductWithDetails
}

export async function getAllProducts(locale: Locale) {
  const { data: products } = await supabaseAdmin
    .from('Product')
    .select('*')
    .eq('status', 'published')
    .order('order')

  if (!products || products.length === 0) return []

  const ids = products.map((p) => p.id)
  const { data: translations } = await supabaseAdmin
    .from('ProductTranslation')
    .select('*')
    .in('productId', ids)
    .eq('locale', locale)

  return products.map((p) => ({
    ...p,
    translations: (translations || []).filter((t) => t.productId === p.id),
  }))
}

export async function getAllProductSlugs() {
  const { data } = await supabaseAdmin
    .from('Product')
    .select('slug')
    .eq('status', 'published')

  return data || []
}
