'use client'

import type { Locale } from '@/i18n/locales';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Thermometer, Droplets, Sun, Shield, CheckCircle } from 'lucide-react';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import SectionLabel from '@/components/atoms/SectionLabel';
import { useReveal } from '@/hooks/useReveal';
import { plantingPageStrings } from '@/content/pages/planting.content';

const zones = [
  {
    id: '01',
    tag: 'Zone 01 — Seedling & Propagation',
    title: 'Seed Selection & Cutting Propagation',
    description:
      'Our breeding program begins with elite seed selection and clonal propagation at the Chuxiong nursery facility. High-CBD cultivars are propagated via stem cuttings in controlled greenhouse nurseries, ensuring genetic consistency and phytochemical uniformity across every production cycle.',
    images: [
      { src: '/images/planting/seedling-nursery.jpg', alt: 'Young CBD hemp seedlings in nursery trays' },
      { src: '/images/planting/cloning-propagation.jpg', alt: 'Hemp clones in propagation trays' },
      { src: '/images/planting/rooted-cutting.jpg', alt: 'Hand holding a rooted hemp cutting' },
      { src: '/images/planting/propagation-greenhouse.jpg', alt: 'Large-scale greenhouse propagation area' },
    ],
    specs: [
      { label: 'Focus', value: 'Seed Selection & Propagation' },
      { label: 'Environment', value: 'Nursery Facility' },
      { label: 'Approach', value: 'Quality-Oriented Cultivar Selection' },
      { label: 'System', value: 'Standardized Process' },
    ],
    icon: Leaf,
  },
  {
    id: '02',
    tag: 'Zone 02 — Vegetative Growth',
    title: 'Greenhouse Cultivation & Controlled Growth',
    description:
      'Transplanted clones enter our large-scale greenhouse facilities in Chuxiong, where Yunnan\'s high-altitude sunlight and UV-rich conditions naturally promote vigorous vegetative growth. Controlled irrigation, nutrient delivery, and canopy management ensure uniform plant development before the flowering transition.',
    images: [
      { src: '/images/planting/vegetative-growth.jpg', alt: 'Greenhouse rows of vegetative hemp plants' },
      { src: '/images/planting/vegetative-canopy.jpg', alt: 'Dense green hemp canopy in vegetative stage' },
    ],
    specs: [
      { label: 'Growing Method', value: 'Greenhouse Cultivation' },
      { label: 'Location', value: 'Yunnan Province' },
      { label: 'Management', value: 'Controlled Growing Conditions' },
      { label: 'Approach', value: 'Standardized Cultivation' },
    ],
    icon: Sun,
  },
  {
    id: '03',
    tag: 'Zone 03 — Flowering & Harvest',
    title: 'Mature Flowering & Trichome Development',
    description:
      'During the flowering stage, cultivation management focuses on monitoring plant development and determining appropriate harvest timing. Harvested material is transferred to controlled drying and processing to support downstream extraction.',
    images: [
      { src: '/images/planting/flowering-greenhouse.jpg', alt: 'Late-flowering hemp greenhouse' },
      { src: '/images/planting/flowering-cola-closeup.jpg', alt: 'Close-up of CBD hemp bud with trichomes' },
      { src: '/images/planting/mature-bud-trichomes.jpg', alt: 'Dense mature hemp bud with visible trichomes' },
      { src: '/images/planting/flowering-dense-canopy.jpg', alt: 'Dense flowering hemp canopy' },
      { src: '/images/planting/flowering-pistils.jpg', alt: 'Flowering hemp with white pistils' },
    ],
    specs: [
      { label: 'Monitoring', value: 'Growth Stage Tracking' },
      { label: 'Harvest', value: 'Managed Harvest Timing' },
      { label: 'Location Advantage', value: 'Yunnan Growing Conditions' },
      { label: 'Post-Harvest', value: 'Controlled Drying Process' },
    ],
    icon: Thermometer,
  },
];

const galleryImages = [
  { src: '/images/planting/propagation-greenhouse.jpg', alt: 'Large-scale greenhouse propagation area' },
  { src: '/images/planting/seedling-nursery.jpg', alt: 'Young CBD hemp seedlings in nursery trays' },
  { src: '/images/planting/cloning-propagation.jpg', alt: 'Hemp clones in propagation trays' },
  { src: '/images/planting/vegetative-canopy.jpg', alt: 'Dense green hemp canopy in vegetative stage' },
  { src: '/images/planting/flowering-cola-closeup.jpg', alt: 'Close-up of CBD hemp bud with trichomes' },
  { src: '/images/planting/flowering-dense-canopy.jpg', alt: 'Dense flowering hemp canopy from above' },
];

const traceabilityItems = [
  { icon: Shield, label: 'Cultivation & Processing Coordination', desc: 'Vetrux coordinates cultivation and extraction activities from its Chuxiong base, supporting consistency across the production process.' },
  { icon: Droplets, label: 'Standardized Cultivation System', desc: 'Cultivation management follows standardized processes covering propagation, growing conditions, and harvest timing at the Chuxiong base.' },
  { icon: Leaf, label: 'Traceable Cultivation System', desc: 'The cultivation system is designed to support traceability from planting through to material handoff for extraction processing.' },
  { icon: CheckCircle, label: 'Documentation Support', desc: 'Supporting documentation including COA, SDS, and test reports may be provided according to order requirements and actual batch availability.' },
];

export default function PlantingPageClient({ locale = 'en' }: { locale?: Locale }) {
  const t = plantingPageStrings[locale];
  const langPrefix = locale === 'en' ? '' : `/${locale}`;
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const zonesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const traceabilityRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useReveal(heroRef);
  useReveal(statsRef, { stagger: 0.1 });
  useReveal(introRef, { stagger: 0.1 });
  useReveal(zonesRef, { stagger: 0.12 });
  useReveal(galleryRef, { stagger: 0.08 });
  useReveal(traceabilityRef, { stagger: 0.1 });
  useReveal(ctaRef, { stagger: 0.1 });

  return (
    <div className="bg-surface">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
              <p className="font-serif italic text-xl md:text-2xl text-on-surface-variant leading-snug max-w-2xl mb-6">
                {t.heroSubtitle}
              </p>
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
                <Image src="/images/planting/vegetative-growth.jpg" alt="Vetrux cultivation base greenhouse in Chuxiong, Yunnan" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority />
              </div>
              <div className="absolute bottom-6 right-6 bg-surface-ink/90 backdrop-blur p-4">
                <p className="text-xs text-white/60 tracking-[0.35em] uppercase mb-1">{t.overlayTitle}</p>
                <p className="text-sm font-bold text-white">{t.overlayLocation}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <section className="bg-primary py-10">
        <div ref={statsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.map((s) => (
              <div key={s.label} className="reveal-card text-center lg:text-left">
                <p className="font-serif font-medium text-3xl md:text-4xl text-white tracking-tight leading-tight">{s.value}</p>
                <p className="text-xs font-semibold tracking-[0.35em] uppercase text-white/60 mt-2">{s.label}</p>
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
              <SectionLabel>{t.introSection}</SectionLabel>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mt-4">
                {t.introTitle1}
                <br />
                <span className="italic text-primary">{t.introTitle2}</span>
              </h2>
            </div>
            <div className="reveal-card lg:col-span-7 space-y-5 pt-2">
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                {t.introPara1}
              </p>
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                {t.introPara2}
              </p>
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                {t.introPara3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GROWING ZONES ───────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={zonesRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>{t.zonesSection}</SectionLabel>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-16 max-w-xl">{t.zonesTitle}</h2>
          </div>

          <div className="space-y-28">
            {zones.map((zone, idx) => {
              const Icon = zone.icon;
              const isReversed = idx % 2 === 1;
              return (
                <div key={zone.id} className="reveal-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`grid grid-cols-2 gap-3 ${isReversed ? 'lg:order-2' : ''}`}>
                    {zone.images.map((img, i) => (
                      <div key={i} className="overflow-hidden relative h-52">
                        <Image src={img.src} alt={img.alt} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover hover:scale-[1.03] transition-transform duration-500" />
                      </div>
                    ))}
                    <div className="col-span-2 flex items-center gap-3 mt-1">
                      <span className="text-xs font-mono tracking-widest text-on-surface-variant">#{zone.id}</span>
                      <div className="flex-1 h-px bg-outline-variant/30" />
                    </div>
                  </div>

                  <div className={isReversed ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary-fixed rounded">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <p className="text-xs font-semibold tracking-[0.35em] uppercase text-accent">{zone.tag}</p>
                    </div>
                    <h3 className="font-serif font-medium text-2xl md:text-3xl text-on-background tracking-tight leading-[1.05] mb-4">{zone.title}</h3>
                    <p className="text-[15px] text-on-surface-variant leading-relaxed mb-8">{zone.description}</p>

                    <div className="space-y-0">
                      {zone.specs.map((spec, i) => (
                        <div key={spec.label} className={`flex justify-between items-center py-3 ${i < zone.specs.length - 1 ? 'border-b border-outline-variant/30' : ''}`}>
                          <span className="text-xs font-semibold tracking-wider uppercase text-on-surface-variant">{spec.label}</span>
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
              <SectionLabel>{t.gallerySection}</SectionLabel>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mt-3">{t.galleryTitle}</h2>
            </div>
            <p className="text-[15px] text-on-surface-variant max-w-sm leading-relaxed">
              {t.galleryCaption}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <div key={i} className={`reveal-card overflow-hidden group ${i === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}`}>
                <div className={`relative w-full ${i === 0 ? 'h-full min-h-[320px]' : 'h-48'}`}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover transition-all duration-500 group-hover:scale-[1.03]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACEABILITY BLOCK ─────────────────────────────────────────── */}
      <section className="py-24 bg-surface-ink">
        <div ref={traceabilityRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="reveal-card lg:col-span-4">
              <SectionLabel light>{t.traceSection}</SectionLabel>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-white tracking-tight leading-[1.05] mt-4">
                {t.traceTitle1}
                <br />
                <span className="italic text-primary-fixed">{t.traceTitle2}</span>
              </h2>
              <p className="mt-5 text-[15px] text-white/60 leading-relaxed">
                {t.traceBody}
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {traceabilityItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="reveal-card bg-white/5 p-6 border-l-2 border-transparent hover:border-accent hover:bg-white/10 transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={16} className="text-primary-fixed" />
                      <p className="text-xs font-semibold tracking-[0.35em] uppercase text-white/60">{item.label}</p>
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
              <SectionLabel>{t.ctaSection}</SectionLabel>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mt-3">
                {t.ctaTitle1}
                <br />
                <span className="italic text-primary">{t.ctaTitle2}</span>
              </h2>
              <p className="mt-4 text-[15px] text-on-surface-variant leading-relaxed max-w-lg">
                {t.ctaBody}
              </p>
            </div>
            <div className="reveal-card lg:col-span-4 flex flex-col gap-3">
              <Link href={`${langPrefix}/inquiry`}>
                <Button variant="accent" size="lg" icon={ArrowRight}>
                  {t.requestQuote}
                </Button>
              </Link>
              <Link href={`${langPrefix}/products/cbd-isolate`}>
                <Button variant="secondary" size="lg" icon={ArrowRight}>
                  {t.viewSpecs}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
