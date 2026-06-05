import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getPublishedSlugs } from '@/lib/productData';
import ProductDetailClient from '@/components/pages/ProductDetailClient';

const LOCALE = 'pt' as const;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug, LOCALE);
  if (!product) return {};
  return {
    title: `${product.name} | VETRUX`,
    description: product.description?.slice(0, 160) ?? `${product.name} from Vetrux Biotechnology`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug, LOCALE);
  if (!product) notFound();
  return <ProductDetailClient product={product} locale={LOCALE} />;
}
