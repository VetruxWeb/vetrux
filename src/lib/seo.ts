import type { Metadata } from 'next';
import { articles } from '../content/articles';
import { locales, localeMeta, localizePath, isLocalizedRoute, type Locale } from '@/i18n/locales';
import { getPageSeo } from '@/content/pages/seo.content';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const defaultImage = '/images/vetrux_images/cbd-ethanol-extraction-tank-6m3.jpg';
const siteUrl = 'https://www.vetrux.tech';
const siteName = 'Vetrux CBD';
const siteLogo = `${siteUrl}/logo.png`;

interface FaqItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vetrux Biotechnology (Chuxiong) Co., Ltd.',
  legalName: 'Vetrux Biotechnology (Chuxiong) Co., Ltd.',
  alternateName: ['VETRUX', 'Vetrux CBD', '蔚萃生物科技（楚雄）有限公司'],
  url: 'https://www.vetrux.tech',
  logo: siteLogo,
  description:
    'Vetrux Biotechnology (Chuxiong) Co., Ltd. operates the VETRUX brand — a vertically integrated CBD raw material manufacturer based in Chuxiong, Yunnan, China. Services include CBD raw material sales, OEM/ODM, and technical support.',
  foundingDate: '2026',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chuxiong',
    addressRegion: 'Yunnan Province',
    addressCountry: 'CN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'inquiry@vetrux.tech',
    availableLanguage: ['English', 'German', 'French', 'Spanish', 'Italian', 'Portuguese', 'Japanese', 'Finnish', 'Chinese'],
  },
  sameAs: [
    'https://www.linkedin.com/in/%E8%90%83-%E8%94%9A-994421408/',
    'https://x.com/VetruxCBD',
    'https://www.facebook.com/profile.php?id=61589338740056',
    'https://www.youtube.com/channel/UCTppL8lRF6EieMGZWwTq4aw',
  ],
};

export { organizationJsonLd };

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  alternateName: 'VETRUX',
  url: siteUrl,
  publisher: organizationJsonLd,
};

export { websiteJsonLd };

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CBD Isolate',
  image: `${siteUrl}/images/vetrux_images/cbd-isolate-crystals-white-powder.jpg`,
  description:
    'Crystalline CBD raw material supplied for qualified B2B discussions, with product information, packaging details, and documentation support available by order requirements.',
  brand: { '@type': 'Brand', name: 'VETRUX' },
  manufacturer: {
    '@type': 'Organization',
    name: 'Vetrux Biotechnology (Chuxiong) Co., Ltd.',
    url: siteUrl,
  },
  category: 'CBD Raw Materials',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'CBD Content', value: '99%+ reference value; confirm by batch-specific COA' },
    { '@type': 'PropertyValue', name: 'THC Content', value: '<0.05%; batch-specific verification applies' },
    { '@type': 'PropertyValue', name: 'CAS Number', value: '13956-29-1' },
    { '@type': 'PropertyValue', name: 'HS Code', value: '2907299020' },
    { '@type': 'PropertyValue', name: 'Packaging', value: '5 kg PE bags / 5 kg Aluminum Foil bags / Export Cartons' },
    { '@type': 'PropertyValue', name: 'Documentation', value: 'COA, SDS, test reports, and shipment documents may be provided according to order requirements and actual batch availability.' },
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'Vetrux Biotechnology (Chuxiong) Co., Ltd.' },
    url: `${siteUrl}/inquiry`,
  },
};

export function buildFaqJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

function buildWebPageJsonLd(path: string, name: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${siteUrl}${path}`,
    publisher: organizationJsonLd,
  };
}

interface ArticleSchemaInput {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Build Article + BreadcrumbList JSON-LD for a blog post.
 * Shared by static (markdown) and database-backed articles so both emit
 * identical structured data.
 */
export function buildArticleJsonLd(input: ArticleSchemaInput): Record<string, unknown>[] {
  const image = input.image || defaultImage;
  const published = input.datePublished || '';
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: input.title,
      description: input.excerpt,
      image: image.startsWith('http') ? image : `${siteUrl}${image}`,
      datePublished: published,
      dateModified: input.dateModified || published,
      author: {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
        description:
          'Editorial team at VETRUX — technical and regulatory analysis from Vetrux Biotechnology (Chuxiong) Co., Ltd., a vertically integrated CBD raw material manufacturer.',
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
        logo: siteLogo,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/blog/${input.slug}`,
      },
    },
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: input.title, path: `/blog/${input.slug}` },
    ]),
  ];
}

interface ProductSchemaInput {
  slug: string;
  name: string;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  specs?: { label: string; value: string }[];
}

/**
 * Build Product + BreadcrumbList JSON-LD for a database-backed product page.
 */
export function buildProductJsonLd(input: ProductSchemaInput): Record<string, unknown>[] {
  const image = input.image
    ? input.image.startsWith('http')
      ? input.image
      : `${siteUrl}${input.image}`
    : `${siteUrl}${defaultImage}`;

  const product: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    image,
    description:
      input.description ||
      `${input.name} supplied by Vetrux Biotechnology (Chuxiong) Co., Ltd. for qualified B2B discussions.`,
    brand: { '@type': 'Brand', name: 'VETRUX' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Vetrux Biotechnology (Chuxiong) Co., Ltd.',
      url: siteUrl,
    },
    category: input.category || 'CBD Raw Materials',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Vetrux Biotechnology (Chuxiong) Co., Ltd.' },
      url: `${siteUrl}/inquiry`,
    },
  };

  if (input.specs && input.specs.length > 0) {
    product.additionalProperty = input.specs.map((s) => ({
      '@type': 'PropertyValue',
      name: s.label,
      value: s.value,
    }));
  }

  return [
    product,
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: input.name, path: `/products/${input.slug}` },
    ]),
  ];
}


const homepageFaqJsonLd = buildFaqJsonLd([
  {
    question: 'What does Vetrux manufacture?',
    answer:
      'Vetrux manufactures bulk CBD isolate and related CBD raw material solutions for qualified B2B discussions, supported by cultivation, extraction, purification, quality-control, and packaging workflows in Yunnan, China.',
  },
  {
    question: 'Who does Vetrux serve?',
    answer:
      'Vetrux serves B2B buyers, brand owners, trading companies, channel partners, and formulation teams that need bulk CBD isolate, OEM/ODM support, documentation support, and recurring supply discussions.',
  },
  {
    question: 'What documents can buyers request?',
    answer:
      'Buyers can request COA, SDS, test reports, product information, commercial invoice, packing list, and export paperwork support. Availability depends on actual batch, order terms, and verification results.',
  },
  {
    question: 'Where is Vetrux based?',
    answer:
      'Vetrux Biotechnology (Chuxiong) Co., Ltd. is based in Chuxiong, Yunnan, China, with CBD raw material operations connected to local cultivation, processing, quality-control, and packaging workflows.',
  },
]);

const productFaqJsonLd = buildFaqJsonLd([
  {
    question: 'What is Vetrux CBD isolate?',
    answer:
      'Vetrux CBD isolate is a crystalline CBD raw material supplied for qualified B2B discussions, with product information, packaging details, and documentation support available by order requirements.',
  },
  {
    question: 'What packaging formats are available?',
    answer:
      'Available packaging includes 5 kg PE bags or 5 kg aluminum-foil bags packed in export cartons. Palletization with shrink wrap may be arranged according to order requirements.',
  },
  {
    question: 'What documents can be requested?',
    answer:
      'Buyers can request COA, SDS, test reports, product information, commercial invoice, packing list, and shipment documents. Batch-specific availability depends on actual batch, order terms, and verification results.',
  },
  {
    question: 'Who is responsible for import compliance?',
    answer:
      "Destination-country import compliance, including permits, licenses, approvals, labels, and customs declarations, is the buyer/importer's responsibility. Vetrux can provide documentation support by order terms.",
  },
]);

const manufacturerFaqJsonLd = buildFaqJsonLd([
  {
    question: 'Is Vetrux a CBD isolate manufacturer?',
    answer:
      'Yes. Vetrux Biotechnology (Chuxiong) Co., Ltd. is a China-based CBD isolate manufacturer supporting qualified B2B buyers with bulk CBD isolate, OEM/ODM cooperation, packaging, and documentation support.',
  },
  {
    question: 'What manufacturing capabilities does Vetrux operate?',
    answer:
      'Vetrux operates connected cultivation, extraction, purification, concentration, quality-control, and packaging workflows for CBD raw materials in Chuxiong, Yunnan, China.',
  },
  {
    question: 'Does Vetrux support OEM/ODM?',
    answer:
      'Yes. Vetrux supports OEM/ODM cooperation covering raw material support, formulation discussions, production coordination, packaging design, and finished product delivery according to project requirements.',
  },
  {
    question: 'What quality-control capabilities are available?',
    answer:
      'Vetrux has in-house HPLC analytical capability for quality-control support. Batch-specific documents depend on actual batch, order terms, and verification results.',
  },
]);

const wholesaleFaqJsonLd = buildFaqJsonLd([
  {
    question: 'Can B2B buyers request bulk CBD isolate?',
    answer:
      'Yes. Qualified B2B buyers can request bulk CBD isolate discussions, product information, packaging details, documentation support, and quote review through the Vetrux inquiry process.',
  },
  {
    question: 'What cooperation models are available?',
    answer:
      'Vetrux supports standard supply, long-term supply discussions, project-based cooperation, and OEM/ODM services for brand clients, channel partners, trading companies, and recurring procurement teams.',
  },
  {
    question: 'What packaging is used for bulk orders?',
    answer:
      'Bulk orders can use 5 kg PE bags or 5 kg aluminum-foil bags in export cartons, with palletization and shrink wrap arranged according to order requirements.',
  },
  {
    question: 'What should buyers prepare before requesting a quote?',
    answer:
      'Buyers should prepare target quantity, packaging needs, document requirements, intended application, destination market, delivery timeline, and importer compliance responsibilities before requesting a quote.',
  },
]);

const qualityFaqJsonLd = buildFaqJsonLd([
  {
    question: 'What documents can Vetrux provide?',
    answer:
      'Vetrux can provide COA, SDS, test reports, product information, commercial invoice, packing list, and shipment documents according to order requirements and actual batch availability.',
  },
  {
    question: 'How does Vetrux test CBD isolate quality?',
    answer:
      'Vetrux uses in-house HPLC analytical capability to support CBD isolate quality-control review. Additional batch-specific documents depend on actual batch, order terms, and verification results.',
  },
  {
    question: 'What is tested in-house vs batch-specific?',
    answer:
      'In-house HPLC supports analytical review during quality-control workflows. Batch-specific COA, SDS, test reports, and shipment documents depend on the actual batch, order terms, and verification results.',
  },
  {
    question: 'Who is responsible for import compliance?',
    answer:
      "Destination-country import compliance, including permits, licenses, approvals, labels, customs declarations, and regulatory review, is the buyer/importer's responsibility.",
  },
]);

const staticPageSeo: Record<string, SeoMetadata> = {
  '/': {
    title: 'CBD Isolate Manufacturer in China | Bulk B2B Supplier | Vetrux',
    description:
      'Vetrux supplies bulk CBD isolate for B2B buyers from Yunnan, China, with OEM/ODM support, in-house quality control, and buyer documentation support.',
    canonicalPath: '/',
    image: defaultImage,
    type: 'website',
    keywords:
      'CBD isolate manufacturer China, bulk CBD isolate supplier, B2B CBD isolate, CBD isolate OEM ODM, Vetrux CBD, Yunnan',
    jsonLd: [
      organizationJsonLd,
      buildWebPageJsonLd(
        '/',
        'CBD Isolate Manufacturer in China | Bulk B2B Supplier | Vetrux',
        'Vetrux supplies bulk CBD isolate for B2B buyers from Yunnan, China, with OEM/ODM support, in-house quality control, and buyer documentation support.',
      ),
      homepageFaqJsonLd,
      buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }]),
    ],
  },
  '/products/cbd-isolate': {
    title: 'CBD Isolate Specifications | Bulk CBD Isolate | Vetrux',
    description:
      'CBD isolate product information, packaging formats, documentation support, and B2B inquiry options for qualified bulk buyers.',
    canonicalPath: '/products/cbd-isolate',
    image: '/images/vetrux_images/cbd-isolate-crystals-white-powder.jpg',
    type: 'website',
    keywords:
      'CBD isolate specifications, bulk CBD isolate, CBD isolate packaging, CBD isolate COA, CBD isolate SDS',
    jsonLd: [
      organizationJsonLd,
      productJsonLd,
      buildWebPageJsonLd(
        '/products/cbd-isolate',
        'CBD Isolate Specifications | Bulk CBD Isolate | Vetrux',
        'CBD isolate product information, packaging formats, documentation support, and B2B inquiry options for qualified bulk buyers.',
      ),
      productFaqJsonLd,
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'CBD Isolate', path: '/products/cbd-isolate' },
      ]),
    ],
  },
  '/equipment': {
    title: 'Equipment Configuration | Extraction & Processing Facility — Vetrux CBD',
    description:
      'Vetrux CBD equipment configuration: 20 extraction tanks, 26 chromatography columns, 10 concentrators, HPLC analytical system (Thermo UltiMate 3000), and Siemens automation. Chuxiong, Yunnan.',
    canonicalPath: '/equipment',
    image: '/images/equipment/chromatography-column-700L.webp',
    type: 'website',
    keywords:
      'CBD extraction equipment, chromatography columns, extraction tanks, HPLC system, Siemens automation',
    jsonLd: [organizationJsonLd],
  },
  '/planting': {
    title: 'Cultivation & Breeding Center | Standardized Planting System — Vetrux CBD',
    description:
      'Vetrux operates a cultivation and breeding center in Chuxiong, Yunnan Province. Standardized, traceable cultivation system focused on quality consistency.',
    canonicalPath: '/planting',
    image: '/images/planting/flowering-cola-closeup.jpg',
    type: 'website',
    keywords:
      'hemp cultivation Yunnan, CBD hemp farming, standardized cultivation, seed selection, traceable planting system',
    jsonLd: [organizationJsonLd],
  },
  '/gallery': {
    title: 'Facility Gallery | Production Site & Cultivation Base — Vetrux CBD',
    description:
      'Visual overview of Vetrux CBD production site and cultivation base in Chuxiong, Yunnan — equipment, planting, and product visuals.',
    canonicalPath: '/gallery',
    image: '/images/hero/facility-hero.webp',
    type: 'website',
    keywords: 'CBD facility gallery, extraction equipment photos, hemp cultivation base',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Vetrux CBD Facility Gallery',
      description:
        'Visual overview of Vetrux CBD production site and cultivation base in Chuxiong, Yunnan.',
      publisher: {
        '@type': 'Organization',
        name: 'Vetrux CBD',
        url: 'https://www.vetrux.tech',
      },
    },
  },
  '/gallery/campus': {
    title: 'Main Campus & Infrastructure | Gallery — Vetrux CBD',
    description:
      'VETRUX industrial campus in Chuxiong, Yunnan — production, processing, and quality-control infrastructure under one roof.',
    canonicalPath: '/gallery/campus',
    image: '/images/gallery/campus-aerial.png',
    type: 'website',
    keywords: 'CBD facility campus, Vetrux Yunnan production site, CBD manufacturing infrastructure',
  },
  '/gallery/cultivation': {
    title: 'Planting Base & Cultivation | Gallery — Vetrux CBD',
    description:
      'VETRUX cultivation base in Yunnan province — standardized hemp growing, breeding center, and full seed-to-harvest traceability.',
    canonicalPath: '/gallery/cultivation',
    image: '/images/gallery/cultivation-field.jpg',
    type: 'website',
    keywords: 'hemp cultivation base, Yunnan hemp farm, CBD raw material cultivation, traceable hemp growing',
  },
  '/gallery/extraction': {
    title: 'Extraction & Refinement | Gallery — Vetrux CBD',
    description:
      'VETRUX extraction facility — 20 extraction tanks, 26 chromatography columns, 10 concentrators, and HPLC analytical systems.',
    canonicalPath: '/gallery/extraction',
    image: '/images/equipment/extraction-tanks.jpg',
    type: 'website',
    keywords: 'CBD extraction facility, chromatography columns, extraction tanks, HPLC system, CBD refinement',
  },
  '/gallery/products': {
    title: 'Product & Laboratory | Gallery — Vetrux CBD',
    description:
      'VETRUX CBD isolate visuals — laboratory review, packaging, and export-ready presentation.',
    canonicalPath: '/gallery/products',
    image: '/images/products/cbd-crystal-closeup.jpg',
    type: 'website',
    keywords: 'CBD isolate product, CBD packaging, CBD laboratory, CBD isolate visuals',
  },
  '/process': {
    title: 'From Seed to Isolate | Our Process — Vetrux CBD',
    description:
      'Controlled phases from Yunma-13 cultivation to CBD isolate workflows, with cultivation, extraction, purification, quality-control, and packaging support in Chuxiong, Yunnan.',
    canonicalPath: '/process',
    image: '/images/vetrux_images/hemp-growth-day-120-mature-field-1.jpg',
    type: 'website',
    keywords:
      'CBD manufacturing process, seed to isolate, CBD extraction process, hemp cultivation Yunnan, CBD isolate production',
    jsonLd: [organizationJsonLd],
  },
  '/inquiry': {
    title: 'B2B Inquiry | CBD Raw Materials & OEM/ODM — Vetrux CBD',
    description:
      'Contact Vetrux CBD for CBD raw material supply, OEM/ODM cooperation, and technical support inquiries.',
    canonicalPath: '/inquiry',
    image: defaultImage,
    type: 'website',
    keywords:
      'CBD inquiry, CBD raw material supply, OEM ODM CBD, B2B CBD contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'B2B Inquiry — Vetrux CBD',
      description:
        'Contact Vetrux CBD for CBD raw material supply, OEM/ODM cooperation, and technical support inquiries.',
      publisher: organizationJsonLd,
    },
  },
  '/blog': {
    title: 'Blog | CBD Industry Knowledge — Vetrux CBD',
    description:
      'Articles on CBD industry topics, extraction technology, compliance considerations, and supply chain knowledge.',
    canonicalPath: '/blog',
    image: defaultImage,
    type: 'website',
    keywords:
      'CBD industry insights, CBD extraction technology, CBD compliance, CBD supply chain',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Vetrux CBD Blog',
      description:
        'Articles on CBD industry topics, extraction technology, compliance considerations, and supply chain knowledge.',
      publisher: organizationJsonLd,
      url: 'https://www.vetrux.tech/blog',
    },
  },
  '/wholesale-cbd-isolate': {
    title: 'Bulk CBD Isolate Supplier | Wholesale CBD Isolate | Vetrux',
    description:
      'Wholesale CBD isolate supply for B2B buyers, with 5 kg packaging, documentation support, and OEM/ODM cooperation from Vetrux in China.',
    canonicalPath: '/wholesale-cbd-isolate',
    image: '/images/vetrux_images/cbd-isolate-5kg-foil-bag-packaging.jpg',
    type: 'website',
    keywords:
      'bulk CBD isolate supplier, wholesale CBD isolate, B2B CBD isolate, CBD isolate quote, CBD OEM ODM',
    jsonLd: [
      organizationJsonLd,
      buildWebPageJsonLd(
        '/wholesale-cbd-isolate',
        'Bulk CBD Isolate Supplier | Wholesale CBD Isolate | Vetrux',
        'Wholesale CBD isolate supply for B2B buyers, with 5 kg packaging, documentation support, and OEM/ODM cooperation from Vetrux in China.',
      ),
      wholesaleFaqJsonLd,
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Wholesale CBD Isolate', path: '/wholesale-cbd-isolate' },
      ]),
    ],
  },
  '/quality-assurance': {
    title: 'CBD Isolate COA, SDS & Quality Assurance | Vetrux',
    description:
      'Learn how Vetrux supports CBD isolate quality review with in-house HPLC analytical capability, COA/SDS support, test reports, and shipment documentation by order terms.',
    canonicalPath: '/quality-assurance',
    image: '/images/vetrux_images/cbd-isolate-hplc-quality-control-system.jpg',
    type: 'website',
    keywords:
      'CBD isolate COA, CBD isolate SDS, CBD quality assurance, HPLC analytical capability, CBD batch documents',
    jsonLd: [
      organizationJsonLd,
      buildWebPageJsonLd(
        '/quality-assurance',
        'CBD Isolate COA, SDS & Quality Assurance | Vetrux',
        'Learn how Vetrux supports CBD isolate quality review with in-house HPLC analytical capability, COA/SDS support, test reports, and shipment documentation by order terms.',
      ),
      qualityFaqJsonLd,
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Quality Assurance', path: '/quality-assurance' },
      ]),
    ],
  },
  '/cbd-isolate-manufacturer': {
    title: 'CBD Isolate Manufacturer in China | Vetrux',
    description:
      'Vetrux supplies bulk CBD isolate for B2B buyers from Yunnan, China, with in-house analytical capability, OEM/ODM support, and buyer documentation support.',
    canonicalPath: '/cbd-isolate-manufacturer',
    image: '/images/vetrux_images/cbd-ethanol-extraction-tank-6m3.jpg',
    type: 'website',
    keywords:
      'CBD isolate manufacturer China, CBD manufacturer Yunnan, bulk CBD isolate manufacturer, CBD isolate OEM ODM',
    jsonLd: [
      organizationJsonLd,
      buildWebPageJsonLd(
        '/cbd-isolate-manufacturer',
        'CBD Isolate Manufacturer in China | Vetrux',
        'Vetrux supplies bulk CBD isolate for B2B buyers from Yunnan, China, with in-house analytical capability, OEM/ODM support, and buyer documentation support.',
      ),
      manufacturerFaqJsonLd,
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'CBD Isolate Manufacturer', path: '/cbd-isolate-manufacturer' },
      ]),
    ],
  },
  '/about': {
    title: 'About Vetrux CBD | Company Profile',
    description:
      'VETRUX — the CBD raw material brand operated by Vetrux Biotechnology (Chuxiong) Co., Ltd. CBD raw material sales, OEM/ODM, and technical support. Based in Chuxiong, Yunnan, China.',
    canonicalPath: '/about',
    image: '/images/vetrux_images/cbd-ethanol-extraction-tank-6m3.jpg',
    type: 'website',
    keywords:
      'about Vetrux CBD, Vetrux Biotechnology, Chuxiong Yunnan, CBD brand',
    jsonLd: organizationJsonLd,
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Vetrux CBD',
    description:
      'Privacy Policy for Vetrux CBD website. Learn how we collect, use, and protect your personal data when you visit our site or submit a B2B inquiry.',
    canonicalPath: '/privacy-policy',
    image: '/images/vetrux_images/cbd-ethanol-extraction-tank-6m3.jpg',
    type: 'website',
    jsonLd: buildWebPageJsonLd(
      '/privacy-policy',
      'Privacy Policy — Vetrux CBD',
      'Privacy Policy for Vetrux CBD website. Learn how we collect, use, and protect your personal data when you visit our site or submit a B2B inquiry.',
    ),
  },
  '/terms-of-service': {
    title: 'Terms of Service — Vetrux CBD',
    description:
      'Terms of Service for the Vetrux CBD website.',
    canonicalPath: '/terms-of-service',
    image: '/images/vetrux_images/cbd-ethanol-extraction-tank-6m3.jpg',
    type: 'website',
    jsonLd: buildWebPageJsonLd(
      '/terms-of-service',
      'Terms of Service — Vetrux CBD',
      'Terms of Service for the Vetrux CBD website.',
    ),
  },
};

function normalizeBaseUrl(origin: string): string {
  return origin.endsWith('/') ? origin.slice(0, -1) : origin;
}

export function getBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return normalizeBaseUrl(configured);
  }

  return 'https://www.vetrux.tech';
}

export function getSeoMetadata(pathname: string): SeoMetadata {
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    const slug = pathname.replace('/blog/', '');
    const article = articles.find((entry) => entry.slug === slug);
    if (article) {
      return {
        title: `${article.title} | Vetrux CBD Blog`,
        description: article.excerpt,
        canonicalPath: `/blog/${article.slug}`,
        image: article.image || defaultImage,
        type: 'article',
        jsonLd: buildArticleJsonLd({
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          image: article.image || defaultImage,
          datePublished: article.date,
        }),
      };
    }
  }

  return (
    staticPageSeo[pathname] ?? {
      title: 'Vetrux CBD — CBD Raw Materials',
      description:
        'VETRUX — the CBD raw material brand operated by Vetrux Biotechnology (Chuxiong) Co., Ltd., based in Yunnan, China.',
      canonicalPath: pathname || '/',
      image: defaultImage,
      type: 'website',
    }
  );
}

const localizedRoutePaths = new Set([
  '/',
  '/products/cbd-isolate',
  '/inquiry',
  '/equipment',
  '/planting',
  '/process',
  '/gallery',
  '/about',
  '/blog',
  '/gallery/campus',
  '/gallery/cultivation',
  '/gallery/extraction',
  '/gallery/products',
  '/quality-assurance',
  '/wholesale-cbd-isolate',
  '/cbd-isolate-manufacturer',
  '/privacy-policy',
  '/terms-of-service',
]);

function buildAlternates(baseUrl: string, canonicalPath: string, locale: Locale = 'en'): Metadata['alternates'] {
  const localizedCanonical = localizePath(canonicalPath, locale);
  const alternates: NonNullable<Metadata['alternates']> = {
    canonical: `${baseUrl}${localizedCanonical}`,
  };

  if (localizedRoutePaths.has(canonicalPath)) {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
      languages[localeMeta[loc].hreflang] = `${baseUrl}${localizePath(canonicalPath, loc)}`;
    }
    languages['x-default'] = `${baseUrl}${canonicalPath}`;
    alternates.languages = languages;
  }

  return alternates;
}

export function buildMetadata(pathname: string, locale: Locale = 'en'): Metadata {
  const seo = getSeoMetadata(pathname);
  const baseUrl = getBaseUrl();
  const imageUrl = seo.image ? `${baseUrl}${seo.image}` : undefined;
  const localizedCanonical = localizePath(seo.canonicalPath, locale);

  const localizedSeo = getPageSeo(pathname, locale);
  const title = locale !== 'en' ? localizedSeo.title : seo.title;
  const description = locale !== 'en' ? localizedSeo.description : seo.description;
  const keywords = locale !== 'en' ? (localizedSeo.keywords ?? seo.keywords) : seo.keywords;

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates(baseUrl, seo.canonicalPath, locale),
    openGraph: {
      siteName,
      title,
      description,
      url: `${baseUrl}${localizedCanonical}`,
      locale: localeMeta[locale].ogLocale,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      type: seo.type === 'article' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

interface DynamicMetadataInput {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article';
}

/**
 * Build Metadata for database-backed pages (articles, products) that aren't in
 * the static SEO table. Resolves canonical/OG/Twitter consistently and accepts
 * both relative and absolute (e.g. Vercel Blob) image URLs.
 */
export function buildDynamicMetadata(input: DynamicMetadataInput): Metadata {
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}${input.canonicalPath}`;
  const imageUrl = input.image
    ? input.image.startsWith('http')
      ? input.image
      : `${baseUrl}${input.image}`
    : `${baseUrl}${defaultImage}`;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      siteName,
      title: input.title,
      description: input.description,
      url: canonical,
      locale: 'en_US',
      images: [{ url: imageUrl }],
      type: input.type === 'article' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
  };
}
