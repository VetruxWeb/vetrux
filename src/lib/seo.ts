import type { Metadata } from 'next';
import { articles } from '../content/articles';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const defaultImage = '/images/hero/facility-hero.webp';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Yunnan Vetrux',
  url: 'https://www.vetrux.tech',
  logo: 'https://www.vetrux.tech/favicon.svg',
  description:
    'Vertically integrated CBD isolate manufacturer in Yunnan, China. Supplying bulk pharmaceutical-grade CBD isolate (≥99.5% purity, THC-free) to European B2B buyers via supercritical CO₂ extraction.',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Yunnan Province',
    addressCountry: 'CN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'postmaster@vetrux.tech',
    telephone: '+86-871-8800-0000',
    availableLanguage: ['English', 'Chinese'],
  },
  areaServed: [
    { '@type': 'Continent', name: 'Europe' },
    { '@type': 'Place', name: 'Global' },
  ],
  sameAs: [
    'https://www.vetrux.tech/about',
  ],
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CBD Isolate (≥99.5% Purity)',
  description:
    'Pharmaceutical-grade CBD isolate powder, ≥99.5% purity, THC-free (non-detect), white crystalline powder. Produced via supercritical CO₂ extraction in a cGMP-certified facility. Available in 1kg, 5kg, and 25kg packaging. CAS 13956-29-1.',
  brand: { '@type': 'Brand', name: 'Yunnan Vetrux' },
  manufacturer: {
    '@type': 'Organization',
    name: 'Yunnan Vetrux',
    url: 'https://www.vetrux.tech',
  },
  category: 'CBD Isolate',
  material: 'Cannabidiol (CBD)',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Purity', value: '≥99.5%' },
    { '@type': 'PropertyValue', name: 'THC Content', value: 'Non-detect (ND)' },
    { '@type': 'PropertyValue', name: 'CAS Number', value: '13956-29-1' },
    { '@type': 'PropertyValue', name: 'Molecular Formula', value: 'C₂₁H₃₀O₂' },
    { '@type': 'PropertyValue', name: 'Molecular Weight', value: '314.46 g/mol' },
    { '@type': 'PropertyValue', name: 'Appearance', value: 'White crystalline powder' },
    { '@type': 'PropertyValue', name: 'Extraction Method', value: 'Supercritical CO₂' },
    { '@type': 'PropertyValue', name: 'Shelf Life', value: '24 months' },
    { '@type': 'PropertyValue', name: 'Packaging', value: '1 kg / 5 kg / 25 kg' },
    { '@type': 'PropertyValue', name: 'Certifications', value: 'ISO 9001:2015, GMP, HACCP' },
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    eligibleRegion: { '@type': 'Continent', name: 'Europe' },
    seller: { '@type': 'Organization', name: 'Yunnan Vetrux' },
    url: 'https://www.vetrux.tech/inquiry',
    priceValidUntil: '2026-12-31',
  },
  datePublished: '2025-01-01',
  dateModified: new Date().toISOString().split('T')[0],
};

const staticPageSeo: Record<string, SeoMetadata> = {
  '/': {
    title: 'Wholesale CBD Isolate Supplier | Bulk CBD Isolate Manufacturer — Yunnan Vetrux',
    description:
      'Yunnan Vetrux is a vertically integrated CBD isolate manufacturer in China supplying bulk pharmaceutical-grade CBD isolate (≥99.5% purity, THC-free) to European B2B buyers. Ton-scale capacity, cGMP facility, supercritical CO₂ extraction.',
    canonicalPath: '/',
    image: defaultImage,
    type: 'website',
    keywords:
      'CBD isolate supplier, bulk CBD isolate, wholesale CBD isolate, CBD isolate manufacturer, pharmaceutical grade CBD, THC-free CBD isolate, CBD isolate Europe, supercritical CO2 extraction, GMP CBD manufacturer',
    jsonLd: [organizationJsonLd, productJsonLd, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is CBD isolate and how is it different from full-spectrum CBD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CBD isolate is the purest form of cannabidiol — a white crystalline powder containing ≥99.5% CBD with all other cannabinoids, terpenes, and plant compounds removed. Unlike full-spectrum CBD which retains THC and other cannabinoids, CBD isolate is THC non-detect (ND), making it ideal for pharmaceutical and nutraceutical formulations requiring precise dosing and regulatory compliance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What certifications does Yunnan Vetrux hold?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vetrux operates under ISO 9001:2015, GMP, and HACCP certifications. Our facility follows FDA 21 CFR Part 211 and EU GMP Annex 1 standards. All testing is performed by ISO/IEC 17025-accredited laboratories, and every batch ships with a full Certificate of Analysis (COA).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the minimum order quantity for wholesale CBD isolate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vetrux offers CBD isolate starting from 1 kg for sample and trial orders. Volume pricing begins at 5 kg, with significant discounts at 100 kg+ and ton-scale annual contracts. Available in 1 kg, 5 kg, and 25 kg packaging.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Vetrux ensure THC-free compliance for European buyers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every batch of Vetrux CBD isolate undergoes GC-MS testing at accredited laboratories to confirm THC non-detect (ND) status. Our supercritical CO₂ extraction and multi-stage chromatographic purification process ensures compliance with EU Novel Food THC limits. Full documentation including COA, Certificate of Origin, and SDS is provided with each shipment.',
          },
        },
        {
          '@type': 'Question',
          name: 'What shipping terms are available for European buyers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vetrux offers FOB Kunming, CIF Rotterdam, and DDP delivery to European destinations. Standard lead time is 10–14 business days from order confirmation. All shipments include batch-specific COA, Certificate of Origin, and Safety Data Sheet.',
          },
        },
      ],
    }],
  },
  '/products/cbd-isolate': {
    title: 'CBD Isolate ≥99.5% Purity — Pharmaceutical Grade | Wholesale Pricing — Yunnan Vetrux',
    description:
      'Pharmaceutical-grade CBD isolate with ≥99.5% purity, THC-free (non-detect). Full COA available, HPLC tested, ISO 9001 & GMP certified. Bulk packaging 1–25 kg. Request wholesale pricing for European delivery.',
    canonicalPath: '/products/cbd-isolate',
    image: '/images/products/product2.jpg',
    type: 'website',
    keywords:
      'CBD isolate 99.5% purity, pharmaceutical grade CBD isolate, THC-free CBD isolate, CBD isolate COA, CBD isolate specification, bulk CBD isolate, CBD isolate wholesale price, CBD isolate Europe',
    jsonLd: [
      productJsonLd,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the purity of Vetrux CBD isolate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vetrux CBD isolate has a minimum purity of 99.5%, verified by third-party HPLC testing. Each batch comes with a full Certificate of Analysis (COA).',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Vetrux CBD isolate THC-free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Vetrux CBD isolate is THC non-detect (ND), confirmed by GC-MS testing at accredited laboratories. It complies with EU Novel Food THC limits.',
            },
          },
          {
            '@type': 'Question',
            name: 'What certifications does Vetrux CBD isolate have?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vetrux CBD isolate is produced in an ISO 9001:2015, GMP, and HACCP certified facility. Testing follows USP, ICH Q3C, and ISO/IEC 17025 standards.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the minimum order quantity for bulk CBD isolate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vetrux supplies CBD isolate in 1 kg, 5 kg, and 25 kg packaging. For ton-scale orders, contact our wholesale team for custom logistics and DDP/CIF/FOB pricing to Europe.',
            },
          },
        ],
      },
    ],
  },
  '/equipment': {
    title: 'cGMP Supercritical CO₂ Extraction Facility | CBD Manufacturing Equipment — Yunnan Vetrux',
    description:
      'Tour Yunnan Vetrux\'s cGMP-certified extraction facility featuring 6m³ supercritical CO₂ extraction vessels, chromatography columns, and pharmaceutical-grade refinement equipment. FDA 21 CFR Part 211 & EU GMP Annex 1 compliant.',
    canonicalPath: '/equipment',
    image: '/images/equipment/chromatography-column-700L.webp',
    type: 'website',
    keywords:
      'supercritical CO2 extraction equipment, CBD extraction facility, cGMP CBD manufacturing, chromatography CBD purification, pharmaceutical grade extraction, CBD manufacturing equipment',
    jsonLd: [
      organizationJsonLd,
      {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: 'Yunnan Vetrux Extraction Facility',
        description:
          'cGMP-certified supercritical CO₂ extraction facility for pharmaceutical-grade CBD isolate manufacturing. Equipped with 6m³ extraction vessels, chromatography columns, and multi-stage crystallization systems.',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Yunnan Province',
          addressCountry: 'CN',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What extraction method does Vetrux use for CBD isolate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vetrux uses supercritical CO₂ extraction at 31.1°C / 73.8 bar — the critical point where CO₂ acts as a selective, solvent-free extractant. This preserves full cannabinoid molecular integrity without thermal degradation and leaves zero residual solvents in the final product.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the capacity of the Vetrux extraction facility?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The facility features 6m³ supercritical CO₂ extraction vessels (SUS316L, rated to 45 MPa), 1,000L single-effect concentrators with 200 kg/hr evaporation capacity, and high-purity chromatography columns achieving ≥99.5% purity. Annual production capacity is at ton-scale.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is the Vetrux facility compliant with international GMP standards?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The facility operates under cGMP certification with processes compliant to FDA 21 CFR Part 211 and EU GMP Annex 1 standards. ISO 9001:2015 and HACCP certifications are also maintained.',
            },
          },
        ],
      },
    ],
  },
  '/planting': {
    title: 'Vertically Integrated Hemp Cultivation | Seed-to-Isolate Traceability — Yunnan Vetrux',
    description:
      'Vetrux operates a vertically integrated hemp cultivation base in Yunnan Province, China. Controlled-environment agriculture with full seed-to-isolate traceability, zero synthetic pesticides, and ≥97% germination rate.',
    canonicalPath: '/planting',
    image: '/images/planting/plant3.jpg',
    type: 'website',
    keywords:
      'hemp cultivation Yunnan, CBD hemp farming, vertical integration CBD, seed to isolate traceability, controlled environment agriculture hemp, organic hemp cultivation China',
    jsonLd: [
      organizationJsonLd,
      {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: 'Yunnan Vetrux Hemp Cultivation Base',
        description:
          'Vertically integrated hemp cultivation base in Yunnan Province with controlled-environment agriculture, zero synthetic pesticides, full seed-to-isolate traceability, and ≥97% germination rate.',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Yunnan Province',
          addressCountry: 'CN',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where does Vetrux grow its hemp?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vetrux operates its own hemp cultivation base in Yunnan Province, Southwest China — one of the world\'s premier regions for industrial hemp due to its altitude, climate, and biodiversity. Yunnan was the first Chinese province to legalize industrial hemp cultivation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Vetrux use pesticides in hemp cultivation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Vetrux uses zero synthetic pesticides in its cultivation program. Our controlled-environment agriculture system (22°C ±0.5°C, 65–75% RH) minimizes pest pressure naturally. Every batch is tested for 400+ pesticide residues to confirm compliance.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does seed-to-isolate traceability mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Seed-to-isolate traceability means Vetrux controls and documents every stage of production — from cultivar selection and planting, through biomass harvesting, extraction, purification, and final batch release. This vertical integration ensures consistent quality and full supply chain transparency.',
            },
          },
        ],
      },
    ],
  },
  '/gallery': {
    title: 'CBD Manufacturing Facility Gallery | Production & Laboratory — Yunnan Vetrux',
    description:
      'Visual tour of Yunnan Vetrux\'s CBD isolate manufacturing campus — extraction facility, planting base, refinement laboratory, and quality control operations.',
    canonicalPath: '/gallery',
    image: '/images/hero/facility-hero.webp',
    type: 'website',
    keywords: 'CBD manufacturing facility, CBD extraction facility photos, CBD laboratory, hemp cultivation base',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Yunnan Vetrux Manufacturing Facility Gallery',
      description:
        'Visual tour of Yunnan Vetrux\'s CBD isolate manufacturing campus — extraction facility, planting base, refinement laboratory, and quality control operations.',
      publisher: {
        '@type': 'Organization',
        name: 'Yunnan Vetrux',
        url: 'https://www.vetrux.tech',
      },
    },
  },
  '/inquiry': {
    title: 'Request Wholesale CBD Isolate Quote | B2B Inquiry — Yunnan Vetrux',
    description:
      'Contact Yunnan Vetrux for bulk CBD isolate wholesale pricing, COA documentation, product specifications, and custom logistics (DDP/CIF/FOB) to Europe. Ton-scale supply available.',
    canonicalPath: '/inquiry',
    image: defaultImage,
    type: 'website',
    keywords:
      'wholesale CBD isolate inquiry, bulk CBD isolate quote, CBD isolate wholesale pricing, CBD isolate Europe delivery, B2B CBD supplier contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Wholesale CBD Isolate Inquiry',
      description:
        'Contact Yunnan Vetrux for bulk CBD isolate wholesale pricing, COA documentation, and custom logistics to Europe.',
      publisher: organizationJsonLd,
    },
  },
  '/blog': {
    title: 'CBD Industry Insights | Extraction Technology & Compliance — Yunnan Vetrux Blog',
    description:
      'Expert articles on CBD extraction technology, global compliance standards, supply chain optimization, and market analysis for B2B CBD isolate buyers and formulators.',
    canonicalPath: '/blog',
    image: defaultImage,
    type: 'website',
    keywords:
      'CBD extraction technology, CBD compliance standards, CBD industry analysis, CBD supply chain, CBD isolate sourcing guide',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Yunnan Vetrux Blog — CBD Industry Insights',
      description:
        'Expert articles on CBD extraction technology, global compliance standards, supply chain optimization, and market analysis for B2B CBD isolate buyers.',
      publisher: organizationJsonLd,
      url: 'https://www.vetrux.tech/blog',
    },
  },
  '/wholesale-cbd-isolate': {
    title: 'Wholesale CBD Isolate | Bulk Pricing & Volume Discounts — Yunnan Vetrux',
    description:
      'Buy wholesale CBD isolate at volume-tiered pricing. Pharmaceutical-grade ≥99.5% purity, THC-free. FOB, CIF, and DDP shipping to Europe. 1 kg to ton-scale supply from a cGMP-certified manufacturer.',
    canonicalPath: '/wholesale-cbd-isolate',
    image: '/images/products/product2.jpg',
    type: 'website',
    keywords:
      'wholesale CBD isolate, bulk CBD isolate pricing, CBD isolate wholesale price, buy CBD isolate bulk, CBD isolate volume discount, CBD isolate DDP Europe',
    jsonLd: [
      productJsonLd,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the minimum order quantity for wholesale CBD isolate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vetrux offers CBD isolate starting from 1 kg for sample/trial orders. Volume discounts begin at 5 kg, with significant pricing advantages at 100 kg+ and ton-scale annual contracts.',
            },
          },
          {
            '@type': 'Question',
            name: 'What shipping terms are available for wholesale CBD isolate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vetrux offers FOB Kunming, CIF Rotterdam, and DDP delivery to European destinations. Standard lead time is 10–14 business days from order confirmation.',
            },
          },
          {
            '@type': 'Question',
            name: 'What documentation is included with wholesale CBD isolate orders?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every shipment includes a batch-specific Certificate of Analysis from an ISO/IEC 17025-accredited laboratory, Certificate of Origin, and Safety Data Sheet. GMP certificates and facility audit documentation available on request.',
            },
          },
        ],
      },
    ],
  },
  '/quality-assurance': {
    title: 'CBD Isolate Quality Assurance | cGMP Testing & Certifications — Yunnan Vetrux',
    description:
      'Vetrux quality assurance program for CBD isolate: ISO 9001, GMP, HACCP certifications. Full analytical testing panel (HPLC, GC-MS, ICP-MS) on every batch. Third-party COA from ISO/IEC 17025 labs.',
    canonicalPath: '/quality-assurance',
    image: '/images/equipment/chromatography-column-700L.webp',
    type: 'website',
    keywords:
      'CBD isolate quality assurance, CBD COA testing, GMP CBD manufacturer, ISO 9001 CBD, HACCP CBD, pharmaceutical grade CBD testing, CBD heavy metals testing, CBD residual solvents',
    jsonLd: [
      organizationJsonLd,
      productJsonLd,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What quality testing does Vetrux perform on each batch?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every batch undergoes a comprehensive analytical panel: HPLC for CBD potency, GC-MS for THC verification (non-detect), ICP-MS for heavy metals (USP <232>/<233>), 400+ pesticide residue screening, mycotoxin ELISA, and ICH Q3C residual solvent analysis. All testing is performed by ISO/IEC 17025-accredited laboratories.',
            },
          },
          {
            '@type': 'Question',
            name: 'What certifications does the Vetrux manufacturing facility hold?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vetrux holds ISO 9001:2015, GMP, and HACCP certifications. Our processes comply with FDA 21 CFR Part 211 and EU GMP Annex 1 standards. Facility audit documentation is available upon request for qualified B2B buyers.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I verify the Certificate of Analysis (COA) for my order?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Each shipment includes a batch-specific COA from an ISO/IEC 17025-accredited third-party laboratory. The COA includes cannabinoid profile (HPLC), THC content (GC-MS), heavy metals, pesticide residues, microbial limits, and residual solvents. COA samples are available upon inquiry.',
            },
          },
        ],
      },
    ],
  },
  '/cbd-isolate-manufacturer': {
    title: 'CBD Isolate Manufacturer | Seed-to-Isolate Vertical Integration — Yunnan Vetrux',
    description:
      'Yunnan Vetrux is a vertically integrated CBD isolate manufacturer with in-house hemp cultivation, supercritical CO₂ extraction, chromatographic purification, and pharmaceutical-grade QC. Supplying ≥99.5% purity, THC-free CBD isolate to B2B buyers globally.',
    canonicalPath: '/cbd-isolate-manufacturer',
    image: '/images/hero/facility-hero.webp',
    type: 'website',
    keywords:
      'CBD isolate manufacturer, CBD manufacturer China, CBD isolate factory, vertical integration CBD, supercritical CO2 CBD manufacturer, pharmaceutical grade CBD manufacturer, bulk CBD isolate producer',
    jsonLd: [
      organizationJsonLd,
      productJsonLd,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why choose a vertically integrated CBD isolate manufacturer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vertical integration means the manufacturer controls every stage from hemp cultivation to final isolate production. This ensures consistent quality, full traceability, lower contamination risk, and more competitive pricing by eliminating intermediaries. Vetrux controls seed selection, cultivation, extraction, purification, and QC in-house.',
            },
          },
          {
            '@type': 'Question',
            name: 'What makes Yunnan Province ideal for CBD manufacturing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yunnan Province was the first region in China to legalize industrial hemp cultivation. Its high altitude, subtropical climate, and rich biodiversity create optimal growing conditions for high-CBD hemp cultivars. Yunnan\'s established regulatory framework and agricultural infrastructure support large-scale, compliant hemp production.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can Vetrux provide facility audit access for B2B buyers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Vetrux welcomes facility audits from qualified B2B buyers and their third-party auditors. GMP certificates, ISO 9001 documentation, and facility audit reports are available upon request through our inquiry process.',
            },
          },
        ],
      },
    ],
  },
  '/about': {
    title: 'About Yunnan Vetrux | Vertically Integrated CBD Isolate Manufacturer',
    description:
      'Learn about Yunnan Vetrux — a vertically integrated CBD isolate manufacturer in Yunnan, China. ISO 9001, GMP, HACCP certified. Supplying pharmaceutical-grade CBD isolate (≥99.5% purity) to European B2B buyers.',
    canonicalPath: '/about',
    image: '/images/hero/facility-hero.webp',
    type: 'website',
    keywords:
      'about Yunnan Vetrux, CBD isolate manufacturer China, vertically integrated CBD, Yunnan hemp manufacturer',
    jsonLd: organizationJsonLd,
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Yunnan Vetrux',
    description:
      'Privacy Policy for Yunnan Vetrux website. Learn how we collect, use, and protect your personal data when you visit our site or submit a B2B inquiry.',
    canonicalPath: '/privacy-policy',
    image: '/images/hero/facility-hero.webp',
    type: 'website',
  },
  '/terms-of-service': {
    title: 'Terms of Service — Yunnan Vetrux',
    description:
      'Terms of Service for the Yunnan Vetrux website. Read our terms governing the use of our B2B wholesale CBD isolate platform.',
    canonicalPath: '/terms-of-service',
    image: '/images/hero/facility-hero.webp',
    type: 'website',
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
        title: `${article.title} | Yunnan Vetrux Blog`,
        description: article.excerpt,
        canonicalPath: `/blog/${article.slug}`,
        image: article.image || defaultImage,
        type: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          image: article.image || defaultImage,
          datePublished: article.date,
          dateModified: article.date,
          author: {
            '@type': 'Organization',
            name: 'Yunnan Vetrux',
            url: 'https://www.vetrux.tech',
            description: 'Vertically integrated CBD isolate manufacturer in Yunnan, China. ISO 9001, GMP, HACCP certified. Specializing in pharmaceutical-grade CBD isolate (≥99.5% purity) for B2B buyers.',
            sameAs: ['https://www.vetrux.tech/about'],
          },
          publisher: {
            '@type': 'Organization',
            name: 'Yunnan Vetrux',
            url: 'https://www.vetrux.tech',
            logo: 'https://www.vetrux.tech/favicon.svg',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.vetrux.tech/blog/${article.slug}`,
          },
        },
      };
    }
  }

  return (
    staticPageSeo[pathname] ?? {
      title: 'Yunnan Vetrux — Wholesale CBD Isolate Manufacturer',
      description:
        'Yunnan Vetrux is a vertically integrated CBD isolate manufacturer supplying bulk pharmaceutical-grade CBD isolate to B2B buyers worldwide.',
      canonicalPath: pathname || '/',
      image: defaultImage,
      type: 'website',
    }
  );
}

export function buildMetadata(pathname: string): Metadata {
  const seo = getSeoMetadata(pathname);
  const baseUrl = getBaseUrl();
  const imageUrl = seo.image ? `${baseUrl}${seo.image}` : undefined;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: `${baseUrl}${seo.canonicalPath}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${baseUrl}${seo.canonicalPath}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      type: seo.type === 'article' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
