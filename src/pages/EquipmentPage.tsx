// src/pages/EquipmentPage.tsx
// Page 4: Factory Equipment — Industrial Grade Precision Extraction
// Sections: Hero, cGMP Standards, Equipment Showcase, Specs Table, CTA

import { useRef } from 'react';
import { CheckCircle, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '../components/atoms/Badge';
import SectionLabel from '../components/atoms/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const equipment = [
  {
    id: '01',
    name: '6m³ Extraction Vessel',
    model: 'YV-EX-6000',
    image: '/images/equipment/extraction-vessel-6m3.webp',
    specs: [
      { label: 'Volume', value: '6,000 Liters' },
      { label: 'Temperature Range', value: '-20°C to +120°C' },
      { label: 'Material', value: 'SUS316L Stainless' },
      { label: 'Pressure Rating', value: '45 MPa' },
      { label: 'cGMP Grade', value: 'Pharmaceutical' },
    ],
    desc: 'Our flagship supercritical CO₂ extraction vessels operate at pharmaceutical grade, enabling high-throughput extraction of botanical compounds at precise temperatures and pressures.',
  },
  {
    id: '02',
    name: '1,000L Single-Effect Concentrator',
    model: 'YV-CON-1000',
    image: '/images/equipment/concentrator-1000L-single-effect-1.webp',
    specs: [
      { label: 'Capacity', value: '1,000 L/hr' },
      { label: 'Vacuum', value: '-0.09 MPa' },
      { label: 'Temperature', value: '45°C – 65°C' },
      { label: 'Evaporation Rate', value: '200 kg/hr' },
      { label: 'cGMP Grade', value: 'Industrial' },
    ],
    desc: 'Continuous-feed concentrators operating under high-vacuum reduce solvents and concentrate extract streams for downstream crystallization with minimal thermal degradation.',
  },
  {
    id: '03',
    name: '2–4m³ Sedimentation Tanks',
    model: 'YV-SED-2000/4000',
    image: '/images/equipment/sedimentation-zone-supernatant-tank.webp',
    specs: [
      { label: 'Volume Range', value: '2m³ – 4m³ Modular' },
      { label: 'Surface Finish', value: 'Ra ≤ 0.4 μm' },
      { label: 'Material', value: 'SUS316L Mirror Polish' },
      { label: 'Temperature', value: '-30°C to +60°C' },
      { label: 'CIP/SIP', value: 'Fully Integrated' },
    ],
    desc: 'Precision sedimentation vessels with mirror-polished interiors facilitate optimal crystallization and particle settling, producing uniform CBD crystal morphology.',
  },
  {
    id: '04',
    name: 'Chromatography Columns',
    model: 'YV-CHRO-HiPure',
    image: '/images/equipment/chromatography-column-top.webp',
    specs: [
      { label: 'Max Purity', value: '99.5%' },
      { label: 'Flow Rate', value: 'Digitally Automated' },
      { label: 'Separation', value: 'High-Pressure Prep-LC' },
      { label: 'Detection', value: 'UV/Vis + Refractive Index' },
      { label: 'Column Temp', value: 'Ambient – 80°C' },
    ],
    desc: 'Industrial-scale preparative chromatography columns provide the final purification stage, isolating CBD to ≥99.5% purity before the crystallization and milling stages.',
  },
];

const specsTable = [
  { name: '6m³ Extraction Vessel', model: 'YV-EX-6000', function: 'Supercritical CO₂ Extraction', cgmp: 'FDA 21 CFR Part 211' },
  { name: '1,000L Concentrator', model: 'YV-CON-1000', function: 'Solvent Concentration', cgmp: 'ICH Q7 Compliant' },
  { name: 'Sedimentation Tanks', model: 'YV-SED Series', function: 'Crystal Sedimentation', cgmp: 'EU GMP Annex 1' },
  { name: 'Chromatography System', model: 'YV-CHRO-HiPure', function: 'Final Purity Isolation', cgmp: 'USP <621>' },
];

export default function EquipmentPage() {
  const cgmpRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cgmpRef.current) return;
    const items = cgmpRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: cgmpRef.current, start: 'top 80%' },
    });
  }, { scope: cgmpRef });

  useGSAP(() => {
    if (!showcaseRef.current) return;
    const items = showcaseRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: showcaseRef.current, start: 'top 80%' },
    });
  }, { scope: showcaseRef });

  useGSAP(() => {
    if (!tableRef.current) return;
    const items = tableRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: tableRef.current, start: 'top 80%' },
    });
  }, { scope: tableRef });

  return (
    <div className="bg-surface">

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: info */}
            <div>
              <Badge variant="default" className="mb-6">Production Excellence</Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-background tracking-tighter leading-[0.95] mb-6">
                Industrial-Grade
                <br />
                <span className="text-primary">Extraction Facility</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                This page presents the current equipment and facility narrative used to support B2B
                product, process, and documentation discussions.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Equipment Overview', 'Process Visibility', 'Documentation Path', 'Facility Narrative'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-semibold tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: equipment image */}
            <div className="relative">
              <img
                src="/images/equipment/chromatography-column-700L.webp"
                alt="Industrial extraction facility"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-6 right-6 bg-on-background/90 backdrop-blur p-4">
                <p className="text-xs text-white/50 tracking-widest uppercase mb-1">Facility Scale</p>
                <p className="text-sm font-bold text-white">Current Facility View</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── cGMP STANDARDS SECTION ─────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={cgmpRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left specs block (8/12) */}
            <div className="reveal-card lg:col-span-8 bg-surface-container-lowest p-10">
              <SectionLabel>Manufacturing Standards</SectionLabel>
              <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-8">
                Process and Equipment Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Equipment Scope', value: 'Extraction to Packaging' },
                  { label: 'Material Notes', value: 'Equipment Details Under Review' },
                  { label: 'Cleaning Workflow', value: 'Process Discussion Available' },
                  { label: 'Environment', value: 'Facility Information by Request' },
                  { label: 'Batch Records', value: 'Documentation Path Available' },
                  { label: 'Traceability', value: 'Discussed During Qualification' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-semibold text-on-surface mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right certification card (4/12) */}
            <div className="reveal-card lg:col-span-4 bg-primary p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">
                  Certification
                </p>
                <p className="text-3xl font-extrabold text-white tracking-tighter leading-tight mb-4">
                  Quality Documentation
                  <br />Discussion Path
                </p>
                <p className="text-xs text-white/60 leading-relaxed">
                  Documentation requests and facility information can be reviewed directly during
                  qualified B2B conversations.
                </p>
              </div>
              <Link to="/inquiry" className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-white text-primary text-xs font-bold tracking-widest uppercase hover:bg-primary-fixed transition-colors duration-200">
                <Download size={14} />
                Request Facility Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT SHOWCASE ─────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={showcaseRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>Equipment Showcase</SectionLabel>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tighter mb-16 max-w-xl">
              Precision-Engineered at Every Stage
            </h2>
          </div>

          <div className="space-y-24">
            {equipment.map((equip, idx) => (
              <div
                key={equip.id}
                className={`reveal-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={equip.image}
                    alt={equip.name}
                    className="w-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-on-background/80 text-white text-xs font-mono tracking-wider">
                      #{equip.id}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-3">
                    Model: {equip.model}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-on-background tracking-tighter mb-4">
                    {equip.name}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
                    {equip.desc}
                  </p>

                  {/* Spec list */}
                  <div className="space-y-0">
                    {equip.specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`flex justify-between items-center py-3 ${i < equip.specs.length - 1 ? 'border-b border-outline-variant/30' : ''}`}
                      >
                        <span className="text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
                          {spec.label}
                        </span>
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
            <SectionLabel>Full Specifications</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-12">
              Equipment Overview Table
            </h2>
          </div>

          <div className="reveal-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-primary/30">
                  {['Equipment Name', 'Model Range', 'Process Function', 'cGMP Standard'].map((col) => (
                    <th
                      key={col}
                      className="text-left text-xs font-semibold tracking-widest uppercase text-on-surface-variant pb-4 pr-8"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specsTable.map((row, i) => (
                  <tr
                    key={row.name}
                    className={`border-b border-outline-variant/20 ${i % 2 === 0 ? 'bg-surface-container-lowest/50' : ''}`}
                  >
                    <td className="py-5 pr-8 font-semibold text-on-surface">{row.name}</td>
                    <td className="py-5 pr-8 font-mono text-xs text-on-surface-variant">{row.model}</td>
                    <td className="py-5 pr-8 text-on-surface-variant">{row.function}</td>
                    <td className="py-5 text-xs font-semibold text-primary">{row.cgmp}</td>
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
