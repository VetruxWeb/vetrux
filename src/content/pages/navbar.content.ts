import type { Locale } from '@/i18n/locales';

export interface NavbarStrings {
  home: string;
  products: string;
  productsChildren: {
    allProducts: string;
    cbdIsolate: string;
    cbdCrudeOil: string;
  };
  process: string;
  processChildren: {
    seedToIsolate: string;
    cultivation: string;
    extraction: string;
    qualityAssurance: string;
  };
  gallery: string;
  blog: string;
  about: string;
  aboutChildren: {
    company: string;
    manufacturer: string;
  };
  contactUs: string;
  language: string;
}

export const navbarStrings: Record<Locale, NavbarStrings> = {
  en: {
    home: 'Home', products: 'Products',
    productsChildren: { allProducts: 'All Products', cbdIsolate: 'CBD Isolate', cbdCrudeOil: 'CBD Crude Oil' },
    process: 'Process',
    processChildren: { seedToIsolate: 'From Seed to Isolate', cultivation: 'Cultivation', extraction: 'Extraction', qualityAssurance: 'Quality Assurance' },
    gallery: 'Gallery', blog: 'Blog', about: 'About',
    aboutChildren: { company: 'Company', manufacturer: 'Manufacturer Profile' },
    contactUs: 'Contact Us', language: 'Language',
  },
  de: {
    home: 'Startseite', products: 'Produkte',
    productsChildren: { allProducts: 'Alle Produkte', cbdIsolate: 'CBD-Isolat', cbdCrudeOil: 'CBD-Rohöl' },
    process: 'Prozess',
    processChildren: { seedToIsolate: 'Vom Saatgut zum Isolat', cultivation: 'Anbau', extraction: 'Extraktion', qualityAssurance: 'Qualitätssicherung' },
    gallery: 'Galerie', blog: 'Blog', about: 'Über uns',
    aboutChildren: { company: 'Unternehmen', manufacturer: 'Herstellerprofil' },
    contactUs: 'Kontakt', language: 'Sprache',
  },
  fr: {
    home: 'Accueil', products: 'Produits',
    productsChildren: { allProducts: 'Tous les produits', cbdIsolate: 'Isolat de CBD', cbdCrudeOil: 'Huile brute de CBD' },
    process: 'Processus',
    processChildren: { seedToIsolate: "De la graine à l'isolat", cultivation: 'Culture', extraction: 'Extraction', qualityAssurance: 'Assurance qualité' },
    gallery: 'Galerie', blog: 'Blog', about: 'À propos',
    aboutChildren: { company: 'Entreprise', manufacturer: "Profil du fabricant" },
    contactUs: 'Contactez-nous', language: 'Langue',
  },
  es: {
    home: 'Inicio', products: 'Productos',
    productsChildren: { allProducts: 'Todos los productos', cbdIsolate: 'Aislado de CBD', cbdCrudeOil: 'Aceite crudo de CBD' },
    process: 'Proceso',
    processChildren: { seedToIsolate: 'De la semilla al aislado', cultivation: 'Cultivo', extraction: 'Extracción', qualityAssurance: 'Garantía de calidad' },
    gallery: 'Galería', blog: 'Blog', about: 'Nosotros',
    aboutChildren: { company: 'Empresa', manufacturer: 'Perfil del fabricante' },
    contactUs: 'Contáctenos', language: 'Idioma',
  },
  it: {
    home: 'Home', products: 'Prodotti',
    productsChildren: { allProducts: 'Tutti i prodotti', cbdIsolate: 'Isolato di CBD', cbdCrudeOil: 'Olio grezzo di CBD' },
    process: 'Processo',
    processChildren: { seedToIsolate: "Dal seme all'isolato", cultivation: 'Coltivazione', extraction: 'Estrazione', qualityAssurance: 'Garanzia qualità' },
    gallery: 'Galleria', blog: 'Blog', about: 'Chi siamo',
    aboutChildren: { company: 'Azienda', manufacturer: 'Profilo produttore' },
    contactUs: 'Contattaci', language: 'Lingua',
  },
  pt: {
    home: 'Início', products: 'Produtos',
    productsChildren: { allProducts: 'Todos os produtos', cbdIsolate: 'Isolado de CBD', cbdCrudeOil: 'Óleo bruto de CBD' },
    process: 'Processo',
    processChildren: { seedToIsolate: 'Da semente ao isolado', cultivation: 'Cultivo', extraction: 'Extração', qualityAssurance: 'Garantia de qualidade' },
    gallery: 'Galeria', blog: 'Blog', about: 'Sobre',
    aboutChildren: { company: 'Empresa', manufacturer: 'Perfil do fabricante' },
    contactUs: 'Fale conosco', language: 'Idioma',
  },
  ja: {
    home: 'ホーム', products: '製品',
    productsChildren: { allProducts: 'すべての製品', cbdIsolate: 'CBDアイソレート', cbdCrudeOil: 'CBD原油' },
    process: 'プロセス',
    processChildren: { seedToIsolate: '種子からアイソレートへ', cultivation: '栽培', extraction: '抽出', qualityAssurance: '品質保証' },
    gallery: 'ギャラリー', blog: 'ブログ', about: '会社情報',
    aboutChildren: { company: '会社概要', manufacturer: 'メーカープロフィール' },
    contactUs: 'お問い合わせ', language: '言語',
  },
  fi: {
    home: 'Etusivu', products: 'Tuotteet',
    productsChildren: { allProducts: 'Kaikki tuotteet', cbdIsolate: 'CBD-isolaatti', cbdCrudeOil: 'CBD-raakaöljy' },
    process: 'Prosessi',
    processChildren: { seedToIsolate: 'Siemenestä isolaattiin', cultivation: 'Viljely', extraction: 'Uutto', qualityAssurance: 'Laadunvarmistus' },
    gallery: 'Galleria', blog: 'Blogi', about: 'Tietoa',
    aboutChildren: { company: 'Yritys', manufacturer: 'Valmistajaprofiili' },
    contactUs: 'Ota yhteyttä', language: 'Kieli',
  },
};
