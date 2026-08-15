'use client'

import type { Locale } from '@/i18n/locales';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import SectionLabel from '@/components/atoms/SectionLabel';
import KpiRow from '@/components/molecules/KpiRow';
import { useReveal } from '@/hooks/useReveal';
import { equipmentPageStrings } from '@/content/pages/equipment.content';

const equipment = [
  {
    id: '01',
    name: '6m³ Multi-Function Extraction Tanks',
    model: '×20 Sets',
    image: '/images/equipment/extraction-tanks.jpg',
    specs: [
      { label: 'Volume', value: '6,000 L' },
      { label: 'Quantity', value: '20 Sets' },
      { label: 'Type', value: 'Multi-Function' },
      { label: 'Function', value: 'Multi-Function Extraction' },
    ],
    desc: 'Twenty industrial-scale 6m³ multi-function extraction tanks form the core of our extraction line, enabling high-volume processing of hemp biomass with precise temperature and solvent control.',
  },
  {
    id: '02',
    name: 'Chromatography Columns',
    model: '×26 Columns',
    image: '/images/equipment/chromatography-upper.jpg',
    specs: [
      { label: 'Quantity', value: '26 Columns' },
      { label: 'Function', value: 'Cannabinoid Separation & Purification' },
    ],
    desc: 'A bank of 26 industrial chromatography columns provides large-scale cannabinoid separation and purification, achieving high-purity CBD isolate through precise gradient elution.',
  },
  {
    id: '03',
    name: '2000L Single/Double-Effect Concentrators',
    model: '×10 Sets',
    image: '/images/equipment/concentrator-2000l.jpg',
    specs: [
      { label: 'Capacity', value: '2,000 L/h' },
      { label: 'Quantity', value: '10 Sets' },
      { label: 'Function', value: 'Extract Concentration' },
    ],
    desc: 'Ten 2000L single and double-effect concentrators efficiently reduce solvent volume and concentrate extract streams under vacuum, minimizing thermal degradation of active compounds.',
  },
  {
    id: '04',
    name: '1000-Type Solvent Recovery Tower',
    model: '×2 Sets',
    image: '/images/equipment/solvent-recovery-tower.jpg',
    specs: [
      { label: 'Type', value: '1000' },
      { label: 'Quantity', value: '2 Sets' },
      { label: 'Function', value: 'Solvent Recovery & Recycling' },
    ],
    desc: 'Two 1000-type solvent recovery towers reclaim and recycle ethanol used in the extraction process, reducing operational costs and environmental impact while maintaining solvent purity.',
  },
  {
    id: '05',
    name: '5m³ Ethanol Recovery Storage Tanks',
    model: '×10 Sets',
    image: '/images/equipment/ethanol-storage-tanks.jpg',
    specs: [
      { label: 'Volume', value: '5 m³' },
      { label: 'Quantity', value: '10 Sets' },
      { label: 'Function', value: 'Ethanol Recovery Storage' },
    ],
    desc: 'Ten 5m³ storage tanks provide safe, explosion-proof containment for recovered ethanol, ensuring continuous solvent supply to the extraction line with full safety compliance.',
  },
  {
    id: '06',
    name: 'HPLC Analytical System',
    model: '—',
    image: '/images/equipment/hplc-system.jpg',
    specs: [
      { label: 'Function', value: 'Quality Control Analysis' },
      { label: 'Capability', value: 'Cannabinoid Profiling & Potency Analysis' },
    ],
    desc: 'In-house HPLC analytical system provides precise cannabinoid profiling and potency analysis, ensuring every batch meets strict quality specifications before release.',
  },
  {
    id: '07',
    name: 'Explosion-Proof Automation Control System',
    model: '—',
    image: '/images/equipment/automation-control.jpg',
    specs: [
      { label: 'Function', value: 'Process Monitoring & Control' },
      { label: 'Safety', value: 'Explosion-Proof Rated' },
    ],
    desc: 'An explosion-proof automation control system monitors and manages the entire production line in real time, ensuring safe operation in solvent-rich environments.',
  },
  {
    id: '08',
    name: 'Automatic Residue Discharge System',
    model: 'Integrated',
    image: '/images/equipment/residue-discharge.jpg',
    specs: [
      { label: 'Function', value: 'Automatic Slag Removal' },
      { label: 'Integration', value: 'Fully Automated' },
    ],
    desc: 'The automatic residue discharge system removes spent biomass from extraction tanks without manual intervention, improving throughput and maintaining cleanroom conditions throughout production.',
  },
];

const specsTable = [
  { name: '6m³ Multi-Function Extraction Tanks', model: '×20 Sets', function: 'Multi-Function Extraction', cgmp: '—' },
  { name: 'Chromatography Columns', model: '×26 Columns', function: 'Separation & Purification', cgmp: '—' },
  { name: '2000L Single/Double-Effect Concentrators', model: '×10 Sets', function: 'Extract Concentration', cgmp: '—' },
  { name: '1000-Type Solvent Recovery Tower', model: '×2 Sets', function: 'Solvent Recovery & Recycling', cgmp: '—' },
  { name: '5m³ Ethanol Recovery Storage Tanks', model: '×10 Sets', function: 'Ethanol Recovery Storage', cgmp: '—' },
  { name: 'HPLC Analytical System', model: '—', function: 'Quality Control Analysis', cgmp: '—' },
  { name: 'Automation Control', model: '—', function: 'Process Monitoring & Control', cgmp: '—' },
  { name: 'Automatic Residue Discharge System', model: 'Integrated', function: 'Automatic Slag Removal', cgmp: '—' },
];

export default function EquipmentPageClient({ locale = 'en' }: { locale?: Locale }) {
  const t = equipmentPageStrings[locale];
  const langPrefix = locale === 'en' ? '' : `/${locale}`;
  const heroRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);
  const cgmpRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useReveal(heroRef);
  useReveal(kpiRef, { stagger: 0.08 });
  useReveal(cgmpRef);
  useReveal(showcaseRef, { stagger: 0.12 });
  useReveal(tableRef, { stagger: 0.08 });

  return (
    <div className="bg-surface">

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={heroRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-card">
              <Badge variant="default" className="mb-6">{t.badge}</Badge>
              <h1 className="font-serif font-medium text-[clamp(2.4rem,5.5vw,4.5rem)] text-on-background tracking-tight leading-[1.0] mb-6">
                {t.heroTitle1}
                <br />
                <span className="italic text-primary">{t.heroTitle2}</span>
              </h1>
              <p className="text-[15px] text-on-surface-variant leading-relaxed mb-8 max-w-md">
                {t.heroBody}
              </p>
              <div className="flex flex-wrap gap-3">
                {t.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal-card relative">
              <div className="relative w-full h-[500px] overflow-hidden">
                <Image src="/images/equipment/chromatography-column-700L.webp" alt="Industrial extraction facility" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
              </div>
              <div className="absolute bottom-6 right-6 bg-surface-ink/90 backdrop-blur p-4">
                <p className="text-xs text-white/60 tracking-[0.35em] uppercase mb-1">{t.facilityScale}</p>
                <p className="text-sm font-bold text-white">Chuxiong, Yunnan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACILITY KPI ROW ───────────────────────────────────────────── */}
      <section className="py-16 bg-surface">
        <div ref={kpiRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <KpiRow items={t.kpis} tone="light" />
          </div>
        </div>
      </section>

      {/* ── FACILITY OVERVIEW SECTION ──────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={cgmpRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="reveal-card lg:col-span-8 bg-surface-container-lowest p-10 border-l-2 border-transparent hover:border-accent transition-colors duration-200">
              <SectionLabel>{t.facilityOverview}</SectionLabel>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-8">{t.equipmentConfig}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Extraction', value: '20 Extraction Tanks' },
                  { label: 'Chromatography', value: '26 Chromatography Columns' },
                  { label: 'Concentration', value: '10 Concentrators' },
                  { label: 'Analytical', value: 'HPLC Analytical System' },
                  { label: 'Automation', value: 'Explosion-Proof Control System' },
                  { label: 'Recovery', value: 'Solvent Recovery & Storage' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-accent uppercase tracking-[0.35em] font-semibold">{item.label}</p>
                      <p className="text-sm font-semibold text-on-surface mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-card lg:col-span-4 bg-primary p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.35em] uppercase text-white/60 mb-4">{t.locationLabel}</p>
                <p className="font-serif text-3xl text-white tracking-tight leading-tight mb-4">
                  Chuxiong, Yunnan<br />Production Facility
                </p>
                <p className="text-[13px] text-white/60 leading-relaxed">
                  {t.locationBody}
                </p>
              </div>
              <Link href={`${langPrefix}/inquiry`} className="mt-8 inline-block">
                <Button variant="accent" size="md" icon={ArrowRight}>
                  {t.contactUs}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT SHOWCASE ─────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={showcaseRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>{t.showcaseSection}</SectionLabel>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-16 max-w-xl">{t.showcaseTitle}</h2>
          </div>

          <div className="space-y-24">
            {equipment.map((equip, idx) => (
              <div key={equip.id} className={`reveal-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image src={equip.image} alt={equip.name} width={800} height={600} className="w-full h-auto object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-surface-ink/80 text-white text-xs font-mono tracking-wider">#{equip.id}</span>
                  </div>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="text-xs font-semibold tracking-[0.35em] uppercase text-accent mb-3">{t.modelPrefix} {equip.model}</p>
                  <h3 className="font-serif font-medium text-2xl md:text-3xl text-on-background tracking-tight leading-[1.05] mb-4">{equip.name}</h3>
                  <p className="text-[15px] text-on-surface-variant leading-relaxed mb-8">{equip.desc}</p>
                  <div className="space-y-0">
                    {equip.specs.map((spec, i) => (
                      <div key={spec.label} className={`flex justify-between items-center py-3 ${i < equip.specs.length - 1 ? 'border-b border-outline-variant/30' : ''}`}>
                        <span className="text-xs font-semibold tracking-wider uppercase text-on-surface-variant">{spec.label}</span>
                        <span className="text-sm font-bold text-on-surface">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECS TABLE ────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={tableRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>{t.specsSection}</SectionLabel>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-12">{t.specsTitle}</h2>
          </div>

          <div className="reveal-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-accent/30">
                  {t.tableHeaders.map((col) => (
                    <th key={col} className="text-left text-xs font-semibold tracking-[0.35em] uppercase text-accent pb-4 pr-8">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specsTable.map((row, i) => (
                  <tr key={row.name} className={`border-b border-outline-variant/20 ${i % 2 === 0 ? 'bg-surface-container-lowest/50' : ''}`}>
                    <td className="py-5 pr-8 font-semibold text-on-surface">{row.name}</td>
                    <td className="py-5 pr-8 font-mono text-xs text-on-surface-variant">{row.model}</td>
                    <td className="py-5 pr-8 text-on-surface-variant">{row.function}</td>
                    <td className="py-5 text-xs font-semibold text-accent">{row.cgmp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
