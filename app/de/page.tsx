import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  return {
    title: 'CBD-Isolat Großhandel | Pharmazeutische Qualität ≥99,5% — Yunnan Vetrux',
    description:
      'Yunnan Vetrux ist ein vertikal integrierter CBD-Isolat-Hersteller in China. Pharmazeutische Qualität ≥99,5% Reinheit, THC-frei. Großhandelspreise mit DDP-Lieferung nach Europa. ISO 9001, GMP, HACCP zertifiziert.',
    keywords:
      'CBD Isolat Großhandel, CBD Isolat kaufen, CBD Isolat Hersteller, pharmazeutisches CBD Isolat, THC-freies CBD Isolat, CBD Isolat Europa, CBD Isolat Lieferant',
    alternates: {
      canonical: `${baseUrl}/de`,
      languages: {
        'en': `${baseUrl}`,
        'de': `${baseUrl}/de`,
        'fr': `${baseUrl}/fr`,
        'x-default': `${baseUrl}`,
      },
    },
    openGraph: {
      title: 'CBD-Isolat Großhandel | Pharmazeutische Qualität — Yunnan Vetrux',
      description: 'Pharmazeutisches CBD-Isolat ≥99,5% Reinheit, THC-frei. DDP-Lieferung nach Europa.',
      url: `${baseUrl}/de`,
      locale: 'de_DE',
      type: 'website',
    },
  };
}

export default function DeLandingPage() {
  return (
    <div className="bg-surface">
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1.5 bg-primary-fixed text-primary text-xs font-bold tracking-wider uppercase rounded-full mb-6">
                Großhandel
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-background tracking-tighter leading-[0.95] mb-6">
                CBD-Isolat
                <br />
                <span className="text-primary">Pharmazeutische Qualität</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                Yunnan Vetrux ist ein vertikal integrierter CBD-Isolat-Hersteller mit eigener
                Hanfanbaubasis, überkritischer CO₂-Extraktion und pharmazeutischer Qualitätskontrolle.
                Wir liefern ≥99,5% reines, THC-freies CBD-Isolat an B2B-Kunden in Europa — mit
                DDP-Lieferung direkt zu Ihrem Standort.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  '≥99,5% Reinheit — HPLC-verifiziert, chargenspezifisches Analysezertifikat',
                  'THC nicht nachweisbar — GC-MS bestätigt, EU-Novel-Food-konform',
                  'ISO 9001:2015, GMP & HACCP zertifizierte Herstellung',
                  'DDP-Lieferung nach Europa — 10–14 Werktage Lieferzeit',
                  'Flexible Verpackung: 1 kg, 5 kg, 25 kg vakuumversiegelte Folienbeutel',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <p className="text-xs text-on-surface-variant">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
                  Anfrage senden <ArrowRight size={16} />
                </Link>
                <Link href="/products/cbd-isolate" className="inline-flex items-center gap-2 px-6 py-4 border border-outline/30 text-on-surface text-xs font-bold tracking-widest uppercase rounded-md hover:bg-surface-container transition-colors duration-200">
                  Produktspezifikationen
                </Link>
              </div>
            </div>
            <div>
              <Image src="/images/products/product2.jpg" alt="CBD-Isolat pharmazeutische Qualität" width={800} height={500} priority sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-8">
            Warum europäische Käufer Vetrux wählen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Vertikale Integration', desc: 'Vom Saatgut bis zum Isolat — vollständige Rückverfolgbarkeit von unserer Yunnan-Anbaubasis über die Extraktion bis zur Verpackung.' },
              { title: 'Überkritische CO₂-Extraktion', desc: '6m³ Extraktionsgefäße für lösungsmittelfreie Verarbeitung im industriellen Maßstab. Keine Lösungsmittelrückstände.' },
              { title: 'Regulatorische Unterstützung', desc: 'Dokumentationspakete für EU-Novel-Food-Anträge, EFSA-Dossiers und marktspezifische Compliance.' },
              { title: 'Flexible Logistik', desc: 'FOB, CIF und DDP Versandbedingungen. Zollabwicklung und Importdokumentation für EU-Käufer.' },
              { title: 'Qualitätsdokumentation', desc: 'Chargenspezifische Analysezertifikate von ISO/IEC 17025-akkreditierten Laboren. Vollständiges Analysepanel.' },
              { title: 'Wettbewerbsfähige Preise', desc: 'Mengengestaffelte Preise von Mustermengen bis zu Tonnenverträgen. Quartalsweise Preisüberprüfung.' },
            ].map((item) => (
              <div key={item.title} className="bg-surface-container-lowest p-6">
                <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-2">{item.title}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
              Großhandelsanfrage stellen <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-on-surface-variant mt-4">
              Analysezertifikate, Zertifizierungskopien und Mustermengen für qualifizierte B2B-Käufer verfügbar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
