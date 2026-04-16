// src/pages/GalleryPage.tsx
// Page 2: Campus Gallery — "Vertical Integration. From Seed to Solution."
// Sections: Hero, 4 Sectors (Masonry-style grids)

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/atoms/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

// Gallery image data per sector
const sectors = [
  {
    id: 'S01',
    label: 'Sector 01 — Architectural Excellence',
    title: 'Main Campus & Infrastructure',
    description:
      'A visual overview of the current campus and facility presentation used across the website.',
    images: [
      { src: '/images/gallery/campus1.webp', alt: 'Campus aerial view', span: 'col-span-1 row-span-2' },
      { src: '/images/gallery/campus2.webp', alt: 'Main hall', span: 'col-span-1' },
      { src: '/images/gallery/campus3.webp', alt: 'Processing wing', span: 'col-span-1' },
      { src: '/images/gallery/campus4.webp', alt: 'Campus exterior', span: 'col-span-2' },
    ],
    stat: { label: 'Visual Theme', value: 'Campus Overview' },
    eco: 'Facility Presentation',
  },
  {
    id: 'S02',
    label: 'Sector 02 — Raw Material Purity',
    title: 'Planting Base & Cultivation',
    description:
      'A cultivation gallery focused on source-control storytelling, field imagery, and traceability themes.',
    images: [
      { src: '/images/planting/plant5.jpg', alt: 'Hemp cultivation fields', span: 'col-span-2 row-span-2' },
      { src: '/images/planting/plant7.jpg', alt: 'Seedling lab', span: 'col-span-1' },
      { src: '/images/planting/plant12.jpg', alt: 'Greenhouse', span: 'col-span-1' },
    ],
    stat: { label: 'Cultivation Theme', value: 'Source Control' },
    eco: 'Traceability Focus',
  },
  {
    id: 'S03',
    label: 'Sector 03 — Technical Precision',
    title: 'Extraction & Refinement',
    description:
      'A process gallery showing extraction and refinement visuals used in the current facility narrative.',
    images: [
      { src: '/images/equipment/extract-concentrator-zone.webp', alt: 'Extraction tanks', span: 'col-span-1' },
      { src: '/images/equipment/refinement-concentrator-600L.webp', alt: 'Chromatography lab', span: 'col-span-1' },
      { src: '/images/equipment/mixing-sedimentation-tank.webp', alt: 'Control room panorama', span: 'col-span-2' },
    ],
    stat: { label: 'Process Theme', value: 'Extraction Flow' },
    eco: 'Equipment Overview',
  },
  {
    id: 'S04',
    label: 'Sector 04 — R&D Innovation',
    title: 'Product Laboratory',
    description:
      'Laboratory and product imagery used to support quality, documentation, and inquiry-oriented discussions.',
    images: [
      { src: '/images/products/product1.jpg', alt: 'QA laboratory', span: 'col-span-1' },
      { src: '/images/products/product2.jpg', alt: 'HPLC analysis', span: 'col-span-1' },
      { src: '/images/products/product3.jpg', alt: 'Microscopy lab', span: 'col-span-1' },
    ],
    stat: { label: 'Lab Theme', value: 'Quality Review' },
    eco: 'Documentation Path',
  },
];

function SectorSection({ sector, idx }: { sector: typeof sectors[0]; idx: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
  }, { scope: sectionRef });

  return (
    <section className={`py-24 ${idx % 2 === 1 ? 'bg-surface-container-low' : 'bg-surface'}`}>
      <div ref={sectionRef} className="max-w-container mx-auto px-6 lg:px-12">
        {/* Sector header */}
        <div className="reveal-card flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
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
          <div className="reveal-card flex-shrink-0 bg-primary p-6 min-w-[180px]">
            <p className="text-xs tracking-widest uppercase text-white/60 mb-1">{sector.stat.label}</p>
            <p className="text-2xl font-extrabold text-white tracking-tighter">{sector.stat.value}</p>
            <p className="text-xs text-white/50 tracking-wider uppercase mt-2">{sector.eco}</p>
          </div>
        </div>

        {/* Image grid — responsive masonry-style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sector.images.map((img, i) => (
            <div key={i} className="reveal-card overflow-hidden group">
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
  );
}

export default function GalleryPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const items = heroRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
    });
  }, { scope: heroRef });

  return (
    <div className="bg-surface">
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={heroRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>Visual Documentation</SectionLabel>
            <h1 className="text-5xl md:text-7xl font-extrabold text-on-background tracking-tighter leading-[0.95] max-w-3xl">
              Vertical Integration.
              <br />
              <span className="text-primary">From Seed to Solution.</span>
            </h1>
            <p className="mt-6 text-sm text-on-surface-variant leading-relaxed max-w-xl">
              A visual overview of the current campus, cultivation, equipment, and laboratory
              presentation used throughout the website.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTORS ────────────────────────────────────────────────────── */}
      {sectors.map((sector, idx) => (
        <SectorSection key={sector.id} sector={sector} idx={idx} />
      ))}
    </div>
  );
}
