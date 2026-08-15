// scripts/normalize-article-frontmatter.mjs
// One-off migration helper: point every article's frontmatter `image` at its
// repository-local hero and normalize ambiguous dates to ISO 8601.
// Run: node scripts/normalize-article-frontmatter.mjs

import fs from 'node:fs'
import path from 'node:path'

const dir = path.join(process.cwd(), 'src/content/articles')
const MONTHS = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
}

function normalizeDate(value) {
  const t = value.trim().replace(/^["']|["']$/g, '')
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t
  const y = t.match(/^(\d{4})$/)
  if (y) return `${y[1]}-01-01`
  const m = t.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (m && MONTHS[m[1].toLowerCase()]) return `${m[2]}-${MONTHS[m[1].toLowerCase()]}-01`
  return t
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
let changed = 0

for (const filename of files) {
  const full = path.join(dir, filename)
  const raw = fs.readFileSync(full, 'utf8')
  const eol = raw.includes('\r\n') ? '\r\n' : '\n'
  const lines = raw.split(/\r?\n/)

  let inFm = false
  let fmEnd = -1
  let slug = ''
  let imgLine = -1
  let dateLine = -1

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (i === 0 && line.trim() === '---') {
      inFm = true
      continue
    }
    if (inFm && line.trim() === '---') {
      fmEnd = i
      break
    }
    if (!inFm) continue
    if (line.startsWith('slug:')) {
      slug = line.slice(5).trim().replace(/^["']|["']$/g, '')
    }
    if (line.startsWith('image:')) imgLine = i
    if (line.startsWith('date:')) dateLine = i
  }

  if (fmEnd < 0 || !slug) {
    console.log('skip (no frontmatter slug):', filename)
    continue
  }

  let mutated = false

  if (imgLine >= 0) {
    const local = `/images/articles/${slug}.webp`
    if (!lines[imgLine].includes(local)) {
      lines[imgLine] = `image: "${local}"`
      mutated = true
    }
  }

  if (dateLine >= 0) {
    const current = lines[dateLine].slice(5).trim()
    const currentClean = current.replace(/^["']|["']$/g, '')
    const norm = normalizeDate(current)
    if (norm !== currentClean) {
      lines[dateLine] = `date: "${norm}"`
      mutated = true
    }
  }

  if (mutated) {
    fs.writeFileSync(full, lines.join(eol) + eol)
    changed += 1
    console.log('updated', filename, 'slug=' + slug)
  }
}

console.log('files updated:', changed)
