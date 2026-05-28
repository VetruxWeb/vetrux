'use client'

import type { Locale } from '@/i18n/locales';
import { useRef, useState } from 'react';
import { ArrowRight, Download, CheckCircle, Microscope, TestTube, TrendingUp, PackageCheck, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import DocumentRequestModal from '@/components/molecules/DocumentRequestModal';
import SectionLabel from '@/components/atoms/SectionLabel';
import SpecRow from '@/components/molecules/SpecRow';
import ProcessSteps from '@/components/molecules/ProcessSteps';
import { useReveal } from '@/hooks/useReveal';
import type { DocumentRequestDocumentType } from '@/lib/documentRequest';
import { productPageStrings } from '@/content/pages/product.content';
import type { ProductPageStrings } from '@/content/pages/product.content';
import type { ProductWithDetails } from '@/lib/products';

const qualityCards = [
  {
    icon: Microscope,
    title: 'Quality Management',
    desc: 'In-house HPLC analytical capability. Documentation support available according to order requirements.',
    bg: 'bg-surface-container-low',
    image: '/images/vetrux_images/cbd-isolate-hplc-quality-control-system.jpg',
  },
  {
    icon: TestTube,
    title: 'Documentation Support',
    desc: 'Supporting documents including COA, SDS, test reports, commercial invoices, and packing lists may be arranged according to actual batch and order terms.',
    bg: 'bg-primary',
    image: null,
  },
  {
    icon: TrendingUp,
    title: 'Export-Ready Packaging',
    desc: 'PE bags 5kg (27×60cm) and aluminum foil bags 5kg (35×50cm), food-grade. Export cartons 465×285×295mm, 2 bags per carton. Plastic pallets with shrink wrap for secure transit.',
    bg: 'bg-surface-container-low',
    image: '/images/vetrux_images/cbd-isolate-5kg-foil-bag-packaging.jpg',
  },
];

const productImages = [
  {
    src: '/images/vetrux_images/cbd-isolate-crystals-white-powder.jpg',
    alt: 'CBD isolate white crystalline powder for bulk B2B supply',
    label: 'CBD isolate crystals',
  },
  {
    src: '/images/vetrux_images/bulk-cbd-isolate-crystal-powder-closeup.jpg',
    alt: 'Bulk CBD isolate crystal powder closeup',
    label: 'Bulk crystal closeup',
  },
  {
    src: '/images/vetrux_images/cbd-isolate-export-carton-packing.jpg',
    alt: 'CBD isolate export carton packing for international shipment',
    label: 'Export carton packing',
  },
  {
    src: '/images/vetrux_images/cbd-isolate-5kg-foil-bag-packaging.jpg',
    alt: 'CBD isolate 5 kg aluminum foil bag packaging',
    label: '5 kg foil bag',
  },
];

export default function ProductPageClient({ locale = 'en', product }: { locale?: Locale; product?: ProductWithDetails }) {
  // If product data from DB is provided, map it to the same shape as static content
  const t = product ? mapProductToStrings(product) : productPageStrings[locale];
  const productSlug = product?.slug || 'cbd-isolate';
  const productName = product?.translations[0]?.name || 'CBD Isolate';
  const langPrefix = locale === 'en' ? '' : `/${locale}`;
  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);
  const [documentModalType, setDocumentModalType] = useState<DocumentRequestDocumentType>('both');
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  useReveal(heroRef);
  useReveal(metricsRef, { stagger: 0.08 });
  useReveal(processRef, { stagger: 0.08 });
  useReveal(specsRef);
  useReveal(qualityRef);

  const openDocumentModal = (documentType: DocumentRequestDocumentType) => {
    setDocumentModalType(documentType);
    setIsDocumentModalOpen(true);
  };

  return (
    <div className="bg-surface">

      {/* ── PRODUCT HERO ────────────────────────────────────────────────── */}
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

              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  'CBD Isolate',
                  '99%+ CBD',
                  'THC < 0.05%',
                  '5 kg/bag',
                  'CAS 13956-29-1',
                  'HS Code 2907299020',
                ].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => openDocumentModal('both')}>
                  {t.requestSpecSheet}
                </Button>
                <Button variant="secondary" size="lg" icon={Download} iconPosition="left" onClick={() => openDocumentModal('COA')}>
                  {t.requestCoa}
                </Button>
              </div>
            </div>

            <div className="reveal-card relative">
              <Image src="/images/vetrux_images/bulk-cbd-isolate-crystal-powder-closeup.jpg" alt="Bulk CBD isolate white crystalline powder sample for B2B buyers" width={800} height={500} priority sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT PHOTOS ─────────────────────────────────────────────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <SectionLabel>Product Photos</SectionLabel>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-4">
              CBD isolate product and export packaging
            </h2>
            <p className="text-[15px] text-on-surface-variant max-w-xl">
              Product visuals from the current page material: CBD crystal powder, 5 kg bag packaging, and export carton packing for bulk orders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productImages.map((item) => (
              <figure key={item.src} className="bg-surface-container-lowest border border-outline-variant/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL ANALYSIS GRID ─────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={metricsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>{t.techSection}</SectionLabel>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-4">
              {t.techTitle}
            </h2>
            <p className="text-[15px] text-on-surface-variant mb-12 max-w-xl">
              {t.techBody}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {t.metrics.map((metric) => (
              <div key={metric.label} className="reveal-card bg-surface-container-lowest p-6 border-l-2 border-transparent hover:border-accent transition-colors duration-200">
                <p className="text-xs font-semibold tracking-[0.35em] uppercase text-accent mb-1">{metric.label}</p>
                <p className="text-2xl font-extrabold text-on-surface tracking-tighter mb-1">{metric.value}</p>
                <p className="text-xs text-on-surface-variant/70">{metric.status}</p>
              </div>
            ))}
          </div>

          <div className="reveal-card">
            <Button variant="accent" size="md" icon={Download} iconPosition="left" onClick={() => openDocumentModal('both')}>
              {t.requestSpecSheet}
            </Button>
          </div>
        </div>
      </section>

      {/* ── GEO ANSWERS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-10">
            <SectionLabel>{t.buyerSection}</SectionLabel>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05]">
              {t.buyerTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.qa.map((item) => (
              <div key={item.question} className="bg-surface-container-lowest p-6 border-l-2 border-accent">
                <h3 className="text-sm font-extrabold text-on-surface tracking-tighter mb-2">
                  {item.question}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS DIAGRAM ─────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={processRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-10">
            <SectionLabel>{t.processSection}</SectionLabel>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] max-w-xl">
              {t.processTitle}
            </h2>
          </div>
          <div className="reveal-card">
            <ProcessSteps steps={t.steps} />
          </div>
        </div>
      </section>

      {/* ── PRODUCT SPECIFICATIONS ─────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={specsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-card">
              <SectionLabel>{t.specSection}</SectionLabel>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-8">{t.specTitle}</h2>
              <div>
                {t.specs.map((spec, i) => (
                  <SpecRow key={spec.label} label={spec.label} value={spec.value} isLast={i === t.specs.length - 1} />
                ))}
              </div>
            </div>

            <div className="reveal-card">
              <SectionLabel>{t.complianceSection}</SectionLabel>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-6">{t.complianceTitle}</h2>
              <div className="mb-6 p-4 bg-surface-container border-l-2 border-accent">
                <p className="text-xs font-semibold tracking-[0.35em] uppercase text-accent mb-1">{t.exportNotice}</p>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">
                  {t.exportBody}{' '}
                  <span className="font-semibold text-on-surface">{t.buyerResponsibility}</span>.
                </p>
              </div>
              <div className="space-y-4">
                {t.compliance.map((item) => (
                  <div key={item.standard} className="flex items-start gap-3 py-3 border-b border-outline-variant/20 last:border-0">
                    <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{item.standard}</p>
                      <p className="text-[13px] text-on-surface-variant">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGING & DOCUMENTS ──────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <div className="max-w-2xl mb-8">
              <SectionLabel>Packaging</SectionLabel>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-6">
                Bulk packing flow for export orders
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-stretch">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.packaging.map((item) => (
                  <div
                    key={item.label}
                    className="min-h-36 bg-surface-container-lowest p-6 border-l-2 border-transparent hover:border-accent transition-colors duration-200"
                  >
                    <PackageCheck size={18} className="text-accent mb-4" />
                    <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-2">{item.label}</p>
                    <p className="text-[13px] text-on-surface-variant leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>

              <figure className="bg-surface-container-lowest border border-outline-variant/30 overflow-hidden">
                <div className="relative h-full min-h-[360px]">
                  <Image
                    src="/images/vetrux_images/cbd-isolate-export-carton-packing.jpg"
                    alt="CBD isolate export carton packing with 5 kg bags"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
                  2 bags per export carton, palletized with outer shrink wrap
                </figcaption>
              </figure>
            </div>
          </div>

          <div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <SectionLabel>Technical & Quality Files</SectionLabel>
                <h2 className="font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mt-3">
                  COA, air transport, and SDS previews
                </h2>
              </div>
              <Button variant="accent" size="md" icon={Download} iconPosition="left" onClick={() => openDocumentModal('both')}>
                {t.requestSpecSheet}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.documents.map((doc) => (
                <article
                  key={doc.title}
                  className="bg-surface-container-lowest border border-outline-variant/30 overflow-hidden flex flex-col min-h-[560px]"
                >
                  <div className="relative h-[360px] bg-white border-b border-outline-variant/20">
                    <Image
                      src={doc.image}
                      alt={doc.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText size={16} className="text-accent flex-shrink-0" />
                      <h3 className="text-sm font-extrabold text-on-surface tracking-tighter">
                        {doc.title}
                      </h3>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITY ASSURANCE BENTO ─────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={qualityRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card flex flex-wrap items-center gap-4 mb-12">
            <SectionLabel className="mb-0">{t.qualitySection}</SectionLabel>
            <div className="flex gap-3">
              {['CBD Isolate', 'OEM/ODM', 'Technical Services'].map((cert) => (
                <span key={cert} className="px-3 py-1 bg-primary-fixed text-primary text-xs font-bold tracking-wider uppercase rounded-full">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <h2 className="reveal-card font-serif font-medium text-3xl md:text-4xl text-on-background tracking-tight leading-[1.05] mb-12 max-w-xl">
            {t.qualityTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qualityCards.map((card, idx) => (
              <div key={card.title} className={`reveal-card ${card.bg} p-8 ${card.bg === 'bg-primary' ? '' : 'border-l-2 border-transparent hover:border-accent transition-colors duration-200'}`}>
                {card.image && (
                  <div className="relative w-full h-40 mb-6">
                    <Image src={card.image} alt={t.cards[idx]?.title || card.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  </div>
                )}
                <div className={`w-10 h-10 flex items-center justify-center mb-4 ${card.bg === 'bg-primary' ? 'bg-white/10' : 'bg-primary-fixed'}`}>
                  <card.icon size={20} className={card.bg === 'bg-primary' ? 'text-white' : 'text-primary'} />
                </div>
                <p className={`font-serif text-lg leading-snug mb-3 ${card.bg === 'bg-primary' ? 'text-white' : 'text-on-surface'}`}>
                  {t.cards[idx]?.title || card.title}
                </p>
                <p className={`text-[13px] leading-relaxed ${card.bg === 'bg-primary' ? 'text-white/70' : 'text-on-surface-variant'}`}>
                  {t.cards[idx]?.desc || card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Internal links to related pages */}
          <div className="reveal-card mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href={`${langPrefix}/quality-assurance`} className="p-4 bg-surface-container-lowest hover:bg-surface-container border-l-2 border-transparent hover:border-accent transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              <p className="text-xs font-bold text-accent tracking-[0.25em] uppercase">{t.qualityAssuranceLink}</p>
              <p className="text-[13px] text-on-surface-variant mt-1">{t.qualityAssuranceSub}</p>
            </Link>
            <Link href={`${langPrefix}/wholesale-cbd-isolate`} className="p-4 bg-surface-container-lowest hover:bg-surface-container border-l-2 border-transparent hover:border-accent transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              <p className="text-xs font-bold text-accent tracking-[0.25em] uppercase">{t.wholesaleLink}</p>
              <p className="text-[13px] text-on-surface-variant mt-1">{t.wholesaleSub}</p>
            </Link>
            <Link href={`${langPrefix}/inquiry`} className="p-4 bg-surface-container-lowest hover:bg-surface-container border-l-2 border-transparent hover:border-accent transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              <p className="text-xs font-bold text-accent tracking-[0.25em] uppercase">{t.contactSalesLink}</p>
              <p className="text-[13px] text-on-surface-variant mt-1">inquiry@vetrux.tech</p>
            </Link>
          </div>
        </div>
      </section>

      <DocumentRequestModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        defaultDocumentType={documentModalType}
        sourcePage={`/products/${productSlug}`}
        productInterest={productName}
        locale={locale}
      />

    </div>
  );
}

function mapProductToStrings(product: ProductWithDetails): ProductPageStrings {
  const t = product.translations[0]!
  return {
    badge: t.badge || '',
    heroTitle1: t.heroTitle1 || '',
    heroTitle2: t.heroTitle2 || '',
    heroBody: t.heroBody || '',
    requestSpecSheet: t.requestSpecSheet || 'Request Spec Sheet',
    requestCoa: t.requestCoa || 'Request COA',
    techSection: t.techSection || '',
    techTitle: t.techTitle || '',
    techBody: t.techBody || '',
    buyerSection: t.buyerSection || '',
    buyerTitle: t.buyerTitle || '',
    processSection: t.processSection || '',
    processTitle: t.processTitle || '',
    specSection: t.specSection || '',
    specTitle: t.specTitle || '',
    complianceSection: t.complianceSection || '',
    complianceTitle: t.complianceTitle || '',
    exportNotice: t.exportNotice || '',
    exportBody: t.exportBody || '',
    buyerResponsibility: t.buyerResponsibility || '',
    qualitySection: t.qualitySection || '',
    qualityTitle: t.qualityTitle || '',
    qualityAssuranceLink: t.qualityAssuranceLink || 'Quality Assurance →',
    qualityAssuranceSub: t.qualityAssuranceSub || '',
    wholesaleLink: t.wholesaleLink || 'Wholesale Inquiry →',
    wholesaleSub: t.wholesaleSub || '',
    contactSalesLink: t.contactSalesLink || 'Contact Sales →',
    metrics: product.metrics.map((m) => ({ label: m.label, value: m.value, status: m.status || '' })),
    steps: product.steps.map((s) => ({ title: s.title, desc: s.desc })),
    qa: product.faqs.map((f) => ({ question: f.question, answer: f.answer })),
    specs: product.specs.map((s) => ({ label: s.label, value: s.value })),
    packaging: product.packaging.map((p) => ({ label: p.label, value: p.value })),
    documents: product.documents.map((d) => ({ title: d.title, desc: d.desc, image: d.image, alt: d.alt })),
    compliance: product.compliance.map((c) => ({ standard: c.standard, detail: c.detail })),
    cards: product.compliance.length > 0
      ? [
          { title: 'Quality Management', desc: 'In-house HPLC analytical capability.' },
          { title: 'Documentation Support', desc: 'COA, SDS, test reports available.' },
          { title: 'Export-Ready Packaging', desc: 'Food-grade packaging for secure transit.' },
        ]
      : [],
  }
}
