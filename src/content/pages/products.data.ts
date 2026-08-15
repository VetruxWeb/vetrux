// src/content/pages/products.data.ts
// Repository-local source of truth for the two canonical public products.
//
// Reconstructed from the previously live Supabase records (see the archived
// seed scripts) so the public URLs, translations, variants, quantity tiers,
// specs and image galleries are preserved without any database dependency.
//
//   /products/cbd-isolate — rich 8-locale content merged from the
//                            repository-local product.content.ts copy
//   /products/cbd-oil     — full-spectrum crude oil, 8 locales
//
// Concentrations (92/95/99.96% for isolate; 40–80% for oil) are expressed as
// selectable variants, keeping the two canonical high-level product pages.

import type { Locale } from '@/i18n/locales';
import { productPageStrings, type ProductPageStrings } from '@/content/pages/product.content';

export interface ProductSpec {
  /** Stable identifier (locale-independent) used by the UI for special handling. */
  key: string;
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  label: string;
}

export interface ProductDetail {
  slug: string;
  category: 'Isolate' | 'Oil';
  heroImage: string;
  images: string[];
  moq: string;
  order: number;
  name: string;
  badge: string | null;
  description: string;
  specs: ProductSpec[];
  variants: ProductVariant[];
  quantityTiers: ProductVariant[];
  /** Rich page copy (isolate only). */
  pageContent: ProductPageStrings | null;
}

export interface ProductListItem {
  slug: string;
  heroImage: string;
  category: string;
  moq: string;
  order: number;
  name: string;
  badge: string | null;
  description: string;
}

// ── Spec label translations ──────────────────────────────────────────────────

const specLabelTranslations: Record<string, Record<Exclude<Locale, 'en'>, string>> = {
  'Product Name': {
    de: 'Produktname', fr: 'Nom du produit', es: 'Nombre del producto',
    it: 'Nome del prodotto', pt: 'Nome do produto', ja: '製品名', fi: 'Tuotteen nimi',
  },
  'CBD Content': {
    de: 'CBD-Gehalt', fr: 'Teneur en CBD', es: 'Contenido de CBD',
    it: 'Contenuto di CBD', pt: 'Teor de CBD', ja: 'CBD含有量', fi: 'CBD-pitoisuus',
  },
  'THC Content': {
    de: 'THC-Gehalt', fr: 'Teneur en THC', es: 'Contenido de THC',
    it: 'Contenuto di THC', pt: 'Teor de THC', ja: 'THC含有量', fi: 'THC-pitoisuus',
  },
  'CAS Number': {
    de: 'CAS-Nummer', fr: 'N° CAS', es: 'Número CAS', it: 'Numero CAS',
    pt: 'Número CAS', ja: 'CAS番号', fi: 'CAS-numero',
  },
  'Molecular Formula': {
    de: 'Summenformel', fr: 'Formule moléculaire', es: 'Fórmula molecular',
    it: 'Formula molecolare', pt: 'Fórmula molecular', ja: '分子式', fi: 'Molekyylikaava',
  },
  'Molecular Weight': {
    de: 'Molekulargewicht', fr: 'Masse moléculaire', es: 'Peso molecular',
    it: 'Peso molecolare', pt: 'Peso molecular', ja: '分子量', fi: 'Molekyylipaino',
  },
  Packaging: {
    de: 'Verpackung', fr: 'Emballage', es: 'Embalaje',
    it: 'Confezionamento', pt: 'Embalagem', ja: '包装', fi: 'Pakkaus',
  },
  Storage: {
    de: 'Lagerung', fr: 'Stockage', es: 'Almacenamiento',
    it: 'Conservazione', pt: 'Armazenamento', ja: '保管', fi: 'Säilytys',
  },
  'Shelf Life': {
    de: 'Haltbarkeit', fr: 'Durée de conservation', es: 'Vida útil',
    it: 'Durata di conservazione', pt: 'Prazo de validade', ja: '保存期間', fi: 'Säilyvyys',
  },
  'HS Code': {
    de: 'HS-Code', fr: 'Code SH', es: 'Código HS', it: 'Codice HS',
    pt: 'Código HS', ja: 'HSコード', fi: 'HS-koodi',
  },
  'Extraction Method': {
    de: 'Extraktionsverfahren', fr: "Méthode d'extraction", es: 'Método de extracción',
    it: 'Metodo di estrazione', pt: 'Método de extração', ja: '抽出方法', fi: 'Uuttomenetelmä',
  },
  'Source Material': {
    de: 'Ausgangsmaterial', fr: 'Matière source', es: 'Material de origen',
    it: 'Materiale di partenza', pt: 'Material de origem', ja: '原料', fi: 'Raaka-aine',
  },
  Appearance: {
    de: 'Aussehen', fr: 'Apparence', es: 'Apariencia',
    it: 'Aspetto', pt: 'Aparência', ja: '外観', fi: 'Ulkonäkö',
  },
  'Standard Specification': {
    de: 'Standardspezifikation', fr: 'Spécification standard', es: 'Especificación estándar',
    it: 'Specifica standard', pt: 'Especificação padrão', ja: '標準仕様', fi: 'Vakiospesifikaatio',
  },
  'Quality Review': {
    de: 'Qualitätsprüfung', fr: 'Contrôle qualité', es: 'Revisión de calidad',
    it: 'Controllo qualità', pt: 'Revisão de qualidade', ja: '品質レビュー', fi: 'Laaduntarkastus',
  },
  'Packaging (Inner)': {
    de: 'Innenverpackung', fr: 'Emballage intérieur', es: 'Embalaje interior',
    it: 'Confezionamento interno', pt: 'Embalagem interna', ja: '内包装', fi: 'Sisäpakkaus',
  },
  'Packaging (Outer)': {
    de: 'Außenverpackung', fr: 'Emballage extérieur', es: 'Embalaje exterior',
    it: 'Confezionamento esterno', pt: 'Embalagem externa', ja: '外包装', fi: 'Ulkopakkaus',
  },
  Palletization: {
    de: 'Palettierung', fr: 'Palettisation', es: 'Paletización',
    it: 'Palletizzazione', pt: 'Paletização', ja: 'パレタイズ', fi: 'Lavaus',
  },
};

function localizeLabel(label: string, locale: Locale): string {
  if (locale === 'en') return label;
  return specLabelTranslations[label]?.[locale] ?? label;
}

function localizeValue(label: string, value: string, locale: Locale): string {
  if (locale === 'en') return value;

  const map: Record<string, Record<Exclude<Locale, 'en'>, string>> = {
    'White crystalline powder': {
      de: 'Weißes kristallines Pulver', fr: 'Poudre cristalline blanche', es: 'Polvo cristalino blanco',
      it: 'Polvere cristallina bianca', pt: 'Pó cristalino branco', ja: '白色結晶性粉末', fi: 'Valkoinen kiteinen jauhe',
    },
    'Dark brown to black viscous oil': {
      de: 'Dunkelbraunes bis schwarzes viskoses Öl', fr: 'Huile visqueuse brun foncé à noire',
      es: 'Aceite viscoso de color marrón oscuro a negro', it: 'Olio viscoso dal marrone scuro al nero',
      pt: 'Óleo viscoso de marrom-escuro a preto', ja: '暗褐色〜黒色の粘性オイル', fi: 'Tummanruskea tai musta viskoosi öljy',
    },
    'Ethanol extraction': {
      de: 'Ethanol-Extraktion', fr: "Extraction à l'éthanol", es: 'Extracción con etanol',
      it: 'Estrazione con etanolo', pt: 'Extração com etanol', ja: 'エタノール抽出', fi: 'Etanoliuutto',
    },
    'Yunma-13 industrial hemp': {
      de: 'Yunma-13 Industriehanf', fr: 'Chanvre industriel Yunma-13', es: 'Cáñamo industrial Yunma-13',
      it: 'Canapa industriale Yunma-13', pt: 'Cânhamo industrial Yunma-13', ja: 'Yunma-13産業用ヘンプ', fi: 'Yunma-13 teollinen hamppu',
    },
    'Steel drum (25 kg / 50 kg)': {
      de: 'Stahlfass (25 kg / 50 kg)', fr: 'Fût en acier (25 kg / 50 kg)', es: 'Tambor de acero (25 kg / 50 kg)',
      it: 'Fusto in acciaio (25 kg / 50 kg)', pt: 'Tambor de aço (25 kg / 50 kg)', ja: 'スチールドラム（25 kg / 50 kg）', fi: 'Teräskontti (25 kg / 50 kg)',
    },
    'Cool, dry place, away from light': {
      de: 'Kühl und trocken lagern, vor Licht schützen', fr: "Endroit frais et sec, à l'abri de la lumière",
      es: 'Lugar fresco y seco, protegido de la luz', it: 'Luogo fresco e asciutto, al riparo dalla luce',
      pt: 'Local fresco e seco, ao abrigo da luz', ja: '涼しく乾燥した場所、光を避けて保管', fi: 'Viileä ja kuiva paikka, suojassa valolta',
    },
    '5 kg/bag (PE inner + aluminum foil outer)': {
      de: '5 kg/Beutel (PE-Innen + Aluminiumfolie außen)', fr: '5 kg/sachet (PE intérieur + aluminium extérieur)',
      es: '5 kg/bolsa (PE interior + lámina de aluminio exterior)', it: '5 kg/sacco (PE interno + foglio di alluminio esterno)',
      pt: '5 kg/saco (PE interno + folha de alumínio externa)', ja: '5 kg/袋（PE内袋＋アルミ箔外袋）', fi: '5 kg/pussi (PE-sisä + alumiinifolio ulkopuolella)',
    },
    '40%–80%': {
      de: '40–80 %', fr: '40–80 %', es: '40–80 %', it: '40–80 %', pt: '40–80 %', ja: '40–80%', fi: '40–80 %',
    },
  };

  return map[value]?.[locale] ?? value;
}

/** Keep the numeric/universal values (percentages, formulas, codes) as-is. */
const UNIVERSAL_SPEC_KEYS = new Set(['cas', 'formula', 'weight', 'hs-code', 'thc', 'cbd', 'shelf-life']);

// Long isolate spec values, translated per locale.
const isolateLongValues: Record<
  'cbd-reference' | 'thc-verification' | 'quality-review',
  Record<Locale, string>
> = {
  'cbd-reference': {
    en: '99%+ reference value; final value should be confirmed by batch-specific COA',
    de: '99 %+ Referenzwert; Endwert anhand des chargenspezifischen COA bestätigen',
    fr: 'Valeur de référence 99 %+ ; valeur finale à confirmer par le COA du lot',
    es: 'Valor de referencia 99%+; el valor final debe confirmarse con el COA del lote',
    it: 'Valore di riferimento 99%+; il valore finale va confermato con il COA del lotto',
    pt: 'Valor de referência 99%+; o valor final deve ser confirmado pelo COA do lote',
    ja: '参考値99%+。最終値はバッチ別COAで確認してください',
    fi: 'Viitearvo 99 %+; lopullinen arvo vahvistetaan eräkohtaisesta COA:sta',
  },
  'thc-verification': {
    en: '<0.05%; batch-specific verification applies',
    de: '<0,05 %; chargenspezifische Verifizierung erforderlich',
    fr: '<0,05 % ; vérification par lot applicable',
    es: '<0,05 %; se aplica verificación específica del lote',
    it: '<0,05 %; si applica la verifica specifica del lotto',
    pt: '<0,05 %; aplica-se verificação específica do lote',
    ja: '<0.05%。バッチ別の検証が適用されます',
    fi: '<0,05 %; eräkohtainen todentaminen sovelletaan',
  },
  'quality-review': {
    en: 'In-house HPLC analytical capability; batch-specific documentation depends on actual batch, order terms, and verification results',
    de: 'Interne HPLC-Analytik; chargenspezifische Dokumentation abhängig von Charge, Bestellbedingungen und Verifizierungsergebnissen',
    fr: 'Capacité analytique HPLC interne ; documentation par lot selon le lot réel, les conditions de commande et les résultats de vérification',
    es: 'Capacidad analítica HPLC interna; la documentación por lote depende del lote real, las condiciones del pedido y los resultados de verificación',
    it: "Capacità analitica HPLC interna; documentazione per lotto in base al lotto reale, alle condizioni dell'ordine e ai risultati di verifica",
    pt: 'Capacidade analítica HPLC interna; documentação por lote depende do lote real, das condições do pedido e dos resultados de verificação',
    ja: '自社HPLC分析能力。バッチ別ドキュメントは実際のバッチ、注文条件、検証結果により異なります',
    fi: 'Sisäinen HPLC-analytiikka; eräkohtainen dokumentaatio riippuu todellisesta erästä, tilausehdoista ja todennustuloksista',
  },
};

function buildSpecs(
  entries: { key: string; label: string; value: string }[],
  locale: Locale,
): ProductSpec[] {
  return entries.map(({ key, label, value }) => ({
    key,
    label: localizeLabel(label, locale),
    value: UNIVERSAL_SPEC_KEYS.has(key) ? value : localizeValue(label, value, locale),
  }));
}

// ── Product records ──────────────────────────────────────────────────────────

const isolateBaseSpecs = [
  { key: 'appearance', label: 'Appearance', value: 'White crystalline powder' },
  { key: 'cas', label: 'CAS Number', value: '13956-29-1' },
  { key: 'formula', label: 'Molecular Formula', value: 'C₂₁H₃₀O₂' },
  { key: 'weight', label: 'Molecular Weight', value: '314.46 g/mol' },
  { key: 'thc', label: 'THC Content', value: '< 0.05%' },
  { key: 'packaging', label: 'Packaging', value: '5 kg/bag (PE inner + aluminum foil outer)' },
  { key: 'storage', label: 'Storage', value: 'Cool, dry place, away from light' },
  { key: 'shelf-life', label: 'Shelf Life', value: '24 months' },
  { key: 'hs-code', label: 'HS Code', value: '2907299020' },
];

const oilBaseSpecs = [
  { key: 'appearance', label: 'Appearance', value: 'Dark brown to black viscous oil' },
  { key: 'cbd', label: 'CBD Content', value: '40%–80%' },
  { key: 'thc', label: 'THC Content', value: '< 0.3%' },
  { key: 'extraction-method', label: 'Extraction Method', value: 'Ethanol extraction' },
  { key: 'source-material', label: 'Source Material', value: 'Yunma-13 industrial hemp' },
  { key: 'packaging', label: 'Packaging', value: 'Steel drum (25 kg / 50 kg)' },
  { key: 'storage', label: 'Storage', value: 'Cool, dry place, away from light' },
  { key: 'shelf-life', label: 'Shelf Life', value: '18 months' },
];

const quantityTiers: ProductVariant[] = [
  { id: 'tier-100', label: '≥ 100 Kg' },
  { id: 'tier-500', label: '≥ 500 Kg' },
  { id: 'tier-1000', label: '≥ 1,000 Kg' },
  { id: 'tier-3000', label: '≥ 3,000 Kg' },
];

const oilName: Record<Locale, string> = {
  en: 'CBD Crude Oil',
  de: 'CBD-Rohöl',
  fr: 'Huile brute de CBD',
  es: 'Aceite crudo de CBD',
  it: 'Olio grezzo di CBD',
  pt: 'Óleo bruto de CBD',
  ja: 'CBD原油',
  fi: 'CBD-raakaöljy',
};

const oilBadge: Record<Locale, string> = {
  en: 'CBD Oil',
  de: 'CBD-Öl',
  fr: 'Huile de CBD',
  es: 'Aceite de CBD',
  it: 'Olio di CBD',
  pt: 'Óleo de CBD',
  ja: 'CBDオイル',
  fi: 'CBD-öljy',
};

const oilDescription: Record<Locale, string> = {
  en: 'Full-spectrum CBD crude oil extracted from Yunma-13 industrial hemp. Available in multiple CBD concentration grades from 40% to 80%. Suitable for further refinement, product formulation, and wholesale distribution.',
  de: 'Vollspektrum-CBD-Rohöl, gewonnen aus Yunma-13 Industriehanf. Erhältlich in mehreren CBD-Konzentrationsstufen von 40 % bis 80 %. Geeignet für weitere Raffination, Produktformulierung und Großhandelsvertrieb.',
  fr: "Huile brute de CBD à spectre complet extraite du chanvre industriel Yunma-13. Disponible en plusieurs grades de concentration de CBD, de 40 % à 80 %. Convient au raffinage, à la formulation de produits et à la distribution en gros.",
  es: 'Aceite crudo de CBD de espectro completo extraído de cáñamo industrial Yunma-13. Disponible en varios grados de concentración de CBD, del 40 % al 80 %. Adecuado para refinamiento adicional, formulación de productos y distribución al por mayor.',
  it: "Olio grezzo di CBD a spettro completo estratto da canapa industriale Yunma-13. Disponibile in più gradi di concentrazione di CBD dal 40% all'80%. Adatto a ulteriore raffinazione, formulazione di prodotti e distribuzione all'ingrosso.",
  pt: 'Óleo bruto de CBD de espectro completo extraído de cânhamo industrial Yunma-13. Disponível em vários graus de concentração de CBD, de 40% a 80%. Adequado para refino adicional, formulação de produtos e distribuição no atacado.',
  ja: 'Yunma-13産業用ヘンプから抽出されたフルスペクトラムCBD原油。CBD濃度40%〜80%の複数グレードに対応。さらなる精製、製品処方、卸売流通に適しています。',
  fi: 'Täyden spektrin CBD-raakaöljy, joka on uutettu Yunma-13 teollisesta hampusta. Saatavana useissa CBD-pitoisuuslaaduissa 40–80 %. Soveltuu jatkojalostukseen, tuoteformulointiin ja tukkujakeluun.',
};

const isolateName: Record<Locale, string> = {
  en: 'CBD Isolate',
  de: 'CBD-Isolat',
  fr: 'Isolat de CBD',
  es: 'Aislado de CBD',
  it: 'Isolato di CBD',
  pt: 'Isolado de CBD',
  ja: 'CBDアイソレート',
  fi: 'CBD-isolaatti',
};

const isolateDescription: Record<Locale, string> = {
  en: 'Crystalline CBD powder with purity ranging from 92% to 99.96%. Manufactured from Yunma-13 industrial hemp cultivated in Yunnan, China. Ideal for pharmaceutical formulation, cosmetic manufacturing, and research applications.',
  de: 'Kristallines CBD-Pulver mit einer Reinheit von 92 % bis 99,96 %. Hergestellt aus Yunma-13 Industriehanf aus Yunnan, China. Ideal für pharmazeutische Formulierungen, Kosmetikherstellung und Forschungsanwendungen.',
  fr: "Poudre cristalline de CBD d'une pureté allant de 92 % à 99,96 %. Fabriquée à partir de chanvre industriel Yunma-13 cultivé dans le Yunnan, en Chine. Idéale pour la formulation pharmaceutique, la fabrication cosmétique et les applications de recherche.",
  es: 'Polvo cristalino de CBD con una pureza que va del 92 % al 99,96 %. Fabricado a partir de cáñamo industrial Yunma-13 cultivado en Yunnan, China. Ideal para formulación farmacéutica, fabricación cosmética y aplicaciones de investigación.',
  it: "Polvere cristallina di CBD con purezza dal 92% al 99,96%. Prodotta da canapa industriale Yunma-13 coltivata nello Yunnan, in Cina. Ideale per formulazioni farmaceutiche, produzione cosmetica e applicazioni di ricerca.",
  pt: 'Pó cristalino de CBD com pureza que varia de 92% a 99,96%. Fabricado a partir de cânhamo industrial Yunma-13 cultivado em Yunnan, China. Ideal para formulação farmacêutica, fabricação de cosméticos e aplicações de pesquisa.',
  ja: '純度92%〜99.96%の結晶性CBDパウダー。中国・雲南省で栽培されたYunma-13産業用ヘンプから製造。医薬品処方、化粧品製造、研究用途に最適です。',
  fi: 'Kiteistä CBD-jauhetta, jonka puhtaus on 92–99,96 %. Valmistettu Yunnanissa, Kiinassa viljellystä Yunma-13 teollisesta hampusta. Ihanteellinen lääkeformulointiin, kosmetiikan valmistukseen ja tutkimuskäyttöön.',
};

const isolateVariants: ProductVariant[] = [
  { id: 'purity-92', label: '92%' },
  { id: 'purity-95', label: '95%' },
  { id: 'purity-9996', label: '99.96%' },
];

const oilVariants: ProductVariant[] = [
  { id: 'conc-40', label: '40%' },
  { id: 'conc-50', label: '50%' },
  { id: 'conc-60', label: '60%' },
  { id: 'conc-70', label: '70%' },
  { id: 'conc-80', label: '80%' },
];

function buildProductDetail(
  slug: 'cbd-isolate' | 'cbd-oil',
  locale: Locale,
): ProductDetail {
  if (slug === 'cbd-isolate') {
    const rich = productPageStrings[locale];
    return {
      slug,
      category: 'Isolate',
      heroImage: '/images/vetrux_images/isolate-crystals.png',
      images: [
        '/images/vetrux_images/cbd-isolate-crystals-white-powder.jpg',
        '/images/vetrux_images/bulk-cbd-isolate-crystal-powder-closeup.jpg',
      ],
      moq: '100 kg',
      order: 0,
      name: isolateName[locale],
      badge: rich.badge,
      description: isolateDescription[locale],
      specs: [
        { key: 'name', label: localizeLabel('Product Name', locale), value: isolateName[locale] },
        { key: 'cbd', label: localizeLabel('CBD Content', locale), value: isolateLongValues['cbd-reference'][locale] },
        { key: 'thc', label: localizeLabel('THC Content', locale), value: isolateLongValues['thc-verification'][locale] },
        ...buildSpecs(isolateBaseSpecs, locale),
        { key: 'quality-review', label: localizeLabel('Quality Review', locale), value: isolateLongValues['quality-review'][locale] },
      ],
      variants: isolateVariants,
      quantityTiers,
      pageContent: rich,
    };
  }

  return {
    slug,
    category: 'Oil',
    heroImage: '/images/vetrux_images/cbd-oil-60.png',
    images: ['/images/vetrux_images/cbd-oil-60.png', '/images/vetrux_images/cbd-oil-50.png'],
    moq: '100 kg',
    order: 1,
    name: oilName[locale],
    badge: oilBadge[locale],
    description: oilDescription[locale],
    specs: buildSpecs(oilBaseSpecs, locale),
    variants: oilVariants,
    quantityTiers,
    pageContent: null,
  };
}

const productSlugs = ['cbd-isolate', 'cbd-oil'] as const;
export type ProductSlug = (typeof productSlugs)[number];

export function getProductSlugs(): ProductSlug[] {
  return [...productSlugs];
}

export function getProductBySlug(slug: string, locale: Locale): ProductDetail | null {
  if (slug !== 'cbd-isolate' && slug !== 'cbd-oil') return null;
  return buildProductDetail(slug, locale);
}

export function getProducts(locale: Locale): ProductListItem[] {
  return productSlugs.map((slug) => {
    const detail = buildProductDetail(slug, locale);
    return {
      slug: detail.slug,
      heroImage: detail.heroImage,
      category: detail.category,
      moq: detail.moq,
      order: detail.order,
      name: detail.name,
      badge: detail.badge,
      description: detail.description,
    };
  });
}
