import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  return {
    title: 'Isolat de CBD en Gros | Qualité Pharmaceutique ≥99,5% — Yunnan Vetrux',
    description:
      'Yunnan Vetrux est un fabricant de CBD isolat verticalement intégré en Chine. Qualité pharmaceutique ≥99,5% de pureté, sans THC. Prix de gros avec livraison DDP en Europe. Certifié ISO 9001, GMP, HACCP.',
    keywords:
      'isolat CBD gros, acheter isolat CBD, fabricant isolat CBD, isolat CBD pharmaceutique, isolat CBD sans THC, isolat CBD Europe, fournisseur isolat CBD',
    alternates: {
      canonical: `${baseUrl}/fr`,
      languages: {
        'en': `${baseUrl}`,
        'de': `${baseUrl}/de`,
        'fr': `${baseUrl}/fr`,
        'x-default': `${baseUrl}`,
      },
    },
    openGraph: {
      title: 'Isolat de CBD en Gros | Qualité Pharmaceutique — Yunnan Vetrux',
      description: 'Isolat de CBD pharmaceutique ≥99,5% de pureté, sans THC. Livraison DDP en Europe.',
      url: `${baseUrl}/fr`,
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

export default function FrLandingPage() {
  return (
    <div className="bg-surface">
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1.5 bg-primary-fixed text-primary text-xs font-bold tracking-wider uppercase rounded-full mb-6">
                Vente en Gros
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-background tracking-tighter leading-[0.95] mb-6">
                Isolat de CBD
                <br />
                <span className="text-primary">Qualité Pharmaceutique</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                Yunnan Vetrux est un fabricant d'isolat de CBD verticalement intégré — de la culture
                du chanvre à l'extraction au CO₂ supercritique et au contrôle qualité pharmaceutique.
                Nous fournissons de l'isolat de CBD ≥99,5% de pureté, sans THC, aux acheteurs B2B
                en Europe — avec livraison DDP directement à votre site.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  '≥99,5% de pureté — vérifié par HPLC, certificat d\'analyse par lot',
                  'THC non détecté — confirmé par GC-MS, conforme EU Novel Food',
                  'Fabrication certifiée ISO 9001:2015, GMP & HACCP',
                  'Livraison DDP en Europe — délai de 10–14 jours ouvrables',
                  'Conditionnement flexible : sachets sous vide 1 kg, 5 kg, 25 kg',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <p className="text-xs text-on-surface-variant">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
                  Envoyer une demande <ArrowRight size={16} />
                </Link>
                <Link href="/products/cbd-isolate" className="inline-flex items-center gap-2 px-6 py-4 border border-outline/30 text-on-surface text-xs font-bold tracking-widest uppercase rounded-md hover:bg-surface-container transition-colors duration-200">
                  Spécifications produit
                </Link>
              </div>
            </div>
            <div>
              <Image src="/images/products/product2.jpg" alt="Isolat de CBD qualité pharmaceutique" width={800} height={500} priority sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-8">
            Pourquoi les acheteurs européens choisissent Vetrux
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Intégration Verticale', desc: 'De la graine à l\'isolat — traçabilité complète de notre base de culture au Yunnan jusqu\'à l\'extraction et l\'emballage.' },
              { title: 'Extraction CO₂ Supercritique', desc: 'Cuves d\'extraction de 6m³ pour un traitement sans solvant à l\'échelle industrielle. Aucun résidu de solvant.' },
              { title: 'Support Réglementaire', desc: 'Dossiers de documentation pour les demandes EU Novel Food, dossiers EFSA et conformité spécifique au marché.' },
              { title: 'Logistique Flexible', desc: 'Conditions d\'expédition FOB, CIF et DDP. Dédouanement et documentation d\'importation pour les acheteurs UE.' },
              { title: 'Documentation Qualité', desc: 'Certificats d\'analyse par lot de laboratoires accrédités ISO/IEC 17025. Panel analytique complet.' },
              { title: 'Prix Compétitifs', desc: 'Tarification par paliers de volume, des échantillons aux contrats à la tonne. Révision trimestrielle des prix.' },
            ].map((item) => (
              <div key={item.title} className="bg-surface-container-lowest p-6">
                <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-2">{item.title}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300">
              Demander un devis en gros <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-on-surface-variant mt-4">
              Certificats d'analyse, copies de certifications et échantillons disponibles pour les acheteurs B2B qualifiés.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
