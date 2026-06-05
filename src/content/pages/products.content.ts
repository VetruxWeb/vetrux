import type { Locale } from '@/i18n/locales';

export interface ProductsPageStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewDetails: string;
}

export const productsPageStrings: Record<Locale, ProductsPageStrings> = {
  en: {
    eyebrow: 'Our Products',
    title: 'CBD Raw Materials for B2B Supply',
    subtitle: 'High-purity CBD products manufactured in our Chuxiong facility with full traceability and export-ready documentation.',
    viewDetails: 'View Details',
  },
  de: {
    eyebrow: 'Unsere Produkte',
    title: 'CBD-Rohstoffe für den B2B-Vertrieb',
    subtitle: 'Hochreine CBD-Produkte aus unserer Produktionsstätte in Chuxiong mit vollständiger Rückverfolgbarkeit und exportfertiger Dokumentation.',
    viewDetails: 'Details anzeigen',
  },
  fr: {
    eyebrow: 'Nos produits',
    title: "Matières premières CBD pour la fourniture B2B",
    subtitle: "Produits CBD de haute pureté fabriqués dans notre usine de Chuxiong avec traçabilité complète et documentation prête à l'export.",
    viewDetails: 'Voir les détails',
  },
  es: {
    eyebrow: 'Nuestros productos',
    title: 'Materias primas de CBD para suministro B2B',
    subtitle: 'Productos de CBD de alta pureza fabricados en nuestra planta de Chuxiong con trazabilidad completa y documentación lista para exportación.',
    viewDetails: 'Ver detalles',
  },
  it: {
    eyebrow: 'I nostri prodotti',
    title: 'Materie prime CBD per fornitura B2B',
    subtitle: "Prodotti CBD ad alta purezza fabbricati nel nostro stabilimento di Chuxiong con tracciabilità completa e documentazione pronta per l'esportazione.",
    viewDetails: 'Vedi dettagli',
  },
  pt: {
    eyebrow: 'Nossos produtos',
    title: 'Matérias-primas de CBD para fornecimento B2B',
    subtitle: 'Produtos de CBD de alta pureza fabricados em nossa unidade de Chuxiong com rastreabilidade completa e documentação pronta para exportação.',
    viewDetails: 'Ver detalhes',
  },
  ja: {
    eyebrow: '製品一覧',
    title: 'B2B供給向けCBD原料',
    subtitle: '楚雄工場で製造された高純度CBD製品。完全なトレーサビリティと輸出対応書類を備えています。',
    viewDetails: '詳細を見る',
  },
  fi: {
    eyebrow: 'Tuotteemme',
    title: 'CBD-raaka-aineet B2B-toimitukseen',
    subtitle: 'Chuxiongin tehtaallamme valmistetut korkean puhtauden CBD-tuotteet täydellä jäljitettävyydellä ja vientivalmiilla dokumentaatiolla.',
    viewDetails: 'Näytä tiedot',
  },
};
