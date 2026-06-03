import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, getSeoMetadata, buildFaqJsonLd } from '@/lib/seo';
import { getArticleBySlugFromDb, getAllArticleSlugs } from '@/lib/articlesDb';
import { parseArticle } from '@/lib/articleParser';
import ArticlePageClient from '@/components/pages/ArticlePageClient';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const dbSlugs = await getAllArticleSlugs().catch(() => []);
  let staticSlugs: { slug: string }[] = [];
  try {
    const { articles } = await import('@/content/articles');
    staticSlugs = articles.map((a) => ({ slug: a.slug }));
  } catch { /* ignore */ }
  const dbSlugSet = new Set(dbSlugs.map((s) => s.slug));
  const combined = [...dbSlugs.map((s) => ({ slug: s.slug }))];
  for (const s of staticSlugs) {
    if (!dbSlugSet.has(s.slug)) combined.push(s);
  }
  return combined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata(`/blog/${slug}`, 'es');
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try database first
  const dbArticle = await getArticleBySlugFromDb(slug, 'es').catch(() => null);

  if (dbArticle) {
    const meta = {
      slug: dbArticle.meta.slug,
      title: dbArticle.translation.title,
      excerpt: dbArticle.translation.excerpt || '',
      category: dbArticle.meta.category || '',
      date: dbArticle.meta.publishedAt ? String(dbArticle.meta.publishedAt).split('T')[0] : '',
      readTime: dbArticle.translation.readTime || '',
      image: dbArticle.meta.image || '',
      size: (dbArticle.meta.size || 'normal') as 'normal' | 'large',
    };

    const seo = getSeoMetadata(`/blog/${slug}`);
    const { faqItems } = parseArticle(dbArticle.translation.content);
    const schemas: Record<string, unknown>[] = [];
    if (seo.jsonLd) {
      if (Array.isArray(seo.jsonLd)) schemas.push(...seo.jsonLd);
      else schemas.push(seo.jsonLd);
    }
    if (faqItems.length > 0) schemas.push(buildFaqJsonLd(faqItems));

    return (
      <>
        {schemas.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
          />
        )}
        <ArticlePageClient meta={meta} content={dbArticle.translation.content} locale="es" />
      </>
    );
  }

  // Fall back to static files
  let article = null;
  try {
    const { getArticleBySlug } = await import('@/content/articles');
    article = getArticleBySlug(slug);
  } catch { /* ignore */ }
  if (!article) notFound();

  const seo = getSeoMetadata(`/blog/${slug}`);
  const { faqItems } = parseArticle(article.content);
  const schemas: Record<string, unknown>[] = [];
  if (seo.jsonLd) {
    if (Array.isArray(seo.jsonLd)) schemas.push(...seo.jsonLd);
    else schemas.push(seo.jsonLd);
  }
  if (faqItems.length > 0) schemas.push(buildFaqJsonLd(faqItems));

  return (
    <>
      {schemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      )}
      <ArticlePageClient meta={article.meta} content={article.content} locale="es" />
    </>
  );
}
