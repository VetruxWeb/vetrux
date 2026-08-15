import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildGalleryMetadata, getSeoMetadata } from '@/lib/seo';
import { gallerySlugs, getGallerySector } from '@/lib/gallery';
import GallerySectorPageClient from '@/components/pages/GallerySectorPageClient';

export function generateStaticParams() {
  return gallerySlugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildGalleryMetadata(slug, 'en');
}

export default async function GallerySectorPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = getGallerySector(slug);
  if (!sector) notFound();

  const seo = getSeoMetadata(`/gallery/${slug}`);
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
      <GallerySectorPageClient locale="en" slug={slug} />
    </>
  );
}
