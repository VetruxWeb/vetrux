import type { Locale } from '@/i18n/locales';

export interface NavbarStrings {
  home: string;
  products: string;
  productsChildren: {
    allProducts: string;
    cbdIsolate: string;
    cbdOil: string;
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
  openMenu: string;
  closeMenu: string;
  switchLanguage: string;
  currentLanguage: string;
  homeAria: string;
}

export const navbarStrings: Record<Locale, NavbarStrings> = {
  en: {
    home: 'Home', products: 'Products',
    productsChildren: { allProducts: 'All Products', cbdIsolate: 'CBD Isolate', cbdOil: 'CBD Crude Oil' },
    process: 'Process',
    processChildren: { seedToIsolate: 'From Seed to Isolate', cultivation: 'Cultivation', extraction: 'Extraction', qualityAssurance: 'Quality Assurance' },
    gallery: 'Gallery', blog: 'Blog', about: 'About',
    aboutChildren: { company: 'Company', manufacturer: 'Manufacturer Profile' },
    contactUs: 'Contact Us', language: 'Language',
    openMenu: 'Open menu', closeMenu: 'Close menu',
    switchLanguage: 'Switch language', currentLanguage: 'Current language',
    homeAria: 'Vetrux CBD home',
  },
  de: {
    home: 'Startseite', products: 'Produkte',
    productsChildren: { allProducts: 'Alle Produkte', cbdIsolate: 'CBD-Isolat', cbdOil: 'CBD-Rohöl' },
    process: 'Prozess',
    processChildren: { seedToIsolate: 'Vom Saatgut zum Isolat', cultivation: 'Anbau', extraction: 'Extraktion', qualityAssurance: 'Qualitätssicherung' },
    gallery: 'Galerie', blog: 'Blog', about: 'Über uns',
    aboutChildren: { company: 'Unternehmen', manufacturer: 'Herstellerprofil' },
    contactUs: 'Kontakt', language: 'Sprache',
    openMenu: 'Menü öffnen', closeMenu: 'Menü schließen',
    switchLanguage: 'Sprache wechseln', currentLanguage: 'Aktuelle Sprache',
    homeAria: 'Vetrux CBD Startseite',
  },
  fr: {
    home: 'Accueil', products: 'Produits',
    productsChildren: { allProducts: 'Tous les produits', cbdIsolate: 'Isolat de CBD', cbdOil: 'Huile brute de CBD' },
    process: 'Processus',
    processChildren: { seedToIsolate: "De la graine à l'isolat", cultivation: 'Culture', extraction: 'Extraction', qualityAssurance: 'Assurance qualité' },
    gallery: 'Galerie', blog: 'Blog', about: 'À propos',
    aboutChildren: { company: 'Entreprise', manufacturer: "Profil du fabricant" },
    contactUs: 'Contactez-nous', language: 'Langue',
    openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu',
    switchLanguage: 'Changer de langue', currentLanguage: 'Langue actuelle',
    homeAria: 'Accueil Vetrux CBD',
  },
  es: {
    home: 'Inicio', products: 'Productos',
    productsChildren: { allProducts: 'Todos los productos', cbdIsolate: 'Aislado de CBD', cbdOil: 'Aceite crudo de CBD' },
    process: 'Proceso',
    processChildren: { seedToIsolate: 'De la semilla al aislado', cultivation: 'Cultivo', extraction: 'Extracción', qualityAssurance: 'Garantía de calidad' },
    gallery: 'Galería', blog: 'Blog', about: 'Nosotros',
    aboutChildren: { company: 'Empresa', manufacturer: 'Perfil del fabricante' },
    contactUs: 'Contáctenos', language: 'Idioma',
    openMenu: 'Abrir menú', closeMenu: 'Cerrar menú',
    switchLanguage: 'Cambiar idioma', currentLanguage: 'Idioma actual',
    homeAria: 'Inicio de Vetrux CBD',
  },
  it: {
    home: 'Home', products: 'Prodotti',
    productsChildren: { allProducts: 'Tutti i prodotti', cbdIsolate: 'Isolato di CBD', cbdOil: 'Olio grezzo di CBD' },
    process: 'Processo',
    processChildren: { seedToIsolate: "Dal seme all'isolato", cultivation: 'Coltivazione', extraction: 'Estrazione', qualityAssurance: 'Garanzia qualità' },
    gallery: 'Galleria', blog: 'Blog', about: 'Chi siamo',
    aboutChildren: { company: 'Azienda', manufacturer: 'Profilo produttore' },
    contactUs: 'Contattaci', language: 'Lingua',
    openMenu: 'Apri menu', closeMenu: 'Chiudi menu',
    switchLanguage: 'Cambia lingua', currentLanguage: 'Lingua attuale',
    homeAria: 'Home Vetrux CBD',
  },
  pt: {
    home: 'Início', products: 'Produtos',
    productsChildren: { allProducts: 'Todos os produtos', cbdIsolate: 'Isolado de CBD', cbdOil: 'Óleo bruto de CBD' },
    process: 'Processo',
    processChildren: { seedToIsolate: 'Da semente ao isolado', cultivation: 'Cultivo', extraction: 'Extração', qualityAssurance: 'Garantia de qualidade' },
    gallery: 'Galeria', blog: 'Blog', about: 'Sobre',
    aboutChildren: { company: 'Empresa', manufacturer: 'Perfil do fabricante' },
    contactUs: 'Contato', language: 'Idioma',
    openMenu: 'Abrir menu', closeMenu: 'Fechar menu',
    switchLanguage: 'Trocar idioma', currentLanguage: 'Idioma atual',
    homeAria: 'Início Vetrux CBD',
  },
  ja: {
    home: 'ホーム', products: '製品',
    productsChildren: { allProducts: 'すべての製品', cbdIsolate: 'CBDアイソレート', cbdOil: 'CBD原油' },
    process: 'プロセス',
    processChildren: { seedToIsolate: '種子からアイソレートへ', cultivation: '栽培', extraction: '抽出', qualityAssurance: '品質保証' },
    gallery: 'ギャラリー', blog: 'ブログ', about: '会社情報',
    aboutChildren: { company: '会社概要', manufacturer: 'メーカープロフィール' },
    contactUs: 'お問い合わせ', language: '言語',
    openMenu: 'メニューを開く', closeMenu: 'メニューを閉じる',
    switchLanguage: '言語を切り替え', currentLanguage: '現在の言語',
    homeAria: 'Vetrux CBD ホーム',
  },
  fi: {
    home: 'Etusivu', products: 'Tuotteet',
    productsChildren: { allProducts: 'Kaikki tuotteet', cbdIsolate: 'CBD-isolaatti', cbdOil: 'CBD-raakaöljy' },
    process: 'Prosessi',
    processChildren: { seedToIsolate: 'Siemenestä isolaattiin', cultivation: 'Viljely', extraction: 'Uutto', qualityAssurance: 'Laadunvarmistus' },
    gallery: 'Galleria', blog: 'Blogi', about: 'Meistä',
    aboutChildren: { company: 'Yritys', manufacturer: 'Valmistajan profiili' },
    contactUs: 'Ota yhteyttä', language: 'Kieli',
    openMenu: 'Avaa valikko', closeMenu: 'Sulje valikko',
    switchLanguage: 'Vaihda kieltä', currentLanguage: 'Nykyinen kieli',
    homeAria: 'Vetrux CBD etusivu',
  },
};
