// src/content/pages/breadcrumb.content.ts
// Localized labels for the visible breadcrumb navigation.

import type { Locale } from '@/i18n/locales';

export interface BreadcrumbStrings {
  home: string;
  products: string;
  cbdIsolate: string;
  cbdOil: string;
  wholesaleCbdIsolate: string;
  process: string;
  cultivation: string;
  extraction: string;
  qualityAssurance: string;
  gallery: string;
  campus: string;
  plantingBase: string;
  extractionRefinement: string;
  productLaboratory: string;
  blog: string;
  about: string;
  company: string;
  manufacturerProfile: string;
  inquiry: string;
  equipment: string;
  ariaLabel: string;
}

export const breadcrumbStrings: Record<Locale, BreadcrumbStrings> = {
  en: {
    home: 'Home', products: 'Products', cbdIsolate: 'CBD Isolate', cbdOil: 'CBD Crude Oil', wholesaleCbdIsolate: 'Wholesale CBD Isolate',
    process: 'Process', cultivation: 'Cultivation', extraction: 'Extraction',
    qualityAssurance: 'Quality Assurance', gallery: 'Gallery', campus: 'Main Campus & Infrastructure',
    plantingBase: 'Planting Base & Cultivation', extractionRefinement: 'Extraction & Refinement',
    productLaboratory: 'Product & Laboratory', blog: 'Blog', about: 'About',
    company: 'Company', manufacturerProfile: 'Manufacturer Profile', inquiry: 'Inquiry',
    equipment: 'Equipment', ariaLabel: 'Breadcrumb',
  },
  de: {
    home: 'Startseite', products: 'Produkte', cbdIsolate: 'CBD-Isolat', cbdOil: 'CBD-Rohöl', wholesaleCbdIsolate: 'CBD-Isolat im Großhandel',
    process: 'Prozess', cultivation: 'Anbau', extraction: 'Extraktion',
    qualityAssurance: 'Qualitätssicherung', gallery: 'Galerie', campus: 'Hauptcampus & Infrastruktur',
    plantingBase: 'Anbaubasis & Kultivierung', extractionRefinement: 'Extraktion & Raffination',
    productLaboratory: 'Produkt & Labor', blog: 'Blog', about: 'Über uns',
    company: 'Unternehmen', manufacturerProfile: 'Herstellerprofil', inquiry: 'Kontakt',
    equipment: 'Anlagen', ariaLabel: 'Brotkrümelnavigation',
  },
  fr: {
    home: 'Accueil', products: 'Produits', cbdIsolate: 'Isolat de CBD', cbdOil: 'Huile brute de CBD', wholesaleCbdIsolate: 'Isolat de CBD en gros',
    process: 'Processus', cultivation: 'Culture', extraction: 'Extraction',
    qualityAssurance: 'Assurance qualité', gallery: 'Galerie', campus: 'Campus principal & Infrastructure',
    plantingBase: 'Base de culture & Cultivation', extractionRefinement: 'Extraction & Raffinage',
    productLaboratory: 'Produit & Laboratoire', blog: 'Blog', about: 'À propos',
    company: 'Entreprise', manufacturerProfile: "Profil du fabricant", inquiry: 'Contact',
    equipment: 'Équipement', ariaLabel: 'Fil d’Ariane',
  },
  es: {
    home: 'Inicio', products: 'Productos', cbdIsolate: 'Aislado de CBD', cbdOil: 'Aceite crudo de CBD', wholesaleCbdIsolate: 'Aislado de CBD al por mayor',
    process: 'Proceso', cultivation: 'Cultivo', extraction: 'Extracción',
    qualityAssurance: 'Garantía de calidad', gallery: 'Galería', campus: 'Campus Principal e Infraestructura',
    plantingBase: 'Base de Plantación y Cultivo', extractionRefinement: 'Extracción y Refinamiento',
    productLaboratory: 'Producto y Laboratorio', blog: 'Blog', about: 'Nosotros',
    company: 'Empresa', manufacturerProfile: 'Perfil del fabricante', inquiry: 'Consulta',
    equipment: 'Equipos', ariaLabel: 'Miga de pan',
  },
  it: {
    home: 'Home', products: 'Prodotti', cbdIsolate: 'Isolato di CBD', cbdOil: 'Olio grezzo di CBD', wholesaleCbdIsolate: 'Isolato di CBD all’ingrosso',
    process: 'Processo', cultivation: 'Coltivazione', extraction: 'Estrazione',
    qualityAssurance: 'Garanzia qualità', gallery: 'Galleria', campus: 'Campus Principale e Infrastruttura',
    plantingBase: 'Base di Coltivazione', extractionRefinement: 'Estrazione e Raffinazione',
    productLaboratory: 'Prodotto e Laboratorio', blog: 'Blog', about: 'Chi siamo',
    company: 'Azienda', manufacturerProfile: 'Profilo produttore', inquiry: 'Contatti',
    equipment: 'Attrezzature', ariaLabel: 'Breadcrumb',
  },
  pt: {
    home: 'Início', products: 'Produtos', cbdIsolate: 'Isolado de CBD', cbdOil: 'Óleo bruto de CBD', wholesaleCbdIsolate: 'Isolado de CBD no atacado',
    process: 'Processo', cultivation: 'Cultivo', extraction: 'Extração',
    qualityAssurance: 'Garantia de qualidade', gallery: 'Galeria', campus: 'Campus Principal e Infraestrutura',
    plantingBase: 'Base de Plantio e Cultivo', extractionRefinement: 'Extração e Refinamento',
    productLaboratory: 'Produto e Laboratório', blog: 'Blog', about: 'Sobre',
    company: 'Empresa', manufacturerProfile: 'Perfil do fabricante', inquiry: 'Contato',
    equipment: 'Equipamentos', ariaLabel: 'Trilha de navegação',
  },
  ja: {
    home: 'ホーム', products: '製品', cbdIsolate: 'CBDアイソレート', cbdOil: 'CBD原油', wholesaleCbdIsolate: 'CBDアイソレート卸売',
    process: 'プロセス', cultivation: '栽培', extraction: '抽出',
    qualityAssurance: '品質保証', gallery: 'ギャラリー', campus: 'メインキャンパス・インフラ',
    plantingBase: '栽培基地', extractionRefinement: '抽出・精製',
    productLaboratory: '製品・ラボ', blog: 'ブログ', about: '会社情報',
    company: '会社概要', manufacturerProfile: 'メーカープロフィール', inquiry: 'お問い合わせ',
    equipment: '設備', ariaLabel: 'パンくずリスト',
  },
  fi: {
    home: 'Etusivu', products: 'Tuotteet', cbdIsolate: 'CBD-isolaatti', cbdOil: 'CBD-raakaöljy', wholesaleCbdIsolate: 'CBD-isolaatti tukkumyynti',
    process: 'Prosessi', cultivation: 'Viljely', extraction: 'Uutto',
    qualityAssurance: 'Laadunvarmistus', gallery: 'Galleria', campus: 'Pääkampus ja infrastruktuuri',
    plantingBase: 'Viljelyalue ja kasvatus', extractionRefinement: 'Uutto ja jalostus',
    productLaboratory: 'Tuote ja laboratorio', blog: 'Blogi', about: 'Meistä',
    company: 'Yritys', manufacturerProfile: 'Valmistajan profiili', inquiry: 'Yhteydenotto',
    equipment: 'Laitteet', ariaLabel: 'Murupolku',
  },
};
