// src/content/pages/seo.content.ts
// Centralized SEO metadata per page per locale.
// English is the source of truth; all locales have real translations.

import type { Locale } from '@/i18n/locales';

export interface PageSeoContent {
  title: string;
  description: string;
  keywords?: string;
}

type SeoContentMap = Record<string, Record<Locale, PageSeoContent>>;

export const pageSeoContent: SeoContentMap = {
  '/': {
    en: {
      title: 'CBD Isolate Manufacturer in China | Bulk B2B Supplier | Vetrux',
      description: 'Vetrux supplies bulk CBD isolate for B2B buyers from Yunnan, China, with OEM/ODM support, in-house quality control, and buyer documentation support.',
      keywords: 'CBD isolate manufacturer China, bulk CBD isolate supplier, B2B CBD isolate, CBD isolate OEM ODM, Vetrux CBD, Yunnan',
    },
    de: {
      title: 'CBD-Rohstoffe | Vetrux CBD',
      description: 'VETRUX — die CBD-Rohstoffmarke der Vetrux Biotechnology (Chuxiong) Co., Ltd. CBD-Rohstoffverkauf, OEM/ODM-Dienstleistungen und technische Unterstützung aus Yunnan, China.',
      keywords: 'CBD Rohstoffe, CBD Isolat, OEM ODM CBD, CBD Lieferant, Vetrux CBD, Yunnan',
    },
    fr: {
      title: 'Matières Premières CBD | Vetrux CBD',
      description: 'VETRUX — la marque de matières premières CBD exploitée par Vetrux Biotechnology (Chuxiong) Co., Ltd. Vente de matières premières CBD, services OEM/ODM et support technique depuis le Yunnan, Chine.',
      keywords: 'matières premières CBD, isolat CBD, OEM ODM CBD, fournisseur CBD, Vetrux CBD, Yunnan',
    },
    es: {
      title: 'Fabricante de CBD Isolate en China | Proveedor B2B a Granel | Vetrux',
      description: 'Vetrux suministra CBD isolate a granel para compradores B2B desde Yunnan, China, con soporte OEM/ODM, control de calidad interno y documentación para compradores.',
      keywords: 'fabricante CBD isolate China, proveedor CBD isolate a granel, CBD isolate B2B, CBD isolate OEM ODM, Vetrux CBD, Yunnan',
    },
    it: {
      title: "Produttore di CBD Isolate in Cina | Fornitore B2B all'Ingrosso | Vetrux",
      description: "Vetrux fornisce CBD isolate all'ingrosso per acquirenti B2B dallo Yunnan, Cina, con supporto OEM/ODM, controllo qualità interno e documentazione per acquirenti.",
      keywords: 'produttore CBD isolate Cina, fornitore CBD isolate ingrosso, CBD isolate B2B, CBD isolate OEM ODM, Vetrux CBD, Yunnan',
    },
    pt: {
      title: 'Fabricante de CBD Isolate na China | Fornecedor B2B a Granel | Vetrux',
      description: 'A Vetrux fornece CBD isolate a granel para compradores B2B a partir de Yunnan, China, com suporte OEM/ODM, controle de qualidade interno e documentação para compradores.',
      keywords: 'fabricante CBD isolate China, fornecedor CBD isolate granel, CBD isolate B2B, CBD isolate OEM ODM, Vetrux CBD, Yunnan',
    },
    ja: {
      title: 'CBD アイソレート製造メーカー（中国）| B2B バルク供給 | Vetrux',
      description: 'Vetruxは中国・Yunnanより、B2Bバイヤー向けにバルクCBDアイソレートを供給しています。OEM/ODMサポート、自社品質管理、購入者向け書類対応に対応いたします。',
      keywords: 'CBD アイソレート メーカー 中国, CBD アイソレート バルク供給, B2B CBD アイソレート, CBD OEM ODM, Vetrux CBD, Yunnan',
    },
    fi: {
      title: 'CBD-isolaatin valmistaja Kiinassa | B2B-tukkutoimittaja | Vetrux',
      description: 'Vetrux toimittaa CBD-isolaattia tukkuerissä B2B-ostajille Yunnanista, Kiinasta. Tarjoamme OEM/ODM-tukea, sisäistä laadunvalvontaa ja ostajadokumentaatiota.',
      keywords: 'CBD-isolaatti valmistaja Kiina, CBD-isolaatti tukkutoimittaja, B2B CBD-isolaatti, CBD OEM ODM, Vetrux CBD, Yunnan',
    },
  },

  '/products': {
    en: {
      title: 'CBD Raw Material Products | Bulk Isolate & Oil',
      description: 'Browse Vetrux CBD raw material products, including bulk CBD isolate, for qualified B2B buyers. Product information, packaging details, and documentation support by order requirements.',
      keywords: 'CBD raw material products, bulk CBD isolate, CBD product catalog, B2B CBD products',
    },
    de: {
      title: 'CBD-Rohstoffprodukte | Isolat & Öl im Großhandel',
      description: 'Entdecken Sie die CBD-Rohstoffprodukte von Vetrux, einschließlich CBD-Isolat im Großhandel, für qualifizierte B2B-Käufer. Produktinformationen, Verpackungsdetails und Dokumentationsunterstützung je nach Bestellanforderungen.',
      keywords: 'CBD Rohstoffprodukte, CBD Isolat Großhandel, CBD Produktkatalog, B2B CBD Produkte',
    },
    fr: {
      title: 'Produits de Matières Premières CBD | Isolat & Huile en Gros',
      description: "Découvrez les produits de matières premières CBD de Vetrux, dont l'isolat de CBD en gros, pour les acheteurs B2B qualifiés. Informations produit, détails d'emballage et support documentaire selon les exigences de commande.",
      keywords: "produits matières premières CBD, isolat CBD en gros, catalogue produits CBD, produits CBD B2B",
    },
    es: {
      title: 'Productos de Materias Primas CBD | Aislado y Aceite a Granel',
      description: 'Explore los productos de materias primas CBD de Vetrux, incluido el aislado de CBD a granel, para compradores B2B cualificados. Información de producto, detalles de embalaje y soporte documental según los requisitos del pedido.',
      keywords: 'productos materias primas CBD, aislado CBD a granel, catálogo productos CBD, productos CBD B2B',
    },
    it: {
      title: "Prodotti di Materie Prime CBD | Isolato e Olio all'Ingrosso",
      description: "Scoprite i prodotti di materie prime CBD di Vetrux, incluso l'isolato di CBD all'ingrosso, per acquirenti B2B qualificati. Informazioni prodotto, dettagli di confezionamento e supporto documentale in base ai requisiti dell'ordine.",
      keywords: "prodotti materie prime CBD, isolato CBD ingrosso, catalogo prodotti CBD, prodotti CBD B2B",
    },
    pt: {
      title: 'Produtos de Matérias-Primas CBD | Isolado e Óleo no Atacado',
      description: 'Conheça os produtos de matérias-primas CBD da Vetrux, incluindo isolado de CBD no atacado, para compradores B2B qualificados. Informações do produto, detalhes de embalagem e suporte documental conforme os requisitos do pedido.',
      keywords: 'produtos matérias-primas CBD, isolado CBD atacado, catálogo produtos CBD, produtos CBD B2B',
    },
    ja: {
      title: 'CBD原料製品 | バルクアイソレート・オイル',
      description: 'VetruxのCBD原料製品（バルクCBDアイソレートを含む）を認定B2Bバイヤー向けにご紹介いたします。製品情報、包装詳細、注文要件に応じた書類サポートをご案内いたします。',
      keywords: 'CBD 原料製品, バルク CBD アイソレート, CBD 製品カタログ, B2B CBD 製品',
    },
    fi: {
      title: 'CBD-raaka-ainetuotteet | Isolaatti ja öljy tukkuerissä',
      description: 'Tutustu Vetruxin CBD-raaka-ainetuotteisiin, mukaan lukien CBD-isolaatti tukkuerissä, päteville B2B-ostajille. Tuotetiedot, pakkaustiedot ja dokumentaatiotuki tilausvaatimusten mukaan.',
      keywords: 'CBD-raaka-ainetuotteet, CBD-isolaatti tukkuerä, CBD-tuoteluettelo, B2B CBD-tuotteet',
    },
  },

  '/process': {
    en: {
      title: 'From Seed to Isolate | Our Process',
      description: 'Controlled phases from Yunma-13 cultivation to CBD isolate workflows, with cultivation, extraction, purification, quality-control, and packaging support in Chuxiong, Yunnan.',
      keywords: 'CBD manufacturing process, seed to isolate, CBD extraction process, hemp cultivation Yunnan, CBD isolate production',
    },
    de: {
      title: 'Vom Saatgut zum Isolat | Unser Prozess',
      description: 'Sechs kontrollierte Phasen — vom Yunma-13 Anbau bis zum 99%+ pharmazeutischen CBD-Isolat. VETRUX, Chuxiong, Yunnan.',
      keywords: 'CBD Herstellung, CBD Prozess, CBD Extraktion, CBD Anbau Yunnan, CBD Isolat Produktion',
    },
    fr: {
      title: "De la Graine à l'Isolat | Notre Procédé",
      description: "Six phases contrôlées — de la culture Yunma-13 à l'isolat CBD pharmaceutique 99%+. VETRUX, Chuxiong, Yunnan.",
      keywords: 'fabrication CBD, procédé CBD, extraction CBD, culture CBD Yunnan, production isolat CBD',
    },
    es: {
      title: 'De la Semilla al Aislado | Nuestro Proceso',
      description: 'Fases controladas desde el cultivo de Yunma-13 hasta los flujos de trabajo de CBD isolate, con cultivo, extracción, purificación, control de calidad y soporte de embalaje en Chuxiong, Yunnan.',
      keywords: 'proceso fabricación CBD, semilla a aislado, proceso extracción CBD, cultivo cáñamo Yunnan, producción CBD isolate',
    },
    it: {
      title: "Dal Seme all'Isolato | Il Nostro Processo",
      description: "Fasi controllate dalla coltivazione di Yunma-13 ai flussi di lavoro del CBD isolate, con coltivazione, estrazione, purificazione, controllo qualità e supporto confezionamento a Chuxiong, Yunnan.",
      keywords: "processo produzione CBD, dal seme all'isolato, processo estrazione CBD, coltivazione canapa Yunnan, produzione CBD isolate",
    },
    pt: {
      title: 'Da Semente ao Isolado | Nosso Processo',
      description: 'Fases controladas desde o cultivo de Yunma-13 até os fluxos de trabalho de CBD isolate, com cultivo, extração, purificação, controle de qualidade e suporte de embalagem em Chuxiong, Yunnan.',
      keywords: 'processo fabricação CBD, semente ao isolado, processo extração CBD, cultivo cânhamo Yunnan, produção CBD isolate',
    },
    ja: {
      title: '種子からアイソレートへ | 製造プロセス',
      description: 'Yunma-13の栽培からCBDアイソレート製造までの管理された工程。Chuxiong, Yunnanにおける栽培、抽出、精製、品質管理、包装をご紹介いたします。',
      keywords: 'CBD 製造プロセス, 種子からアイソレート, CBD 抽出プロセス, ヘンプ栽培 Yunnan, CBD アイソレート生産',
    },
    fi: {
      title: 'Siemenestä isolaattiin | Prosessimme',
      description: 'Hallitut vaiheet Yunma-13-viljelystä CBD-isolaatin tuotantoon: viljely, uutto, puhdistus, laadunvalvonta ja pakkaus Chuxiongissa, Yunnanissa.',
      keywords: 'CBD-valmistusprosessi, siemenestä isolaattiin, CBD-uuttoprosessi, hampun viljely Yunnan, CBD-isolaatin tuotanto',
    },
  },

  '/gallery': {
    en: {
      title: 'Facility Gallery | Production Site & Cultivation Base',
      description: 'Visual overview of Vetrux CBD production site and cultivation base in Chuxiong, Yunnan — equipment, planting, and product visuals.',
      keywords: 'CBD facility gallery, extraction equipment photos, hemp cultivation base',
    },
    de: {
      title: 'Anlagengalerie | Produktionsstandort & Anbaubasis',
      description: 'Visuelle Übersicht des Vetrux CBD Produktionsstandorts und der Anbaubasis in Chuxiong, Yunnan.',
      keywords: 'CBD Anlagengalerie, Extraktionsausrüstung Fotos, Hanf Anbaubasis',
    },
    fr: {
      title: 'Galerie des Installations | Site de Production & Base de Culture',
      description: "Aperçu visuel du site de production et de la base de culture Vetrux CBD à Chuxiong, Yunnan.",
      keywords: "galerie installations CBD, photos équipement extraction, base culture chanvre",
    },
    es: {
      title: 'Galería de Instalaciones | Sitio de Producción y Base de Cultivo',
      description: 'Vista visual del sitio de producción y la base de cultivo de Vetrux CBD en Chuxiong, Yunnan.',
      keywords: 'galería instalaciones CBD, fotos equipos extracción, base cultivo cáñamo',
    },
    it: {
      title: 'Galleria Impianti | Sito di Produzione e Base di Coltivazione',
      description: 'Panoramica visiva del sito di produzione e della base di coltivazione Vetrux CBD a Chuxiong, Yunnan.',
      keywords: 'galleria impianti CBD, foto attrezzature estrazione, base coltivazione canapa',
    },
    pt: {
      title: 'Galeria de Instalações | Local de Produção e Base de Cultivo',
      description: 'Visão geral visual do local de produção e da base de cultivo da Vetrux CBD em Chuxiong, Yunnan.',
      keywords: 'galeria instalações CBD, fotos equipamentos extração, base cultivo cânhamo',
    },
    ja: {
      title: '施設ギャラリー | 生産拠点・栽培基地',
      description: 'Chuxiong, YunnanにあるVetrux CBDの生産拠点および栽培基地の写真をご覧いただけます。',
      keywords: 'CBD 施設ギャラリー, 抽出設備 写真, ヘンプ栽培基地',
    },
    fi: {
      title: 'Laitosgalleria | Tuotantolaitos ja viljelyalue',
      description: 'Visuaalinen katsaus Vetrux CBD:n tuotantolaitokseen ja viljelyalueeseen Chuxiongissa, Yunnanissa.',
      keywords: 'CBD-laitosgalleria, uuttolaitteet kuvat, hampun viljelyalue',
    },
  },

  '/inquiry': {
    en: {
      title: 'B2B Inquiry | CBD Raw Materials & OEM/ODM',
      description: 'Contact Vetrux CBD for CBD raw material supply, OEM/ODM cooperation, and technical support inquiries.',
      keywords: 'CBD inquiry, CBD raw material supply, OEM ODM CBD, B2B CBD contact',
    },
    de: {
      title: 'B2B-Anfrage | CBD-Rohstoffe & OEM/ODM',
      description: 'Kontaktieren Sie Vetrux CBD für CBD-Rohstoffversorgung, OEM/ODM-Kooperation und technische Unterstützung.',
      keywords: 'CBD Anfrage, CBD Rohstoffversorgung, OEM ODM CBD, B2B CBD Kontakt',
    },
    fr: {
      title: 'Demande B2B | Matières Premières CBD & OEM/ODM',
      description: 'Contactez Vetrux CBD pour la fourniture de matières premières CBD, la coopération OEM/ODM et les demandes de support technique.',
      keywords: 'demande CBD, fourniture matières premières CBD, OEM ODM CBD, contact B2B CBD',
    },
    es: {
      title: 'Consulta B2B | Materias Primas CBD y OEM/ODM',
      description: 'Contacte con Vetrux CBD para suministro de materias primas CBD, cooperación OEM/ODM y consultas de soporte técnico.',
      keywords: 'consulta CBD, suministro materias primas CBD, OEM ODM CBD, contacto B2B CBD',
    },
    it: {
      title: 'Richiesta B2B | Materie Prime CBD e OEM/ODM',
      description: 'Contattate Vetrux CBD per la fornitura di materie prime CBD, cooperazione OEM/ODM e richieste di supporto tecnico.',
      keywords: 'richiesta CBD, fornitura materie prime CBD, OEM ODM CBD, contatto B2B CBD',
    },
    pt: {
      title: 'Consulta B2B | Matérias-Primas CBD e OEM/ODM',
      description: 'Entre em contato com a Vetrux CBD para fornecimento de matérias-primas CBD, cooperação OEM/ODM e consultas de suporte técnico.',
      keywords: 'consulta CBD, fornecimento matérias-primas CBD, OEM ODM CBD, contato B2B CBD',
    },
    ja: {
      title: 'B2Bお問い合わせ | CBD原料・OEM/ODM',
      description: 'CBD原料の供給、OEM/ODM協力、技術サポートに関するお問い合わせはVetrux CBDまでご連絡ください。',
      keywords: 'CBD お問い合わせ, CBD 原料供給, OEM ODM CBD, B2B CBD 連絡先',
    },
    fi: {
      title: 'B2B-tiedustelu | CBD-raaka-aineet ja OEM/ODM',
      description: 'Ota yhteyttä Vetrux CBD:hen CBD-raaka-aineiden toimituksesta, OEM/ODM-yhteistyöstä ja teknisen tuen tiedusteluista.',
      keywords: 'CBD-tiedustelu, CBD-raaka-aineiden toimitus, OEM ODM CBD, B2B CBD yhteydenotto',
    },
  },

  '/about': {
    en: {
      title: 'About Us | Company Profile',
      description: 'VETRUX — the CBD raw material brand operated by Vetrux Biotechnology (Chuxiong) Co., Ltd. CBD raw material sales, OEM/ODM, and technical support. Based in Chuxiong, Yunnan, China.',
      keywords: 'about Vetrux CBD, Vetrux Biotechnology, Chuxiong Yunnan, CBD brand',
    },
    de: {
      title: 'Über Uns | Unternehmensprofil',
      description: 'VETRUX — die CBD-Rohstoffmarke der Vetrux Biotechnology (Chuxiong) Co., Ltd. CBD-Rohstoffverkauf, OEM/ODM und technische Unterstützung. Sitz in Chuxiong, Yunnan, China.',
      keywords: 'über Vetrux CBD, Vetrux Biotechnology, Chuxiong Yunnan, CBD Marke',
    },
    fr: {
      title: "À Propos de Nous | Profil de l'Entreprise",
      description: 'VETRUX — la marque de matières premières CBD exploitée par Vetrux Biotechnology (Chuxiong) Co., Ltd. Vente, OEM/ODM et support technique. Basée à Chuxiong, Yunnan, Chine.',
      keywords: 'à propos Vetrux CBD, Vetrux Biotechnology, Chuxiong Yunnan, marque CBD',
    },
    es: {
      title: 'Sobre Nosotros | Perfil de la Empresa',
      description: 'VETRUX — la marca de materias primas CBD operada por Vetrux Biotechnology (Chuxiong) Co., Ltd. Venta de materias primas CBD, OEM/ODM y soporte técnico. Con sede en Chuxiong, Yunnan, China.',
      keywords: 'sobre Vetrux CBD, Vetrux Biotechnology, Chuxiong Yunnan, marca CBD',
    },
    it: {
      title: 'Chi Siamo | Profilo Aziendale',
      description: 'VETRUX — il marchio di materie prime CBD gestito da Vetrux Biotechnology (Chuxiong) Co., Ltd. Vendita materie prime CBD, OEM/ODM e supporto tecnico. Sede a Chuxiong, Yunnan, Cina.',
      keywords: 'chi siamo Vetrux CBD, Vetrux Biotechnology, Chuxiong Yunnan, marchio CBD',
    },
    pt: {
      title: 'Sobre Nós | Perfil da Empresa',
      description: 'VETRUX — a marca de matérias-primas CBD operada pela Vetrux Biotechnology (Chuxiong) Co., Ltd. Venda de matérias-primas CBD, OEM/ODM e suporte técnico. Sediada em Chuxiong, Yunnan, China.',
      keywords: 'sobre Vetrux CBD, Vetrux Biotechnology, Chuxiong Yunnan, marca CBD',
    },
    ja: {
      title: '会社概要 | 企業プロフィール',
      description: 'VETRUX — Vetrux Biotechnology (Chuxiong) Co., Ltd.が運営するCBD原料ブランド。CBD原料販売、OEM/ODM、技術サポート。中国・Yunnan省Chuxiong市に拠点を置いています。',
      keywords: 'Vetrux CBD 会社概要, Vetrux Biotechnology, Chuxiong Yunnan, CBD ブランド',
    },
    fi: {
      title: 'Tietoa Meistä | Yritysprofiili',
      description: 'VETRUX — Vetrux Biotechnology (Chuxiong) Co., Ltd:n operoima CBD-raaka-ainebrändi. CBD-raaka-aineiden myynti, OEM/ODM ja tekninen tuki. Toimipaikka: Chuxiong, Yunnan, Kiina.',
      keywords: 'tietoa Vetrux CBD, Vetrux Biotechnology, Chuxiong Yunnan, CBD-brändi',
    },
  },

  '/equipment': {
    en: {
      title: 'Equipment Configuration | Extraction & Processing Facility',
      description: 'Vetrux CBD equipment configuration: 20 extraction tanks, 26 chromatography columns, 10 concentrators, HPLC analytical system (Thermo UltiMate 3000), and Siemens automation. Chuxiong, Yunnan.',
      keywords: 'CBD extraction equipment, chromatography columns, extraction tanks, HPLC system, Siemens automation',
    },
    de: {
      title: 'Anlagenkonfiguration | Extraktions- & Verarbeitungsanlage',
      description: 'Vetrux CBD Anlagenkonfiguration: 20 Extraktionstanks, 26 Chromatographiesäulen, 10 Konzentratoren, HPLC-Analysesystem und Siemens-Automatisierung. Chuxiong, Yunnan.',
      keywords: 'CBD Extraktionsausrüstung, Chromatographiesäulen, Extraktionstanks, HPLC System, Siemens Automatisierung',
    },
    fr: {
      title: "Configuration des Équipements | Installation d'Extraction & Traitement",
      description: "Configuration des équipements Vetrux CBD : 20 cuves d'extraction, 26 colonnes de chromatographie, 10 concentrateurs, système analytique HPLC et automatisation Siemens. Chuxiong, Yunnan.",
      keywords: "équipement extraction CBD, colonnes chromatographie, cuves extraction, système HPLC, automatisation Siemens",
    },
    es: {
      title: 'Configuración de Equipos | Instalación de Extracción y Procesamiento',
      description: 'Configuración de equipos Vetrux CBD: 20 tanques de extracción, 26 columnas de cromatografía, 10 concentradores, sistema analítico HPLC y automatización Siemens. Chuxiong, Yunnan.',
      keywords: 'equipos extracción CBD, columnas cromatografía, tanques extracción, sistema HPLC',
    },
    it: {
      title: 'Configurazione Attrezzature | Impianto di Estrazione e Lavorazione',
      description: 'Configurazione attrezzature Vetrux CBD: 20 serbatoi di estrazione, 26 colonne cromatografiche, 10 concentratori, sistema analitico HPLC e automazione Siemens. Chuxiong, Yunnan.',
      keywords: 'attrezzature estrazione CBD, colonne cromatografia, serbatoi estrazione, sistema HPLC',
    },
    pt: {
      title: 'Configuração de Equipamentos | Instalação de Extração e Processamento',
      description: 'Configuração de equipamentos Vetrux CBD: 20 tanques de extração, 26 colunas de cromatografia, 10 concentradores, sistema analítico HPLC e automação Siemens. Chuxiong, Yunnan.',
      keywords: 'equipamentos extração CBD, colunas cromatografia, tanques extração, sistema HPLC',
    },
    ja: {
      title: '設備構成 | 抽出・加工施設',
      description: 'Vetrux CBDの設備構成：抽出タンク20基、クロマトグラフィーカラム26本、濃縮器10台、HPLC分析システム、Siemens自動制御。Chuxiong, Yunnan。',
      keywords: 'CBD 抽出設備, クロマトグラフィーカラム, 抽出タンク, HPLC システム',
    },
    fi: {
      title: 'Laitekokoonpano | Uutto- ja käsittelylaitos',
      description: 'Vetrux CBD:n laitekokoonpano: 20 uuttosäiliötä, 26 kromatografiakolumnia, 10 konsentraattoria, HPLC-analyysijärjestelmä ja Siemens-automaatio. Chuxiong, Yunnan.',
      keywords: 'CBD-uuttolaitteet, kromatografiakolumnit, uuttosäiliöt, HPLC-järjestelmä',
    },
  },

  '/planting': {
    en: {
      title: 'Cultivation & Breeding Center | Standardized Planting System',
      description: 'Vetrux operates a cultivation and breeding center in Chuxiong, Yunnan Province. Standardized, traceable cultivation system focused on quality consistency.',
      keywords: 'hemp cultivation Yunnan, CBD hemp farming, standardized cultivation, seed selection, traceable planting system',
    },
    de: {
      title: 'Anbau- & Zuchtzentrum | Standardisiertes Anbausystem',
      description: 'Vetrux betreibt ein Anbau- und Zuchtzentrum in Chuxiong, Provinz Yunnan. Standardisiertes, rückverfolgbares Anbausystem mit Fokus auf Qualitätskonsistenz.',
      keywords: 'Hanfanbau Yunnan, CBD Hanfanbau, standardisierter Anbau, Saatgutauswahl, rückverfolgbares Anbausystem',
    },
    fr: {
      title: 'Centre de Culture & Sélection | Système de Culture Standardisé',
      description: 'Vetrux exploite un centre de culture et de sélection à Chuxiong, province du Yunnan. Système de culture standardisé et traçable axé sur la constance de la qualité.',
      keywords: 'culture chanvre Yunnan, culture CBD, culture standardisée, sélection semences, système culture traçable',
    },
    es: {
      title: 'Centro de Cultivo y Mejora | Sistema de Plantación Estandarizado',
      description: 'Vetrux opera un centro de cultivo y mejora en Chuxiong, Provincia de Yunnan. Sistema de cultivo estandarizado y trazable centrado en la consistencia de calidad.',
      keywords: 'cultivo cáñamo Yunnan, cultivo CBD, cultivo estandarizado, sistema plantación trazable',
    },
    it: {
      title: 'Centro di Coltivazione e Selezione | Sistema di Coltivazione Standardizzato',
      description: 'Vetrux gestisce un centro di coltivazione e selezione a Chuxiong, Provincia dello Yunnan. Sistema di coltivazione standardizzato e tracciabile incentrato sulla costanza qualitativa.',
      keywords: 'coltivazione canapa Yunnan, coltivazione CBD, coltivazione standardizzata, sistema coltivazione tracciabile',
    },
    pt: {
      title: 'Centro de Cultivo e Melhoramento | Sistema de Plantio Padronizado',
      description: 'A Vetrux opera um centro de cultivo e melhoramento em Chuxiong, Província de Yunnan. Sistema de cultivo padronizado e rastreável focado na consistência de qualidade.',
      keywords: 'cultivo cânhamo Yunnan, cultivo CBD, cultivo padronizado, sistema plantio rastreável',
    },
    ja: {
      title: '栽培・育種センター | 標準化栽培システム',
      description: 'Vetruxは中国Yunnan省Chuxiongにて栽培・育種センターを運営しています。品質の一貫性を重視した標準化・トレーサブルな栽培システムです。',
      keywords: 'ヘンプ栽培 Yunnan, CBD ヘンプ農業, 標準化栽培, トレーサブル栽培システム',
    },
    fi: {
      title: 'Viljely- ja jalostuskeskus | Standardoitu viljelyjärjestelmä',
      description: 'Vetrux operoi viljely- ja jalostuskeskusta Chuxiongissa, Yunnanin maakunnassa. Standardoitu ja jäljitettävä viljelyjärjestelmä, joka keskittyy laadun johdonmukaisuuteen.',
      keywords: 'hampun viljely Yunnan, CBD-hampun viljely, standardoitu viljely, jäljitettävä viljelyjärjestelmä',
    },
  },

  '/blog': {
    en: {
      title: 'Blog | CBD Industry Knowledge',
      description: 'Articles on CBD industry topics, extraction technology, compliance considerations, and supply chain knowledge.',
      keywords: 'CBD industry insights, CBD extraction technology, CBD compliance, CBD supply chain',
    },
    de: {
      title: 'Blog | CBD-Branchenwissen',
      description: 'Artikel zu CBD-Branchenthemen, Extraktionstechnologie, Compliance-Überlegungen und Lieferkettenwissen.',
      keywords: 'CBD Brancheneinblicke, CBD Extraktionstechnologie, CBD Compliance, CBD Lieferkette',
    },
    fr: {
      title: 'Blog | Connaissances Industrie CBD',
      description: "Articles sur les sujets de l'industrie CBD, la technologie d'extraction, les considérations de conformité et les connaissances de la chaîne d'approvisionnement.",
      keywords: "perspectives industrie CBD, technologie extraction CBD, conformité CBD, chaîne approvisionnement CBD",
    },
    es: {
      title: 'Blog | Conocimiento de la Industria CBD',
      description: 'Artículos sobre temas de la industria CBD, tecnología de extracción, consideraciones de cumplimiento y conocimiento de la cadena de suministro.',
      keywords: 'perspectivas industria CBD, tecnología extracción CBD, cumplimiento CBD, cadena suministro CBD',
    },
    it: {
      title: "Blog | Conoscenze sull'Industria CBD",
      description: "Articoli su temi dell'industria CBD, tecnologia di estrazione, considerazioni sulla conformità e conoscenze sulla catena di fornitura.",
      keywords: 'approfondimenti industria CBD, tecnologia estrazione CBD, conformità CBD, catena fornitura CBD',
    },
    pt: {
      title: 'Blog | Conhecimento da Indústria CBD',
      description: 'Artigos sobre temas da indústria CBD, tecnologia de extração, considerações de conformidade e conhecimento da cadeia de suprimentos.',
      keywords: 'insights indústria CBD, tecnologia extração CBD, conformidade CBD, cadeia suprimentos CBD',
    },
    ja: {
      title: 'ブログ | CBD業界ナレッジ',
      description: 'CBD業界のトピック、抽出技術、コンプライアンスに関する考察、サプライチェーンの知見に関する記事をご紹介いたします。',
      keywords: 'CBD 業界インサイト, CBD 抽出技術, CBD コンプライアンス, CBD サプライチェーン',
    },
    fi: {
      title: 'Blogi | CBD-alan tietämys',
      description: 'Artikkeleita CBD-alan aiheista, uuttoteknologiasta, vaatimustenmukaisuudesta ja toimitusketjun tietämyksestä.',
      keywords: 'CBD-alan näkemykset, CBD-uuttoteknologia, CBD-vaatimustenmukaisuus, CBD-toimitusketju',
    },
  },

  '/quality-assurance': {
    en: {
      title: 'CBD Isolate COA, SDS & Quality Assurance',
      description: 'Learn how Vetrux supports CBD isolate quality review with in-house HPLC analytical capability, COA/SDS support, test reports, and shipment documentation by order terms.',
      keywords: 'CBD isolate COA, CBD isolate SDS, CBD quality assurance, HPLC analytical capability, CBD batch documents',
    },
    de: {
      title: 'CBD Isolat COA, SDS & Qualitätssicherung',
      description: 'Erfahren Sie, wie Vetrux die Qualitätsprüfung von CBD Isolat mit interner HPLC-Analysekapazität unterstützt.',
      keywords: 'CBD Isolat COA, CBD Isolat SDS, CBD Qualitätssicherung, HPLC Analysekapazität, CBD Chargendokumente',
    },
    fr: {
      title: "COA, SDS et Assurance Qualité de l'Isolat de CBD",
      description: "Découvrez comment Vetrux soutient l'examen de la qualité de l'isolat de CBD avec une capacité analytique HPLC interne.",
      keywords: "COA isolat CBD, SDS isolat CBD, assurance qualité CBD, capacité analytique HPLC, documents de lot CBD",
    },
    es: {
      title: 'COA, SDS y Garantía de Calidad del Aislado de CBD',
      description: 'Descubra cómo Vetrux respalda la revisión de calidad del aislado de CBD con capacidad analítica HPLC interna.',
      keywords: 'COA aislado CBD, SDS aislado CBD, garantía calidad CBD, capacidad analítica HPLC, documentos lote CBD',
    },
    it: {
      title: "COA, SDS e Garanzia di Qualità dell'Isolato di CBD",
      description: "Scoprite come Vetrux supporta la revisione della qualità dell'isolato di CBD con capacità analitica HPLC interna.",
      keywords: "COA isolato CBD, SDS isolato CBD, garanzia qualità CBD, capacità analitica HPLC, documenti lotto CBD",
    },
    pt: {
      title: 'COA, SDS e Garantia de Qualidade do Isolado de CBD',
      description: 'Saiba como a Vetrux apoia a revisão da qualidade do isolado de CBD com capacidade analítica HPLC interna.',
      keywords: 'COA isolado CBD, SDS isolado CBD, garantia qualidade CBD, capacidade analítica HPLC, documentos lote CBD',
    },
    ja: {
      title: 'CBDアイソレート COA・SDS・品質保証',
      description: 'Vetruxが自社HPLC分析能力によりCBDアイソレートの品質レビューをどのようにサポートしているかをご覧いただけます。',
      keywords: 'CBD アイソレート COA, CBD アイソレート SDS, CBD 品質保証, HPLC 分析能力, CBD バッチ文書',
    },
    fi: {
      title: 'CBD-isolaatin COA, SDS ja laadunvarmistus',
      description: 'Opi, miten Vetrux tukee CBD-isolaatin laadunarviointia sisäisellä HPLC-analyysikyvykkyydellä.',
      keywords: 'CBD-isolaatin COA, CBD-isolaatin SDS, CBD-laadunvarmistus, HPLC-analyysikyvykkyys, CBD-eräasiakirjat',
    },
  },

  '/wholesale-cbd-isolate': {
    en: {
      title: 'Bulk CBD Isolate Supplier | Wholesale CBD Isolate',
      description: 'Wholesale CBD isolate supply for B2B buyers, with 5 kg packaging, documentation support, and OEM/ODM cooperation from Vetrux in China.',
      keywords: 'bulk CBD isolate supplier, wholesale CBD isolate, B2B CBD isolate, CBD isolate quote, CBD OEM ODM',
    },
    de: {
      title: 'CBD Isolat Großhandel Lieferant',
      description: 'CBD Isolat Großhandelslieferung für B2B-Käufer, mit 5 kg Verpackung, Dokumentationssupport und OEM/ODM-Kooperation von Vetrux in China.',
      keywords: 'CBD Isolat Großhandel Lieferant, CBD Isolat Großhandel, B2B CBD Isolat, CBD Isolat Angebot, CBD OEM ODM',
    },
    fr: {
      title: "Fournisseur d'Isolat de CBD en Vrac | Isolat de CBD en Gros",
      description: "Fourniture d'isolat de CBD en gros pour acheteurs B2B, avec emballage 5 kg, support documentaire et coopération OEM/ODM de Vetrux en Chine.",
      keywords: "fournisseur isolat CBD vrac, isolat CBD gros, isolat CBD B2B, devis isolat CBD, CBD OEM ODM",
    },
    es: {
      title: 'Proveedor de Aislado de CBD a Granel | Aislado de CBD al por Mayor',
      description: 'Suministro de aislado de CBD al por mayor para compradores B2B, con embalaje de 5 kg, soporte documental y cooperación OEM/ODM de Vetrux en China.',
      keywords: 'proveedor aislado CBD granel, aislado CBD mayorista, aislado CBD B2B, cotización aislado CBD, CBD OEM ODM',
    },
    it: {
      title: "Fornitore di Isolato di CBD all'Ingrosso",
      description: "Fornitura di isolato di CBD all'ingrosso per acquirenti B2B, con imballaggio da 5 kg, supporto documentale e cooperazione OEM/ODM di Vetrux in Cina.",
      keywords: "fornitore isolato CBD ingrosso, isolato CBD ingrosso, isolato CBD B2B, preventivo isolato CBD, CBD OEM ODM",
    },
    pt: {
      title: 'Fornecedor de Isolado de CBD a Granel | Isolado de CBD no Atacado',
      description: 'Fornecimento de isolado de CBD no atacado para compradores B2B, com embalagem de 5 kg, suporte documental e cooperação OEM/ODM da Vetrux na China.',
      keywords: 'fornecedor isolado CBD granel, isolado CBD atacado, isolado CBD B2B, cotação isolado CBD, CBD OEM ODM',
    },
    ja: {
      title: 'バルクCBDアイソレート供給業者 | 卸売CBDアイソレート',
      description: '中国Vetruxによる、5 kg包装、文書サポート、OEM/ODM協力を含むB2Bバイヤー向け卸売CBDアイソレート供給。',
      keywords: 'バルクCBDアイソレート供給業者, 卸売CBDアイソレート, B2B CBDアイソレート, CBDアイソレート見積, CBD OEM ODM',
    },
    fi: {
      title: 'CBD-isolaatin tukkutoimittaja | CBD-isolaatin tukkumyynti',
      description: 'CBD-isolaatin tukkutoimitus B2B-ostajille, sisältäen 5 kg pakkauksen, dokumentaatiotuen ja OEM/ODM-yhteistyön Vetruxilta Kiinasta.',
      keywords: 'CBD-isolaatin tukkutoimittaja, CBD-isolaatin tukkumyynti, B2B CBD-isolaatti, CBD-isolaatin tarjous, CBD OEM ODM',
    },
  },

  '/cbd-isolate-manufacturer': {
    en: {
      title: 'CBD Isolate Manufacturer in China',
      description: 'Vetrux supplies bulk CBD isolate for B2B buyers from Yunnan, China, with in-house analytical capability, OEM/ODM support, and buyer documentation support.',
      keywords: 'CBD isolate manufacturer China, CBD manufacturer Yunnan, bulk CBD isolate manufacturer, CBD isolate OEM ODM',
    },
    de: {
      title: 'CBD Isolat Hersteller in China',
      description: 'Vetrux liefert CBD Isolat in großen Mengen für B2B-Käufer aus Yunnan, China, mit interner Analysekapazität, OEM/ODM-Support und Käuferdokumentationssupport.',
      keywords: 'CBD Isolat Hersteller China, CBD Hersteller Yunnan, CBD Isolat Großhersteller, CBD Isolat OEM ODM',
    },
    fr: {
      title: "Fabricant d'Isolat de CBD en Chine",
      description: "Vetrux fournit de l'isolat de CBD en vrac pour les acheteurs B2B du Yunnan, Chine, avec capacité analytique interne, support OEM/ODM et support documentaire pour les acheteurs.",
      keywords: "fabricant isolat CBD Chine, fabricant CBD Yunnan, fabricant isolat CBD vrac, isolat CBD OEM ODM",
    },
    es: {
      title: 'Fabricante de Aislado de CBD en China',
      description: 'Vetrux suministra aislado de CBD a granel para compradores B2B desde Yunnan, China, con capacidad analítica interna, soporte OEM/ODM y soporte documental para compradores.',
      keywords: 'fabricante aislado CBD China, fabricante CBD Yunnan, fabricante aislado CBD granel, aislado CBD OEM ODM',
    },
    it: {
      title: 'Produttore di Isolato di CBD in Cina',
      description: "Vetrux fornisce isolato di CBD sfuso per acquirenti B2B dallo Yunnan, Cina, con capacità analitica interna, supporto OEM/ODM e supporto documentale per acquirenti.",
      keywords: 'produttore isolato CBD Cina, produttore CBD Yunnan, produttore isolato CBD sfuso, isolato CBD OEM ODM',
    },
    pt: {
      title: 'Fabricante de Isolado de CBD na China',
      description: 'A Vetrux fornece isolado de CBD a granel para compradores B2B a partir de Yunnan, China, com capacidade analítica interna, suporte OEM/ODM e suporte documental para compradores.',
      keywords: 'fabricante isolado CBD China, fabricante CBD Yunnan, fabricante isolado CBD granel, isolado CBD OEM ODM',
    },
    ja: {
      title: '中国のCBDアイソレート製造メーカー',
      description: 'Vetruxは中国Yunnan省より、自社分析能力、OEM/ODMサポート、購入者向け文書サポートを備えたB2Bバイヤー向けバルクCBDアイソレートを供給しています。',
      keywords: 'CBD アイソレート メーカー 中国, CBD メーカー Yunnan, バルク CBD アイソレート メーカー, CBD アイソレート OEM ODM',
    },
    fi: {
      title: 'CBD-isolaatin valmistaja Kiinassa',
      description: 'Vetrux toimittaa CBD-isolaattia tukkuerissä B2B-ostajille Yunnanista, Kiinasta, sisäisellä analyysikyvykkyydellä, OEM/ODM-tuella ja ostajadokumentaatiotuella.',
      keywords: 'CBD-isolaatin valmistaja Kiina, CBD-valmistaja Yunnan, CBD-isolaatin tukkuvalmistaja, CBD-isolaatti OEM ODM',
    },
  },

  '/privacy-policy': {
    en: {
      title: 'Privacy Policy',
      description: 'Privacy Policy for Vetrux CBD website. Learn how we collect, use, and protect your personal data when you visit our site or submit a B2B inquiry.',
      keywords: 'Vetrux privacy policy, CBD supplier privacy policy, data protection',
    },
    de: {
      title: 'Datenschutzerklärung',
      description: 'Datenschutzerklärung für die Vetrux CBD Website. Erfahren Sie, wie wir Ihre personenbezogenen Daten erfassen, verwenden und schützen.',
      keywords: 'Vetrux Datenschutzerklärung, CBD Lieferant Datenschutz, Datenschutz',
    },
    fr: {
      title: 'Politique de Confidentialité',
      description: 'Politique de Confidentialité du site Vetrux CBD. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.',
      keywords: 'politique confidentialité Vetrux, fournisseur CBD confidentialité, protection données',
    },
    es: {
      title: 'Política de Privacidad',
      description: 'Política de Privacidad del sitio web Vetrux CBD. Conozca cómo recopilamos, usamos y protegemos sus datos personales.',
      keywords: 'política privacidad Vetrux, proveedor CBD privacidad, protección datos',
    },
    it: {
      title: 'Informativa sulla Privacy',
      description: 'Informativa sulla Privacy per il sito Vetrux CBD. Scoprite come raccogliamo, utilizziamo e proteggiamo i vostri dati personali.',
      keywords: 'informativa privacy Vetrux, fornitore CBD privacy, protezione dati',
    },
    pt: {
      title: 'Política de Privacidade',
      description: 'Política de Privacidade do site Vetrux CBD. Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais.',
      keywords: 'política privacidade Vetrux, fornecedor CBD privacidade, proteção dados',
    },
    ja: {
      title: 'プライバシーポリシー',
      description: 'Vetrux CBDウェブサイトのプライバシーポリシーです。当社がお客様の個人データをどのように収集、使用、保護するかについてご説明します。',
      keywords: 'Vetrux プライバシーポリシー, CBD サプライヤー プライバシー, データ保護',
    },
    fi: {
      title: 'Tietosuojaseloste',
      description: 'Vetrux CBD -verkkosivuston tietosuojaseloste. Lue, miten keräämme, käytämme ja suojaamme henkilötietojasi.',
      keywords: 'Vetrux tietosuojaseloste, CBD-toimittaja tietosuoja, tietosuoja',
    },
  },

  '/terms-of-service': {
    en: {
      title: 'Terms of Service',
      description: 'Terms of Service for the Vetrux CBD website.',
      keywords: 'Vetrux terms of service, CBD supplier terms, website terms',
    },
    de: {
      title: 'Nutzungsbedingungen',
      description: 'Nutzungsbedingungen für die Vetrux CBD Website.',
      keywords: 'Vetrux Nutzungsbedingungen, CBD Lieferant Bedingungen, Website Bedingungen',
    },
    fr: {
      title: "Conditions d'Utilisation",
      description: "Conditions d'Utilisation du site web Vetrux CBD.",
      keywords: "conditions utilisation Vetrux, conditions fournisseur CBD, conditions site web",
    },
    es: {
      title: 'Términos de Servicio',
      description: 'Términos de Servicio del sitio web Vetrux CBD.',
      keywords: 'términos servicio Vetrux, términos proveedor CBD, términos sitio web',
    },
    it: {
      title: 'Termini di Servizio',
      description: 'Termini di Servizio per il sito Vetrux CBD.',
      keywords: 'termini servizio Vetrux, termini fornitore CBD, termini sito web',
    },
    pt: {
      title: 'Termos de Serviço',
      description: 'Termos de Serviço do site Vetrux CBD.',
      keywords: 'termos serviço Vetrux, termos fornecedor CBD, termos site',
    },
    ja: {
      title: '利用規約',
      description: 'Vetrux CBDウェブサイトの利用規約です。',
      keywords: 'Vetrux 利用規約, CBD サプライヤー 規約, ウェブサイト 規約',
    },
    fi: {
      title: 'Käyttöehdot',
      description: 'Vetrux CBD -verkkosivuston käyttöehdot.',
      keywords: 'Vetrux käyttöehdot, CBD-toimittaja ehdot, verkkosivuston ehdot',
    },
  },
};

export function getPageSeo(path: string, locale: Locale): PageSeoContent {
  const pageContent = pageSeoContent[path];
  if (!pageContent) {
    return {
      title: 'CBD Raw Materials',
      description: 'VETRUX — the CBD raw material brand operated by Vetrux Biotechnology (Chuxiong) Co., Ltd., based in Yunnan, China.',
    };
  }
  return pageContent[locale] ?? pageContent.en;
}
