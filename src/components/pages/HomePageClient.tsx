'use client'

import { useRef } from 'react';
import { ArrowRight, Download, FlaskConical, Award, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import SectionLabel from '@/components/atoms/SectionLabel';
import SpecRow from '@/components/molecules/SpecRow';

gsap.registerPlugin(ScrollTrigger);

export default function HomePageClient() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroContentRef.current) return;
    const targets = heroContentRef.current.querySelectorAll('.hero-animate');
    gsap.from(targets, {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    });
  }, { scope: heroContentRef });

  useGSAP(() => {
    if (!featureCardsRef.current) return;
    const cards = featureCardsRef.current.querySelectorAll('.reveal-card');
    gsap.from(cards, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: featureCardsRef.current, start: 'top 80%' },
    });
  }, { scope: featureCardsRef });

  useGSAP(() => {
    if (!bentoRef.current) return;
    const items = bentoRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: bentoRef.current, start: 'top 80%' },
    });
  }, { scope: bentoRef });

  useGSAP(() => {
    if (!trustRef.current) return;
    const items = trustRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: trustRef.current, start: 'top 80%' },
    });
  }, { scope: trustRef });

  return (
    <div className="bg-surface">

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-on-background">
        <Image
          src="/images/hero/facility-hero.webp"
          alt="Yunnan Vetrux extraction facility"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-background via-on-background/60 to-transparent" />

        <div ref={heroContentRef} className="relative z-10 max-w-container mx-auto px-6 lg:px-12 pb-20 pt-32">
          <div className="max-w-3xl">
            <div className="hero-animate">
              <Badge variant="glass" className="mb-6">Technical Excellence</Badge>
            </div>

            <h1 className="hero-animate text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-[0.95] mb-6">
              Botanical Purity<br />at Scale
            </h1>

            <p className="hero-animate text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-10">
              Harnessing Yunnan's biodiversity through state-of-the-art supercritical CO₂
              extraction technology. Pharmaceutical-grade CBD isolate for global B2B partners.
            </p>

            <div className="hero-animate flex flex-wrap gap-4">
              <Link href="/equipment">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Explore Facility
                </Button>
              </Link>
              <Link href="/products/cbd-isolate">
                <Button variant="glass" size="lg">
                  Technical Specs
                </Button>
              </Link>
            </div>
          </div>

          <div className="hero-animate flex flex-wrap gap-6 mt-16 pt-8 border-t border-white/10">
            {[
              { value: 'B2B', label: 'Inquiry Focus' },
              { value: 'Docs', label: 'Request Path' },
              { value: 'Facility', label: 'Overview' },
              { value: 'Current', label: 'Website Information' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white tracking-tighter">{stat.value}</p>
                <p className="text-xs text-white/50 tracking-widest uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY CONTEXT ────────────────────────────────────────────── */}
      <section className="py-12 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Market Context</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                The European CBD market is projected to reach <span className="text-on-surface font-semibold">€3.2 billion by 2027</span>, driven by pharmaceutical, nutraceutical, and cosmetic applications. <a href="https://prohibitionpartners.com" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant/60 text-xs underline underline-offset-2">(Prohibition Partners, European CBD Report)</a>
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Extraction Science</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Vetrux employs supercritical CO₂ extraction at <span className="text-on-surface font-semibold">31.1°C / 73.8 bar</span> — the critical point at which CO₂ acts as a selective, solvent-free extractant, preserving full cannabinoid molecular integrity without thermal degradation.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Manufacturer Position</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                As a vertically integrated seed-to-isolate manufacturer operating from Yunnan Province, Vetrux controls every stage of the phytocannabinoid production chain — from cultivar selection and biomass quality to final API-grade crystallisation and batch release.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIAL SCALE SECTION ────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative reveal-card">
              <Image
                src="/images/equipment/extraction-vessel-6m3.webp"
                alt="Industrial extraction infrastructure"
                width={800}
                height={520}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-primary text-white px-5 py-3">
                <p className="text-xs tracking-widest uppercase font-semibold text-white/70">Capacity</p>
                <p className="text-2xl font-extrabold tracking-tighter">Facility Overview</p>
              </div>
            </div>

            <div ref={featureCardsRef}>
              <div className="reveal-card">
                <SectionLabel>Industrial Scale</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mb-6">
                  Industrial Infrastructure
                  <br />
                  <span className="text-primary">Precision Controlled</span>
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-10 max-w-md">
                  Explore the current facility presentation, equipment overview, and process
                  narrative used to support B2B product discussions.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: FlaskConical, title: 'Supercritical CO₂ Process', desc: 'Solvent-free extraction preserving full molecular integrity of cannabinoids.' },
                  { icon: Award, title: 'Documentation-First Discussions', desc: 'Product and facility information can be reviewed directly with the B2B team.' },
                  { icon: Layers, title: 'Multi-Stage Refinement', desc: 'Chromatography, crystallization, and double-blind purity testing.' },
                ].map((feat) => (
                  <div key={feat.title} className="reveal-card flex gap-4 p-5 bg-surface-container-low hover:bg-surface-container transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-fixed flex items-center justify-center">
                      <feat.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface mb-1">{feat.title}</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CBD ISOLATE BENTO SECTION ───────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={bentoRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="reveal-card lg:col-span-8 relative overflow-hidden">
              <Image
                src="/images/products/product1.jpg"
                alt="CBD Isolate 99.5% Purity"
                width={1200}
                height={580}
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="w-full h-[580px] object-cover object-[center_40%]"
              />
              <div className="absolute top-6 left-6">
                <Badge variant="default">Purity Focus</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-48 p-8 bg-gradient-to-t from-on-background/90 via-on-background/40 to-transparent flex items-end">
                <h2 className="text-4xl font-extrabold text-white tracking-tighter leading-tight">
                  Product Overview<br />CBD Isolate
                </h2>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="reveal-card bg-primary p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">Technical Data</p>
                  <p className="text-2xl font-extrabold text-white tracking-tighter leading-tight mb-2">Certificate of Analysis Available</p>
                  <p className="text-xs text-white/70 leading-relaxed">Batch documentation and product information can be reviewed during qualified B2B discussions.</p>
                </div>
                <Link href="/inquiry" className="mt-6 inline-flex items-center gap-2 px-4 py-3 bg-white text-primary text-xs font-bold tracking-widest uppercase hover:bg-primary-fixed transition-colors duration-200">
                  <Download size={14} />
                  Request Documentation
                </Link>
              </div>

              <div className="reveal-card bg-surface-container-lowest p-8 flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-4">Key Specifications</p>
                <SpecRow label="CBD Purity (HPLC)" value="≥ 99.5%" />
                <SpecRow label="THC Content" value="ND (Not Detected)" />
                <SpecRow label="Appearance" value="White Crystalline" />
                <SpecRow label="Solvent Residue" value="&lt; 10 PPM" isLast />
                <Link href="/products/cbd-isolate" className="mt-6 inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-primary hover:text-primary-container transition-colors duration-200">
                  Full Specifications <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS / CERTIFICATIONS ─────────────────────────────── */}
      <section className="py-16 bg-surface">
        <div ref={trustRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
            {[
              { label: 'Quality Focus', sub: 'Process Review', href: '/quality-assurance' },
              { label: 'Wholesale Supply', sub: 'Volume Pricing', href: '/wholesale-cbd-isolate' },
              { label: 'Manufacturer Profile', sub: 'Seed-to-Isolate', href: '/cbd-isolate-manufacturer' },
              { label: 'Global Inquiry', sub: 'Export Discussions', href: '/inquiry' },
            ].map((cert) => (
              <Link key={cert.label} href={cert.href} className="reveal-card py-6 border-t-2 border-primary-fixed hover:border-primary transition-colors duration-200 block">
                <p className="text-lg font-extrabold text-on-background tracking-tighter">{cert.label}</p>
                <p className="text-xs text-on-surface-variant tracking-wider uppercase mt-1">{cert.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tighter leading-tight mb-12">
            What Buyers Ask Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'What is CBD isolate and how is it different from full-spectrum CBD?',
                a: 'CBD isolate is the purest form of cannabidiol — a white crystalline powder containing ≥99.5% CBD with all other cannabinoids, terpenes, and plant compounds removed. Unlike full-spectrum CBD which retains THC and other cannabinoids, CBD isolate is THC non-detect (ND), making it ideal for pharmaceutical and nutraceutical formulations requiring precise dosing and regulatory compliance.',
              },
              {
                q: 'What certifications does Yunnan Vetrux hold?',
                a: 'Vetrux operates under ISO 9001:2015, GMP, and HACCP certifications. Our facility follows FDA 21 CFR Part 211 and EU GMP Annex 1 standards. All testing is performed by ISO/IEC 17025-accredited laboratories, and every batch ships with a full Certificate of Analysis (COA).',
              },
              {
                q: 'What is the minimum order quantity for wholesale CBD isolate?',
                a: 'Vetrux offers CBD isolate starting from 1 kg for sample and trial orders. Volume pricing begins at 5 kg, with significant discounts at 100 kg+ and ton-scale annual contracts. Available in 1 kg, 5 kg, and 25 kg packaging.',
              },
              {
                q: 'How does Vetrux ensure THC-free compliance for European buyers?',
                a: 'Every batch undergoes GC-MS testing at accredited laboratories to confirm THC non-detect (ND) status. Our supercritical CO₂ extraction and multi-stage chromatographic purification process ensures compliance with EU Novel Food THC limits. Full documentation including COA, Certificate of Origin, and SDS is provided with each shipment.',
              },
              {
                q: 'What shipping terms are available for European buyers?',
                a: 'Vetrux offers FOB Kunming, CIF Rotterdam, and DDP delivery to European destinations. Standard lead time is 10–14 business days from order confirmation. All shipments include batch-specific COA, Certificate of Origin, and Safety Data Sheet.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-surface p-6">
                <h3 className="text-sm font-bold text-on-background mb-3">{faq.q}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* References */}
          <div className="mt-12 pt-8 border-t border-outline-variant/20">
            <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/40 mb-3">References &amp; Standards</p>
            <ul className="flex flex-col gap-1.5 text-xs text-on-surface-variant/60">
              <li><a href="https://www.who.int/docs/default-source/controlled-substances/whocbdreportmay2018-2.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-on-surface-variant">WHO Expert Committee on Drug Dependence — Cannabidiol (CBD) Critical Review Report (2018)</a></li>
              <li><a href="https://food.ec.europa.eu/safety/novel-food/legislation_en" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-on-surface-variant">EU Novel Food Regulation (EU) 2015/2283 — European Commission</a></li>
              <li><a href="https://www.iso.org/standard/62085.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-on-surface-variant">ISO 9001:2015 — Quality Management Systems</a></li>
              <li><a href="https://www.iso.org/standard/39883.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-on-surface-variant">ISO/IEC 17025 — General Requirements for Testing and Calibration Laboratories</a></li>
              <li><a href="https://www.ich.org/page/quality-guidelines" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-on-surface-variant">ICH Q3C — Impurities: Guideline for Residual Solvents</a></li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
