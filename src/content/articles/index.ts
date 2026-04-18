// src/content/articles/index.ts
// Parses YAML frontmatter from each markdown file to build the Article[] list.
// Uses fs.readFileSync for Next.js server-side rendering (no Vite ?raw imports).

import fs from 'node:fs'
import path from 'node:path'

export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  size?: 'normal' | 'large';
}

const articlesDir = path.join(process.cwd(), 'src/content/articles')

// ── Article order + size overrides ───────────────────────────────────────────
const fileOrder: Array<{ filename: string; size?: 'normal' | 'large' }> = [
  // Original articles
  { filename: 'botanical-biotechnology-innovation-whitepaper.md', size: 'large' },
  { filename: 'global-cbd-extraction-standards-2024.md',          size: 'normal' },
  { filename: 'esg-decarbonizing-cannabis-supply-chain.md',       size: 'normal' },
  { filename: 'co2-vs-ethanol-extraction-comparison.md',          size: 'normal' },
  { filename: 'apac-cbd-market-outlook-2025.md',                  size: 'normal' },
  { filename: 'final_article.md',                                 size: 'normal' },
  // BOFU articles
  { filename: 'cbd-isolate-vs-distillate-formulation-guide.md',   size: 'large' },
  { filename: 'how-to-read-cbd-certificate-of-analysis.md',       size: 'normal' },
  { filename: 'thc-free-cbd-isolate-sourcing-guide-europe.md',    size: 'normal' },
  { filename: 'cbd-isolate-wholesale-pricing-cost-factors.md',    size: 'normal' },
  // MOFU articles
  { filename: 'eu-novel-food-regulation-cbd-importers-guide.md',  size: 'large' },
  { filename: 'cbd-isolate-packaging-storage-shelf-life-guide.md', size: 'normal' },
  { filename: 'cbd-supplier-due-diligence-checklist.md',          size: 'normal' },
  { filename: 'cgmp-cbd-manufacturing-quality-guide.md',          size: 'normal' },
  // TOFU articles
  { filename: 'what-is-cbd-isolate-complete-guide.md',            size: 'large' },
  { filename: 'european-cbd-market-outlook-2026.md',              size: 'normal' },
  { filename: 'supercritical-co2-extraction-explained.md',        size: 'normal' },
]

// ── Frontmatter parser ────────────────────────────────────────────────────────
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

function readArticleFile(filename: string): string {
  return fs.readFileSync(path.join(articlesDir, filename), 'utf8')
}

// ── Build Article[] from parsed frontmatter ───────────────────────────────────
export const articles: Article[] = fileOrder.map(({ filename, size }) => {
  const raw = readArticleFile(filename)
  const fm = parseFrontmatter(raw)
  return {
    slug:     fm.slug     ?? '',
    category: fm.category ?? 'Insight',
    title:    fm.title    ?? '',
    excerpt:  fm.excerpt  ?? '',
    date:     fm.date     ?? '',
    readTime: fm.readTime ? `${fm.readTime} Read` : '',
    image:    fm.image    ?? '',
    size,
  }
})

// ── Raw content map (for ArticlePage renderer) ────────────────────────────────
export const articleContent: Record<string, string> = Object.fromEntries(
  fileOrder.map(({ filename }) => {
    const raw = readArticleFile(filename)
    const fm = parseFrontmatter(raw)
    return [fm.slug, stripFrontmatter(raw)]
  })
)

// ── Helper for dynamic route pages ────────────────────────────────────────────
export function getArticleBySlug(slug: string): { meta: Article; content: string } | null {
  const meta = articles.find((a) => a.slug === slug)
  if (!meta) return null
  return { meta, content: articleContent[slug] ?? '' }
}
