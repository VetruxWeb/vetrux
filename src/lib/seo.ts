import type { Metadata } from 'next';
import { getArticle, getArticleLocales } from '../content/articles';
import { getProductBySlug } from '../content/pages/products.data';
import { getGallerySector } from '@/lib/gallery';
import { locales, localeMeta, localizePath, type Locale } from '@/i18n/locales';
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
  locale?: Locale;
}

const breadcrumbLabels: Record<Locale, { home: string; blog: string; products: string }> = {
  en: { home: 'Home', blog: 'Blog', products: 'Products' },
  de: { home: 'Startseite', blog: 'Blog', products: 'Produkte' },
  fr: { home: 'Accueil', blog: 'Blog', products: 'Produits' },
  es: { home: 'Inicio', blog: 'Blog', products: 'Productos' },
  it: { home: 'Home', blog: 'Blog', products: 'Prodotti' },
  pt: { home: 'Início', blog: 'Blog', products: 'Produtos' },
  ja: { home: 'ホーム', blog: 'ブログ', products: '製品' },
  fi: { home: 'Etusivu', blog: 'Blogi', products: 'Tuotteet' },
};

/**
 * Build Article + BreadcrumbList JSON-LD for a blog post.
 * The URLs and breadcrumb labels match the page's real localized route.
 */
export function buildArticleJsonLd(input: ArticleSchemaInput): Record<string, unknown>[] {
  const image = input.image || defaultImage;
  const published = input.datePublished || '';
  const locale = input.locale || 'en';
  const articlePath = localizePath(`/blog/${input.slug}`, locale);
  const labels = breadcrumbLabels[locale];
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
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
        logo: siteLogo,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}${articlePath}`,
      },
    },
    buildBreadcrumbJsonLd([
      { name: labels.home, path: localizePath('/', locale) },
      { name: labels.blog, path: localizePath('/blog', locale) },
      { name: input.title, path: articlePath },
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
  locale?: Locale;
}

/**
 * Build Product + BreadcrumbList JSON-LD for a localized static product page.
 */
export function buildProductJsonLd(input: ProductSchemaInput): Record<string, unknown>[] {
  const locale = input.locale || 'en';
  const productPath = localizePath(`/products/${input.slug}`, locale);
  const labels = breadcrumbLabels[locale];
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
    url: `${siteUrl}${productPath}`,
    manufacturer: {
      '@type': 'Organization',
      name: 'Vetrux Biotechnology (Chuxiong) Co., Ltd.',
      url: siteUrl,
    },
    category: input.category || 'CBD Raw Materials',
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
      { name: labels.home, path: localizePath('/', locale) },
      { name: labels.products, path: localizePath('/products', locale) },
      { name: input.name, path: productPath },
    ]),
  ];
}


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
      websiteJsonLd,
      organizationJsonLd,
      buildWebPageJsonLd(
        '/',
        'CBD Isolate Manufacturer in China | Bulk B2B Supplier | Vetrux',
        'Vetrux supplies bulk CBD isolate for B2B buyers from Yunnan, China, with OEM/ODM support, in-house quality control, and buyer documentation support.',
      ),
      buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }]),
    ],
  },
  '/products': {
    title: 'CBD Raw Material Products | Bulk Isolate & Oil',
    description:
      'Browse Vetrux CBD raw material products, including bulk CBD isolate, for qualified B2B buyers. Product information, packaging details, and documentation support by order requirements.',
    canonicalPath: '/products',
    image: '/images/vetrux_images/cbd-isolate-crystals-white-powder.jpg',
    type: 'website',
    keywords:
      'CBD raw material products, bulk CBD isolate, CBD product catalog, B2B CBD products',
    jsonLd: [
      organizationJsonLd,
      buildWebPageJsonLd(
        '/products',
        'CBD Raw Material Products | Bulk Isolate & Oil',
        'Browse Vetrux CBD raw material products, including bulk CBD isolate, for qualified B2B buyers. Product information, packaging details, and documentation support by order requirements.',
      ),
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
      ]),
    ],
  },
  '/equipment': {
    title: 'Equipment Configuration | Extraction & Processing Facility',
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
    title: 'Cultivation & Breeding Center | Standardized Planting System',
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
    title: 'Facility Gallery | Production Site & Cultivation Base',
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
    title: 'Main Campus & Infrastructure | Gallery',
    description:
      'VETRUX industrial campus in Chuxiong, Yunnan — production, processing, and quality-control infrastructure under one roof.',
    canonicalPath: '/gallery/campus',
    image: '/images/gallery/campus-aerial.png',
    type: 'website',
    keywords: 'CBD facility campus, Vetrux Yunnan production site, CBD manufacturing infrastructure',
  },
  '/gallery/cultivation': {
    title: 'Planting Base & Cultivation | Gallery',
    description:
      'VETRUX cultivation base in Yunnan province — standardized hemp growing, breeding center, and full seed-to-harvest traceability.',
    canonicalPath: '/gallery/cultivation',
    image: '/images/gallery/cultivation-field.jpg',
    type: 'website',
    keywords: 'hemp cultivation base, Yunnan hemp farm, CBD raw material cultivation, traceable hemp growing',
  },
  '/gallery/extraction': {
    title: 'Extraction & Refinement | Gallery',
    description:
      'VETRUX extraction facility — 20 extraction tanks, 26 chromatography columns, 10 concentrators, and HPLC analytical systems.',
    canonicalPath: '/gallery/extraction',
    image: '/images/equipment/extraction-tanks.jpg',
    type: 'website',
    keywords: 'CBD extraction facility, chromatography columns, extraction tanks, HPLC system, CBD refinement',
  },
  '/gallery/products': {
    title: 'Product & Laboratory | Gallery',
    description:
      'VETRUX CBD isolate visuals — laboratory review, packaging, and export-ready presentation.',
    canonicalPath: '/gallery/products',
    image: '/images/products/cbd-crystal-closeup.jpg',
    type: 'website',
    keywords: 'CBD isolate product, CBD packaging, CBD laboratory, CBD isolate visuals',
  },
  '/process': {
    title: 'From Seed to Isolate | Our Process',
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
    title: 'B2B Inquiry | CBD Raw Materials & OEM/ODM',
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
    title: 'Blog | CBD Industry Knowledge',
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
    title: 'Bulk CBD Isolate Supplier | Wholesale CBD Isolate',
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
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Wholesale CBD Isolate', path: '/wholesale-cbd-isolate' },
      ]),
    ],
  },
  '/quality-assurance': {
    title: 'CBD Isolate COA, SDS & Quality Assurance',
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
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Quality Assurance', path: '/quality-assurance' },
      ]),
    ],
  },
  '/cbd-isolate-manufacturer': {
    title: 'CBD Isolate Manufacturer in China',
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
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'CBD Isolate Manufacturer', path: '/cbd-isolate-manufacturer' },
      ]),
    ],
  },
  '/about': {
    title: 'About Us | Company Profile',
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
    title: 'Privacy Policy',
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
    title: 'Terms of Service',
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

export function getSeoMetadata(pathname: string, locale: Locale = 'en'): SeoMetadata {
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    const slug = pathname.replace('/blog/', '');
    const article = getArticle(slug, locale);
    if (article) {
      return {
        title: article.title,
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
          locale,
        }),
      };
    }
  }

  return (
    staticPageSeo[pathname] ?? {
      title: 'CBD Raw Materials',
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
  '/products',
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

function buildAlternates(
  baseUrl: string,
  canonicalPath: string,
  locale: Locale = 'en',
  availableLocales: readonly Locale[] = locales,
): Metadata['alternates'] {
  const localizedCanonical = localizePath(canonicalPath, locale);
  const alternates: NonNullable<Metadata['alternates']> = {
    canonical: `${baseUrl}${localizedCanonical}`,
  };

  if (localizedRoutePaths.has(canonicalPath) || availableLocales.length > 1) {
    const languages: Record<string, string> = {};
    for (const loc of availableLocales) {
      languages[localeMeta[loc].hreflang] = `${baseUrl}${localizePath(canonicalPath, loc)}`;
    }
    languages['x-default'] = `${baseUrl}${canonicalPath}`;
    alternates.languages = languages;
  }

  return alternates;
}

export function buildMetadata(pathname: string, locale: Locale = 'en'): Metadata {
  const seo = getSeoMetadata(pathname, locale);
  const baseUrl = getBaseUrl();
  const imageUrl = seo.image ? `${baseUrl}${seo.image}` : undefined;
  const localizedCanonical = localizePath(seo.canonicalPath, locale);

  // Article and product detail pages carry their own localized metadata; only
  // static routes fall back to the per-locale SEO table.
  const isContentPath =
    (pathname.startsWith('/blog/') && pathname !== '/blog') ||
    (pathname.startsWith('/products/') && pathname !== '/products');
  const localizedSeo = isContentPath ? null : getPageSeo(pathname, locale);
  const title = localizedSeo ? localizedSeo.title : seo.title;
  const description = localizedSeo ? localizedSeo.description : seo.description;
  const keywords = localizedSeo ? (localizedSeo.keywords ?? seo.keywords) : seo.keywords;

  // Homepage title is already the full brand headline — use `absolute` so the
  // layout's `%s — Vetrux CBD` template doesn't append the brand name twice.
  const titleMeta = pathname === '/' ? { absolute: title } : title;

  return {
    title: titleMeta,
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

interface ContentMetadataInput {
  title: string;
  description: string;
  /** Un-prefixed content path, e.g. `/products/cbd-isolate` or `/blog/<slug>`. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** Locale list that actually has localized content for this URL. */
  availableLocales: readonly Locale[];
}

/**
 * Build Metadata for locally sourced content pages (articles, products).
 * The hreflang cluster only advertises locales that really exist, and the
 * canonical always points at the current locale's URL.
 */
export function buildContentMetadata(
  input: ContentMetadataInput,
  locale: Locale = 'en',
): Metadata {
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}${localizePath(input.path, locale)}`;
  const imageUrl = input.image
    ? input.image.startsWith('http')
      ? input.image
      : `${baseUrl}${input.image}`
    : `${baseUrl}${defaultImage}`;

  const languages: Record<string, string> = {};
  for (const loc of input.availableLocales) {
    languages[localeMeta[loc].hreflang] = `${baseUrl}${localizePath(input.path, loc)}`;
  }
  languages['x-default'] = `${baseUrl}${input.path}`;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical, languages },
    openGraph: {
      siteName,
      title: input.title,
      description: input.description,
      url: canonical,
      locale: localeMeta[locale].ogLocale,
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

/** Metadata for a localized article detail page. */
export function buildArticleMetadata(slug: string, locale: Locale = 'en'): Metadata {
  const article = getArticle(slug, locale);
  if (!article) return {};
  return buildContentMetadata(
    {
      title: article.title,
      description: article.excerpt,
      path: `/blog/${article.slug}`,
      image: article.image || defaultImage,
      type: 'article',
      availableLocales: getArticleLocales(article.slug),
    },
    locale,
  );
}

/** Metadata for a localized product detail page (all eight locales exist). */
export function buildProductMetadata(slug: string, locale: Locale = 'en'): Metadata {
  const product = getProductBySlug(slug, locale);
  if (!product) return {};
  return buildContentMetadata(
    {
      title: product.name,
      description: product.description.slice(0, 160),
      path: `/products/${product.slug}`,
      image: product.heroImage || product.images[0],
      type: 'website',
      availableLocales: locales,
    },
    locale,
  );
}

const galleryTitleSuffix: Record<Locale, string> = {
  en: 'Vetrux Facility Gallery',
  de: 'Vetrux Anlagengalerie',
  fr: 'Galerie des installations Vetrux',
  es: 'Galería de instalaciones Vetrux',
  it: 'Galleria degli impianti Vetrux',
  pt: 'Galeria de instalações Vetrux',
  ja: 'Vetrux施設ギャラリー',
  fi: 'Vetruxin laitosgalleria',
};

/** Metadata for one localized gallery sector. */
export function buildGalleryMetadata(slug: string, locale: Locale = 'en'): Metadata {
  const sector = getGallerySector(slug);
  if (!sector) return {};
  const content = sector.content[locale];
  return buildContentMetadata(
    {
      title: `${content.title} | ${galleryTitleSuffix[locale]}`,
      description: content.description,
      path: `/gallery/${sector.slug}`,
      image: sector.cover.src,
      type: 'website',
      availableLocales: locales,
    },
    locale,
  );
}
