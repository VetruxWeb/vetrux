'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, Download, ArrowRight, Check } from 'lucide-react';
import Button from '@/components/atoms/Button';
import QuoteInquiryModal from '@/components/molecules/QuoteInquiryModal';
import DocumentRequestModal from '@/components/molecules/DocumentRequestModal';
import { useReveal } from '@/hooks/useReveal';
import type { DocumentRequestDocumentType } from '@/lib/documentRequest';
import type { Locale } from '@/i18n/locales';
import type { ProductDetail } from '@/lib/productData';
import { productDetailStrings } from '@/content/pages/productDetail.content';

const plantingImages = [
  { src: '/images/vetrux_images/hemp-growth-day-30-field.jpg', alt: 'Hemp field day 30' },
  { src: '/images/vetrux_images/hemp-growth-day-65-flowering.jpg', alt: 'Hemp flowering' },
  { src: '/images/vetrux_images/hemp-growth-day-120-mature-field-1.jpg', alt: 'Mature field' },
  { src: '/images/vetrux_images/hemp-harvest-drying-biomass-1.jpg', alt: 'Harvest drying' },
];

const packagingImages = [
  { src: '/images/vetrux_images/cbd-isolate-5kg-foil-bag-packaging.jpg', alt: 'Foil bag packaging' },
  { src: '/images/vetrux_images/cbd-isolate-export-carton-packing.jpg', alt: 'Export carton' },
];

const certImages = [
  { src: '/images/vetrux_images/industrial-hemp-processing-license-vetrux.jpg', alt: 'Processing license' },
  { src: '/images/vetrux_images/vetrux-fda-registration-certificate.png', alt: 'FDA certificate' },
  { src: '/images/vetrux_images/precursor-chemical-production-filing-certificate.jpg', alt: 'Filing certificate' },
];

interface Props {
  product: ProductDetail;
  locale?: Locale;
}

export default function ProductDetailClient({ product, locale = 'en' }: Props) {
  const t = productDetailStrings[locale];
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docModalType, setDocModalType] = useState<DocumentRequestDocumentType>('both');
  const [activeImage, setActiveImage] = useState(0);

  useReveal(heroRef);

  const langPrefix = locale === 'en' ? '' : `/${locale}`;
  const heroSrc = product.heroImage || '/images/vetrux_images/isolate-crystals.png';
  const allImages = [heroSrc, ...product.images.filter((img) => img !== heroSrc)];

  const toggleVariant = (label: string) => {
    setSelectedVariants((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };
  const toggleTier = (label: string) => {
    setSelectedTiers((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  const buildSelectedProducts = (): string[] => {
    const items: string[] = [];
    const name = product.name;
    if (selectedVariants.length === 0 && selectedTiers.length === 0) {
      items.push(`${name} — ${t.specsToBeDiscussed}`);
    } else if (selectedVariants.length > 0 && selectedTiers.length === 0) {
      selectedVariants.forEach((v) => items.push(`${name} ${v}`));
    } else if (selectedVariants.length === 0 && selectedTiers.length > 0) {
      selectedTiers.forEach((t) => items.push(`${name} — ${t}`));
    } else {
      selectedVariants.forEach((v) => {
        selectedTiers.forEach((t) => items.push(`${name} ${v} — ${t}`));
      });
    }
    return items;
  };

  const openDocModal = (type: DocumentRequestDocumentType) => {
    setDocModalType(type);
    setDocModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="border-b border-gray-100">
        <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="flex gap-3">
              {/* Thumbnail column */}
              {allImages.length > 1 && (
                <div className="flex flex-col gap-2 w-16 shrink-0">
                  {allImages.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        activeImage === i ? 'border-accent' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <Image src={src} alt={`${product.name} ${i + 1}`} fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {/* Main image */}
              <div className="flex-1 bg-surface-container-low rounded-lg p-6 flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-[440px]">
                  <Image
                    src={allImages[activeImage] || heroSrc}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-on-background mb-3">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-on-surface-variant text-[15px] leading-relaxed mb-6">
                  {product.description}
                </p>
              )}

              {/* VARIANT SELECTOR */}
              {product.variants.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-medium text-on-surface mb-2">{t.selectSpec}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => toggleVariant(v.label)}
                        className={`px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                          selectedVariants.includes(v.label)
                            ? 'bg-accent text-white border-accent'
                            : 'bg-white text-on-surface border-gray-300 hover:border-accent'
                        }`}
                      >
                        {selectedVariants.includes(v.label) && <Check size={14} className="inline mr-1" />}
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUANTITY TIER SELECTOR */}
              {product.quantityTiers.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-on-surface mb-2">{t.selectQuantity}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.quantityTiers.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => toggleTier(t.label)}
                        className={`px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                          selectedTiers.includes(t.label)
                            ? 'bg-accent text-white border-accent'
                            : 'bg-white text-on-surface border-gray-300 hover:border-accent'
                        }`}
                      >
                        {selectedTiers.includes(t.label) && <Check size={14} className="inline mr-1" />}
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-6">
                <Button variant="accent" size="lg" icon={Send} onClick={() => setQuoteModalOpen(true)}>
                  {t.requestQuote}
                </Button>
                <Button variant="secondary" size="lg" icon={Download} iconPosition="left" onClick={() => openDocModal('COA')}>
                  {t.requestCoa}
                </Button>
              </div>

              <div className="text-xs text-on-surface-variant space-y-1">
                {product.specs.length > 0 && (
                  <p>
                    {product.specs.filter((s) => ['CAS Number', 'HS Code'].includes(s.label)).map((s) => `${s.label}: ${s.value}`).join(' | ')}
                  </p>
                )}
                {product.moq && <p>{t.moqPrefix} {product.moq} | {t.customization}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL DIVIDER */}
      <div className="bg-surface-container-low py-4 text-center border-b border-gray-100">
        <span className="text-sm font-bold tracking-[0.2em] uppercase text-on-surface-variant">— {t.detail} —</span>
      </div>

      {/* SPECIFICATIONS TABLE */}
      {product.specs.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-on-background text-center mb-10">
              {t.specifications}
            </h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={spec.label} className={i % 2 === 0 ? 'bg-surface-container-low' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold text-on-surface w-[40%] border-r border-gray-200">{spec.label}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      {product.description && (
        <section className="py-16 bg-surface-container-low">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-on-background text-center mb-8">{t.description}</h2>
            <div className="text-sm text-on-surface-variant leading-relaxed space-y-4">
              {product.description.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PLANTING BASE */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-on-background text-center mb-3">{t.plantingBase}</h2>
          <p className="text-center text-sm text-on-surface-variant mb-10">{t.plantingBaseDesc}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {plantingImages.map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGING */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-on-background text-center mb-3">{t.packaging}</h2>
          <p className="text-center text-sm text-on-surface-variant mb-10">{t.packagingDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packagingImages.map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-on-background text-center mb-3">{t.certifications}</h2>
          <p className="text-center text-sm text-on-surface-variant mb-10">{t.certificationsDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certImages.map((img) => (
              <div key={img.src} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-200">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2 bg-white" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">{t.interestedIn} {product.name}?</h2>
          <p className="text-white/70 text-sm mb-8 max-w-lg mx-auto">{t.ctaBody}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="lg" icon={Send} onClick={() => setQuoteModalOpen(true)}>{t.requestQuote}</Button>
            <Link href={`${langPrefix}/inquiry`}>
              <Button variant="secondary" size="lg" icon={ArrowRight}>{t.contactPage}</Button>
            </Link>
          </div>
        </div>
      </section>

      <QuoteInquiryModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        selectedProducts={buildSelectedProducts()}
        productName={product.name}
        locale={locale}
      />
      <DocumentRequestModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        defaultDocumentType={docModalType}
        sourcePage={`/products/${product.slug}`}
        productInterest={product.name}
        locale={locale}
      />
    </div>
  );
}