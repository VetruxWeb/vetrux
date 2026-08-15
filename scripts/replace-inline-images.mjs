// scripts/replace-inline-images.mjs
// One-off migration helper: replace every inline Unsplash image inside article
// bodies with a repository-local asset (article hero or a semantically matched
// facility photo). Run: node scripts/replace-inline-images.mjs

import fs from 'node:fs'
import path from 'node:path'

const dir = path.join(process.cwd(), 'src/content/articles')

// photo id (from the URL) → local replacement
const REPLACEMENTS = {
  // Same image as the (former) hero → use the generated local hero
  'photo-1477959858617-67f85cf4f1df': '/images/articles/apac-cbd-market-outlook-2025.webp',
  'photo-1532187863486-abf9dbad1b69': '/images/articles/botanical-biotechnology-innovation-whitepaper.webp',
  'photo-1541872703-74c5e44368f9': '/images/articles/cbd-import-regulations-europe-novel-food-2026.webp',
  'photo-1556228720-195a672e8a03': '/images/vetrux_images/cbd-isolate-hplc-quality-control-system.jpg',
  'photo-1471864190281-a93a3070b6de': '/images/vetrux_images/cbd-isolate-5kg-foil-bag-packaging.jpg',
  'photo-1553413077-190dd305871c': '/images/vetrux_images/cbd-isolate-export-carton-packing.jpg',
  'photo-1582719471384-894fbb16f461': '/images/vetrux_images/cbd-isolate-hplc-quality-control-system.jpg',
  'photo-1587854692152-cbe660dbde88': '/images/gallery/processing-workshop.webp',
  'photo-1576086213369-97a306d36557': '/images/articles/co2-vs-ethanol-extraction-comparison.webp',
  'photo-1473341304170-971dccb5ac1e': '/images/articles/esg-decarbonizing-cannabis-supply-chain.webp',
  'photo-1582719471384-894fbb16e074': '/images/articles/how-to-source-cbd-raw-materials-2026.webp',
  'photo-1589994965851-a8f479c573a9': '/images/articles/global-cbd-extraction-standards-2024.webp',
  'photo-1579154204601-01588f351e67': '/images/vetrux_images/cbd-isolate-hplc-quality-control-system.jpg',
  'photo-1454165804606-c3d57bc86b40': '/images/vetrux_images/cbd-isolate-coa-certificate-page-1.png',
  'photo-1494412574643-ff11b0a5c1c3': '/images/vetrux_images/cbd-isolate-export-carton-packing.jpg',
  'photo-1581093458791-9d42e3c7e117': '/images/equipment/extraction-tanks.jpg',
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
let replaced = 0
let remaining = 0

for (const filename of files) {
  const full = path.join(dir, filename)
  const raw = fs.readFileSync(full, 'utf8')
  const eol = raw.includes('\r\n') ? '\r\n' : '\n'
  const lines = raw.split(/\r?\n/)

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const matches = [...line.matchAll(/!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g)]
    for (const m of matches) {
      const photoId = m[2].split('?')[0].split('/').pop() ?? ''
      const replacement = REPLACEMENTS[photoId]
      if (replacement) {
        lines[i] = lines[i].replace(m[0], `![${m[1]}](${replacement})`)
        replaced += 1
      } else {
        remaining += 1
        console.log('NO MAP:', filename, '|', photoId, '|', m[1])
      }
    }
  }

  fs.writeFileSync(full, lines.join(eol) + eol)
}

console.log(`replaced: ${replaced}, unmatched: ${remaining}`)
