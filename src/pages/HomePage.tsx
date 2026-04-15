// src/pages/HomePage.tsx
// Page 1: Hero / Home — "Botanical Purity at Scale"
// Sections: Hero, Industrial Scale, CBD Isolate Bento, Inquiry CTA

import { useRef } from 'react';
import { ArrowRight, Download, FlaskConical, Award, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import SectionLabel from '../components/atoms/SectionLabel';
import SpecRow from '../components/molecules/SpecRow';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  // Scene 1: Hero entrance animation
  useGSAP(() => {
    if (!heroContentRef.current) return;
    const targets = heroContentRef.current.querySelectorAll('.hero-animate');
    gsap.from(targets, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }, { scope: heroContentRef });

  // Scene 2: Feature cards scroll reveal
  useGSAP(() => {
    if (!featureCardsRef.current) return;
    const cards = featureCardsRef.current.querySelectorAll('.reveal-card');
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: featureCardsRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: featureCardsRef });

  // Scene 2: Bento grid scroll reveal
  useGSAP(() => {
    if (!bentoRef.current) return;
    const items = bentoRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bentoRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: bentoRef });

  // Scene 2: Trust signals scroll reveal
  useGSAP(() => {
    if (!trustRef.current) return;
    const items = trustRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trustRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: trustRef });

  return (
    <div className="bg-surface">

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-on-background">
        {/* Background image */}
        <img
          src="/images/hero/facility-hero.webp"
          alt="Yunnan Vetrux extraction facility"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Gradient overlay */}
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
              <Link to="/equipment">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Explore Facility
                </Button>
              </Link>
              <Link to="/products/cbd-isolate">
                <Button variant="glass" size="lg">
                  Technical Specs
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero bottom stats */}
          <div className="hero-animate flex flex-wrap gap-6 mt-16 pt-8 border-t border-white/10">
            {[
              { value: '99.5%', label: 'CBD Purity' },
              { value: '5,000L', label: 'Daily Capacity' },
              { value: 'ISO 9001', label: 'Certified' },
              { value: '45+', label: 'Countries Served' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white tracking-tighter">{stat.value}</p>
                <p className="text-xs text-white/50 tracking-widest uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIAL SCALE SECTION ────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative reveal-card">
              <img
                src="/images/equipment/extraction-vessel-6m3.webp"
                alt="Industrial extraction infrastructure"
                className="w-full h-[520px] object-cover"
              />
              {/* Overlay stat badge */}
              <div className="absolute bottom-6 left-6 bg-primary text-white px-5 py-3">
                <p className="text-xs tracking-widest uppercase font-semibold text-white/70">Capacity</p>
                <p className="text-2xl font-extrabold tracking-tighter">5,000L Daily Extraction</p>
              </div>
            </div>

            {/* Text + Feature Cards */}
            <div ref={featureCardsRef}>
              <div className="reveal-card">
                <SectionLabel>Industrial Scale</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mb-6">
                  Industrial Infrastructure
                  <br />
                  <span className="text-primary">Precision Controlled</span>
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-10 max-w-md">
                  Our vertically integrated facility spans 45,000 m² and houses a complete
                  chain from raw hemp cultivation to final pharmaceutical-grade isolate.
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: FlaskConical,
                    title: 'Supercritical CO₂ Process',
                    desc: 'Solvent-free extraction preserving full molecular integrity of cannabinoids.',
                  },
                  {
                    icon: Award,
                    title: 'ISO 9001:2015 Certified',
                    desc: 'International quality management across every production stage.',
                  },
                  {
                    icon: Layers,
                    title: 'Multi-Stage Refinement',
                    desc: 'Chromatography, crystallization, and double-blind purity testing.',
                  },
                ].map((feat) => (
                  <div
                    key={feat.title}
                    className="reveal-card flex gap-4 p-5 bg-surface-container-low hover:bg-surface-container transition-colors duration-200"
                  >
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
            {/* Large image — 8/12 */}
            <div className="reveal-card lg:col-span-8 relative overflow-hidden">
              <img
                src="/images/products/product1.jpg"
                alt="CBD Isolate 99.5% Purity"
                className="w-full h-[580px] object-cover object-[center_40%]"
              />
              <div className="absolute top-6 left-6">
                <Badge variant="default">Purity Focus</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-48 p-8 bg-gradient-to-t from-on-background/90 via-on-background/40 to-transparent flex items-end">
                <h2 className="text-4xl font-extrabold text-white tracking-tighter leading-tight">
                  99.5% Purity<br />Guaranteed
                </h2>
              </div>
            </div>

            {/* Right stack — 4/12 */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Technical data card — primary green */}
              <div className="reveal-card bg-primary p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">
                    Technical Data
                  </p>
                  <p className="text-2xl font-extrabold text-white tracking-tighter leading-tight mb-2">
                    Certificate of Analysis Available
                  </p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Every batch ships with full third-party COA, HPLC analysis, and heavy metal screening.
                  </p>
                </div>
                <button className="mt-6 inline-flex items-center gap-2 px-4 py-3 bg-white text-primary text-xs font-bold tracking-widest uppercase hover:bg-primary-fixed transition-colors duration-200">
                  <Download size={14} />
                  Download COA
                </button>
              </div>

              {/* Specs card */}
              <div className="reveal-card bg-surface-container-lowest p-8 flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-4">
                  Key Specifications
                </p>
                <SpecRow label="CBD Purity (HPLC)" value="≥ 99.5%" />
                <SpecRow label="THC Content" value="ND (Not Detected)" />
                <SpecRow label="Appearance" value="White Crystalline" />
                <SpecRow label="Solvent Residue" value="&lt; 10 PPM" isLast />

                <Link to="/products/cbd-isolate" className="mt-6 inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-primary hover:text-primary-container transition-colors duration-200">
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
              { label: 'ISO 9001:2015', sub: 'Quality Management' },
              { label: 'GMP Certified', sub: 'Manufacturing Standard' },
              { label: 'Carbon Neutral', sub: 'Since 2024' },
              { label: '45+ Countries', sub: 'Global Export' },
            ].map((cert) => (
              <div key={cert.label} className="reveal-card py-6 border-t-2 border-primary-fixed">
                <p className="text-lg font-extrabold text-on-background tracking-tighter">{cert.label}</p>
                <p className="text-xs text-on-surface-variant tracking-wider uppercase mt-1">{cert.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
