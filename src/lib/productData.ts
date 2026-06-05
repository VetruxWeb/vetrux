import { supabaseAdmin } from '@/lib/supabase';

export interface ProductListItem {
  id: string;
  slug: string;
  heroImage: string | null;
  category: string | null;
  moq: string | null;
  order: number;
  name: string;
  badge: string | null;
  description: string | null;
}

export interface ProductDetail {
  id: string;
  slug: string;
  heroImage: string | null;
  images: string[];
  category: string | null;
  moq: string | null;
  name: string;
  badge: string | null;
  description: string | null;
  specs: { label: string; value: string }[];
  variants: { id: string; label: string }[];
  quantityTiers: { id: string; label: string }[];
}

export async function getPublishedProducts(locale: string): Promise<ProductListItem[]> {
  const { data: products } = await supabaseAdmin
    .from('Product')
    .select('id, slug, heroImage, category, moq, order')
    .eq('status', 'published')
    .order('order', { ascending: true });

  if (!products || products.length === 0) return [];

  const productIds = products.map((p) => p.id);
  const { data: translations } = await supabaseAdmin
    .from('ProductTranslation')
    .select('productId, name, badge, description')
    .in('productId', productIds)
    .eq('locale', locale);

  const transMap = new Map(
    (translations ?? []).map((t) => [t.productId, t])
  );

  let enMap: Map<string, { name: string; badge: string | null; description: string | null }> | null = null;
  if (locale !== 'en') {
    const { data: enTrans } = await supabaseAdmin
      .from('ProductTranslation')
      .select('productId, name, badge, description')
      .in('productId', productIds)
      .eq('locale', 'en');
    enMap = new Map((enTrans ?? []).map((t) => [t.productId, t]));
  }

  return products.map((p) => {
    const t = transMap.get(p.id) ?? enMap?.get(p.id);
    return {
      id: p.id,
      slug: p.slug,
      heroImage: p.heroImage,
      category: p.category,
      moq: p.moq,
      order: p.order,
      name: t?.name ?? p.slug,
      badge: t?.badge ?? null,
      description: t?.description ?? null,
    };
  });
}

export async function getPublishedSlugs(): Promise<{ slug: string }[]> {
  const { data } = await supabaseAdmin
    .from('Product')
    .select('slug')
    .eq('status', 'published');
  return data ?? [];
}

export async function getProductBySlug(slug: string, locale: string): Promise<ProductDetail | null> {
  const { data: product } = await supabaseAdmin
    .from('Product')
    .select('id, slug, heroImage, images, category, moq')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!product) return null;

  const [transRes, enTransRes, specsRes, enSpecsRes, variantsRes, tiersRes] = await Promise.all([
    supabaseAdmin
      .from('ProductTranslation')
      .select('name, badge, description')
      .eq('productId', product.id)
      .eq('locale', locale)
      .single(),
    locale !== 'en'
      ? supabaseAdmin
          .from('ProductTranslation')
          .select('name, badge, description')
          .eq('productId', product.id)
          .eq('locale', 'en')
          .single()
      : Promise.resolve({ data: null }),
    supabaseAdmin
      .from('ProductSpec')
      .select('label, value')
      .eq('productId', product.id)
      .eq('locale', locale)
      .order('order', { ascending: true }),
    locale !== 'en'
      ? supabaseAdmin
          .from('ProductSpec')
          .select('label, value')
          .eq('productId', product.id)
          .eq('locale', 'en')
          .order('order', { ascending: true })
      : Promise.resolve({ data: null }),
    supabaseAdmin
      .from('ProductVariant')
      .select('id, label')
      .eq('productId', product.id)
      .order('order', { ascending: true }),
    supabaseAdmin
      .from('ProductQuantityTier')
      .select('id, label')
      .eq('productId', product.id)
      .order('order', { ascending: true }),
  ]);

  const t = transRes.data ?? enTransRes.data;
  const specs = (specsRes.data && specsRes.data.length > 0) ? specsRes.data : (enSpecsRes.data ?? []);
  const images = Array.isArray(product.images) ? product.images as string[] : [];

  return {
    id: product.id,
    slug: product.slug,
    heroImage: product.heroImage,
    images,
    category: product.category,
    moq: product.moq,
    name: t?.name ?? slug,
    badge: t?.badge ?? null,
    description: t?.description ?? null,
    specs,
    variants: variantsRes.data ?? [],
    quantityTiers: tiersRes.data ?? [],
  };
}
