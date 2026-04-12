// src/content/articles/index.ts
// Parses YAML frontmatter from each markdown file to build the Article[] list.
// To add a new article: create the .md file with frontmatter, import it below,
// and add it to the rawFiles array — no other changes needed.

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

// ── Raw markdown imports (Vite ?raw) ──────────────────────────────────────────
import whitepaperMd    from './botanical-biotechnology-innovation-whitepaper.md?raw';
import regulatoryMd   from './global-cbd-extraction-standards-2024.md?raw';
import esgMd          from './esg-decarbonizing-cannabis-supply-chain.md?raw';
import techMd         from './co2-vs-ethanol-extraction-comparison.md?raw';
import marketMd       from './apac-cbd-market-outlook-2025.md?raw';
import sourcingMd     from './final_article.md?raw';

// ── Frontmatter parser ────────────────────────────────────────────────────────
// Extracts the YAML block between the opening and closing `---` delimiters.
// Supports: unquoted values, single-quoted, and double-quoted values.
function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key) result[key] = val;
  }
  return result;
}

// ── Article order + size overrides ───────────────────────────────────────────
// Declare files in the order you want them displayed on InsightsPage.
// The first entry becomes the featured hero article.
const rawFiles: Array<{ raw: string; size?: 'normal' | 'large' }> = [
  { raw: whitepaperMd,  size: 'large'  },
  { raw: regulatoryMd,  size: 'normal' },
  { raw: esgMd,         size: 'normal' },
  { raw: techMd,        size: 'normal' },
  { raw: marketMd,      size: 'normal' },
  { raw: sourcingMd,    size: 'normal' },
];

// ── Build Article[] from parsed frontmatter ───────────────────────────────────
export const articles: Article[] = rawFiles.map(({ raw, size }) => {
  const fm = parseFrontmatter(raw);
  return {
    slug:     fm.slug     ?? '',
    category: fm.category ?? 'Insight',
    title:    fm.title    ?? '',
    excerpt:  fm.excerpt  ?? '',
    date:     fm.date     ?? '',
    readTime: fm.readTime ? `${fm.readTime} Read` : '',
    image:    fm.image    ?? '',
    size,
  };
});

// ── Raw content map (for ArticlePage renderer) ────────────────────────────────
export const articleContent: Record<string, string> = Object.fromEntries(
  rawFiles.map(({ raw }) => {
    const fm = parseFrontmatter(raw);
    return [fm.slug, raw];
  })
);
