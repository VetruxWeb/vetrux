import { z } from 'zod'
import { adminConfig } from './config'

const localeEnum = z.enum(adminConfig.locales)

export const productTranslationSchema = z.object({
  locale: localeEnum,
  name: z.string().min(1),
  badge: z.string().optional(),
  heroTitle1: z.string().optional(),
  heroTitle2: z.string().optional(),
  heroBody: z.string().optional(),
  techSection: z.string().optional(),
  techTitle: z.string().optional(),
  techBody: z.string().optional(),
  buyerSection: z.string().optional(),
  buyerTitle: z.string().optional(),
  processSection: z.string().optional(),
  processTitle: z.string().optional(),
  specSection: z.string().optional(),
  specTitle: z.string().optional(),
  complianceSection: z.string().optional(),
  complianceTitle: z.string().optional(),
  exportNotice: z.string().optional(),
  exportBody: z.string().optional(),
  buyerResponsibility: z.string().optional(),
  qualitySection: z.string().optional(),
  qualityTitle: z.string().optional(),
  qualityAssuranceLink: z.string().optional(),
  qualityAssuranceSub: z.string().optional(),
  wholesaleLink: z.string().optional(),
  wholesaleSub: z.string().optional(),
  contactSalesLink: z.string().optional(),
  requestSpecSheet: z.string().optional(),
  requestCoa: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
})

export const createProductSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  status: z.enum(['draft', 'published']).default('draft'),
  heroImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  order: z.number().int().default(0),
  translations: z.array(productTranslationSchema).min(1),
})

export const updateProductSchema = createProductSchema.partial().omit({ slug: true })

export const articleTranslationSchema = z.object({
  locale: localeEnum,
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  readTime: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

export const createArticleSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  status: z.enum(['draft', 'published']).default('draft'),
  category: z.string().optional(),
  image: z.string().optional(),
  size: z.enum(['normal', 'large']).default('normal'),
  publishedAt: z.string().datetime().optional(),
  translations: z.array(articleTranslationSchema).min(1),
})

export const updateArticleSchema = createArticleSchema.partial().omit({ slug: true })

export const updateInquirySchema = z.object({
  status: z.enum(['new', 'read', 'replied', 'archived']),
})
