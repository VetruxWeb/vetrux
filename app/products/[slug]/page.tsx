import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getPublishedSlugs } from '@/lib/productData';
import { buildDynamicMetadata, buildProductJsonLd } from '@/lib/seo';
import ProductDetailClient from '@/components/pages/ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug, 'en');
  if (!product) return {};
  return buildDynamicMetadata({
    title: product.name,
    description:
      product.description?.slice(0, 160) ?? `${product.name} from Vetrux Biotechnology`,
    canonicalPath: `/products/${slug}`,
    image: product.heroImage ?? product.images?.[0] ?? undefined,
    type: 'website',
    localizedPath: `/products/${slug}`,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug, 'en');
  if (!product) notFound();

  const schemas = buildProductJsonLd({
    slug: product.slug,
    name: product.name,
    description: product.description,
    image: product.heroImage ?? product.images?.[0] ?? undefined,
    category: product.category,
    specs: product.specs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ProductDetailClient product={product} locale="en" />
    </>
  );
}
