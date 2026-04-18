'use client'

import { useRef } from 'react';
import { ArrowRight, Package, Shield, Globe, TrendingUp, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '@/components/atoms/Badge';
import SectionLabel from '@/components/atoms/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const volumeTiers = [
  { range: '1–5 kg', label: 'Sample / Trial', discount: 'Spot pricing', note: 'COA + spec sheet included' },
  { range: '5–25 kg', label: 'Small Commercial', discount: '5–10% off', note: 'Dedicated account manager' },
  { range: '25–100 kg', label: 'Mid-Volume', discount: '10–18% off', note: 'Custom packaging available' },
  { range: '100–500 kg', label: 'High-Volume', discount: '18–28% off', note: 'Quarterly contract pricing' },
  { range: '500 kg+', label: 'Ton-Scale', discount: '28–40% off', note: 'Annual supply agreements' },
];

const shippingTerms = [
  { term: 'FOB Kunming', desc: 'Buyer arranges freight from origin port. Lowest unit cost, maximum logistics control.', icon: Package },
  { term: 'CIF Rotterdam', desc: 'Vetrux covers freight + insurance to EU port. Buyer handles customs clearance.', icon: Globe },
  { term: 'DDP Europe', desc: 'Delivered duty paid — Vetrux handles all logistics, customs, and duties. Turnkey delivery.', icon: Shield },
];

const whyWholesale = [
  { title: '≥99.5% Purity', desc: 'Pharmaceutical-grade CBD isolate verified by third-party HPLC testing on every batch.' },
  { title: 'THC Non-Detect', desc: 'Confirmed by GC-MS at ISO/IEC 17025-accredited laboratories. Compliant with EU, UK, and APAC thresholds.' },
  { title: 'Vertically Integrated', desc: 'Seed-to-isolate traceability from our Yunnan hemp cultivation base through extraction and purification.' },
  { title: 'cGMP Facility', desc: 'ISO 9001:2015, GMP, and HACCP certified manufacturing with full batch documentation.' },
  { title: 'Flexible Logistics', desc: 'FOB, CIF, and DDP shipping terms with 10–14 day lead times for standard orders.' },
  { title: 'Regulatory Support', desc: 'Documentation packages supporting EU Novel Food applications, EFSA dossiers, and market-specific compliance.' },
];

export default function WholesaleCbdIsolateClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const shippingRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.from(heroRef.current.querySelectorAll('.reveal-card'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
    });
  }, { scope: heroRef });

  useGSAP(() => {
    if (!tiersRef.current) return;
    gsap.from(tiersRef.current.querySelectorAll('.reveal-card'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: tiersRef.current, start: 'top 80%' },
    });
  }, { scope: tiersRef });

  useGSAP(() => {
    if (!shippingRef.current) return;
    gsap.from(shippingRef.current.querySelectorAll('.reveal-card'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: shippingRef.current, start: 'top 80%' },
    });
  }, { scope: shippingRef });

  useGSAP(() => {
    if (!whyRef.current) return;
    gsap.from(whyRef.current.querySelectorAll('.reveal-card'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: whyRef.current, start: 'top 80%' },
    });
  }, { scope: whyRef });

  return (
    <div className="bg-surface">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={heroRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-card">
              <Badge variant="default" className="mb-6">Wholesale Supply</Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-background tracking-tighter leading-[0.95] mb-6">
                Wholesale
                <br />
                <span className="text-primary">CBD Isolate</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 max-w-md">
                Bulk pharmaceutical-grade CBD isolate at competitive wholesale pricing. Volume-tiered
                contracts from 1 kg samples to ton-scale annual supply agreements, with DDP delivery
                to Europe and global markets.
              </p>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed mb-8 max-w-md">
                European CBD isolate imports grew at a <span className="font-semibold text-on-surface-variant">CAGR of approximately 28%</span> between 2020 and 2024, with demand concentrated in Germany, the Netherlands, and Switzerland. <span className="text-on-surface-variant/50">(EIHA European Industrial Hemp Association)</span> All cross-border shipments are structured under <span className="font-semibold text-on-surface-variant">Incoterms 2020</span> (ICC publication), with full phytosanitary certificates, CITES-exempt documentation, and EU Novel Food Regulation (EU) 2015/2283 compliance records provided as standard.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['≥99.5% Purity', 'THC Non-Detect', 'FOB / CIF / DDP', 'ISO 9001 + GMP'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
                  Request Wholesale Quote <ArrowRight size={16} />
                </Link>
                <Link href="/products/cbd-isolate" className="inline-flex items-center gap-2 px-6 py-4 border border-outline/30 text-on-surface text-xs font-bold tracking-widest uppercase rounded-md hover:bg-surface-container transition-colors duration-200">
                  View Product Specs
                </Link>
              </div>
            </div>
            <div className="reveal-card">
              <img src="/images/products/product2.jpg" alt="Wholesale CBD isolate bulk packaging" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VOLUME TIERS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={tiersRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>Volume Pricing</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-4">
              Tiered Wholesale Pricing Structure
            </h2>
            <p className="text-sm text-on-surface-variant max-w-xl">
              Pricing scales with commitment. All tiers include batch-specific COA documentation,
              vacuum-sealed packaging, and dedicated account support.
            </p>
          </div>

          <div className="space-y-3">
            {volumeTiers.map((tier) => (
              <div key={tier.range} className="reveal-card flex flex-col sm:flex-row sm:items-center gap-4 bg-surface-container-lowest p-6">
                <div className="sm:w-32">
                  <p className="text-xl font-extrabold text-on-surface tracking-tighter">{tier.range}</p>
                </div>
                <div className="sm:w-40">
                  <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{tier.label}</p>
                </div>
                <div className="sm:w-32">
                  <span className="px-3 py-1 bg-primary-fixed text-primary text-xs font-bold tracking-wider rounded-full">
                    {tier.discount}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-on-surface-variant">{tier.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-card mt-8">
            <p className="text-xs text-on-surface-variant">
              Pricing reviewed quarterly against market benchmarks. Annual contracts lock in preferential rates.{' '}
              <Link href="/blog/cbd-isolate-wholesale-pricing-cost-factors" className="text-primary underline">
                Read our wholesale pricing analysis →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── SHIPPING TERMS ────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={shippingRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>Global Logistics</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-4">
              Flexible Shipping Terms
            </h2>
            <p className="text-sm text-on-surface-variant max-w-xl">
              Choose the Incoterm that fits your logistics infrastructure. From turnkey DDP delivery
              to cost-optimized FOB arrangements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shippingTerms.map((item) => (
              <div key={item.term} className="reveal-card bg-surface-container-lowest p-8">
                <div className="w-10 h-10 flex items-center justify-center bg-primary-fixed mb-4">
                  <item.icon size={20} className="text-primary" />
                </div>
                <p className="text-lg font-extrabold text-on-surface tracking-tighter mb-3">{item.term}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal-card mt-8">
            <p className="text-xs text-on-surface-variant">
              Standard lead time: 10–14 business days from order confirmation. Air freight available for urgent orders.{' '}
              <Link href="/blog/thc-free-cbd-isolate-sourcing-guide-europe" className="text-primary underline">
                EU sourcing guide →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY VETRUX ────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={whyRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>Why Vetrux</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-4">
              Built for B2B Procurement Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyWholesale.map((item) => (
              <div key={item.title} className="reveal-card bg-surface-container-lowest p-6">
                <CheckCircle size={16} className="text-primary mb-3" />
                <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-2">{item.title}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal-card mt-12 text-center">
            <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
              Get Wholesale Pricing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
