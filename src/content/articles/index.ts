// src/content/articles/index.ts
// Parses YAML frontmatter from each markdown file to build the Article[] list.
// Uses fs.readFileSync for Next.js server-side rendering (no Vite ?raw imports).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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

// Resolve the articles directory resiliently regardless of the invoking cwd.
// Priority: 1) next to this module file, 2) project cwd, 3) vetrux-prefixed cwd.
function resolveArticlesDir(): string {
  const candidates: string[] = []
  try {
    // In ESM this would be import.meta.url; under CJS transpile __dirname works.
    // Keep both to be safe across Next.js runtimes.
    const here = typeof __dirname !== 'undefined'
      ? __dirname
      : path.dirname(fileURLToPath(import.meta.url))
    candidates.push(here)
  } catch {
    // ignore
  }
  candidates.push(
    path.join(process.cwd(), 'src/content/articles'),
    path.join(process.cwd(), 'vetrux/src/content/articles'),
  )
  for (const dir of candidates) {
    try {
      if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        // Verify it looks like the articles dir by probing a known file.
        const probe = path.join(dir, 'cbd-isolate-vs-distillate-formulation-guide.md')
        if (fs.existsSync(probe)) return dir
      }
    } catch {
      // try next
    }
  }
  // Last-resort fallback — let the readFileSync throw a clearer error.
  return path.join(process.cwd(), 'src/content/articles')
}

const articlesDir = resolveArticlesDir()

// ── Article order + size overrides ───────────────────────────────────────────
const fileOrder: Array<{ filename: string; size?: 'normal' | 'large' }> = [
  { filename: 'cbd-isolate-import-documentation-checklist.md',     size: 'large' },
  { filename: 'cbd-isolate-vs-distillate-formulation-guide.md',   size: 'large' },
  { filename: 'how-to-read-cbd-certificate-of-analysis.md',       size: 'normal' },
  { filename: 'thc-free-cbd-isolate-sourcing-guide-europe.md',    size: 'normal' },
  { filename: 'cbd-isolate-wholesale-pricing-cost-factors.md',    size: 'normal' },
  { filename: 'cbd-supplier-due-diligence-checklist.md',          size: 'normal' },
  { filename: 'cbd-isolate-packaging-storage-shelf-life-guide.md', size: 'large' },
  { filename: 'eu-novel-food-regulation-cbd-importers-guide.md',  size: 'large' },
  { filename: 'cgmp-cbd-manufacturing-quality-guide.md',          size: 'normal' },
  { filename: 'supercritical-co2-extraction-explained.md',        size: 'normal' },
  { filename: 'what-is-cbd-isolate-complete-guide.md',            size: 'large' },
  { filename: 'european-cbd-market-outlook-2026.md',              size: 'normal' },
  { filename: 'apac-cbd-market-outlook-2025.md',                  size: 'normal' },
  { filename: 'botanical-biotechnology-innovation-whitepaper.md',  size: 'normal' },
  { filename: 'co2-vs-ethanol-extraction-comparison.md',          size: 'normal' },
  { filename: 'esg-decarbonizing-cannabis-supply-chain.md',       size: 'normal' },
  { filename: 'global-cbd-extraction-standards-2024.md',          size: 'normal' },
  { filename: 'cbd-extraction-methods-compared-co2-ethanol-hydrocarbon.md', size: 'large' },
  { filename: 'cbd-isolate-bulk-purchasing-guide-2026.md', size: 'large' },
  { filename: 'how-to-read-cbd-certificate-of-analysis-guide.md', size: 'large' },
  { filename: 'cbd-isolate-applications-formulation-guide.md', size: 'large' },
  { filename: 'cbd-import-regulations-europe-novel-food-2026.md', size: 'large' },
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
