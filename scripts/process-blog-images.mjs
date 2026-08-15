import { createHash } from "node:crypto";
import { access, copyFile, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDirectory = path.join(root, "public", "images", "articles");
const reportsDirectory = path.join(root, "reports");

const stockSlugs = [
  "botanical-biotechnology-innovation-whitepaper",
  "cbd-import-regulations-europe-novel-food-2026",
  "cbd-isolate-bulk-purchasing-guide-2026",
  "cbd-isolate-packaging-storage-shelf-life-guide",
  "cgmp-cbd-manufacturing-quality-guide",
  "esg-decarbonizing-cannabis-supply-chain",
  "eu-novel-food-regulation-cbd-importers-guide",
];

const generatedSlugs = [
  "apac-cbd-market-outlook-2025",
  "cbd-extraction-methods-compared-co2-ethanol-hydrocarbon",
  "cbd-isolate-applications-formulation-guide",
  "cbd-isolate-import-documentation-checklist",
  "cbd-isolate-reference-standards-vs-bulk-material",
  "cbd-isolate-vs-distillate-formulation-guide",
  "cbd-isolate-wholesale-pricing-cost-factors",
  "cbd-private-label-white-label-oem-manufacturing-guide",
  "cbd-raw-material-change-control-protocol",
  "cbd-supplier-due-diligence-checklist",
  "co2-vs-ethanol-extraction-comparison",
  "european-cbd-market-outlook-2026",
  "full-spectrum-broad-spectrum-isolate-cbd-comparison",
  "global-cbd-extraction-standards-2024",
  "how-to-read-cbd-certificate-of-analysis-guide",
  "how-to-source-cbd-raw-materials-2026",
  "minor-cannabinoids-cbg-cbn-cbc-sourcing-guide",
  "supercritical-co2-extraction-explained",
  "thc-free-cbd-isolate-sourcing-guide-europe",
  "what-is-cbd-isolate-complete-guide",
];

const images = [
  ...stockSlugs.map((slug) => ({
    slug,
    kind: "stock",
    source: path.join(root, "tmp", "blog-stock", `${slug}.jpg`),
  })),
  ...generatedSlugs.map((slug) => ({
    slug,
    kind: "generated",
    source: path.join(root, "tmp", "blog-generated", `${slug}.png`),
  })),
].sort((a, b) => a.slug.localeCompare(b.slug));

if (images.length !== 27) {
  throw new Error(`Expected 27 active article images, received ${images.length}.`);
}

await mkdir(outputDirectory, { recursive: true });
await mkdir(reportsDirectory, { recursive: true });

for (const image of images) {
  await access(image.source);
  const output = path.join(outputDirectory, `${image.slug}.webp`);
  const temporaryOutput = path.join(outputDirectory, `.${image.slug}.tmp.webp`);

  await sharp(image.source)
    .rotate()
    .resize({
      width: 1600,
      height: 900,
      fit: "cover",
      position: "attention",
      withoutEnlargement: false,
    })
    .webp({ quality: 84, effort: 5, smartSubsample: true })
    .toFile(temporaryOutput);

  await copyFile(temporaryOutput, output);
  await unlink(temporaryOutput);
}

const escapeXml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const wrapSlug = (slug, maximum = 34) => {
  const words = slug.split("-");
  const lines = [""];

  for (const word of words) {
    const line = lines.at(-1);
    const candidate = line ? `${line}-${word}` : word;
    if (candidate.length > maximum && lines.length < 2) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = candidate;
    }
  }

  return lines;
};

const tileWidth = 400;
const imageHeight = 225;
const labelHeight = 58;
const tileHeight = imageHeight + labelHeight;
const columns = 4;
const rows = Math.ceil(images.length / columns);
const tiles = [];

for (const image of images) {
  const output = path.join(outputDirectory, `${image.slug}.webp`);
  const hero = await sharp(output)
    .resize(tileWidth, imageHeight, { fit: "cover" })
    .toBuffer();
  const lines = wrapSlug(image.slug);
  const label = Buffer.from(`
    <svg width="${tileWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#102016" />
      <text x="14" y="22" fill="#f3f0e8" font-family="Arial, sans-serif" font-size="13">${escapeXml(lines[0])}</text>
      <text x="14" y="41" fill="#f3f0e8" font-family="Arial, sans-serif" font-size="13">${escapeXml(lines[1] ?? "")}</text>
      <text x="386" y="41" text-anchor="end" fill="#c6a968" font-family="Arial, sans-serif" font-size="11">${image.kind}</text>
    </svg>
  `);
  const tile = await sharp({
    create: {
      width: tileWidth,
      height: tileHeight,
      channels: 3,
      background: "#102016",
    },
  })
    .composite([
      { input: hero, left: 0, top: 0 },
      { input: label, left: 0, top: imageHeight },
    ])
    .webp({ quality: 82 })
    .toBuffer();
  tiles.push(tile);
}

await sharp({
  create: {
    width: tileWidth * columns,
    height: tileHeight * rows,
    channels: 3,
    background: "#07120c",
  },
})
  .composite(tiles.map((input, index) => ({
    input,
    left: (index % columns) * tileWidth,
    top: Math.floor(index / columns) * tileHeight,
  })))
  .webp({ quality: 84, effort: 5 })
  .toFile(path.join(reportsDirectory, "blog-image-contact-sheet.webp"));

const records = [];
for (const image of images) {
  const output = path.join(outputDirectory, `${image.slug}.webp`);
  const file = await readFile(output);
  const pixels = await sharp(file)
    .resize(32, 18, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
  const metadata = await sharp(file).metadata();
  records.push({
    slug: image.slug,
    kind: image.kind,
    sha256: createHash("sha256").update(file).digest("hex"),
    bytes: file.length,
    width: metadata.width,
    height: metadata.height,
    pixels: [...pixels],
  });
}

const pairs = [];
for (let left = 0; left < records.length; left += 1) {
  for (let right = left + 1; right < records.length; right += 1) {
    let squaredDifference = 0;
    const a = records[left].pixels;
    const b = records[right].pixels;
    for (let pixel = 0; pixel < a.length; pixel += 1) {
      const difference = a[pixel] - b[pixel];
      squaredDifference += difference * difference;
    }
    const normalizedRmse = Math.sqrt(squaredDifference / a.length) / 255;
    pairs.push({
      left: records[left].slug,
      right: records[right].slug,
      normalizedRmse: Number(normalizedRmse.toFixed(4)),
    });
  }
}

pairs.sort((a, b) => a.normalizedRmse - b.normalizedRmse);
const hashes = new Set(records.map((record) => record.sha256));
const report = {
  generatedAt: new Date().toISOString(),
  total: records.length,
  stock: records.filter((record) => record.kind === "stock").length,
  generated: records.filter((record) => record.kind === "generated").length,
  uniqueSha256: hashes.size,
  exactDuplicates: records.length - hashes.size,
  nearestVisualPairs: pairs.slice(0, 12),
  images: records.map((record) => ({
    slug: record.slug,
    kind: record.kind,
    sha256: record.sha256,
    bytes: record.bytes,
    width: record.width,
    height: record.height,
  })),
};

await writeFile(
  path.join(reportsDirectory, "blog-image-qa.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

console.log(`Processed ${report.total} article heroes (${report.stock} stock, ${report.generated} generated).`);
console.log(`Exact duplicate files: ${report.exactDuplicates}.`);
console.log(`Nearest visual pair RMSE: ${pairs[0].normalizedRmse} (${pairs[0].left} / ${pairs[0].right}).`);
console.log(`Contact sheet: ${path.join(reportsDirectory, "blog-image-contact-sheet.webp")}`);
