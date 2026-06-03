import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { randomUUID } from 'crypto'

function genId() { return randomUUID().replace(/-/g, '').slice(0, 25) }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'ja', 'fi'] as const

const newArticleFiles = [
  'cbd-extraction-methods-compared-co2-ethanol-hydrocarbon.md',
  'cbd-isolate-bulk-purchasing-guide-2026.md',
  'how-to-read-cbd-certificate-of-analysis-guide.md',
  'cbd-isolate-applications-formulation-guide.md',
  'cbd-import-regulations-europe-novel-food-2026.md',
]

interface TranslationMeta {
  title: string
  excerpt: string
  readTime: string
}

const translations: Record<string, Record<string, TranslationMeta>> = {
  'cbd-extraction-methods-compared-co2-ethanol-hydrocarbon': {
    de: { title: 'CBD-Extraktionsmethoden im Vergleich: CO2 vs. Ethanol vs. Kohlenwasserstoff', excerpt: 'Ein umfassender technischer Vergleich der drei dominierenden CBD-Extraktionsmethoden.', readTime: '18 min' },
    fr: { title: "Methodes d'extraction du CBD comparees : CO2 vs ethanol vs hydrocarbure", excerpt: "Une comparaison technique complete des trois methodes dominantes d'extraction du CBD.", readTime: '18 min' },
    es: { title: 'Metodos de extraccion de CBD comparados: CO2 vs etanol vs hidrocarburo', excerpt: 'Una comparacion tecnica integral de los tres metodos dominantes de extraccion de CBD.', readTime: '18 min' },
    it: { title: 'Metodi di estrazione del CBD a confronto: CO2 vs etanolo vs idrocarburi', excerpt: 'Un confronto tecnico completo dei tre metodi dominanti di estrazione del CBD.', readTime: '15 min' },
    pt: { title: 'Metodos de extracao de CBD comparados: CO2 vs etanol vs hidrocarboneto', excerpt: 'Uma comparacao tecnica abrangente dos tres metodos dominantes de extracao de CBD.', readTime: '18 min' },
    ja: { title: 'CBD抽出方法の比較：CO2 vs エタノール vs 炭化水素', excerpt: '超臨界CO2、エタノール、炭化水素の3つの主要なCBD抽出方法の包括的な技術比較。', readTime: '18 min' },
    fi: { title: 'CBD-uuttomenetelmien vertailu: CO2 vs etanoli vs hiilivety', excerpt: 'Kattava tekninen vertailu kolmesta hallitsevasta CBD-uuttomenetelmasta.', readTime: '18 min' },
  },
  'cbd-isolate-bulk-purchasing-guide-2026': {
    de: { title: 'CBD-Isolat Grosseinkaufsratgeber: Industrielles CBD beschaffen 2026', excerpt: 'Ein umfassender Beschaffungsleitfaden fuer B2B-Einkaeufer, die CBD-Isolat in grossen Mengen beziehen.', readTime: '16 min' },
    fr: { title: "Guide d'achat en gros de CBD Isolat : Approvisionnement industriel 2026", excerpt: "Un guide d'approvisionnement complet pour les acheteurs B2B sourcant du CBD isolat en vrac.", readTime: '16 min' },
    es: { title: 'Guia de compra al por mayor de CBD Aislado 2026', excerpt: 'Una guia integral de adquisiciones para compradores B2B que buscan CBD aislado a granel.', readTime: '16 min' },
    it: { title: "Guida all'acquisto all'ingrosso di CBD Isolato 2026", excerpt: "Una guida completa all'approvvigionamento per acquirenti B2B che cercano CBD isolato all'ingrosso.", readTime: '16 min' },
    pt: { title: 'Guia de compra em massa de CBD Isolado 2026', excerpt: 'Um guia abrangente de aquisicao para compradores B2B que buscam CBD isolado em grandes quantidades.', readTime: '16 min' },
    ja: { title: 'CBDアイソレート大量購入ガイド2026', excerpt: 'CBDアイソレートを大量に調達するB2Bバイヤー向けの包括的な調達ガイド。', readTime: '16 min' },
    fi: { title: 'CBD-isolaatin tukkuosto-opas 2026', excerpt: 'Kattava hankintaopas B2B-ostajille, jotka hankkivat CBD-isolaattia suurissa erissa.', readTime: '16 min' },
  },
  'how-to-read-cbd-certificate-of-analysis': {
    de: { title: 'Wie man ein CBD-Analysezertifikat (COA) liest: Kaeufer-Leitfaden', excerpt: 'Erfahren Sie, wie Sie jeden Abschnitt eines CBD-Analysezertifikats interpretieren.', readTime: '14 min' },
    fr: { title: "Comment lire un certificat d'analyse (COA) CBD : Guide de l'acheteur", excerpt: "Apprenez a interpreter chaque section d'un certificat d'analyse CBD.", readTime: '14 min' },
    es: { title: 'Como leer un Certificado de Analisis (COA) de CBD: Guia del comprador', excerpt: 'Aprenda a interpretar cada seccion de un Certificado de Analisis de CBD.', readTime: '14 min' },
    it: { title: "Come leggere un Certificato di Analisi (COA) del CBD: Guida per l'acquirente", excerpt: 'Impara a interpretare ogni sezione di un Certificato di Analisi del CBD.', readTime: '14 min' },
    pt: { title: 'Como ler um Certificado de Analise (COA) de CBD: Guia do comprador', excerpt: 'Aprenda a interpretar cada secao de um Certificado de Analise de CBD.', readTime: '14 min' },
    ja: { title: 'CBD分析証明書（COA）の読み方：バイヤー向け完全ガイド', excerpt: 'CBD分析証明書のすべてのセクションを解釈する方法を学びましょう。', readTime: '14 min' },
    fi: { title: 'Kuinka lukea CBD-analyysitodistusta (COA): Ostajan opas', excerpt: 'Opi tulkitsemaan CBD-analyysitodistuksen jokainen osio.', readTime: '14 min' },
  },
  'cbd-isolate-applications-formulation-guide': {
    de: { title: 'CBD-Isolat Anwendungen: Formulierungsleitfaden fuer Kosmetik und Pharma', excerpt: 'Ein technischer Formulierungsleitfaden zu CBD-Isolat-Anwendungen in Kosmetik, Nahrungsergaenzungsmitteln und Pharmazeutika.', readTime: '15 min' },
    fr: { title: 'Applications du CBD Isolat : Guide de formulation cosmetiques et pharma', excerpt: 'Un guide technique de formulation couvrant les applications du CBD isolat.', readTime: '15 min' },
    es: { title: 'Aplicaciones del CBD Aislado: Guia de formulacion para cosmeticos y farma', excerpt: 'Una guia tecnica de formulacion que cubre las aplicaciones del CBD aislado.', readTime: '15 min' },
    it: { title: 'Applicazioni del CBD Isolato: Guida alla formulazione cosmetici e farmaceutici', excerpt: 'Una guida tecnica alla formulazione che copre le applicazioni del CBD isolato.', readTime: '15 min' },
    pt: { title: 'Aplicacoes do CBD Isolado: Guia de formulacao para cosmeticos e farma', excerpt: 'Um guia tecnico de formulacao cobrindo aplicacoes do CBD isolado.', readTime: '15 min' },
    ja: { title: 'CBDアイソレートの用途：化粧品・サプリメント・医薬品の処方ガイド', excerpt: '化粧品、栄養補助食品、医薬品におけるCBDアイソレートの用途をカバーする技術的な処方ガイド。', readTime: '15 min' },
    fi: { title: 'CBD-isolaatin sovellukset: Formulointiopas kosmetiikkaan ja laakkeisiin', excerpt: 'Tekninen formulointiopas, joka kattaa CBD-isolaatin sovellukset.', readTime: '15 min' },
  },
  'cbd-import-regulations-europe-novel-food-2026': {
    de: { title: 'CBD-Importvorschriften in Europa: Novel-Food-Leitfaden 2026', excerpt: 'Ein umfassender regulatorischer Leitfaden fuer den Import von CBD-Produkten in die EU.', readTime: '17 min' },
    fr: { title: "Reglementations d'importation du CBD en Europe : Guide Novel Food 2026", excerpt: "Un guide reglementaire complet pour l'importation de produits CBD dans l'UE.", readTime: '17 min' },
    es: { title: 'Regulaciones de importacion de CBD en Europa: Guia Novel Food 2026', excerpt: 'Una guia regulatoria integral para importar productos de CBD a la UE.', readTime: '17 min' },
    it: { title: "Regolamenti sull'importazione di CBD in Europa: Guida Novel Food 2026", excerpt: "Una guida normativa completa per l'importazione di prodotti CBD nell'UE.", readTime: '17 min' },
    pt: { title: 'Regulamentacoes de importacao de CBD na Europa: Guia Novel Food 2026', excerpt: 'Um guia regulatorio abrangente para importar produtos de CBD para a UE.', readTime: '17 min' },
    ja: { title: '欧州CBD輸入規制：2026年ノベルフード適合ガイド', excerpt: 'EUへのCBD製品輸入に関する包括的な規制ガイド。', readTime: '17 min' },
    fi: { title: 'CBD-tuontisaannokset Euroopassa: Novel Food -opas 2026', excerpt: 'Kattava saantelyopas CBD-tuotteiden tuontiin Euroopan unioniin.', readTime: '17 min' },
  },
}

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const result: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key) result[key] = val
  }
  return result
}

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

async function main() {
  console.log('Seeding 5 new SEO articles with 8 language translations...\n')

  const articlesDir = path.join(process.cwd(), 'src/content/articles')
  let seeded = 0

  for (const file of newArticleFiles) {
    const filePath = path.join(articlesDir, file)
    if (!fs.existsSync(filePath)) {
      console.error(`  [missing] ${file}`)
      continue
    }

    const raw = fs.readFileSync(filePath, 'utf-8')
    const fm = parseFrontmatter(raw)
    const body = stripFrontmatter(raw)
    const slug = fm.slug
    if (!slug) {
      console.error(`  [no-slug] ${file}`)
      continue
    }

    const { data: existing } = await supabase.from('Article').select('id').eq('slug', slug).single()
    if (existing) {
      console.log(`  [skip] ${slug} already exists`)
      continue
    }

    const { data: article, error } = await supabase.from('Article').insert({
      id: genId(),
      slug,
      status: 'published',
      category: fm.category || 'Insight',
      image: fm.image || '',
      size: 'large',
      publishedAt: fm.date ? new Date(fm.date).toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).select().single()

    if (error || !article) {
      console.error(`  [error] ${slug}:`, error?.message)
      continue
    }

    // English translation
    const { error: enErr } = await supabase.from('ArticleTranslation').insert({
      id: genId(),
      articleId: article.id,
      locale: 'en',
      title: fm.title || slug,
      excerpt: fm.excerpt || '',
      content: body,
      readTime: fm.readTime ? `${fm.readTime} Read` : '',
      seoTitle: fm.title || slug,
      seoDescription: fm.excerpt || '',
    })
    if (enErr) console.error(`  [en-error] ${slug}:`, enErr.message)

    // Other locale translations
    const trans = translations[slug]
    if (trans) {
      for (const locale of locales) {
        if (locale === 'en') continue
        const t = trans[locale]
        if (!t) continue

        const { error: locErr } = await supabase.from('ArticleTranslation').insert({
          id: genId(),
          articleId: article.id,
          locale,
          title: t.title,
          excerpt: t.excerpt,
          content: body,
          readTime: t.readTime ? `${t.readTime} Read` : '',
          seoTitle: t.title,
          seoDescription: t.excerpt,
        })
        if (locErr) console.error(`  [${locale}-error] ${slug}:`, locErr.message)
      }
    }

    seeded++
    console.log(`  [ok] ${slug} (8 translations)`)
  }

  console.log(`\nDone! Seeded ${seeded} new articles.`)
}

main().catch(console.error)
