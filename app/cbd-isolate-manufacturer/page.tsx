import type { Metadata } from 'next';
import { getSeoMetadata, getBaseUrl } from '@/lib/seo';
import CbdIsolateManufacturerClient from '@/components/pages/CbdIsolateManufacturerClient';

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoMetadata('/cbd-isolate-manufacturer');
  const baseUrl = getBaseUrl();
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: `${baseUrl}${seo.canonicalPath}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${baseUrl}${seo.canonicalPath}`,
      images: seo.image ? [{ url: `${baseUrl}${seo.image}` }] : undefined,
      type: 'website',
    },
  };
}

export default function CbdIsolateManufacturerPage() {
  const seo = getSeoMetadata('/cbd-isolate-manufacturer');
  const jsonLd = seo.jsonLd;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]),
          }}
        />
      )}
      <CbdIsolateManufacturerClient />
    </>
  );
}
