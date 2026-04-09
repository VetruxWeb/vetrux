// src/pages/GalleryPage.tsx
// Page 2: Campus Gallery — "Vertical Integration. From Seed to Solution."
// Sections: Hero, 4 Sectors (Masonry-style grids)

import SectionLabel from '../components/atoms/SectionLabel';

// Gallery image data per sector
const sectors = [
  {
    id: 'S01',
    label: 'Sector 01 — Architectural Excellence',
    title: 'Main Campus & Infrastructure',
    description:
      'Spanning 45,000 m² in Yunnan Province, our integrated campus houses extraction, refinement, QA, and logistics under one roof.',
    images: [
      { src: '/images/gallery/campus1.webp', alt: 'Campus aerial view', span: 'col-span-1 row-span-2' },
      { src: '/images/gallery/campus2.webp', alt: 'Main hall', span: 'col-span-1' },
      { src: '/images/gallery/campus3.webp', alt: 'Processing wing', span: 'col-span-1' },
      { src: '/images/gallery/campus4.webp', alt: 'Campus exterior', span: 'col-span-2' },
    ],
    stat: { label: 'Total Area', value: '45,000 m²' },
    eco: 'Carbon Neutral 2024',
  },
  {
    id: 'S02',
    label: 'Sector 02 — Raw Material Purity',
    title: 'Planting Base & Cultivation',
    description:
      'Organic hemp cultivation in pristine Yunnan highlands. Rigorous traceability from seed selection to harvest, with precision environment controls.',
    images: [
      { src: '/images/planting/plant5.jpg', alt: 'Hemp cultivation fields', span: 'col-span-2 row-span-2' },
      { src: '/images/planting/plant7.jpg', alt: 'Seedling lab', span: 'col-span-1' },
      { src: '/images/planting/plant12.jpg', alt: 'Greenhouse', span: 'col-span-1' },
    ],
    stat: { label: 'Cultivation Base', value: '12,000 m²' },
    eco: 'Organic Certified',
  },
  {
    id: 'S03',
    label: 'Sector 03 — Technical Precision',
    title: 'Extraction & Refinement',
    description:
      'State-of-the-art supercritical CO₂ extraction vessels paired with multi-stage chromatography columns achieving 99.5% purity benchmarks.',
    images: [
      { src: '/images/equipment/extract-concentrator-zone.webp', alt: 'Extraction tanks', span: 'col-span-1' },
      { src: '/images/equipment/refinement-concentrator-600L.webp', alt: 'Chromatography lab', span: 'col-span-1' },
      { src: '/images/equipment/mixing-sedimentation-tank.webp', alt: 'Control room panorama', span: 'col-span-2' },
    ],
    stat: { label: 'Purity Standard', value: '99.5%' },
    eco: 'cGMP Compliant',
  },
  {
    id: 'S04',
    label: 'Sector 04 — R&D Innovation',
    title: 'Product Laboratory',
    description:
      'Dedicated R&D centre for new formulations, quality assurance testing, and COA generation. Double-blind testing protocols on every batch.',
    images: [
      { src: '/images/products/product1.jpg', alt: 'QA laboratory', span: 'col-span-1' },
      { src: '/images/products/product2.jpg', alt: 'HPLC analysis', span: 'col-span-1' },
      { src: '/images/products/product3.jpg', alt: 'Microscopy lab', span: 'col-span-1' },
    ],
    stat: { label: 'Test Methods', value: '12+ QC' },
    eco: 'ISO 17025 Lab',
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-surface">
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <SectionLabel>Visual Documentation</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-background tracking-tighter leading-[0.95] max-w-3xl">
            Vertical Integration.
            <br />
            <span className="text-primary">From Seed to Solution.</span>
          </h1>
          <p className="mt-6 text-sm text-on-surface-variant leading-relaxed max-w-xl">
            An authoritative visual record of our integrated campus, cultivation base,
            extraction facility, and R&D laboratory.
          </p>
        </div>
      </section>

      {/* ── SECTORS ────────────────────────────────────────────────────── */}
      {sectors.map((sector, idx) => (
        <section
          key={sector.id}
          className={`py-24 ${idx % 2 === 1 ? 'bg-surface-container-low' : 'bg-surface'}`}
        >
          <div className="max-w-container mx-auto px-6 lg:px-12">
            {/* Sector header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-3">
                  {sector.label}
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tighter leading-tight">
                  {sector.title}
                </h2>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed max-w-lg">
                  {sector.description}
                </p>
              </div>
              {/* Stat badge */}
              <div className="flex-shrink-0 bg-primary p-6 min-w-[180px]">
                <p className="text-xs tracking-widest uppercase text-white/60 mb-1">{sector.stat.label}</p>
                <p className="text-2xl font-extrabold text-white tracking-tighter">{sector.stat.value}</p>
                <p className="text-xs text-white/50 tracking-wider uppercase mt-2">{sector.eco}</p>
              </div>
            </div>

            {/* Image grid — responsive masonry-style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sector.images.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
