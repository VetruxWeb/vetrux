import { articles } from '../content/articles';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article';
}

const defaultImage = '/images/hero/facility-hero.webp';

const staticPageSeo: Record<string, SeoMetadata> = {
  '/': {
    title: 'Yunnan Vetrux | Botanical Extract Manufacturing for B2B Buyers',
    description:
      'Explore Yunnan Vetrux, a botanical extract manufacturing website focused on B2B product information, facility overview, and wholesale inquiries.',
    canonicalPath: '/',
    image: defaultImage,
    type: 'website',
  },
  '/products/cbd-isolate': {
    title: 'CBD Isolate Product Overview | Yunnan Vetrux',
    description:
      'Review the current CBD isolate product overview from Yunnan Vetrux, including product presentation, inquiry options, and technical information requests.',
    canonicalPath: '/products/cbd-isolate',
    image: '/images/products/product2.jpg',
    type: 'website',
  },
  '/equipment': {
    title: 'Extraction Equipment Overview | Yunnan Vetrux',
    description:
      'See the current extraction equipment and facility presentation from Yunnan Vetrux, including process overview and B2B inquiry options.',
    canonicalPath: '/equipment',
    image: '/images/equipment/chromatography-column-700L.webp',
    type: 'website',
  },
  '/planting': {
    title: 'Cultivation and Traceability Overview | Yunnan Vetrux',
    description:
      'Explore the current cultivation and traceability overview for Yunnan Vetrux, including planting workflow, source control, and inquiry paths.',
    canonicalPath: '/planting',
    image: '/images/planting/plant3.jpg',
    type: 'website',
  },
  '/gallery': {
    title: 'Facility and Process Gallery | Yunnan Vetrux',
    description:
      'Browse visual highlights from the Yunnan Vetrux website, including production, facility, and botanical process imagery.',
    canonicalPath: '/gallery',
    image: '/images/hero/facility-hero.webp',
    type: 'website',
  },
  '/inquiry': {
    title: 'Wholesale Inquiry | Yunnan Vetrux',
    description:
      'Contact Yunnan Vetrux for B2B wholesale discussions, documentation requests, and product inquiry follow-up.',
    canonicalPath: '/inquiry',
    image: defaultImage,
    type: 'website',
  },
  '/insights': {
    title: 'Industry Insights | Yunnan Vetrux',
    description:
      'Read current industry insight articles published on the Yunnan Vetrux website for buyers, sourcing teams, and formulation stakeholders.',
    canonicalPath: '/insights',
    image: defaultImage,
    type: 'website',
  },
};

function normalizeBaseUrl(origin: string): string {
  return origin.endsWith('/') ? origin.slice(0, -1) : origin;
}

export function getBaseUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (configured) {
    return normalizeBaseUrl(configured);
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    return normalizeBaseUrl(window.location.origin);
  }

  return 'https://www.vetrux.tech';
}

export function getSeoMetadata(pathname: string): SeoMetadata {
  if (pathname.startsWith('/insights/') && pathname !== '/insights') {
    const slug = pathname.replace('/insights/', '');
    const article = articles.find((entry) => entry.slug === slug);
    if (article) {
      return {
        title: `${article.title} | Yunnan Vetrux Insights`,
        description: article.excerpt,
        canonicalPath: `/insights/${article.slug}`,
        image: article.image || defaultImage,
        type: 'article',
      };
    }
  }

  return (
    staticPageSeo[pathname] ?? {
      title: 'Yunnan Vetrux',
      description:
        'Yunnan Vetrux provides botanical extract website information, facility overview pages, and B2B inquiry pathways.',
      canonicalPath: pathname || '/',
      image: defaultImage,
      type: 'website',
    }
  );
}
