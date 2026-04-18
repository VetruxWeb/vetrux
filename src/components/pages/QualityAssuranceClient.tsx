'use client'

import { useRef } from 'react';
import { ArrowRight, Shield, FileCheck, Microscope, FlaskConical, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '@/components/atoms/Badge';
import SectionLabel from '@/components/atoms/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality management system — independently audited and certified.' },
  { name: 'GMP Certified', desc: 'Good Manufacturing Practice aligned with ICH Q7 for pharmaceutical API production.' },
  { name: 'HACCP', desc: 'Hazard Analysis and Critical Control Points — food safety management system.' },
  { name: 'ISO/IEC 17025', desc: 'Third-party laboratory testing accreditation for all analytical results.' },
];

const testingPanels = [
  { icon: Microscope, title: 'Cannabinoid Profile', method: 'HPLC-UV', standard: 'USP reference standards', detail: 'CBD ≥99.5%, THC ND, full minor cannabinoid panel' },
  { icon: FlaskConical, title: 'Residual Solvents', method: 'GC-MS', standard: 'ICH Q3C Class I/II/III', detail: 'Total residual solvents <10 PPM' },
  { icon: Shield, title: 'Heavy Metals', method: 'ICP-MS', standard: 'USP <232> / <233>', detail: 'Pb, As, Cd, Hg — quantitative results per batch' },
  { icon: FileCheck, title: 'Microbial Limits', method: 'USP <61> / <62>', standard: 'Pharmacopeial', detail: 'TAMC, TYMC, Salmonella, E. coli, S. aureus' },
  { icon: Shield, title: 'Pesticide Residues', method: 'LC-MS/MS', standard: 'EU MRL panel', detail: '400+ pesticide screen — ND for all regulated compounds' },
  { icon: FileCheck, title: 'Mycotoxins', method: 'ELISA / LC-MS', standard: 'EU limits', detail: 'Aflatoxins B1/B2/G1/G2, Ochratoxin A — ND' },
];

const qaProcess = [
  { step: '01', title: 'Incoming Biomass QC', desc: 'Every hemp biomass lot tested for cannabinoid content, moisture, pesticides, and mycotoxins before acceptance.' },
  { step: '02', title: 'In-Process Controls', desc: 'Potency checks at extraction, winterization, and chromatography stages. Deviations trigger CAPA investigation.' },
  { step: '03', title: 'Final Product Testing', desc: 'Full analytical panel on every finished batch — cannabinoid profile, residual solvents, heavy metals, microbial limits.' },
  { step: '04', title: 'Third-Party Verification', desc: 'Independent COA from ISO/IEC 17025-accredited laboratory before batch release. No exceptions.' },
  { step: '05', title: 'Stability Monitoring', desc: 'ICH Q1A-compliant stability program with testing at 0, 3, 6, 12, 18, and 24 months.' },
];

export default function QualityAssuranceClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const testingRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.from(heroRef.current.querySelectorAll('.reveal-card'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
    });
  }, { scope: heroRef });

  useGSAP(() => {
    if (!certsRef.current) return;
    gsap.from(certsRef.current.querySelectorAll('.reveal-card'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: certsRef.current, start: 'top 80%' },
    });
  }, { scope: certsRef });

  useGSAP(() => {
    if (!testingRef.current) return;
    gsap.from(testingRef.current.querySelectorAll('.reveal-card'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: testingRef.current, start: 'top 80%' },
    });
  }, { scope: testingRef });

  useGSAP(() => {
    if (!processRef.current) return;
    gsap.from(processRef.current.querySelectorAll('.reveal-card'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: processRef.current, start: 'top 80%' },
    });
  }, { scope: processRef });

  return (
    <div className="bg-surface">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={heroRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-card">
              <Badge variant="default" className="mb-6">Quality Assurance</Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-background tracking-tighter leading-[0.95] mb-6">
                Quality You
                <br />
                <span className="text-primary">Can Verify</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 max-w-md">
                Every batch of Vetrux CBD isolate is produced under cGMP conditions, tested by
                accredited third-party laboratories, and documented with full traceability from
                hemp biomass to finished product.
              </p>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed mb-8 max-w-md">
                Manufacturing standards align with <span className="font-semibold text-on-surface-variant">ICH Q7</span> (Active Pharmaceutical Ingredient GMP), <span className="font-semibold text-on-surface-variant">EU GMP Annex 1</span> (sterile and controlled-environment manufacturing principles), and <span className="font-semibold text-on-surface-variant">FDA 21 CFR Part 211</span> current Good Manufacturing Practice regulations. Industry data indicates that inadequate supplier qualification contributes to over <span className="font-semibold text-on-surface-variant">60% of pharmaceutical quality failures</span> — Vetrux's 5-stage QA pipeline is designed to eliminate this risk at source. <span className="text-on-surface-variant/50">(ICH Q10 Pharmaceutical Quality System)</span>
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['ISO 9001:2015', 'GMP Certified', 'HACCP', 'ISO/IEC 17025 Testing'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
                  Request Quality Documentation <ArrowRight size={16} />
                </Link>
                <Link href="/products/cbd-isolate" className="inline-flex items-center gap-2 px-6 py-4 border border-outline/30 text-on-surface text-xs font-bold tracking-widest uppercase rounded-md hover:bg-surface-container transition-colors duration-200">
                  View Product Specs
                </Link>
              </div>
            </div>
            <div className="reveal-card">
              <img src="/images/equipment/chromatography-column-700L.webp" alt="Vetrux quality control laboratory" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={certsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>Certifications</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-4">
              Independently Verified Standards
            </h2>
            <p className="text-sm text-on-surface-variant max-w-xl">
              All certifications are current, verifiable through the issuing bodies, and available
              for review as part of the supplier qualification process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="reveal-card bg-surface-container-lowest p-6">
                <Award size={20} className="text-primary mb-4" />
                <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-2">{cert.name}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal-card mt-8">
            <p className="text-xs text-on-surface-variant">
              Learn more about evaluating supplier certifications in our{' '}
              <Link href="/blog/cbd-supplier-due-diligence-checklist" className="text-primary underline">
                supplier due diligence checklist →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTING PANELS ────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={testingRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>Analytical Testing</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-4">
              Full Analytical Panel — Every Batch
            </h2>
            <p className="text-sm text-on-surface-variant max-w-xl">
              No sampling shortcuts. Every production batch undergoes the complete testing panel
              before release, with results documented in a batch-specific Certificate of Analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testingPanels.map((panel) => (
              <div key={panel.title} className="reveal-card bg-surface-container-lowest p-6">
                <panel.icon size={20} className="text-primary mb-4" />
                <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-1">{panel.title}</p>
                <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-2">{panel.method} — {panel.standard}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{panel.detail}</p>
              </div>
            ))}
          </div>

          <div className="reveal-card mt-8">
            <p className="text-xs text-on-surface-variant">
              Understand what each COA section means:{' '}
              <Link href="/blog/how-to-read-cbd-certificate-of-analysis" className="text-primary underline">
                How to read a CBD Certificate of Analysis →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── QA PROCESS ────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={processRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>Quality Process</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-4">
              5-Stage Quality Assurance Pipeline
            </h2>
          </div>

          <div className="space-y-4">
            {qaProcess.map((item) => (
              <div key={item.step} className="reveal-card flex gap-6 bg-surface-container-lowest p-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-white text-sm font-extrabold">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-1">{item.title}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-card mt-12 text-center">
            <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
              Request Quality Documentation <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-on-surface-variant mt-4">
              COA samples, certification copies, and audit access available to qualified B2B buyers.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
