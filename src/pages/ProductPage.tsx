// src/pages/ProductPage.tsx
// Page 6: CBD Isolate Product Page — "CBD Isolate 99.5% Purity"
// Sections: Product Hero, Technical Analysis Grid, Quality Assurance Bento, Wholesale Form

import { useRef } from 'react';
import { ArrowRight, Download, CheckCircle, Microscope, TestTube, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '../components/atoms/Badge';
import SectionLabel from '../components/atoms/SectionLabel';
import SpecRow from '../components/molecules/SpecRow';

gsap.registerPlugin(ScrollTrigger);

const technicalMetrics = [
  { label: 'Purity (HPLC)', value: '≥ 99.5%', status: 'Verified' },
  { label: 'THC Content', value: 'ND', status: 'Not Detected' },
  { label: 'Appearance', value: 'White Crystalline', status: 'Powder / Crystal' },
  { label: 'Solvent Residue', value: '< 10 PPM', status: 'ICH Q3C Class III' },
  { label: 'Water Content', value: '< 0.5%', status: 'Karl Fischer' },
  { label: 'Heavy Metals', value: 'Compliant', status: 'USP <232>' },
  { label: 'Microbial', value: 'Compliant', status: 'USP <61> / <62>' },
  { label: 'Batch ID', value: 'YN-CBD-0042', status: 'Traceable' },
];

const qualityCards = [
  {
    icon: Microscope,
    title: 'Molecular Integrity',
    desc: 'Full spectrum HPLC analysis on every batch. Cannabinoid profile verified against reference standards.',
    bg: 'bg-surface-container-low',
    image: 'https://placehold.co/400x280/d3e4fe/154212?text=HPLC+Analysis',
  },
  {
    icon: TestTube,
    title: 'Double-Blind Testing',
    desc: 'Internal QA and accredited third-party laboratory cross-verification on each production run.',
    bg: 'bg-primary',
    image: null,
  },
  {
    icon: TrendingUp,
    title: 'Industrial Scalability',
    desc: 'Consistent purity maintained at volumes from 10 kg sample to 1,000+ kg bulk production orders.',
    bg: 'bg-surface-container-low',
    image: 'https://placehold.co/400x280/dce9ff/154212?text=Bulk+Production',
  },
];

export default function ProductPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const items = heroRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
    });
  }, { scope: heroRef });

  useGSAP(() => {
    if (!metricsRef.current) return;
    const items = metricsRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: metricsRef.current, start: 'top 80%' },
    });
  }, { scope: metricsRef });

  useGSAP(() => {
    if (!specsRef.current) return;
    const items = specsRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: specsRef.current, start: 'top 80%' },
    });
  }, { scope: specsRef });

  useGSAP(() => {
    if (!qualityRef.current) return;
    const items = qualityRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: qualityRef.current, start: 'top 80%' },
    });
  }, { scope: qualityRef });

  return (
    <div className="bg-surface">

      {/* ── PRODUCT HERO ────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={heroRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: product info */}
            <div className="reveal-card">
              <Badge variant="default" className="mb-6">Botanical Precision</Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-background tracking-tighter leading-[0.95] mb-6">
                CBD Isolate
                <br />
                <span className="text-primary">99.5% Purity</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                Our benchmark-grade CBD isolate, produced via multi-stage supercritical CO₂ extraction
                and preparative chromatography. Pharmaceutical-compliant, THC-free, and globally
                exportable under DDP, CIF, or FOB terms.
              </p>

              {/* Spec callouts */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  'Industrial Grade / Pharma-Compliant',
                  'Origin Control / Yunnan Hemp',
                  'Zero THC',
                  'ISO 9001:2015',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-semibold tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/inquiry"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300"
                >
                  Wholesale Inquiry <ArrowRight size={16} />
                </a>
                <Link to="/inquiry" className="inline-flex items-center gap-2 px-6 py-4 border border-outline/30 text-on-surface text-xs font-bold tracking-widest uppercase rounded-md hover:bg-surface-container transition-colors duration-200">
                  <Download size={14} />
                  Request Product Documentation
                </Link>
              </div>
            </div>

            {/* Right: product image */}
            <div className="reveal-card relative">
              <img
                src="/images/products/product2.jpg"
                alt="CBD Isolate 99.5% purity crystals"
                className="w-full h-[500px] object-cover"
              />
              {/* Batch badge */}
              <div className="absolute bottom-6 right-6 bg-on-background/90 backdrop-blur p-4">
                <p className="text-xs text-white/50 tracking-widest uppercase mb-1">Laboratory Authentic</p>
                <p className="text-sm font-bold text-white">Batch ID: YN-CBD-0042</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL ANALYSIS GRID ─────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={metricsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>Technical Analysis</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-4">
              Certificate of Analysis — Batch YN-CBD-0042
            </h2>
            <p className="text-sm text-on-surface-variant mb-12 max-w-xl">
              This section presents representative technical information. Product documentation can
              be discussed directly with our B2B team based on current availability.
            </p>
          </div>

          {/* 4-column metric grid on large, 2-col on medium, 1-col mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {technicalMetrics.map((metric) => (
              <div key={metric.label} className="reveal-card bg-surface-container-lowest p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-1">
                  {metric.label}
                </p>
                <p className="text-2xl font-extrabold text-on-surface tracking-tighter mb-1">
                  {metric.value}
                </p>
                <p className="text-xs text-on-surface-variant/70">{metric.status}</p>
              </div>
            ))}
          </div>

          <div className="reveal-card">
            <a href="/inquiry" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
              <Download size={14} />
              Request Product Specification
            </a>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SPECIFICATIONS ─────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={specsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-card">
              <SectionLabel>Product Specifications</SectionLabel>
              <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-8">
                Full Product Spec Sheet
              </h2>
              <div>
                <SpecRow label="Product Name" value="CBD Isolate" />
                <SpecRow label="Chemical Name" value="Cannabidiol (CBD)" />
                <SpecRow label="CAS Number" value="13956-29-1" />
                <SpecRow label="Molecular Formula" value="C₂₁H₃₀O₂" />
                <SpecRow label="Molecular Weight" value="314.46 g/mol" />
                <SpecRow label="Purity (HPLC)" value="≥ 99.5%" />
                <SpecRow label="Appearance" value="White to Off-White Crystalline Powder" />
                <SpecRow label="Melting Point" value="67°C – 69°C" />
                <SpecRow label="Solubility" value="Ethanol, Hexane, DMSO (insoluble in water)" />
                <SpecRow label="Storage" value="Cool, Dark, Dry. &lt;25°C" />
                <SpecRow label="Shelf Life" value="24 Months from Manufacture" />
                <SpecRow label="Packaging" value="1 kg / 5 kg / 25 kg vacuum-sealed foil bags" isLast />
              </div>
            </div>

            <div className="reveal-card">
              <SectionLabel>Compliance & Testing</SectionLabel>
              <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-8">
                Quality Assurance Standards
              </h2>
              <div className="space-y-4">
                {[
                  { standard: 'HPLC Purity Analysis', detail: 'USP-verified reference standards' },
                  { standard: 'THC Testing', detail: 'GC-MS / LC-MS dual confirmation' },
                  { standard: 'Residual Solvents', detail: 'ICH Q3C Class I, II, III panel' },
                  { standard: 'Heavy Metals', detail: 'ICP-MS — USP <232> / <233>' },
                  { standard: 'Microbial Limits', detail: 'USP <61> total aerobic count' },
                  { standard: 'Pesticide Screening', detail: '400+ pesticide panel (EU MRL)' },
                  { standard: 'Mycotoxins', detail: 'Aflatoxin B1/B2/G1/G2 ELISA' },
                ].map((item) => (
                  <div key={item.standard} className="flex items-start gap-3 py-3 border-b border-outline-variant/20 last:border-0">
                    <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{item.standard}</p>
                      <p className="text-xs text-on-surface-variant">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITY ASSURANCE BENTO ─────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={qualityRef} className="max-w-container mx-auto px-6 lg:px-12">
          {/* Certifications */}
          <div className="reveal-card flex flex-wrap items-center gap-4 mb-12">
            <SectionLabel className="mb-0">Certified Clinical Excellence</SectionLabel>
            <div className="flex gap-3">
              {['ISO 9001:2015', 'GMP Certified', 'HACCP'].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 bg-primary-fixed text-primary text-xs font-bold tracking-wider uppercase rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <h2 className="reveal-card text-3xl font-extrabold text-on-background tracking-tighter mb-12 max-w-xl">
            Every Batch Meets Clinical-Grade Quality Benchmarks
          </h2>

          {/* 3-column quality bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qualityCards.map((card) => (
              <div key={card.title} className={`reveal-card ${card.bg} p-8`}>
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-40 object-cover mb-6"
                  />
                )}
                <div className={`w-10 h-10 flex items-center justify-center mb-4 ${card.bg === 'bg-primary' ? 'bg-white/10' : 'bg-primary-fixed'}`}>
                  <card.icon size={20} className={card.bg === 'bg-primary' ? 'text-white' : 'text-primary'} />
                </div>
                <p className={`text-lg font-extrabold tracking-tighter mb-3 ${card.bg === 'bg-primary' ? 'text-white' : 'text-on-surface'}`}>
                  {card.title}
                </p>
                <p className={`text-xs leading-relaxed ${card.bg === 'bg-primary' ? 'text-white/70' : 'text-on-surface-variant'}`}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
