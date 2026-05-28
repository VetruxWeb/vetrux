import { createClient } from '@supabase/supabase-js'
import { hash } from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'
import { randomUUID } from 'crypto'

function genId() { return randomUUID().replace(/-/g, '').slice(0, 25) }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'ja', 'fi'] as const

async function seedAdmin() {
  console.log('Seeding admin user...')
  const passwordHash = await hash('admin123', 12)

  const { data: existing } = await supabase
    .from('User')
    .select('id')
    .eq('email', 'admin@vetrux.tech')
    .single()

  if (existing) {
    console.log('Admin user already exists, skipping...')
    return
  }

  const { error } = await supabase.from('User').insert({
    id: genId(),
    email: 'admin@vetrux.tech',
    name: 'Admin',
    passwordHash,
    role: 'admin',
    updatedAt: new Date().toISOString(),
  })
  if (error) console.error('Admin seed error:', error.message)
  else console.log('Admin user created: admin@vetrux.tech / admin123')
}

async function seedProducts() {
  console.log('Seeding CBD Isolate product...')

  const { data: existing } = await supabase.from('Product').select('id').eq('slug', 'cbd-isolate').single()
  if (existing) {
    console.log('CBD Isolate already exists, skipping...')
    return
  }

  const productContent = await import('../src/content/pages/product.content')
  const strings = productContent.productPageStrings

  const { data: product, error } = await supabase.from('Product').insert({
    id: genId(),
    slug: 'cbd-isolate',
    status: 'published',
    heroImage: '/images/vetrux_images/cbd-isolate-crystals-white-powder.jpg',
    images: [
      '/images/vetrux_images/cbd-isolate-crystals-white-powder.jpg',
      '/images/vetrux_images/bulk-cbd-isolate-crystal-powder-closeup.jpg',
    ],
    order: 0,
    updatedAt: new Date().toISOString(),
  }).select().single()

  if (error || !product) {
    console.error('Product insert error:', error?.message)
    return
  }

  const productId = product.id

  // Translations for all 8 locales
  const translations = locales.map((locale) => {
    const t = strings[locale]
    return {
      id: genId(),
      productId,
      locale,
      name: 'CBD Isolate',
      badge: t.badge,
      heroTitle1: t.heroTitle1,
      heroTitle2: t.heroTitle2,
      heroBody: t.heroBody,
      techSection: t.techSection,
      techTitle: t.techTitle,
      techBody: t.techBody,
      buyerSection: t.buyerSection,
      buyerTitle: t.buyerTitle,
      processSection: t.processSection,
      processTitle: t.processTitle,
      specSection: t.specSection,
      specTitle: t.specTitle,
      complianceSection: t.complianceSection,
      complianceTitle: t.complianceTitle,
      exportNotice: t.exportNotice,
      exportBody: t.exportBody,
      buyerResponsibility: t.buyerResponsibility,
      qualitySection: t.qualitySection,
      qualityTitle: t.qualityTitle,
      qualityAssuranceLink: t.qualityAssuranceLink,
      qualityAssuranceSub: t.qualityAssuranceSub,
      wholesaleLink: t.wholesaleLink,
      wholesaleSub: t.wholesaleSub,
      contactSalesLink: t.contactSalesLink,
      requestSpecSheet: t.requestSpecSheet,
      requestCoa: t.requestCoa,
      seoTitle: 'CBD Isolate Specifications | Vetrux',
      seoDescription: t.heroBody,
      seoKeywords: 'CBD isolate, bulk CBD, wholesale CBD, B2B CBD',
    }
  })

  const { error: transErr } = await supabase.from('ProductTranslation').insert(translations)
  if (transErr) console.error('Translation insert error:', transErr.message)

  // Seed structured data for all locales
  const enData = strings.en

  for (const locale of locales) {
    const metrics = enData.metrics.map((m: { label: string; value: string; status: string }, i: number) => ({
      id: genId(), productId, locale, label: m.label, value: m.value, status: m.status, order: i,
    }))
    await supabase.from('ProductMetric').insert(metrics)

    const steps = enData.steps.map((s: { title: string; desc: string }, i: number) => ({
      id: genId(), productId, locale, title: s.title, desc: s.desc, order: i,
    }))
    await supabase.from('ProductStep').insert(steps)

    const faqs = enData.qa.map((q: { question: string; answer: string }, i: number) => ({
      id: genId(), productId, locale, question: q.question, answer: q.answer, order: i,
    }))
    await supabase.from('ProductFaq').insert(faqs)

    const specs = enData.specs.map((s: { label: string; value: string }, i: number) => ({
      id: genId(), productId, locale, label: s.label, value: s.value, order: i,
    }))
    await supabase.from('ProductSpec').insert(specs)

    const packaging = enData.packaging.map((p: { label: string; value: string }, i: number) => ({
      id: genId(), productId, locale, label: p.label, value: p.value, order: i,
    }))
    await supabase.from('ProductPackaging').insert(packaging)

    const compliance = enData.compliance.map((c: { standard: string; detail: string }, i: number) => ({
      id: genId(), productId, locale, standard: c.standard, detail: c.detail, order: i,
    }))
    await supabase.from('ProductCompliance').insert(compliance)

    const documents = enData.documents.map((d: { title: string; desc: string; image: string; alt: string }, i: number) => ({
      id: genId(), productId, locale, title: d.title, desc: d.desc, image: d.image, alt: d.alt, order: i,
    }))
    await supabase.from('ProductDocument').insert(documents)
  }

  console.log('CBD Isolate product seeded with all translations and structured data.')

  // CBD Oil placeholder
  console.log('Seeding CBD Oil placeholder...')
  const { data: oilExisting } = await supabase.from('Product').select('id').eq('slug', 'cbd-oil').single()
  if (oilExisting) {
    console.log('CBD Oil already exists, skipping...')
    return
  }

  const { data: oilProduct, error: oilErr } = await supabase.from('Product').insert({
    id: genId(),
    slug: 'cbd-oil',
    status: 'published',
    order: 1,
    updatedAt: new Date().toISOString(),
  }).select().single()

  if (oilErr || !oilProduct) {
    console.error('CBD Oil insert error:', oilErr?.message)
    return
  }

  await supabase.from('ProductTranslation').insert({
    id: genId(),
    productId: oilProduct.id,
    locale: 'en',
    name: 'CBD Oil',
    badge: 'CBD Products',
    heroTitle1: 'CBD Oil',
    heroTitle2: 'Specifications',
    heroBody: 'Full-spectrum CBD oil product information for qualified bulk buyers.',
    techSection: 'Technical Analysis',
    techTitle: 'CBD Oil product information',
    techBody: 'Product details coming soon.',
    seoTitle: 'CBD Oil | Vetrux',
    seoDescription: 'CBD Oil product information for qualified B2B buyers.',
  })

  console.log('CBD Oil placeholder created.')
}

async function seedArticles() {
  console.log('Seeding articles from markdown files...')

  const articlesDir = path.join(process.cwd(), 'src/content/articles')
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.md'))
  let seeded = 0

  for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8')

    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!frontmatterMatch) continue

    const frontmatter = frontmatterMatch[1]
    const body = content.slice(frontmatterMatch[0].length).trim()

    const getMeta = (key: string): string => {
      const match = frontmatter.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))
      return match ? match[1] : ''
    }

    const slug = getMeta('slug')
    if (!slug) continue

    const { data: existing } = await supabase.from('Article').select('id').eq('slug', slug).single()
    if (existing) continue

    const { data: article, error } = await supabase.from('Article').insert({
      id: genId(),
      slug,
      status: 'published',
      category: getMeta('category') || 'Insight',
      image: getMeta('image') || '',
      size: 'normal',
      publishedAt: getMeta('date') ? new Date(getMeta('date')).toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).select().single()

    if (error || !article) {
      console.error(`Article "${slug}" error:`, error?.message)
      continue
    }

    await supabase.from('ArticleTranslation').insert({
      id: genId(),
      articleId: article.id,
      locale: 'en',
      title: getMeta('title') || slug,
      excerpt: getMeta('excerpt') || '',
      content: body,
      readTime: getMeta('readTime') ? `${getMeta('readTime')} Read` : '',
      seoTitle: getMeta('title') || slug,
      seoDescription: getMeta('excerpt') || '',
    })

    seeded++
  }

  console.log(`Articles seeded: ${seeded} new articles from ${files.length} files.`)
}

async function main() {
  console.log('Starting Vetrux seed via Supabase REST API...\n')
  await seedAdmin()
  await seedProducts()
  await seedArticles()
  console.log('\nSeed complete!')
}

main().catch(console.error)
