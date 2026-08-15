import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const articlesDirectory = path.join(projectRoot, 'src', 'content', 'articles')
const outputFile = path.join(articlesDirectory, 'generated-articles.json')
const breadcrumbOutputFile = path.join(articlesDirectory, 'generated-breadcrumb-titles.json')
const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'ja', 'fi']

function readFrontmatterValue(raw, key) {
  const match = raw.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  if (!match) return ''
  const value = match[1].trim()
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value)
    } catch {
      return value.slice(1, -1)
    }
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'")
  }
  return value
}

const files = fs
  .readdirSync(articlesDirectory)
  .filter((filename) => filename.endsWith('.md'))
  .sort()
  .map((filename) => ({
    filename,
    raw: fs.readFileSync(path.join(articlesDirectory, filename), 'utf8'),
  }))

fs.writeFileSync(outputFile, `${JSON.stringify(files, null, 2)}\n`, 'utf8')
const breadcrumbTitles = Object.fromEntries(locales.map((locale) => [locale, {}]))
for (const { filename, raw } of files) {
  const localeMatch = filename.match(/\.(de|fr|es|it|pt|ja|fi)\.md$/)
  const locale = localeMatch?.[1] ?? 'en'
  const slug = readFrontmatterValue(raw, 'slug')
  const title = readFrontmatterValue(raw, 'title')
  if (slug && title) breadcrumbTitles[locale][slug] = title
}
fs.writeFileSync(
  breadcrumbOutputFile,
  `${JSON.stringify(breadcrumbTitles, null, 2)}\n`,
  'utf8',
)
console.log(`[articles] generated ${files.length} entries in ${path.relative(projectRoot, outputFile)}`)
console.log(`[articles] generated breadcrumb titles in ${path.relative(projectRoot, breadcrumbOutputFile)}`)
