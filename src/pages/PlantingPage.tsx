// src/pages/PlantingPage.tsx
// Planting Base — "From the Source. Quality You Can Trace."
// Sections: Hero, Stats, Growing Zones, Photo Gallery Grid, Traceability, CTA

import { useRef } from 'react';
import { Leaf, Thermometer, Droplets, Sun, Shield, CheckCircle } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '../components/atoms/Badge';
import SectionLabel from '../components/atoms/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 'Source', label: 'Controlled Cultivation' },
  { value: 'Review', label: 'Process Visibility' },
  { value: 'Trace', label: 'Origin Tracking' },
  { value: 'B2B', label: 'Discussion Ready' },
];

const zones = [
  {
    id: '01',
    tag: 'Zone 01 — Seedling Nursery',
    title: 'Precision Germination & Propagation',
    description:
      'Every plant begins in our climate-controlled nursery, where humidity, temperature, and light spectra are dialed in to sub-degree precision. Only seedlings meeting our phytochemical baseline are selected for transfer to the main grow zones.',
    images: [
      { src: '/images/planting/plant1.jpg', alt: 'Seedling trays under grow lights' },
      { src: '/images/planting/plant2.jpg', alt: 'Young hemp seedlings' },
    ],
    specs: [
      { label: 'Temperature Control', value: '22°C ± 0.5°C' },
      { label: 'Humidity Range', value: '65–75% RH' },
      { label: 'Light Cycle', value: '18h / 6h (VPD Optimised)' },
      { label: 'Germination Rate', value: '≥ 97%' },
    ],
    icon: Leaf,
  },
  {
    id: '02',
    tag: 'Zone 02 — Vegetative Growth',
    title: 'Controlled Environment Agriculture',
    description:
      'Our cultivation presentation highlights controlled growing conditions, documented handling steps, and source-management practices used to support downstream processing discussions.',
    images: [
      { src: '/images/planting/plant3.jpg', alt: 'Main greenhouse interior rows' },
      { src: '/images/planting/plant4.jpg', alt: 'Hemp canopy in full vegetative stage' },
    ],
    specs: [
      { label: 'Growing Method', value: 'Hydroponic + Substrate' },
      { label: 'CO₂ Enrichment', value: '800–1200 ppm' },
      { label: 'Water Source', value: 'Filtered Mountain Spring' },
      { label: 'Pesticide Policy', value: 'Zero Synthetic Inputs' },
    ],
    icon: Sun,
  },
  {
    id: '03',
    tag: 'Zone 03 — Flowering & Harvest',
    title: 'Peak Cannabinoid Accumulation',
    description:
      'Harvest and transfer steps are presented as part of the site\'s broader source-to-processing workflow overview for B2B visitors.',
    images: [
      { src: '/images/planting/plant5.jpg', alt: 'Flowering hemp plants' },
      { src: '/images/planting/plant6.jpg', alt: 'Harvest preparation' },
    ],
    specs: [
      { label: 'Monitoring', value: 'Stage-Based Review' },
      { label: 'Handling', value: 'Controlled Transfer' },
      { label: 'Workflow', value: 'Source to Process' },
      { label: 'Drying Method', value: 'Documented Procedures' },
    ],
    icon: Thermometer,
  },
];

const galleryImages = [
  { src: '/images/planting/plant7.jpg', alt: 'Greenhouse rows from above' },
  { src: '/images/planting/plant8.jpg', alt: 'Irrigation system detail' },
  { src: '/images/planting/plant9.jpg', alt: 'Hemp plant close-up' },
  { src: '/images/planting/plant10.jpg', alt: 'Workers tending to plants' },
  { src: '/images/planting/plant11.jpg', alt: 'Biomass post-harvest' },
  { src: '/images/planting/plant12.jpg', alt: 'Aerial view of planting base' },
];

const traceabilityItems = [
  { icon: Shield, label: 'Origin Records', desc: 'Cultivation and handling records can be reviewed within qualified B2B discussions' },
  { icon: Droplets, label: 'Water Review', desc: 'Water-management practices are part of the broader source-control narrative on this page' },
  { icon: Leaf, label: 'Substrate Oversight', desc: 'Growing inputs and cultivation workflow are presented as part of source-management discussions' },
  { icon: CheckCircle, label: 'Batch Documentation', desc: 'Product and origin documentation requests can be directed through the inquiry workflow' },
];

export default function PlantingPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const zonesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const traceabilityRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!statsRef.current) return;
    const items = statsRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
    });
  }, { scope: statsRef });

  useGSAP(() => {
    if (!introRef.current) return;
    const items = introRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: introRef.current, start: 'top 80%' },
    });
  }, { scope: introRef });

  useGSAP(() => {
    if (!zonesRef.current) return;
    const items = zonesRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: zonesRef.current, start: 'top 80%' },
    });
  }, { scope: zonesRef });

  useGSAP(() => {
    if (!galleryRef.current) return;
    const items = galleryRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' },
    });
  }, { scope: galleryRef });

  useGSAP(() => {
    if (!traceabilityRef.current) return;
    const items = traceabilityRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: traceabilityRef.current, start: 'top 80%' },
    });
  }, { scope: traceabilityRef });

  useGSAP(() => {
    if (!ctaRef.current) return;
    const items = ctaRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
    });
  }, { scope: ctaRef });

  return (
    <div className="bg-surface">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: info */}
            <div>
              <Badge variant="default" className="mb-6">Cultivation Base · Yunnan Province</Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-background tracking-tighter leading-[0.95] mb-6">
                From the Source.
                <br />
                <span className="text-primary">Quality You Can Trace.</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                This page presents the current cultivation and source-control narrative used to
                support broader B2B discussions around raw material handling and process visibility.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Cultivation Overview', 'Origin Tracking', 'Source Control', 'B2B Inquiry Path'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-semibold tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: planting image */}
            <div className="relative">
              <img
                src="/images/planting/plant3.jpg"
                alt="Vetrux planting base greenhouse"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-6 right-6 bg-on-background/90 backdrop-blur p-4">
                <p className="text-xs text-white/50 tracking-widest uppercase mb-1">Cultivation Base</p>
                <p className="text-sm font-bold text-white">Yunnan Province, China</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <section className="bg-primary py-10">
        <div ref={statsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="reveal-card text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">{s.value}</p>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO BLOCK ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={introRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="reveal-card lg:col-span-5">
              <SectionLabel>Why Vertical Integration Matters</SectionLabel>
              <h2 className="text-4xl font-extrabold text-on-background tracking-tighter leading-tight mt-4">
                The Best Extracts Begin
                <br />Long Before the Lab.
              </h2>
            </div>
            <div className="reveal-card lg:col-span-7 space-y-5 pt-2">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Source control matters for B2B buyers because it shapes how raw material handling,
                cultivation workflow, and downstream processing are discussed during qualification.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                This section is intended as a cultivation and traceability overview rather than a
                publication of final audited operating metrics.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Additional product and documentation questions can be reviewed directly with the
                team as real operational materials are prepared for qualified discussions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GROWING ZONES ───────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={zonesRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>Growing Zones</SectionLabel>
            <h2 className="text-4xl font-extrabold text-on-background tracking-tighter mb-16 max-w-xl">
              Three Zones. One Controlled Process.
            </h2>
          </div>

          <div className="space-y-28">
            {zones.map((zone, idx) => {
              const Icon = zone.icon;
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={zone.id}
                  className={`reveal-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
                >
                  {/* Images side */}
                  <div className={`grid grid-cols-2 gap-3 ${isReversed ? 'lg:order-2' : ''}`}>
                    {zone.images.map((img, i) => (
                      <div key={i} className={`overflow-hidden ${i === 0 ? 'row-span-1' : ''}`}>
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-52 object-cover hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    ))}
                    {/* Zone number accent */}
                    <div className="col-span-2 flex items-center gap-3 mt-1">
                      <span className="text-xs font-mono tracking-widest text-on-surface-variant">#{zone.id}</span>
                      <div className="flex-1 h-px bg-outline-variant/30" />
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={isReversed ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
                        {zone.tag}
                      </p>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-on-background tracking-tighter mb-4">
                      {zone.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
                      {zone.description}
                    </p>

                    {/* Spec rows */}
                    <div className="space-y-0">
                      {zone.specs.map((spec, i) => (
                        <div
                          key={spec.label}
                          className={`flex justify-between items-center py-3 ${i < zone.specs.length - 1 ? 'border-b border-outline-variant/30' : ''}`}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY GRID ─────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={galleryRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <SectionLabel>Field Documentation</SectionLabel>
              <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mt-3">
                Inside the Planting Base
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Raw footage from our cultivation teams, captured across different growth stages and seasonal conditions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`reveal-card overflow-hidden group ${i === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03] ${i === 0 ? 'h-full min-h-[320px]' : 'h-48'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACEABILITY BLOCK ─────────────────────────────────────────── */}
      <section className="py-24 bg-on-background">
        <div ref={traceabilityRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="reveal-card lg:col-span-4">
              <SectionLabel light>Full Traceability</SectionLabel>
              <h2 className="text-4xl font-extrabold text-white tracking-tighter leading-tight mt-4">
                Seed-to-Documentation
                <br />Documentation
              </h2>
              <p className="mt-5 text-sm text-white/50 leading-relaxed">
                Origin and product documentation requests can be organized through the inquiry path
                as supporting materials are prepared for qualified B2B conversations.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {traceabilityItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="reveal-card bg-white/5 p-6 hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={16} className="text-primary-fixed" />
                      <p className="text-xs font-semibold tracking-widest uppercase text-white/60">{item.label}</p>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={ctaRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="reveal-card lg:col-span-8">
              <SectionLabel>Wholesale Inquiry</SectionLabel>
              <h2 className="text-4xl font-extrabold text-on-background tracking-tighter leading-tight mt-3">
                Source Directly From
                <br />the Grower.
              </h2>
              <p className="mt-4 text-sm text-on-surface-variant leading-relaxed max-w-lg">
                Skip the commodity middlemen. Talk to our team about bulk biomass supply, white-label isolate, or custom extraction contracts — all backed by our vertically integrated supply chain.
              </p>
            </div>
            <div className="reveal-card lg:col-span-4 flex flex-col gap-3">
              <a
                href="/inquiry"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase hover:bg-primary-container transition-all duration-300"
              >
                Request a Quote
              </a>
              <a
                href="/products/cbd-isolate"
                className="inline-flex items-center justify-center px-8 py-4 border border-outline-variant/40 text-on-surface text-xs font-bold tracking-widest uppercase hover:bg-surface-container transition-all duration-300"
              >
                View Product Specs
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
