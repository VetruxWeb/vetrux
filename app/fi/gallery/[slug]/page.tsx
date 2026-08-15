import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { gallerySlugs, getGallerySector } from '@/lib/gallery';
import { buildGalleryMetadata } from '@/lib/seo';
import GallerySectorPageClient from '@/components/pages/GallerySectorPageClient';

export function generateStaticParams() {
  return gallerySlugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildGalleryMetadata(slug, 'fi');
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const sector = getGallerySector(slug);
  if (!sector) notFound();
  return <GallerySectorPageClient locale="fi" slug={slug} />;
}
